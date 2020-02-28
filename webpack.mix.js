const mix_ = require('laravel-mix')

var _src = './src/'

mix_.setPublicPath('./dist')
  .js(_src + 'js/frontend.js', 'js/cookie-compliance-for-wordpress.js')
  .js(_src + 'js/ie11CustomProperties.js', 'js/ccfw-ie11CustomProperties.js')
  .sass(_src + 'scss/frontend-styles.scss', 'dist/css/cookie-compliance-for-wordpress.css')
