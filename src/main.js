import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import axiosApi from "axios";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

const axios = axiosApi.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
});

//axios available globally.
window.axios = axios;

// create event bus
export const EventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
