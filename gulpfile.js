const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('watch', () => {
	gulp.watch('libs/*', ['test']);
	gulp.watch('test/*', ['test']);
});

gulp.task('test', () => {
	gulp.src('test/test.js')
		.pipe(mocha({reporter:'nyan'}));
});