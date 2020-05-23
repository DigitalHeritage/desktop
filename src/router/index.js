import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Collections from "../views/Collections";
import Collection from "../views/Collection";
import Detail from "../views/Detail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/collections",
    name: "Collections",
    component: Collections
  },
  {
    path: "/collection",
    name: "Collection",
    component: Collection
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
