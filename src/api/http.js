import axios from "axios";
import VueCookies from "vue-cookies";
import * as userAPI from "@/api/user";

const instance = axios.create({
  baseURL: "http://localhost:9999",
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.headers.Authorization = VueCookies.get("access_token");
    config.headers.refresh_token = VueCookies.get("refresh_token");

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorAPI = error.config;
    if (
      error.response.status === 401 &&
      errorAPI.retry === undefined &&
      VueCookies.get("refresh_token")
    ) {
      errorAPI.retry = true;
      console.log("토큰 에러");
      await userAPI.refreshToken();
      return await axios(errorAPI);
    }

    if (error.response.status === 403) {
      alert("로그인이 필요한 서비스입니다");
    }
    return Promise.reject(error);
  }
);

export default instance;
