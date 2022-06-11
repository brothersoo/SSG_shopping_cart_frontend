<template>
  <div>
    <b-dropdown
      id="user-service-dropdown"
      text="사용자 기능"
      class="m-md-2"
      variant="warning"
    >
      <b-dropdown-item>사용자 정보</b-dropdown-item>
      <b-dropdown-item
        ><router-link to="/order">주문 내역</router-link></b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {};
</script>
