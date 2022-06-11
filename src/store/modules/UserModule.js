import * as userAPI from "@/api/user";
import VueCookies from "vue-cookies";

export default {
  namespaced: true,
  state: {
    accessToken: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== null && state.accessToken !== undefined;
    },
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {
    login({ commit }, credentials) {
      userAPI
        .login(credentials)
        .then((response) => {
          console.log(response.data);
          let tokens = response.data;
          VueCookies.set("access_token", `Bearer ${tokens.accessToken}`, "20m");
          VueCookies.set(
            "refresh_token",
            `Bearer ${tokens.refreshToken}`,
            "20d"
          );
          commit("SET_ACCESS_TOKEN", tokens.accessToken);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
