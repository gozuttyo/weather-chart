# JMA Weather PDF Builder V4

## V4追加内容

### 台風情報
予報カテゴリーに `WTAS12` を追加しました。

Sunny Spot例:
`https://www.sunny-spot.net/chart/data/WTAS12/2026/08/WTAS12_202608132212.pdf`

- 6時間ごと
- 指定した時刻に対して、おおむね6時間前〜指定時刻の間をJSTで検索
- その範囲に複数あれば最も新しいPDFを採用

### 航空気象
航空気象カテゴリーを追加しました。

#### FBJP
国内悪天予想図

例:
`https://www.sunny-spot.net/chart/data/FBJP/2026/08/FBJP_202608140320.pdf`

- 6時間ごと
- 指定した時刻に対して、おおむね6時間前〜指定時刻までを検索
- 最も新しいファイルを採用

#### FXJP106
国内航空路6時間予想断面図

例:
`https://www.sunny-spot.net/chart/data/FXJP106/2026/08/FXJP106_202608140218.pdf`

- 3時間ごと
- 6時間後予報
- 指定した有効時刻 T に対して T-6h を探索基準にする

#### AXJP140
東経140度高層断面図

例:
`https://www.sunny-spot.net/chart/data/AXJP140/2026/08/AXJP140_202608132254.pdf`

- AXJP130は削除
- AXJP140のみ
- 実況・解析モードの「航空気象」に移動

## Sunny Spot検索の基本
ファイル名末尾 `YYYYMMDDHHMM` はJSTの公開時刻として扱います。
通常資料は、解析/初期時刻をJSTへ直してから次の作成時刻まで検索します。

## 更新方法
1. Cloudflare WorkerはV3と同じ worker.js で動きます。
2. GitHub Pages側の `charts.js` と `app.js` をV4へ置換してください。
3. まとめて全ファイルを置換してもOKです。
4. `config.js` の `proxyBase` は自分のWorker URLを維持してください。
