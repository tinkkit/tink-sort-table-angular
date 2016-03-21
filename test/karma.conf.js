// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-12-01 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/tink-helper-safe-apply-angular/dist/tink-helper-safe-apply-angular.js',
      'bower_components/ng-lodash/build/ng-lodash.js',
      'src/scripts/{,*/}*.js',
      'src/{,*/}',
      'test/mock/{,*/}*.js',
      'test/spec/{,*/}*.js',
      'src/templates/{,*/}*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS2
    // - IE (only Windows)
    browsers: [
      'PhantomJS2'
    ],
    preprocessors:{
      'src/templates/{,*/}*.html': 'html2js'
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: '../templates/',  // <-- change as needed for the project
      // include beforeEach(module('templates')) in unit tests
      moduleName: 'templates'
    },

    // Which plugins to enable
    plugins: [
      'karma-jasmine',
      'karma-phantomjs2-launcher',
      'karma-chrome-launcher',
      'karma-sauce-launcher',
      'karma-coverage',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
