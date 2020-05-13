import { getToken, setToken, removeToken } from "@/utils/auth";
import user from "@/api/user";

const { login, getUserInfo } = user;
// 存储用户令牌和角色信息
const state = {
  token: getToken(),
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username } = userInfo;
    return login({ username }).then(res => {
      commit("SET_TOKEN", res.data);
      setToken(username);
    });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === "admin" || username === "jerry") {
    //       commit("SET_TOKEN", username);
    //       setToken(username);
    //       resolve();
    //     } else {
    //       reject("用户名密码错误");
    //     }
    //   }, 1000);
    // });
  },
  getInfo({ commit, state }) {
    return getUserInfo().then(res => {
      console.log(state);
      commit("SET_ROLES", res.data);
      return { roles: res.data };
    });
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const roles = state.token === "admin" ? ["admin"] : ["editor"];
    //     commit("SET_ROLES", roles);
    //     resolve({ roles });
    //   }, 1000);
    // });
  },
  removeToken({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit("SET_ROLES", []);
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      }, 1000);
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
