const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('browser-sync').create();
const chalk = require('chalk');
const del = require('del');
const pump = require('pump');

// Paths for source and output that's going to the src directory
const BASE_SRC = 'gulp/src/';
const BASE_DEST = './gulp/src/';
const DOCS_DEST = './docs/';
const HTML = `${BASE_SRC}*.html`;
const SASS_SRC = `${BASE_SRC}scss/*.scss`;
const IMG_SRC = `${BASE_SRC}graphics/*.png`;
const ICON_SRC = `${BASE_SRC}favicon.ico`;
const IMG_DEST = `${BASE_DEST}graphics`;
const FONTS_SRC = `${BASE_SRC}fonts/**/*`;
const FONTS_DEST = `${BASE_DEST}/fonts`;
const CSS_SRC = `${BASE_SRC}css/**/*`;
const CSS_DEST = `${BASE_DEST}css`;
const JS_SRC = `${BASE_SRC}js/**/*`;
const JS_DEST = `${BASE_DEST}js`;
const HTML_SRC = `${HTML}`;
const HTML_DEST = `${BASE_DEST}`;

// Paths for source and output that's going to the docs directory
const DOCS_IMG_DEST = `${DOCS_DEST}graphics`;
const DOCS_FONTS_DEST = `${DOCS_DEST}/fonts`;
const DOCS_CSS_DEST = `${DOCS_DEST}css`;
const DOCS_JS_DEST = `${DOCS_DEST}js`;
const DOCS_HTML_DEST = `${DOCS_DEST}`;
const DOCS_ICON_DEST = `${DOCS_DEST}`;

// Paths for source and output that's going to the express "static assets" public directory
const EXP_BASE_DEST = './public/';
const EXP_CSS_DEST = `${EXP_BASE_DEST}css`;
const EXP_JS_DEST = `${EXP_BASE_DEST}js`;
const EXP_FONTS_DEST = `${EXP_BASE_DEST}fonts`;
const EXP_GRAPHICS_DEST = `${EXP_BASE_DEST}graphics`;
const EXP_FAVICON_DEST = `${EXP_BASE_DEST}`;

const log = (arg = '') => { console.log(arg); };

// compile Sass copy to src/css & Inject into browser
gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', `${SASS_SRC}`])
        .pipe(sass())
        .pipe(gulp.dest(`${CSS_DEST}`))
        .pipe(browser.stream());
});

// compile Sass and copy to src/css 
gulp.task('scss', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', `${SASS_SRC}`])
        .pipe(sass())
        .pipe(gulp.dest(`${CSS_DEST}`));
});

//  Copy JS files to src/js & inject into browser
gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest(`${JS_DEST}`))
        .pipe(browser.stream());
});

// Copy JS files to src/js no browser stream
gulp.task('scripts', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest(`${JS_DEST}`));
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], () => {
    browser.init({
        server: './gulp/src'
    });
    
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', `${SASS_SRC}`], ['sass']);
    gulp.watch('gulp/src/*.html').on('change', browser.reload);
});

// Copy fonts folder to src/fonts
gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(`${FONTS_DEST}`));
});

// Copy Font Awesome folder to src/css
gulp.task('fa', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(`${CSS_DEST}`));
});

/*  Create the docs directory for use on github*/

// Copy graphics folder to docs
gulp.task('graphics', () => {
    log(`\n\tMoving graphic files from: ${IMG_SRC}`);
    return gulp.src(`${IMG_SRC}`)
        .pipe(gulp.dest(`${DOCS_IMG_DEST}`));
});

// Copy fonts folder to docs
gulp.task('font', () => {
    log(`\n\tMoving font files from: ${FONTS_SRC}`);
    return gulp.src(`${FONTS_SRC}`)
        .pipe(gulp.dest(`${DOCS_FONTS_DEST}`));
});

