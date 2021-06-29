const config = require("./config");
const pageData = require("./src/data/page.json");

const gulp              = require('gulp'),
      plumber           = require('gulp-plumber'), //エラー時の強制終了を防止
      rename            = require("gulp-rename"), //.ejsの拡張子を変更
      replace           = require('gulp-replace'); // gulp上で置換が行える

// html系
const ejs               = require("gulp-ejs"),
      convertEncoding   = require('gulp-convert-encoding'),
      htmlhint          = require('gulp-htmlhint');

// html コンパイル
function htmls() {
  const lastRunResult = gulp.lastRun(htmls);
  return gulp.src([`${config.PAGES.SRC}**/*.ejs`, `!${config.PAGES.SRC}**/_*.ejs`, `!${config.PAGES.SRC}**/increase.ejs`], {since: lastRunResult})
  .pipe(plumber())
  .pipe(rename({
    extname: ".html",
  }))
  .pipe(convertEncoding({to: "utf-8"}))
  .pipe(replace('<head(\s\S)*>', '<head>'))
  .pipe(gulp.dest(config.PAGES.DIST))

}

// html ページ量産
function pageIncrease(cb) {
  pageData.pages.forEach(pageData => {
    gulp.src([`${config.PAGES.SRC}**/increase.ejs`])
    .pipe(plumber())
    .pipe(rename(`${pageData["filename"]}.html`))
    .pipe(ejs({PAGE_DATA: pageData}))
    .pipe(convertEncoding({to: "utf-8"}))
    .pipe(replace('<head(\s\S)*>', '<head>'))
    .pipe(gulp.dest(config.PAGES.DIST))
  })

  cb();
}


// バリデートHTML
// コンパイル後のhtmlのバリデートを行う
function validateHtml() {
  return gulp.src([`${config.PAGES.DIST}**/*.html`])
  .pipe(htmlhint({
    "spec-char-escape": false, //特殊文字を使用しているか
    "attr-value-double-quotes": false, //ダブルクォーテーションを使用しているか
    "attr-lowercase": false //Attributeにlowercaseを使用しているか
  }))
  .pipe(htmlhint.reporter());
}


/*
* タスクの実行
*
*/
exports.default = gulp.series(
  gulp.parallel(htmls,　pageIncrease, validateHtml),
);

