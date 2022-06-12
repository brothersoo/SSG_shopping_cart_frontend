import http from "@/api/http";

import qs from "qs";

export async function login(credentials) {
  return http.post("/auth/login", qs.stringify(credentials));
}

export async function refreshToken() {
  return http.post("/token/refresh");
}
