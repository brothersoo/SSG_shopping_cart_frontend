<template>
  <div id="app">
    <nav-bar></nav-bar>
    <alert-space></alert-space>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import AlertSpace from "./components/product/AlertSpace.vue";

export default {
  components: {
    NavBar,
    AlertSpace,
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
