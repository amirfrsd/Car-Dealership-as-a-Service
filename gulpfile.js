var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('transform', function () {
	
	return browserify({entries: './app/static/jsx/app.jsx'})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', function(err){
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(source('app'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({
        	extname: '.js'
        }))
        .pipe(gulp.dest('./app/static/js'));
    
});


gulp.task('watch', ['transform'], function () {
    gulp.watch('./app/static/jsx/**/*.jsx', ['transform']);
});


gulp.task('default', ['watch']);
