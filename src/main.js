import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require('./assets/digitalheritage.scss');
require('../node_modules/material-design-icons/iconfont/material-icons.css');
import Artworks from '../public/artworks-guardian.json';

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    artworks: Artworks
  },
  render: h => h(App)
}).$mount("#app");
