<template>
  <div>
    <b-navbar class="h4 py-4" toggleable="lg" variant="light">
      <b-navbar-brand>E-Commerce</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/product">상품</router-link></b-nav-item>
          <b-nav-item
            ><router-link to="/cart">장바구니</router-link></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav id="navbar-right" class="ml-auto">
          <drop-down-sign-in></drop-down-sign-in>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import DropDownSignIn from "@/components/common/DropDownSignIn.vue";

export default {
  components: {
    DropDownSignIn,
  },
};
</script>

<style>
#navbar-right {
  padding-right: 20rem;
}
</style>
