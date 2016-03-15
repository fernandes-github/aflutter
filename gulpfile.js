var fileinclude = require('gulp-file-include'),
  	gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    prettify   = require('gulp-prettify'),
    concat     = require('gulp-concat'),
    htmlhint = require("gulp-htmlhint"),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    args   = require('yargs').argv,
    mkdirp = require("mkdirp"),
    faker = require("faker"),
    reload      = browserSync.reload,
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

var MODE = 'dev';
var JSFILES = [
  './resources/js/modernizr.js',
  './bower_components/jquery/dist/jquery.js',
  './resources/js/jquery-ui.js',
  './bower_components/Materialize/dist/js/materialize.js',
  './bower_components/jQRangeSlider/jQRangeSliderMouseTouch.js',
  './bower_components/jQRangeSlider/jQRangeSliderDraggable.js',
  './bower_components/jQRangeSlider/jQRangeSliderHandle.js',
  './bower_components/jQRangeSlider/jQRangeSliderBar.js',
  './bower_components/jQRangeSlider/jQRangeSliderLabel.js',
  './bower_components/jQRangeSlider/jQRangeSlider.js',
  './bower_components/jQRangeSlider/jQDateRangeSliderHandle.js',
  './bower_components/jQRangeSlider/jQDateRangeSlider.js',
  './bower_components/jQRangeSlider/jQRuler.js',
  './bower_components/jquery-slimscroll/jquery.slimscroll.js',
  './js/bootstrap-datepicker.js'
];

var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
};

gulp.task('compilescss', function () {
  gulp.src('scss/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./deploy/dev/css/'));
});

gulp.task('compilehtml', function() {
  gulp.src(['pages/*.html'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      filters : {
        faker : faker
      }
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest('./deploy/dev'));
});

function sanitizeFilePath(filepath){
  return filepath
          .replace('/scss/','')
          .replace('.scss','')
          .replace('.css','');
}

function injectLayer(){
  var target = gulp.src('./main.scss');

  var components = gulp.src(['./scss/components/**/*.scss']);
  var trumps = gulp.src(['./scss/trumps/**/*.scss']);
  var plugins = gulp.src(['./scss/plugins/**/*.{css,scss}']);
  target.pipe(inject(components, {
    starttag: '// inject:components',
    endtag: '// endinject',
    transform: function (filepath) {
      filepath = sanitizeFilePath(filepath)
      return '@import "' + filepath + '";';
    }
  }))
  .pipe(inject(trumps, {
    starttag: '// inject:trumps',
    endtag: '// endinject',
    transform: function (filepath) {
      filepath = sanitizeFilePath(filepath)
      return '@import "' + filepath + '";';
    }
  }))
  .pipe(inject(plugins, {
    starttag: '// inject:plugins',
    endtag: '// endinject',
    transform: function (filepath) {
      filepath = sanitizeFilePath(filepath)
      return '@import "' + filepath + '";';
    }
  }))
  .pipe(gulp.dest('./scss'));
}

gulp.task('injectscss', function(){
  injectLayer();
});

gulp.task('injectjs', function(){

  var files = MODE === 'dev' ? JSFILES : ['./deploy/dist/js/vendor.js'];
  var search = MODE === 'dev' ? '/bower_components' : '/deploy/dist';
  var replaceWord = MODE === 'dev' ? '.' : '.';
  gulp.src('./components/footer.html')
      .pipe(inject(gulp.src(files, {read: false})))
      .pipe(replace(search, replaceWord))
      .pipe(replace('/resources','.'))
      .pipe(gulp.dest('./components'));
})

/**
 * Create component.
 * This task will create a component file in components folder and scss/components
 * folder. You can also specify folder path while running this task:
 * eg: gulp c --name forms/selectbox
 * It will create a folder named forms inside components folder
 */
gulp.task('c',function(){
  var componentName = args.name;
  if(undefined === componentName || true === componentName){
    console.error("Please provide component name: eg: gulp g --name yourcomponentname");
    return;
  }
  var fs = require('fs');
  var toArray = componentName.split('/');
  var filename = toArray[toArray.length - 1];
  if(toArray.length > 1){
    var folders = toArray.slice(0,-1).join('/');
    var path = 'components/' + folders;
    mkdirp(path, function(err){
      fs.writeFileSync('./scss/' + path + '/_' + filename +'.scss', '');
      fs.writeFileSync('./' + path + '/' + filename +'.html', '');
      gulp.start(['injectscss']);
    });
  }
  else{
    var path = 'components/';
    fs.writeFileSync('./scss/' + path + '_' + filename +'.scss', '');
    fs.writeFileSync('./' + path + '/' + filename +'.html', '');
    gulp.start(['injectscss']);
  }
});

/**
 * Create trump
 * This task will create a trump scss file in scss/trumps
 */
gulp.task('t',function(){
  var trumpName = args.name;
  if(undefined === trumpName || true === trumpName){
    console.error("Please provide trump name: eg: gulp g --name yourtrumpname");
    return;
  }
  var fs = require('fs');
  var toArray = trumpName.split('/');
  var filename = toArray[toArray.length - 1];
  if(toArray.length > 1){
    var folders = toArray.slice(0,-1).join('/');
    var path = 'trumps/' + folders;
    mkdirp(path, function(err){
      fs.writeFileSync('./scss/' + path + '/_' + filename +'.scss', '');
      gulp.start(['injectscss']);
    });
  }
  else{
    var path = 'trumps/';
    fs.writeFileSync('./scss/' + path + '_' + filename +'.scss', '');
    gulp.start(['injectscss']);
  }
});

// start the development
gulp.task('watch', function () {
  gulp.start(['injectscss', 'injectjs', 'compilescss', 'compilehtml']);
  browserSync.init({
    server: {
      baseDir: ["./deploy/dev", "./bower_components", "./resources"]
    }
  });
  gulp.watch('./scss/**/*.scss', ['compilescss']);
  gulp.watch(['./pages/**/*.html','./components/**/*.html'], ['compilehtml']);
  gulp.watch(['./deploy/dev/**/*.html','./deploy/dev/**/*.css']).on("change", reload);
});


gulp.task('combinejs', function(){
  gulp.src(JSFILES)
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./deploy/dist/js/'));
  MODE = 'dist';
});

// build the final output
gulp.task('build', function () {
  gulp.start(['injectscss', 'combinejs', 'injectjs' ,'compilescss', 'compilehtml']);
  gulp.src(['./resources/**/*','./deploy/dev/**/*'])
      .pipe(gulp.dest('./deploy/dist/'));
});
