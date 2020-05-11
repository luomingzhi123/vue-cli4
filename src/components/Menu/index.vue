<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <MenuSubmenu
      v-for="route in routerList"
      :key="route.path"
      :data="route"
    ></MenuSubmenu>
  </el-menu>
</template>

<script>
import MenuSubmenu from "./MenuSubmenu";

export default {
  name: "index",
  components: {
    MenuSubmenu
  },
  computed: {
    routerList() {
      return this.$store.getters.permission_routes;
    }
  }
};
</script>

<style scoped></style>
