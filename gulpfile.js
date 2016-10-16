// Update: Hey Folks - I've got a full Gulpfile with everything else over at https://github.com/wesbos/React-For-Beginners-Starter-Files

var babelify    = require('babelify');
var browserify  = require('browserify');
var del         = require('del');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var watchify    = require('watchify');
var uglify      = require('gulp-uglify');
var nodemon     = require('gulp-nodemon');
var notifier    = require('node-notifier');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-babel-istanbul');
var livereload  = require('gulp-livereload');

gulp.task('pre-test', function () {

	return gulp.src(['./index.js', './app/*.*', './app/**/*.*'])
		// Covering files
		.pipe(istanbul({
			//includeUntested:true,
			//includeAllSources:true
		}))
		// Force `require` to return covered files
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
	return gulp.src(['test/*.*', 'test/**/*.*'])
		.pipe(mocha())
		// Creating the reports after tests ran
		.pipe(istanbul.writeReports())
		// Enforce a coverage of at least 75% 
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 75 } }));
});


gulp.task('clean', function () {
	del([
		'build/**',
	]);
});

var scripts = {
	b: browserify('./app/components/app.js', {
		debug: true,
		extensions: ['.jsx']
	})
	.transform(babelify),
	build: function () {
		gutil.log('🕒 ', gutil.colors.yellow('Building Scripts...'));
		return scripts.b
			.bundle()
			.on('error', gutil.log.bind(gutil, '❌ ', gutil.colors.red('Error:')))
			.pipe(source('app.js'))
			//.pipe(streamify(uglify()))
			.pipe(gulp.dest("./build"));
	},
	watch: function () {
		watchify(scripts.b)
			.on('update', scripts.build)
			.on('time', function (time) {
				gutil.log('✅ ', gutil.colors.green('Built Scripts in'), gutil.colors.cyan(time/1000 + 's'));
			});
			return scripts.build()
	},
	buildLib: function() {
		return gulp.src([
				'./bower_components/jquery/dist/jquery.js',
				'./bower_components/uikit/js/uikit.js'
			])
			.pipe(concat('lib.js'))
			.pipe(gulp.dest('./build'))
			.pipe(rename('lib.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./build'));
	}
};

gulp.task('buildapp', ['clean'], function(){ scripts.build(); });

gulp.task('buildlib', ['clean'], function(){ scripts.buildLib(); });

gulp.task('watch', ['clean'], scripts.watch); // will automatically build first

gulp.task('nodemon', ['watch', 'buildlib'], function (cb) {
	livereload.listen();

	return nodemon({
		script: 'index.js',
		ext: 'js jsx',
		stdout: false,
		ignore: ['app/components'] // as build will be triggred while changing this files and node will be restarted due to build file changes ;)
	}).on('restart', function(){
		notifier.notify({
			'title': 'script Building',
			'message': 'Server restarting!',
			'time': 1000
		});
	}).on('readable', function(data) {
        this.stdout.on('data', function(chunk) {
            if (/Express server listening/.test(chunk)) {
                console.log('livereload');
                livereload.reload();
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});


gulp.task('build', ['clean', 'buildapp', 'buildlib' ]);

gulp.task('default', ['nodemon']);