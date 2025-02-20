import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    address: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate User Input
  const validate = () => {
    let newErrors = {};
    if (userData.name.length < 3 || userData.name.length > 30) {
      newErrors.name = "Name must be between 3 and 30 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^\d{10}$/.test(userData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    }
    if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Send OTP Function
  const sendOTP = async () => {
    if (!userData.email) return alert("Please enter your email before sending OTP.");
    try {
      const response = await fetch(`http://localhost:8080/api/otp/send?email=${userData.email}`, { method: "POST" });
      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert("Error sending OTP.");
    }
  };

  // Verify OTP Function
  const verifyOTP = async () => {
    if (!otp) return alert("Please enter the OTP.");
    try {
      const response = await fetch(`http://localhost:8080/api/otp/verify?email=${userData.email}&otp=${otp}`, { method: "POST" });
      if (response.ok) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("OTP verification failed.");
    }
  };

  // Register User Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!otpVerified) return alert("Please verify OTP before registering!");
    try {
      await registerUser(userData);
      document.getElementById("success-message").classList.add("show");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      alert("Registration Failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8ExH1zQPwZ4z3pa4gdCl76l9eJ4T7Ai8iw&s"
          alt="eMart Logo"
          className="register-logo"
        />
        <h2 className="create-account">Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          {errors.email && <p className="error-message">{errors.email}</p>}

          {!otpSent && (
            <button type="button" className="register-btn" onClick={sendOTP}>Send OTP</button>
          )}

          {otpSent && !otpVerified && (
            <>
              <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
              <button type="button" className="register-btn secondary" onClick={verifyOTP}>Verify OTP</button>
            </>
          )}

          {otpVerified && (
            <>
              <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required />
              {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}

              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              {errors.password && <p className="error-message">{errors.password}</p>}

              <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
              <button type="submit" className="register-btn">Register</button>
            </>
          )}
        </form>

        <button type="button" className="register-btn secondary" onClick={() => navigate("/login")}>Login</button>
      </div>

      <div id="success-message" className="success-message">Registration Successful!</div>
    </div>
  );
};

export default Register;
