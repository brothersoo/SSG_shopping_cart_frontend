import http from "@/api/http";
import qs from "qs";

export async function addToCart(productId, quantity) {
  return http.post(`/cart_product/${productId}`, {
    quantity,
  });
}

export async function getCartProducts() {
  return http.get("/cart_product", {
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

export async function handleCartProductQuantityExceededStock(type) {
  return http.put("/cart_product/reset_in_stock", { type });
}
