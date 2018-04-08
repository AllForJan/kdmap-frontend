window._ = require('lodash');
window.axios = require('axios');
window.Vue = require('vue');
window.config = require('../../../config.js');

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.component('sidebar', require('./components/sidebar.vue'));
Vue.component('results', require('./components/results.vue'));
Vue.component('item', require('./components/item.vue'));
import VModal from 'vue-js-modal';

Vue.use(VModal);

Vue.prototype._ = _;

const app = new Vue({
    el: '#app',

});

window.map = null;

window.initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 48.778, lng: 19.689 },
        mapTypeId: 'hybrid',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
    });
}