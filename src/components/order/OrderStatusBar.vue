<template>
  <h5 id="order-status-bar">
    <div>주문일: {{ order.createdAt | detailedDate }}</div>
    <div>총 주문 금액: {{ totalPrice | moneyFormat }}</div>
    <div>상태: {{ status }}</div>
    <b-button v-if="isRefundable" variant="warning">환불하기</b-button>
  </h5>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      for (let product of this.order.orderProducts) {
        totalPrice += product.price;
      }
      return totalPrice;
    },
    status() {
      if (this.order.status === "CONFIRMED") {
        return "주문 완료";
      } else if (this.order.status === "DELIVERING") {
        return "배송중";
      } else if (this.order.status === "COMPLETED") {
        return "배송 완료";
      } else if (this.order.status === "REFUND_REQUEST") {
        return "환불 요청";
      } else if (this.order.status === "REFUND") {
        return "환불 완료";
      } else {
        return "알수없음";
      }
    },
    isRefundable() {
      return this.order.status === "배송 완료";
    },
  },
  filters: {
    detailedDate(value) {
      let date = value.substring(0, 10).split("-");
      let time = value.substring(11).split(":");
      let meridiem = "오전";
      if (time[0] >= 12) {
        meridiem = "오후";
        time[0] -= 12;
      }
      return `${date[0]}년 ${date[1]}월 ${date[2]}일 ${meridiem} ${time[0]}시 ${time[1]}분`;
    },
    moneyFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    },
  },
};
</script>

<style scoped>
#order-status-bar > div {
  display: inline-block;
  padding-left: 3em;
  padding-right: 3em;
}
#order-status-bar > button {
  margin-left: 5em;
}
</style>
