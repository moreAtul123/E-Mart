import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Add userId state

  // Load user data and userId from localStorage on initial render
  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedUserId = localStorage.getItem("userId");
      if (storedUser && storedUserId) {
        setUser(storedUser);
        setUserId(storedUserId);
      }
    }
  }, [token]);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data
    localStorage.setItem("userId", userData.userId); // Store userId separately
    setUser(userData);
    setToken(token);
    setUserId(userData.userId); // Set userId in the state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId"); // Remove userId from localStorage
    setUser(null);
    setToken(null);
    setUserId(null); // Clear userId from the state
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };