import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/details/:name",
      name: "Detail",
      component: () => import("@/views/Detail"),
    },
    // UNIDENTIFIED PAGE REQUEST
    {
      path: "*",
      name: "Error404",
      component: () => import("@/views/Error404.vue"),
    },
  ],
});
