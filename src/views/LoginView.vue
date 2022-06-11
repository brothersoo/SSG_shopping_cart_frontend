<template>
  <div>
    <form id="login-form">
      <!-- Email input -->
      <div v-if="loginFailed" id="loginFailMessage">
        아이디와 비밀번호를 확인해주세요
      </div>
      <div class="form-outline mb-4">
        <label class="form-label" for="login-form-email">이메일</label>
        <input
          v-model="email"
          type="email"
          id="login-form-email"
          :class="loginFailed ? 'form-control is-invalid' : 'form-control'"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="login-form-password">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="login-form-password"
          :class="loginFailed ? 'form-control is-invalid' : 'form-control'"
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
      loginFailed: false,
    };
  },
  methods: {
    ...userHelper.mapActions(["login"]),
    async loginButtonClick() {
      let res = await this.login({
        email: this.email,
        password: this.password,
      });
      if (res) {
        this.$router.push("product");
      } else {
        this.loginFailed = true;
      }
    },
  },
};
</script>

<style scoped>
#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
}
#loginFailMessage {
  color: firebrick;
  font-size: 90%;
}
</style>
