import http from "@/api/http";
import qs from "qs";

export async function getProducts(filter) {
  return http.get("/product", {
    params: filter,
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });
}

export async function getPriceRange(condition) {
  return http.get("/product/price_range", {
    params: condition,
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });
}
