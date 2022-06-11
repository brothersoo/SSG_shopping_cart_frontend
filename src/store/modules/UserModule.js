import * as userAPI from "@/api/user";
import VueCookies from "vue-cookies";

export default {
  namespaced: true,
  state: {
    accessToken: null,
  },
  getters: {
    userEmail(state) {
      return state.email;
    },
  },
  mutations: {
    SET_TOKEN_COOKIES(state, tokens) {
      VueCookies.set("access_token", `Bearer ${tokens.accessToken}`, "20m");
      VueCookies.set("refresh_token", `Bearer ${tokens.refreshToken}`, "20d");
      state.accessToken = tokens.accessToken;
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
