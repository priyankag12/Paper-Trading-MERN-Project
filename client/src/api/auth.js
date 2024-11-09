import apiClient from "../services/apiClient";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    const { token, user } = response.data;
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data);
    const { token, user } = response.data;
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const getProfile = async () => {
  try {
    return await apiClient.get("/auth/profile");
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Profile retrieval failed"
    );
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await apiClient.put("/auth/profile", userData);
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Profile update failed");
  }
};

export const deleteProfile = async () => {
  try {
    const response = await apiClient.delete("/auth/profile");
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Profile deletion failed");
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await apiClient.post("/auth/forgotpassword", data);
    console.log(response);
    return response.data; // Return the data part of the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Password could not be changed."
    );
  }
};
