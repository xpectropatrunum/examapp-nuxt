import Vue from "vue";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";
const options = {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    rtl: true
};


import VueMeta from 'vue-meta'
Vue.use(VueMeta)
Vue.use(Toast, options);