import http from "@/api/http";
import qs from "qs";

export async function addToCart(productId, userEmail, quantity) {
  return http.post(`/cart_product/${productId}`, {
    userEmail,
    quantity,
  });
}

export async function getCartProducts(userEmail) {
  return http.get("/cart_product", {
    params: { userEmail },
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });
}

export async function updateCartProduct(cartProductId, quantity) {
  return http.put(`/cart_product/${cartProductId}`, { quantity });
}

export async function deleteCartProduct(cartProductId) {
  return http.delete(`/cart_product/${cartProductId}`);
}
