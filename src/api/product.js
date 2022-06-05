import http from "@/api/http";

export async function getProducts(filter) {
  return http.get("/product", { params: filter });
}
