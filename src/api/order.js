import http from "@/api/http";

export async function order(cartProductIds) {
  return http.post("/order", { cartProductIds });
}

export async function orderList() {
  return http.get("/order");
}

export async function refund(orderId) {
  return http.put(`order/refund/${orderId}`);
}
