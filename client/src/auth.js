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
  Cookies.set("userInfo", JSON.stringify(userInfo), { expires: 1 }); // Expires in 7 days
};

export const getUserInfo = () => {
  const userInfo = Cookies.get("userInfo");
  console.log( JSON.parse(userInfo)
  );
  return userInfo ? JSON.parse(userInfo) : null; // Return parsed object or null if not found
};

export const removeUserInfo = () => {
  Cookies.remove("userInfo");
};
