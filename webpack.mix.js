const mix_ = require('laravel-mix')

var _src = './src/'

mix_.setPublicPath('./dist')
   // .react() installs babel for JavaScript ES6 Modules
  .react(_src + 'js/cookie-compliance-for-wordpress.js', 'js/cookie-compliance-for-wordpress.js')
  .js(_src + 'js/ie11CustomProperties.js', 'js/ccfw-ie11CustomProperties.js')
  .sass(_src + 'scss/cookie-compliance-for-wordpress.scss', 'dist/css/cookie-compliance-for-wordpress.css')
