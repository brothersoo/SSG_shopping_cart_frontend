<template>
  <div>
    <form id="register-form">
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-email">이메일</label>
        <input
          v-model="email"
          type="email"
          id="register-form-email"
          class="form-control"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-password">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="register-form-password"
          class="form-control"
        />
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col">
          <!-- Simple link -->
          <a href="#!">비밀번호 찾기</a>
        </div>
      </div>

      <!-- Submit button -->
      <button
        type="button"
        class="btn btn-warning btn-block mb-4"
        @click="loginButtonClick"
      >
        로그인
      </button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>아직 회원이 아니신가요? <a href="#!">회원가입</a></p>
      </div>
    </form>
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
      if (this.login({ email: this.email, password: this.password })) {
        this.$router.push("product");
      } else {
        this.$router.push("product");
      }
    },
  },
};
</script>

<style scoped>
#register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
}
</style>