// Copy css folder to docs
gulp.task('css', () => {
    log(`\n\tMoving css files from: ${CSS_SRC}`);
    return gulp.src(`${CSS_SRC}`)
        .pipe(gulp.dest(`${DOCS_CSS_DEST}`));
});

// Copy js folder to docs
gulp.task('javascript', () => {
    log(`\n\tMoving js files from: ${JS_SRC}`);
    return gulp.src(`${JS_SRC}`)
        .pipe(gulp.dest(`${DOCS_JS_DEST}`));
});

// Copy the favicon to docs
gulp.task('favicon', () => {
    log(`\n\tMoving the favicon from: ${BASE_SRC}`);
    return gulp.src(`${ICON_SRC}`)
        .pipe(gulp.dest(`${DOCS_ICON_DEST}`));
});

// Copy html files to docs
gulp.task('html', () => {
    log(`\n\tMoving HTML files from: ${HTML_SRC}`);
    return gulp.src(`${HTML_SRC}`)
        .pipe(gulp.dest(`${DOCS_HTML_DEST}`));
});

// Clean then remove the docs folder
gulp.task('clean-docs', () => {
    return  del([`${DOCS_DEST}`]);
});

// Clean the docs folder
gulp.task('clean-docs-files', () => {
    return  del([`${DEST}**/*`]);
});

// Run the docs task
gulp.task('docs',  ['clean-docs', 'graphics', 'font', 'css', 'javascript', 'favicon', 'html'], () => {
    const msg = chalk.bold.green(`\n\n\t\t\tRefreshed the docs directory\n\n`);
    return log(`${msg}`);
});

gulp.task('serve', ['js', 'fa', 'serve', 'fonts']);

gulp.task('default', ['scripts', 'fa', 'scss', 'fonts']);

/*  Express static assets*/

// Remove public css folder
gulp.task('clean-public-css', () => {
    return del([`${EXP_BASE_DEST}css`]);
});

// Copy css folder to the public folder
gulp.task('move-public-css', () => {
    return gulp.src([`${CSS_SRC}`])
        .pipe(gulp.dest(`${EXP_CSS_DEST}`));
});

// Remove public fonts folder
gulp.task('clean-public-fonts', () => {
    return del([`${EXP_BASE_DEST}fonts`]);
});

// Copy fonts folder to the public folder
gulp.task('move-public-fonts', () => {
    return gulp.src([`${FONTS_SRC}`])
        .pipe(gulp.dest(`${EXP_FONTS_DEST}`));
});

// Remove public js folder
gulp.task('clean-public-js', () => {
    return del([`${EXP_BASE_DEST}js`]);
});

// Copy js folder to thpublic folder
gulp.task('move-public-js', () => {
    return gulp.src([`${JS_SRC}`])
        .pipe(gulp.dest(`${EXP_JS_DEST}`));
});

// Remove public favicon file
gulp.task('clean-public-favicon', () => {
    return del([`${EXP_BASE_DEST}favicon.ico`]);
});

// Copy favicon file to the public folder
gulp.task('move-public-favicon', () => {
    return gulp.src([`${ICON_SRC}`])
        .pipe(gulp.dest(`${EXP_FAVICON_DEST}`));
});

// Remove public graphics folder
gulp.task('clean-public-graphics', () => {
    return del([`${EXP_BASE_DEST}graphics`]);
});

// Copy graphics folder to the public folder
gulp.task('move-public-graphics', () => {
    return gulp.src([`${IMG_SRC}`])
        .pipe(gulp.dest(`${EXP_BASE_DEST}/graphics`));
});

// Refresh static assets
gulp.task('refresh-assets', ['move-public-css', 'move-public-fonts', 'move-public-js', 'move-public-graphics', 'move-public-favicon'], (done) => done);

// Remove static assets
gulp.task('clear-assets', ['clean-public-css', 'clean-public-fonts', 'clean-public-js', 'clean-public-favicon', 'clean-public-graphics'], (done) => done);
