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
  {
    path: "/order",
    name: "order",
    meta: { authRequired: true },
    component: () => import("@/views/OrderView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    // access_token이 없는데 refresh_token은 있는 경우 refresh_token을 사용하여 access_token 갱신
    if (
      VueCookies.get("access_token") === null &&
      VueCookies.get("refresh_token") !== null
    ) {
      await userAPI.refreshToken();
    }

    // access_token이 존재하는 경우 진행
    if (VueCookies.get("access_token")) {
      return next();
    }

    // token이 존재하지 않는 경우
    alert("로그이 필요한 서비스입니다");
    return next("/product");
  } else {
    return next();
  }
});

export default router;
