import axios from "axios";

// Base API URL
const apiUrl = "http://localhost:3000/api";

// 1. Create a new user (Sign Up)
export const createUser = async (
  username: string,
  email: string,
  password: string,
  plan: "Standard" | "Gold" | "Platinum",
  image: string
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/signup`,
      {
        username,
        email,
        password,
        plan,
        image,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// 2. User login (Sign In)
export const signInUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// 3. User logout (Logout)
export const logOutUser = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// 4. Token validation (Token Validation)
export const validateToken = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/validate`, {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error validating token:", error);
    throw error;
  }
};

// 5. Get user details by username
export const getUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${username}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user by username:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`, { withCredentials: true });
    return response.data.data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const updateUser = async (userData: { username?: string; email?: string; image?: string }) => {
  try {
    const response = await axios.patch(`${apiUrl}/users/update`, userData, { withCredentials: true });
    return response.data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const changePlan = async (newPlan: "Standard" | "Gold" | "Platinum") => {
  try {
    const response = await axios.patch(`${apiUrl}/users/plan`, { newPlan }, { withCredentials: true });
    return response.data.data;
  } catch (error) {
    console.error("Error changing plan:", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${apiUrl}/users/delete`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};