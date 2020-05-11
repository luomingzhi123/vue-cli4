<template>
  <div id="app">
    <div id="nav">
      <svg-icon icon-class="gender"></svg-icon>
    </div>
    <div>
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
      <router-link to="/about/editor">editor</router-link>
    </div>
    <router-view />
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: {
    Menu
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
