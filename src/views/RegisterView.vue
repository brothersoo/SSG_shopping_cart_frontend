<template>
  <div>
    <form id="register-form">
      <div v-if="registerFailed" id="registerFailMessage">
        아이디와 비밀번호를 확인해주세요
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-email">이메일</label>
        <input
          v-model="email"
          type="email"
          id="register-form-email"
          :class="registerFailed ? 'form-control is-invalid' : 'form-control'"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-password">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="register-form-password"
          :class="
            passwordConfirmed ? 'form-control' : 'form-control is-invalid'
          "
        />
      </div>

      <!-- Password confirm input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-password-confirm">
          비밀번호 확인
        </label>
        <input
          v-model="passwordConfirm"
          type="password"
          id="register-form-password-confirm"
          :class="
            passwordConfirmed ? 'form-control' : 'form-control is-invalid'
          "
        />
      </div>

      <!-- Username input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="register-form-username">유저명</label>
        <input
          v-model="username"
          type="email"
          id="register-form-username"
          :class="registerFailed ? 'form-control is-invalid' : 'form-control'"
        />
      </div>

      <!-- Submit button -->
      <b-button
        variant="warning"
        v-if="registerAvailable"
        @click="registerButtonClick"
      >
        회원가입
      </b-button>
      <b-button variant="warning" v-else disabled> 회원가입 </b-button>
    </form>
  </div>
</template>

<script>
import * as userAPI from "@/api/user";
import { createNamespacedHelpers } from "vuex";

const userHelper = createNamespacedHelpers("user");

export default {
  data() {
    return {
      email: null,
      password: null,
      passwordConfirm: null,
      username: null,
      registerFailed: false,
    };
  },
  computed: {
    registerData() {
      return {
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        username: this.username,
      };
    },
    allFieldFilled() {
      return (
        this.isFilled(this.email) &&
        this.isFilled(this.password) &&
        this.isFilled(this.passwordConfirm) &&
        this.isFilled(this.username)
      );
    },
    passwordConfirmed() {
      return (
        this.isFilled(this.password) && this.password === this.passwordConfirm
      );
    },
    registerAvailable() {
      return this.allFieldFilled && this.passwordConfirmed;
    },
  },
  methods: {
    ...userHelper.mapActions(["register"]),
    registerButtonClick() {
      userAPI
        .register(this.registerData)
        .then((response) => {
          console.log(response);
          this.$router.push("login");
        })
        .catch((err) => {
          console.error(err);
          this.registerFailed = true;
        });
    },
    isFilled(value) {
      if (value !== null && value !== undefined) {
        return true;
      } else {
        return false;
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
#registerFailMessage {
  color: firebrick;
  font-size: 90%;
}
</style>
