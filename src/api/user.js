import request from "@/utils/request";

export default {
  login: data =>
    request({
      url: "/user/login",
      method: "post",
      data
    }),
  getUserInfo: () =>
    request({
      url: "/user/info",
      method: "get"
    })
};
