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
    console.log(token);
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

//Update suer using .put("/profile")
export const updateProfile = async (userData) => {
  try {
    // Send a PUT request to update the profile on the server
    const response = await apiClient.put("/auth/profile", userData);
    return response.data.user; // Return the updated user data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Profile update failed");
  }
};

// Get user profile (protected route)
export const getProfile = async () => {
  return await apiClient.get("api/auth/profile");
};
