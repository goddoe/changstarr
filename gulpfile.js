
// 모듈 호출
var gulp = require('gulp');
var concat = require('gulp-concat'),
    uglify = require('gulp-uglifyes'),
    rename = require('gulp-rename'),
    minifyhtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    browserSync = require('browser-sync').create();


// 경로 변수
var src = 'app/src';
var dist = 'app/dist';
var jsSource = 'app/src/js';
var paths = {
    js: src+'/js/**/*.js',
    scss: src+'/css/scss/**/*.scss',
    html: src+'/**/*.html',
    image: src+'/images/**/*'
}


// SASS 옵션
var sassOptions = {
    outputStyle: "compressed",
    indentType : "tab"
};




// HTML 압축
gulp.task('minify-html',function(){
     return gulp.src(paths.html)
                .pipe(minifyhtml())
                .pipe(gulp.dest(dist))
                .pipe(browserSync.stream());
});






// SASS 컴파일
gulp.task('compile-scss',function(){
     return gulp.src(paths.scss)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(sass(sassOptions))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(src+'/css'))
                .pipe(gulp.dest(dist+'/css'))
                .pipe(browserSync.stream());
});






// JS 압축하기
gulp.task('minify-js',function(){
     return gulp.src(
                    jsSource+'/changstarr.js'
                )
                .pipe(gulp.dest(dist+'/js'))
                .pipe(rename({suffix:'.min'}))
                .pipe(uglify())
                .pipe(gulp.dest(dist+'/js'))
                .pipe(browserSync.stream());
    
    
});

gulp.task('copy-font',function(){
    return gulp.src(src+'/font/**/*')
                .pipe(gulp.dest(dist+'/font'));
});

// 이미지 압축
gulp.task('minify-image',function(){
    return gulp.src(paths.image)
               .pipe(imagemin())
                .pipe(gulp.dest(dist+'/images'));
});




gulp.task('browserSync', function () { 
    return browserSync.init({
        port: 3200,
        server: {
            baseDir: "app/dist"
        }
    }); 
});


// watch 업무

gulp.task('watch',function(){
    gulp.watch(paths.html, {interval:1000},  ['minify-html']);
    gulp.watch(paths.scss,{interval:1000},  ['compile-scss']);
    gulp.watch(jsSource, {interval:1000},  ['minify-js']);
});


// default 정의   
gulp.task('default', [ 'minify-html', 'compile-scss', 'minify-js', 'copy-font', 'minify-image', 'browserSync',  'watch' ]);


