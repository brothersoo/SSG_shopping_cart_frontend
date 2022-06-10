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
    console.log("에러일 경우", error.config);
    const errorAPI = error.config;
    if (error.response.data.status === 401 && errorAPI.retry === undefined) {
      errorAPI.retry = true;
      console.log("토큰이 이상한 오류일 경우");
      await userAPI.refreshToken();
      return await axios(errorAPI);
    }
    return Promise.reject(error);
  }
);

export default instance;
