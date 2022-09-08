// /src/main.js
import "./jquery";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

require("./assets/digitalheritage.scss");
require("../node_modules/material-design-icons/iconfont/material-icons.css");
import Collections from "../public/collections_vide.json";
import Sets from "../public/sets_vide.json";
var CatalogueSections = [];

import { Icon } from "leaflet";
import i18n from "./i18n";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

let url_collection =
  "https://floutier.lescollections.fr/gestion/dh_service.php?" + Date.now();
axios
  .get(url_collection)
  .then(response => {
    // JSON responses are automatically parsed.
    let new_collection = response.data;
    Collections.push(new_collection);
  })
  .catch(e => {
    this.errors.push(e);
  });

let url_sets =
  "https://floutier.lescollections.fr/gestion/dh_service_sets.php?" +
  Date.now();
axios
  .get(url_sets)
  .then(response => {
    // JSON responses are automatically parsed.

    Object.keys(response.data).forEach(key => {
      Sets.push(response.data[key]);
    });
  })
  .catch(e => {
    this.errors.push(e);
  });

let url_cataloguesections =
  "https://floutier.lescollections.fr/gestion/dh_service_catalogueraisonne.php?" +
  Date.now();
axios
  .get(url_cataloguesections)
  .then(response => {
    // JSON responses are automatically parsed.

    Object.keys(response.data).forEach(key => {
      CatalogueSections.push(response.data[key]);
    });
  })
  .catch(e => {
    this.errors.push(e);
  });
console.log("collections", Collections);
console.log("sets", Sets);
Vue.config.productionTip = false;
Vue.prototype.$Collections = Collections;
Vue.prototype.$Sets = Sets;
Vue.prototype.$CatalogueSections = CatalogueSections;
Vue.prototype.$PremiereOuverture = true;
Vue.prototype.$API_db_is_logged_in = false;
Vue.prototype.$API_db_name = "";

new Vue({
  router,

  data: {
    artworks: Vue.prototype.$Collections,
    sets: Vue.prototype.$Sets,
    PremiereOuverture: Vue.prototype.$PremiereOuverture,
    API_db_is_logged_in: Vue.prototype.$API_db_is_logged_in,
    API_db_name: Vue.prototype.$API_db_name
  },
  methods: {
    saveLocal() {
      //delete the localStorage first to prevent deleted collections to be loaded after
      for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index).startsWith("digitalheritage-collection")) {
          localStorage.removeItem(localStorage.key(index));
        }
      }
      for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index).startsWith("digitalheritage-sets")) {
          localStorage.removeItem(localStorage.key(index));
        }
      }
      let iterator = 0;
      this.$Collections.forEach(collection => {
        //console.log(collection);
        localStorage.setItem(
          "digitalheritage-collection-" + iterator,
          JSON.stringify(collection)
        );
        iterator++;
      });
      this.$Sets.forEach(set => {
        //console.log(collection);
        localStorage.setItem(
          "digitalheritage-sets-" + iterator,
          JSON.stringify(set)
        );
        iterator++;
      });
	  this.$CatalogueSections.forEach(cataloguesection => {
        //console.log(collection);
        localStorage.setItem(
          "digitalheritage-cataloguesections-" + iterator,
          JSON.stringify(cataloguesection)
        );
        iterator++;
      });
    }
  },
  i18n,
  render: h => h(App)
}).$mount("#app");
