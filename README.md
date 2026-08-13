# JMA Weather PDF Builder V2

## 追加内容
- 地上天気図（気象庁公式PDF）
- Himawari 可視 / 赤外 / 水蒸気（GPV Weather画像）
- Sunny Spotの過去高層・予想図探索
- FXJP854解析用途: 対象Tに対しT-12h初期の図を取得
- PDF/画像を混在して1つのPDFへ結合

## 更新方法
1. Cloudflare Workerのコードを `worker.js` で全置換してDeploy。
2. GitHub Pagesの `index.html`, `style.css`, `app.js`, `charts.js` を置換。
3. `config.js` は自分のWorker URLを残す。

## Sunny Spot探索
例 `AUPQ35_202608131248.pdf` の末尾時刻が公開時刻なので、対象の解析/初期時刻UTCから +0〜+180分を1分刻みで探索します。

## AMeDAS
V2では未実装。次に観測値CSVと観測所位置CSVをブラウザ側で結合して地図化します。
