import Cookies from "js-cookie";

export const storeToken = (token) => {
  Cookies.set("token", token, { expires: 1 });
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const storeUserInfo = (userInfo) => {
  Cookies.set("userInfo", JSON.stringify(userInfo), { expires: 1 }); 
};

export const getUserInfo = () => {
  const userInfo = Cookies.get("userInfo");
  return userInfo ? JSON.parse(userInfo) : null; 
};

export const removeUserInfo = () => {
  Cookies.remove("userInfo");
};
