<template>
  <div>
    <b-dropdown
      id="user-service-dropdown"
      text="사용자 기능"
      class="m-md-2"
      variant="warning"
    >
      <b-dropdown-item>사용자 정보</b-dropdown-item>
      <b-dropdown-item
        ><router-link to="/order">주문 내역</router-link></b-dropdown-item
      >
      <b-dropdown-item @click="logoutProcess">로그아웃</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const userHelper = createNamespacedHelpers("user");

export default {
  methods: {
    ...userHelper.mapActions(["logout"]),
    logoutProcess() {
      this.logout();
      if (this.$route.path !== "/product") {
        this.$router.push("product");
      } else {
        this.$router.go();
      }
    },
  },
};
</script>
