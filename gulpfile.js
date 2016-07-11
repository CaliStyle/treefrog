/* eslint no-console: [0, { allow: ["log","warn", "error"] }] */

'use strict'

// Treefrog
//
// We use this Gulpfile to assemble the documentation, run unit tests,
// and deploy changes to the live documentation and CDN.
//
// The tasks are grouped into these categories:
//   1. Libraries
//   2. Variables
//   3. Cleaning files
//   4. Copying files
//   5. Stylesheets
//   6. Testing
//   7. Server
//   8. Deployment
//   9. Default tasks

// Utility Functions

// convert path to absolute from root directory
function root(_path) {
  return path.join(__dirname, './' + _path)
}

// convert array PATHS to absolute from root directory
function rootDir(dir) {
  return dir.map(root)
}

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

const path = require('path')
const gulp = require('gulp')
const Server = require('karma').Server
const modRewrite = require('connect-modrewrite')
//const routes = require('./bin/gulp-dynamic-routing')
//const merge = require('merge-stream')
const octophant = require('octophant')

const $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.*',
    'rimraf',
    'run-sequence',
    'conventional-changelog',
    'jasmine-*'
  ]
})

// const addVersions = () => {
//   const pkg = require('./package.json')
//   return $.rename(function(path) {
//     // Inject the version number into the filename
//     let base = path.basename.split('.')
//     if (base.length === 1) {
//       base = base + '-' + pkg.version
//     }
//     else {
//       base = base.slice(0, -1).join('') + '-' + pkg.version + '.' + base[base.length - 1]
//     }
//     path.basename = base
//     path.dirname = ''
//   })
// }

// 2. VARIABLES
// - - - - - - - - - - - - - - -

const PATHS = {
  html: {
    base: rootDir([
      'docs/**/*.*',
      '!docs/templates/**/*.*',
      '!docs/assets/{scss,js}/**/*.*'
    ]),
    templates: rootDir([
      'docs/templates/**/*.html'
    ])
  },
  sass: {
    loadPaths: rootDir([
      'scss',
      'docs/assets/scss'
    ]),
    testPaths: rootDir([
      'scss',
      'docs/assets/scss',
      'node_modules/bootcamp/dist'
    ])
  }
}

// 3. CLEANIN' FILES
// - - - - - - - - - - - - - - -

// Clean build directory
gulp.task('clean', (cb) => {
  $.rimraf('./build', cb)
})

// Clean the dist directory
gulp.task('clean:dist', (cb) => {
  $.rimraf('./dist', cb)
})

// 4. COPYING FILES
// - - - - - - - - - - - - - - -

// Copy static files (but not the Sass)
gulp.task('copy', () => {
  gulp.src(PATHS.html.base, {
    base: './docs/'
  })
  .pipe(gulp.dest('build'))

  return gulp.src('./iconic/**/*')
    .pipe(gulp.dest('build/assets/img/iconic/'))
})

// 5. STYLESHEETS
// - - - - - - - - - - - - - - -

// Inject styles for docs-specific libraries
gulp.task('css', ['sass'], () => {
  const dirs = [
    'build/assets/css/app.css'
  ]
  return gulp.src(dirs)
    .pipe($.concat('app.css'))
    .pipe(gulp.dest('build/assets/css'))

})

// Compile stylesheets
gulp.task('sass', () => {
  // const filter = $.filter(['*.css'])

  return gulp.src('docs/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: PATHS.sass.loadPaths,
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./build/assets/css/'))
})

// Generate Sass settings file
gulp.task('sass:settings', () => {
  octophant([
    'scss/_includes.scss',
    'scss/_global.scss',
    'scss/helpers/_breakpoints.scss',
    'scss/components/_typography.scss',
    'scss/components/_grid.scss',
    'scss/components/_button.scss',
    'scss/components/*.scss'
  ], {
    title: 'Treefrog Settings'.toUpperCase(),
    partialsPath: 'docs/partials/scss',
    settingsPath: 'scss'
  })
})

// 6. SERVER
// - - - - - - - - - - - - - - -

gulp.task('server:start', () => {
  $.connect.server({
    root: './build',
    middleware: () => {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ]
    }
  })
})

// 7. TESTING TODO update to Protractor
// - - - - - - - - - - - - - - -

gulp.task('test:karma', ['build', 'sass'], (done) => {
  // const testFiles = [
  //   'build/assets/css/app.css',
  //   'build/assets/css/app_node.css',
  //   'tests/unit/common/*spec.js'
  // ]

  // return gulp.src(testFiles)
  //   .pipe(karma({
  //     configFile: 'karma.conf.js',
  //     action: 'run'
  //   }))
  //   .on('error', function(err) {
  //     throw err
  //   })

  new Server({
    configFile: root('karma.conf.js'),
    singleRun: true
  }, done).start()


})

gulp.task('test:sass', () => {
  return $.sass('./tests/unit/scss/tests.scss', {
    includePaths: PATHS.testPaths,
    outputStyle: 'nested',
    errLogToConsole: true
  })
  .on('data', function(data) {
    console.log(data.contents.toString())
  })
})

gulp.task('test', ['test:karma', 'test:sass'], () => {
  console.log('Tests finished.')
})

// 9. DEPLOYMENT
// - - - - - - - - - - - - - - -

// Deploy distribution files
gulp.task('deploy:dist', ['clean:dist'], function(cb) {
  // const filter = $.filter(['*.css'])

  gulp.src('scss/treefrog.scss')
    .pipe($.sass({
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe($.rename('treefrog.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe($.minifyCss())
    .pipe($.rename('treefrog.min.css'))
    .pipe(gulp.dest('./dist/css'))

  cb()
})

// Deploy documentation
// gulp.task('deploy:docs', ['build'], () => {
//   return gulp.src('build/**')
//     .pipe($.prompt.confirm("Make sure everything looks good before you deploy."))
//     .pipe($.rsync({
//       root: 'build',
//       hostname: 'deployer@72.32.134.77',
//       destination: '/home/deployer/sites/foundation-apps/current'
//     }));
// });

// // Deploy to CDN
// gulp.task('deploy:cdn', ['deploy:dist'], () => {
//   return gulp.src('./dist/**/*', {base:'./dist/'})
//     .pipe($.filter(['**/*.css', '**/*.js']))
//     .pipe(addVersions())
//     .pipe($.rsync({
//       hostname: 'deployer@72.32.134.77',
//       destination: '/home/deployer/sites/foundation-apps-cdn/current',
//       relative: false
//     }));
// });

// 10. NOW BRING IT TOGETHER
// - - - - - - - - - - - - - - -

// Build the documentation once
gulp.task('build', function(cb) {
  $.runSequence('clean', ['copy', 'css'], () => {
    cb()
  })
})

// Build the documentation, start a test server, and re-compile when files change
gulp.task('default', ['build', 'server:start'], () => {

  // Watch static files
  gulp.watch(PATHS.html.base, ['copy'])

  // Watch Sass
  gulp.watch(['./docs/assets/scss/**/*', './scss/**/*'], ['css'])
})
