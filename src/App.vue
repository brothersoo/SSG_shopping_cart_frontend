<template>
  <div id="app">
    <nav-bar></nav-bar>
    <alert-space></alert-space>
    <router-view />

    <b-modal id="login-require-modal" ok-only>
      로그인이 필요한 기능입니다.
    </b-modal>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import { createNamespacedHelpers } from "vuex";
import NavBar from "@/components/common/NavBar.vue";
import AlertSpace from "./components/common/AlertSpace.vue";

const userHelper = createNamespacedHelpers("user");

export default {
  components: {
    NavBar,
    AlertSpace,
  },
  methods: {
    ...userHelper.mapMutations(["SET_ACCESS_TOKEN"]),
  },
  created() {
    const accessToken = VueCookies.get("access_token");
    if (accessToken) {
      this.SET_ACCESS_TOKEN(accessToken);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #d3b330;
}
</style>
