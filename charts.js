window.CHARTS = [
  // ---------------- 実況・解析 ----------------
  {
    id:"SURFACE",
    mode:"analysis",
    group:"地上",
    name:"地上天気図（日本周辺カラー）",
    source:"surface",
    validHours:[0,3,6,9,12,15,18,21]
  },

  {
    id:"HIMAWARI_VIS",
    mode:"analysis",
    group:"ひまわり",
    name:"可視画像（日本域）",
    source:"satellite",
    satelliteType:"visible",
    validHours:[0,3,6,9,12,15,18,21]
  },
  {
    id:"HIMAWARI_IR",
    mode:"analysis",
    group:"ひまわり",
    name:"赤外画像（日本域）",
    source:"satellite",
    satelliteType:"infrared",
    validHours:[0,3,6,9,12,15,18,21]
  },
  {
    id:"HIMAWARI_WV",
    mode:"analysis",
    group:"ひまわり",
    name:"水蒸気画像（日本域）",
    source:"satellite",
    satelliteType:"watervapor",
    validHours:[0,3,6,9,12,15,18,21]
  },

  {id:"AUPA20",mode:"analysis",group:"高層天気図",name:"アジア太平洋200hPa高度・気温・風・圏界面",source:"sunny",validHours:[0,12]},
  {id:"AUPA25",mode:"analysis",group:"高層天気図",name:"アジア太平洋250hPa高度・気温・風",source:"sunny",validHours:[0,12]},
  {id:"AUPN30",mode:"analysis",group:"高層天気図",name:"北太平洋300hPa高度・気温・風",source:"sunny",validHours:[0,12]},
  {id:"AUPQ35",mode:"analysis",group:"高層天気図",name:"アジア500/300hPa 高度・気温・風・等風速線",source:"sunny",validHours:[0,12]},
  {id:"AUPQ78",mode:"analysis",group:"高層天気図",name:"アジア850/700hPa 高度・気温・風・湿数",source:"sunny",validHours:[0,12]},
  {id:"AUXN50",mode:"analysis",group:"高層天気図",name:"北半球500hPa高度・気温",source:"sunny",validHours:[12]},
  {id:"AXFE578",mode:"analysis",group:"高層天気図",name:"極東850hPa気温・風 / 700hPa上昇流 / 500hPa高度・渦度",source:"sunny",validHours:[0,12]},
  {id:"FEAS50",mode:"analysis",group:"高層天気図",name:"アジア地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12]},

  // FBJPは実況・解析でも利用する。
  // 指定時刻Tに対して T-6h を探索開始時刻とし、次の6時間サイクルまで探す。
  {
    id:"FBJP_ANALYSIS",
    sourceCode:"FBJP",
    mode:"analysis",
    group:"航空気象",
    name:"国内悪天予想図",
    source:"sunny",
    validHours:[0,6,12,18],
    initOffsetHours:-6,
    offsetPurpose:"search"
  },

  // AXJPはSunny Spot上ではAXJP140のみ扱う
  {
    id:"AXJP140",
    mode:"analysis",
    group:"航空気象",
    name:"高層断面図 東経140度",
    source:"sunny",
    validHours:[0,12]
  },

  // 解析時刻Tに対して T-12h 初期のFXJP854を取得し、その+12hパネルを見る
  {
    id:"FXJP854_ANALYSIS",
    sourceCode:"FXJP854",
    mode:"analysis",
    group:"水蒸気予想",
    name:"日本850hPa相当温位・風（T−12h初期の+12hパネルを実況用に使用）",
    source:"sunny",
    validHours:[0,12],
    initOffsetHours:-12,
    containedForecastHours:[12,24,36,48]
  },

  // ---------------- 予報 ----------------
  {
    id:"WTAS12",
    mode:"forecast",
    group:"台風情報",
    name:"台風情報",
    source:"sunny",
    // 6時間ごと。Sunny Spot上の実ファイル公開時刻を次サイクルまで探索。
    validHours:[0,6,12,18],
    selectionMode:"latestBeforeTarget",
    lookbackHours:6
  },

  {id:"FUPA252",mode:"forecast",group:"数値予報天気図",name:"アジア太平洋250hPa高度・気温・風",source:"sunny",validHours:[0,12],containedForecastHours:[24]},
  {id:"FUPA302",mode:"forecast",group:"数値予報天気図",name:"アジア太平洋300hPa高度・気温・風",source:"sunny",validHours:[0,12],containedForecastHours:[24]},
  {id:"FUPA402",mode:"forecast",group:"数値予報天気図",name:"アジア太平洋400hPa高度・気温・風",source:"sunny",validHours:[0,12],containedForecastHours:[24]},
  {id:"FUPA502",mode:"forecast",group:"数値予報天気図",name:"アジア太平洋500hPa高度・気温・風",source:"sunny",validHours:[0,12],containedForecastHours:[24]},

  {id:"FXFE5782",mode:"forecast",group:"極東予想図",name:"850hPa気温・風 / 700hPa上昇流・湿数 / 500hPa気温",source:"sunny",validHours:[0,12],containedForecastHours:[12,24]},
  {id:"FXFE5784",mode:"forecast",group:"極東予想図",name:"同上",source:"sunny",validHours:[0,12],containedForecastHours:[36,48]},
  {id:"FXFE577",mode:"forecast",group:"極東予想図",name:"同上",source:"sunny",validHours:[0,12],containedForecastHours:[72]},

  {id:"FXFE502",mode:"forecast",group:"極東予想図",name:"地上気圧・風・降水量 / 500hPa高度・渦度",source:"sunny",validHours:[0,12],containedForecastHours:[12,24]},
  {id:"FXFE504",mode:"forecast",group:"極東予想図",name:"同上",source:"sunny",validHours:[0,12],containedForecastHours:[36,48]},
  {id:"FXFE507",mode:"forecast",group:"極東予想図",name:"同上",source:"sunny",validHours:[0,12],containedForecastHours:[72]},

  {id:"FEAS502",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[24]},
  {id:"FEAS504",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[48]},
  {id:"FEAS507",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[72]},
  {id:"FEAS509",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[96]},
  {id:"FEAS512",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[120]},
  {id:"FEAS514",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[144]},
  {id:"FEAS516",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[168]},
  {id:"FEAS519",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[192]},
  {id:"FEAS521",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[216]},
  {id:"FEAS524",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[240]},
  {id:"FEAS526",mode:"forecast",group:"アジア予想図",name:"地上気圧・850hPa気温 / 500hPa高度・渦度",source:"sunny",validHours:[12],containedForecastHours:[264]},

  {
    id:"FXJP854",
    mode:"forecast",
    group:"日本予想図",
    name:"日本850hPa相当温位・風（+12/+24/+36/+48hを1枚に収録）",
    source:"sunny",
    validHours:[0,12],
    containedForecastHours:[12,24,36,48]
  },

  // ---------------- 航空気象 ----------------
  // 「指定時刻に使う資料」を選ぶため、予報モード側に表示。
  // FBJPはおおむね6時間前に、6時間ごとに発表。
  {
    id:"FBJP",
    mode:"forecast",
    group:"航空気象",
    name:"国内悪天予想図",
    source:"sunny",
    validHours:[0,6,12,18]
  },

  // 3時間ごとに、6時間後の予報を発表。
  // 指定時刻Tに対して T-6h を初期・発表対象時刻として探索する。
  {
    id:"FXJP106",
    mode:"forecast",
    group:"航空気象",
    name:"国内航空路6時間予想断面図",
    source:"sunny",
    validHours:[0,3,6,9,12,15,18,21],
    initOffsetHours:-6,
    forecastLeadHours:6
  }
];
