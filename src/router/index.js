import Vue from "vue";
import VueRouter from "vue-router";
import Book from "../views/Book";
import Collections from "../views/Collections";
import Collection from "../views/Collection";
import Detail from "../views/Detail";
import Connexion from "../views/Connexion";
import RemoteProfile from "../views/RemoteProfile";
import Inscription from "../views/Inscription";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Collections",
    component: Collections
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
    path: "/book",
    name: "Book",
    component: Book
  },
  {
    path: "/collection",
    name: "Collection",
    component: Collection
  },
  {
    path: "/collection/:id",
    name: "CollectionId",
    component: Collection
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail
  },
  {
    path: "/detail/:id",
    name: "DetailId",
    component: Detail,
    props: true
  },
  {
    path: "/detail/:coll/:id",
    name: "DetailCollId",
    component: Detail,
    props: true
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription
  },
  {
    path: "/remote-profile",
    name: "RemoteProfile",
    component: RemoteProfile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
