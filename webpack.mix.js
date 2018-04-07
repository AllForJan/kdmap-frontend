let mix = require('laravel-mix');

mix.setPublicPath('./');

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/scss/app.scss', 'public/css')
    .browserSync({
        proxy: 'kdmap.test',
        open: true
    });