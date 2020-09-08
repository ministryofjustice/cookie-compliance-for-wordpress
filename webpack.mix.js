const mix_ = require('laravel-mix')

var _src = './src/'

mix_.setPublicPath('./dist')
   // .react() installs babel for JavaScript ES6 Modules
  .react(_src + 'js/ccfw_frontend.js', 'js/ccfw_frontend.js')
  .js(_src + 'js/ccfw_admin_main.js', 'js/ccfw_admin_main.js')
  .js(_src + 'js/ie11CustomProperties.js', 'js/ccfw-ie11CustomProperties.js')
  .sass(_src + 'scss/ccfw_frontend.scss', 'dist/css/ccfw_frontend.css')
  .sass(_src + 'scss/ccfw_admin_main.scss', 'dist/css/ccfw_admin_main.css')
