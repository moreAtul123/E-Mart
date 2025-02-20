import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const [location, setLocation] = useState({ city: "Unknown", country: "Unknown" });
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then(response => setLocation({ city: response.data.city, country: response.data.country_name }))
      .catch(error => console.error("Location fetch failed:", error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h5>About Us</h5>
          <p><a href="/about">Learn More</a></p>
          <p><FaEnvelope className="icon" /> support@emart.com</p>
          <p><FaPhone className="icon" /> +1 800-123-4567</p>
        </div>

        <div className="footer-section">
          <h5>Address</h5>
          <p><FaMapMarkerAlt className="icon" /> 123 E-Mart Street, USA</p>
          <p>© 2025 Unstoppable GRP3. All rights reserved.</p>
        </div>

        <div className="footer-section">
          <h5>Location & Time</h5>
          <p><FaMapMarkerAlt className="icon" /> {location.city}, {location.country}</p>
          <p><FaClock className="icon" /> {time}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
