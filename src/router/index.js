import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);
// 通用页面  无需权限
export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home.vue"),
        name: "home",
        meta: {
          title: "Home", // 导航菜单项标题
          icon: "gender" //导航菜单项图标
        }
      }
    ]
  }
];

// 权限页面
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "/about/index",
        component: () => import("@/views/About.vue"),
        name: "about",
        meta: {
          title: "about1",
          icon: "gender",
          roles: ["admin"]
        }
      },
      {
        path: "editor",
        component: () => import("@/views/Editor.vue"),
        name: "editor",
        meta: {
          title: "about2",
          icon: "gender",
          roles: ["editor"]
        },
        children: [
          {
            path: "/editor/editor2",
            component: () => import("@/views/Editor.vue"),
            name: "editor2",
            meta: {
              title: "about2-1",
              icon: "gender",
              roles: ["editor"]
            },
            children: [
              {
                path: "/editor/editor2/index",
                component: () => import("@/views/About.vue"),
                name: "about5",
                meta: {
                  title: "editor 2-1-1",
                  icon: "gender",
                  roles: ["admin"]
                }
              },
              {
                path: "/editor/editor2/index2",
                component: () => import("@/views/About.vue"),
                name: "about6",
                meta: {
                  title: "editor 2-1-2",
                  icon: "gender",
                  roles: ["admin"]
                }
              },
            ]
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});

export default router;
