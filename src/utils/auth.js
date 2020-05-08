import Cookies from "js-cookie";

const Token = "token";

export const getToken = function() {
  return Cookies.get(Token);
};

export const setToken = function(token) {
  return Cookies.set(Token, token);
};

export const removeToken = function() {
  return Cookies.remove(Token);
};
