import * as userAPI from "@/api/user";
import VueCookies from "vue-cookies";

export default {
  namespaced: true,
  state: {},
  getters: {
    userEmail(state) {
      return state.email;
    },
  },
  mutations: {
    SET_TOKEN_COOKIES(state, cookies) {
      VueCookies.set("access_token", `Bearer ${cookies.accessToken}`, "20m");
      VueCookies.set("refresh_token", `Bearer ${cookies.refreshToken}`, "20d");
    },
  },
  actions: {
    login({ commit }, credentials) {
      userAPI
        .login(credentials)
        .then((response) => {
          console.log(response.data);
          commit("SET_TOKEN_COOKIES", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
