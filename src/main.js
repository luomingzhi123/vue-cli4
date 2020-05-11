import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import permission from "./directive/permission";
import ElementUI from "element-ui";
import "./icons";
import "./permission";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.directive("permission", permission);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
