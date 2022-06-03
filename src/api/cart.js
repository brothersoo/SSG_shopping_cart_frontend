import http from "@/api/http";

export async function addToCart(productId, userEmail, quantity) {
  return http.post(`/cart_product/${productId}`, {
    userEmail,
    quantity,
  });
}

export async function getCartProducts(userEmail) {
  return http.get("/cart_product", { params: { userEmail } });
}
