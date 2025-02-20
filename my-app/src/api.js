import axios from "axios";

const API_BASE_URL = "http://localhost:8080/users"; // Adjust if needed

// Register User
export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register`, userData);
};

// Login User
export const loginUser = async (email, password) => {
  return await axios.post(`${API_BASE_URL}/login`, null, {
    params: { email, password },
  });
};

// Get User Details
export const getUserDetails = async (userId, token) => {
  return await axios.get(`${API_BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update User
export const updateUser = async (userId, userData, token) => {
  return await axios.put(`${API_BASE_URL}/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete User
export const deleteUser = async (userId, token) => {
  return await axios.delete(`${API_BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
