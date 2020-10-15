import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // HOME
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    // LANDING PAGE
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/About"),
    },
    // TEST
    {
      path: "/test",
      name: "Test Page",
      component: () => import("@/views/Test"),
    },
    // UNIDENTIFIED PAGE REQUEST
    {
      path: "*",
      name: "Error404",
      component: () => import("@/views/Error404.vue"),
    },
  ],
});
