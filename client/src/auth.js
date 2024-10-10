import Cookies from "js-cookie";

export const storeToken = (token) => {
    Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
};

export const getToken = () => {
    return Cookies.get("token");
};

export const removeToken = () => {
    Cookies.remove("token");
};
