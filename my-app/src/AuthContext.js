
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Added userId state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    if (token && storedUser && storedUserId) {
      setUser(JSON.parse(storedUser));
      setUserId(storedUserId); // Set userId from localStorage
    }
  }, [token]);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user details
    localStorage.setItem("userId", userData.userId); // Store userId separately
    setUser(userData);
    setToken(token);
    setUserId(userData.userId); // Store userId in state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
    setUserId(null); // Clear userId from state
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;