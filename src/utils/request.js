import axios from "axios";
import store from "@/store";
import { getToken } from "./auth";
import { Message, MessageBox } from "element-ui";

// 创建axios实例

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //url基础地址，解决不同数据源Url变化的问题
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000
});

// 请求拦截

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  error => {
    // 请求错误预处理
    return Promise.reject(error);
  }
);

// 响应拦截

service.interceptors.response.use(
  response => {
    console.log(response);
    const res = response.data;

    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5000
      });
      // 假设一下三个code分别代表 非法令牌  其他客户端登录 令牌过期
      if (
        res.code === "10008" ||
        res.code === "10012" ||
        res.code === "100014"
      ) {
        // 重新登录
        MessageBox.confirm("登录状态异常，请重新登录", "确认登录信息", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          store.dispatch("/user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.Message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5000
    });
    return Promise.reject(error);
  }
);

export default service;
