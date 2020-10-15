import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// create event bus
export const EventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
