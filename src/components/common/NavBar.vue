<template>
  <div>
    <b-navbar class="h4 py-4" toggleable="lg" variant="light">
      <b-navbar-brand>E-Commerce</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/product">상품</router-link></b-nav-item>
          <b-nav-item>
            <router-link to="/cart">장바구니</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav id="navbar-right" class="ml-auto">
          <drop-down-user-service v-if="accessToken"></drop-down-user-service>
          <b-button v-else variant="warning">
            <router-link to="/login">로그인</router-link>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import DropDownUserService from "@/components/common/DropDownUserService.vue";

const userHelper = createNamespacedHelpers("user");

export default {
  components: {
    DropDownUserService,
  },
  computed: {
    ...userHelper.mapState({
      accessToken: (state) => state.accessToken,
    }),
  },
};
</script>

<style>
#navbar-right {
  padding-right: 20rem;
}
</style>
