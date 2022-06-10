<template>
  <div>
    <b-dropdown
      id="dropdown-form-outer"
      text="로그인"
      ref="dropdown"
      class="m-2"
      variant="warning"
    >
      <b-dropdown-form id="dropdown-form">
        <b-form-group
          label="이메일"
          label-for="dropdown-form-email"
          @submit.stop.prevent
        >
          <b-form-input
            id="dropdown-form-email"
            placeholder="email@example.com"
            v-model="email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="비밀번호" label-for="dropdown-form-password">
          <b-form-input
            id="dropdown-form-password"
            type="password"
            placeholder="Password"
            v-model="password"
          ></b-form-input>
        </b-form-group>

        <!-- <b-form-checkbox class="mb-3">Remember me</b-form-checkbox> -->
        <b-button variant="warning" @click="loginButtonClick">로그인</b-button>
      </b-dropdown-form>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>회원가입</b-dropdown-item-button>
      <b-dropdown-item-button>비밀번호 찾기</b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const userHelper = createNamespacedHelpers("user");

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...userHelper.mapActions(["login"]),
    loginButtonClick() {
      this.login({ email: this.email, password: this.password });
      // Close the menu and (by passing true) return focus to the toggle button
      this.$refs.dropdown.hide(true);
    },
  },
};
</script>

<style scoped>
#dropdown-form {
  width: 400px;
  height: 200px;
}
</style>
