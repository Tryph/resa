var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var webpackStream = require('webpack-stream');

var source = './src';
var destination = './dist';


var webpackConf = function(outfileName) {
  return {
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ]
    },
    externals: {},
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["transform-object-rest-spread"],
          cacheDirectory: true
        }
      },{
        test: /\.css$/,
        loader: "style!css"
      }]
    },
    output: {
      filename: outfileName
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      //   }
      // }),
    ]
  };
};



gulp.task('css', function() {
  return gulp.src(source + '/style/*.css')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/style/'));
});

gulp.task('js', function() {
  return gulp.src('./src/index.js')
    .pipe(webpackStream(webpackConf('bundle.js')))
    .pipe(gulp.dest(destination + '/script/'))
});

gulp.task('minify_css', function() {
  return gulp.src(destination + '/style/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/style/'));
});





gulp.task('watch', function() {
  gulp.watch(source + '/style/*.css', ['css']);
  gulp.watch(source + '/**/*.{js,jsx}', ['js']);
});





gulp.task('build', ['css', 'js']);


gulp.task('prod', ['build', 'minify_css']);

gulp.task('dev', ['watch', 'build']);



gulp.task('default', ['dev']);