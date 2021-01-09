import Vue from 'vue';
import App from './App.vue';
import './assets/styles/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.use(VueSimpleAlert);
