const mix_ = require('laravel-mix');
const src = 'src/';

mix_.setPublicPath('./assets');
mix_
    // Mix .js() is configured to use babel-preset-env with polyfills. See .babelrc
    .js(src + 'js/ccfw-frontend.js', 'js/')
    .js(src + 'js/ccfw-cookie-manage.js', 'js/')
    // admin scripts
    .js([
        src + 'js/ccfw-admin-main.js',
        'components/CookieManagement/' + src + 'js/ccfw-admin-cookie-management.js',
        'components/CookieManagement/' + src + 'js/polyfill.js',
        './node_modules/tippy.js/dist/tippy.esm.js',
    ], 'js/ccfw-admin-app.js')
    .js(src + 'js/ie11CustomProperties.js', 'js/ccfw-ie11CustomProperties.js')
    .sass(src + 'scss/ccfw-frontend.scss', 'css/ccfw-frontend.css')
    .sass(src + 'scss/ccfw-admin-main.scss', 'css/ccfw-admin-main.css')
    .copy(src + 'image/*', 'assets/image/');

// legacy scripts
mix_.js(src + 'js/ccfw-frontend-legacy.js', 'js/')
    .sass(src + 'scss/ccfw-frontend-legacy.scss', 'css/ccfw-frontend-legacy.css');

if (mix_.inProduction()) {
    mix_.version();
} else {
    mix_.sourceMaps();
}
