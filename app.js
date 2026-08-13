const { PDFDocument } = PDFLib;
const $ = s => document.querySelector(s);
const dateEl = $("#date"), hourEl = $("#hour"), modeEl = $("#mode");
const listEl = $("#chart-list"), planEl = $("#plan"), logEl = $("#log");

function todayJST(){ return new Date(Date.now()+9*3600*1000).toISOString().slice(0,10); }
dateEl.value = todayJST();
function targetUTC(){ return new Date(`${dateEl.value}T${hourEl.value}:00:00Z`); }
function addHours(d,h){ return new Date(d.getTime()+h*3600*1000); }
function pad(n){ return String(n).padStart(2,"0"); }
function stamp(d,withMinute=false){
  const s=`${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}${pad(d.getUTCHours())}`;
  return withMinute ? s+pad(d.getUTCMinutes()) : s;
}
function fmt(d){ return `${d.toISOString().slice(0,10)} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`; }
function visibleCharts(){ return CHARTS.filter(c=>c.mode===modeEl.value); }

function renderCharts(){
  const groups={};
  for(const c of visibleCharts()) (groups[c.group]??=[]).push(c);
  listEl.innerHTML="";
  for(const [g,arr] of Object.entries(groups)){
    const div=document.createElement("div"); div.className="group"; div.innerHTML=`<h3>${g}</h3>`;
    for(const c of arr){
      const ft=c.containedForecastHours?.length ? `収録予報時間: ${c.containedForecastHours.map(x=>"+"+x+"h").join(" / ")}` : `対応時刻: ${c.validHours.map(x=>pad(x)+" UTC").join(", ")}`;
      const lab=document.createElement("label"); lab.className="item";
      lab.innerHTML=`<input type="checkbox" data-chart="${c.id}"><span><b>${c.id}</b> ${c.name}<small>${ft}</small></span>`;
      div.appendChild(lab);
    }
    listEl.appendChild(div);
  }
  renderPlan();
}
function selected(){
  const ids=[...document.querySelectorAll("[data-chart]:checked")].map(x=>x.dataset.chart);
  return CHARTS.filter(c=>ids.includes(c.id));
}
function makePlan(c){
  const target=targetUTC(), available=c.validHours.includes(target.getUTCHours());
  let sourceTime=target, note="";
  if(c.initOffsetHours){ sourceTime=addHours(target,c.initOffsetHours); note=`対象 ${fmt(target)} は取得図の +12h パネルに対応`; }
  return {c,target,sourceTime,available,note};
}
function renderPlan(){
  const plans=selected().map(makePlan);
  if(!plans.length){ planEl.innerHTML="<span class='warn'>まだ資料が選択されていません。</span>"; return; }
  planEl.innerHTML=plans.map(p=>`<div class="plan-row"><b>${p.c.id}</b> — ${p.c.source==="surface"||p.c.source==="satellite"?"対象":"解析/初期"}時刻: ${fmt(p.sourceTime)}${p.note?`<br><small>${p.note}</small>`:""}${!p.available?`<br><small class="bad">※この資料は選択した時刻には通常作成されません</small>`:""}</div>`).join("");
}
function proxy(path,params){
  const base=APP_CONFIG.proxyBase.replace(/\/$/,"");
  if(base.includes("YOUR-WORKER")) throw new Error("config.js の proxyBase を設定してください。");
  const u=new URL(base+path); for(const [k,v] of Object.entries(params)) u.searchParams.set(k,v); return u;
}
async function getBytes(url){
  const r=await fetch(url); if(!r.ok) throw new Error(`${r.status} ${await r.text().catch(()=>"")}`);
  return {bytes:new Uint8Array(await r.arrayBuffer()),type:r.headers.get("content-type")||""};
}
async function appendPdf(out,bytes){
  const src=await PDFDocument.load(bytes); const pages=await out.copyPages(src,src.getPageIndices()); pages.forEach(p=>out.addPage(p)); return pages.length;
}
async function appendImage(out,bytes,type){
  let img; if(type.includes("png")) img=await out.embedPng(bytes); else img=await out.embedJpg(bytes);
  const landscape=img.width>=img.height, page=out.addPage(landscape?[842,595]:[595,842]);
  const margin=24,pw=page.getWidth()-2*margin,ph=page.getHeight()-2*margin,scale=Math.min(pw/img.width,ph/img.height),w=img.width*scale,h=img.height*scale;
  page.drawImage(img,{x:(page.getWidth()-w)/2,y:(page.getHeight()-h)/2,width:w,height:h}); return 1;
}
async function fetchPlan(p){
  const c=p.c;
  if(c.source==="surface") return getBytes(proxy("/surface",{datetime:stamp(p.target,true)}));
  if(c.source==="satellite") return getBytes(proxy("/satellite",{type:c.satelliteType,datetime:stamp(p.target,true)}));
  if(c.source==="sunny") return getBytes(proxy("/sunny",{code:c.sourceCode||c.id,valid:stamp(p.sourceTime,false)}));
  throw new Error("unknown source");
}
async function build(){
  const plans=selected().map(makePlan); if(!plans.length){alert("資料を選択してください。");return;}
  logEl.textContent=""; const out=await PDFDocument.create();
  for(let i=0;i<plans.length;i++){
    const p=plans[i]; logEl.textContent+=`[${i+1}/${plans.length}] ${p.c.id} ${fmt(p.sourceTime)} を取得中...\n`;
    try{
      const {bytes,type}=await fetchPlan(p); let n;
      if(type.includes("pdf")||p.c.source==="surface"||p.c.source==="sunny") n=await appendPdf(out,bytes); else n=await appendImage(out,bytes,type);
      logEl.textContent+=`  OK: ${n} page(s)\n`;
    }catch(e){ logEl.textContent+=`  ERROR: ${e.message}\n`; }
  }
  if(!out.getPageCount()){logEl.textContent+="\nPDFに追加できたページがありません。\n";return;}
  const b=await out.save(), blob=new Blob([b],{type:"application/pdf"}), a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=`weather_${dateEl.value.replaceAll("-","")}_${hourEl.value}UTC_${modeEl.value}.pdf`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),5000);
  logEl.textContent+=`\n完成: ${out.getPageCount()} pages\n`;
}
listEl.addEventListener("change",renderPlan); dateEl.addEventListener("change",renderPlan); hourEl.addEventListener("change",renderPlan); modeEl.addEventListener("change",renderCharts); $("#build").addEventListener("click",build); renderCharts();
