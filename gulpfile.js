var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build', ['clean'], function () {
    return gulp.src('app/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('marvel-characters-app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);