let mix = require('laravel-mix');
let config = require('./config.js');

mix.setPublicPath('./');

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/scss/app.scss', 'public/css')
    .browserSync({
        proxy: config.bwsProxy,
        open: true
    });