const mix_ = require('laravel-mix');
const src = './src/';

mix_.setPublicPath('./assets')
    // Mix .js() is configured to use babel-preset-env with polyfills. See .babelrc
    .js(src + 'js/ccfw-frontend.js', 'js/ccfw-frontend.js')
    .js(src + 'js/ccfw-admin-main.js', 'js/ccfw-admin-main.js')
    .js(src + 'js/ie11CustomProperties.js', 'js/ccfw-ie11CustomProperties.js')
    .sass(src + 'scss/ccfw-frontend.scss', 'css/ccfw-frontend.css')
    .sass(src + 'scss/ccfw-admin-main.scss', 'css/ccfw-admin-main.css');
