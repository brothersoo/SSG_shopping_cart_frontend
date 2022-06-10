import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import * as userAPI from "@/api/user";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "product",
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: { authRequired: true },
    component: () => import("@/views/CartView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (
      VueCookies.get("access_token") === null &&
      VueCookies.get("refresh_token") !== null
    ) {
      await userAPI.refreshToken();
    }

    if (
      to.matched.some((record) => record.meta.authRequired) ||
      VueCookies.get("token")
    ) {
      return next();
    }

    alert("로그이 필요한 서비스입니다");
    return next("/product");
  } else {
    return next();
  }
});

export default router;
