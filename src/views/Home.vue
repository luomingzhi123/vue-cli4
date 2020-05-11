<template>
  <div>
    这是HOME
    <button v-permission="['admin']">Admin</button>
    <button v-permission="['admin', 'editor']">Editor And Admin</button>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped></style>
