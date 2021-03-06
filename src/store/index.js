import Vue from "vue";
import Vuex from "vuex";
import permission from "./modules/permission";
import user from "./modules/user";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { permission, user },
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    token: state => state.user.token
  }
});

export default store;
