import { useState, useContext } from "react";
import { loginUser } from "../api";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await loginUser(email, password);
      const { userId, name, token } = response.data;

      // Store user details in localStorage
      const userData = { userId, name, email };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userId); // Store user ID separately

      // Log in user in context
      login(userData, token);

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after success message
    } catch (error) {
      console.error("Login Error:", error);
      setError("Incorrect email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8ExH1zQPwZ4z3pa4gdCl76l9eJ4T7Ai8iw&s"
          alt="eMart Logo"
          className="register-logo"
        />
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login successful! Redirecting...</p>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
