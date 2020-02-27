const mix_ = require('laravel-mix')

var _src = './src/'

mix_.setPublicPath('./dist')
  .js(_src + 'js/frontend.js', 'js/cookie-compliance-for-wordpress.js')
  .sass(_src + 'scss/backend-styles.scss', 'dist/css/admin-cookie-compliance-for-wordpress.css')
  .sass(_src + 'scss/frontend-styles.scss', 'dist/css/cookie-compliance-for-wordpress.css')
