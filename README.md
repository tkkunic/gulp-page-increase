# gulp-page-increase

`src/pages/increase.ejs`を`src/data/pages.json`に記載された配列オブジェクトの数だけページを量産します。  
※ 例外処理を書いてないので、`id`, `filename`, `contents`がないとエラーになります。

## モジュールのインストール
`npm install`  
## タスク実行
`npx gulp`  or `npm run build`

## 以下の実行環境で動作確認済み
```
node -v
v14.15.4
```
```
npx gulp -v
CLI version: 2.3.0
Local version: 4.0.2
```