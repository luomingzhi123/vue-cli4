<template>
  <div v-if="!data.hidden">
    <el-submenu :index="data.path" v-if="isShowSubMenu()">
      <template slot="title">{{ data.meta.title }}</template>
      <MenuSubmenu
        v-for="child in data.children"
        :key="child.path"
        :data="child"
      />
    </el-submenu>
    <template v-else v-for="current in currentRoutes">
      <template v-if="current.children && current.children.length">
        <MenuSubmenu :data="current" :key="current.path" />
      </template>
      <router-link v-else :to="current.path" :key="current.path">
        <el-menu-item :index="current.path">
          {{ current.meta.title }}
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuSubmenu",
  props: {
    data: Object
  },
  data() {
    return {
      currentRoutes: []
    };
  },
  methods: {
    isShowSubMenu() {
      console.log(this.data);
      const data = this.data;
      if (data.children && data.children.length > 0) {
        if (data.meta && data.meta.title) {
          return true;
        } else {
          this.currentRoutes = data.children.filter(child => {
            if (child.hidden) {
              return false;
            }
            if (child.meta && child.meta.title) {
              return true;
            }
          });
          return false;
        }
      } else {
        this.currentRoutes = [data];
        return false;
      }
    }
  }
};
</script>

<style scoped></style>
