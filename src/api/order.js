import http from "@/api/http";

export async function order(cartProductIds) {
  console.log(cartProductIds);
  return http.post("/order", { cartProductIds });
}
