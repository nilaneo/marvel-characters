var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build-js', ['clean'], function () {
    return gulp.src('app/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('marvel-characters-app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-js', 'concat-vendor']);

gulp.task('concat-vendor', ['clean'], function () {
    return gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/lodash/lodash.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ])
        .pipe(concat('marvel-characters-vendor.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['build'], browserSync.reload);

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('app/**/*.js', ['js-watch']);
});

gulp.task('default', ['build']);
