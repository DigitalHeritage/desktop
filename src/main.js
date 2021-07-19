import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require("./assets/digitalheritage.scss");
require("../node_modules/material-design-icons/iconfont/material-icons.css");
import Collections from "../public/collections.json";
import { Icon } from "leaflet";
import i18n from "./i18n";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;
Vue.prototype.$Collections = Collections;

new Vue({
  router,

  data: {
    artworks: Collections
  },

  i18n,
  render: h => h(App)
}).$mount("#app");
