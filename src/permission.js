import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

const whiteList = ["/login"]; // 白名单

router.beforeEach(async (to, form, next) => {
  // 判断当前用户是否登录
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已经登陆，则定向至首页
      next("/");
    } else {
      // 如果当前用户已附加则说明动态路由已添加
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch("user/getInfo");
          // 根据当前用户角色动态生成路由
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // 添加这些路由至路由器
          router.addRoutes(accessRoutes);
          // 继续路由切换，确保addRoutes完成
          next({ ...to, replace: true });
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
