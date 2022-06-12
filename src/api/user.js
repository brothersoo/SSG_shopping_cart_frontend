import http from "@/api/http";

import qs from "qs";

export async function login(credentials) {
  return http.post("/auth/login", qs.stringify(credentials));
}

export async function refreshToken() {
  return http.post("/token/refresh");
}

export async function register(data) {
  return http.post("auth/register", data);
}
