import React from "react";
import "../styles/AboutUs.css";
// import teamGif from "../assets/teamwork.gif"; // Add a nice teamwork GIF in the assets folder
// import shoppingGif from "../assets/shopping.gif"; // Add an e-commerce related GIF

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Welcome to <span className="highlight">eMart</span> 🛍️</h1>
        {/* <img src={shoppingGif} alt="Shopping GIF" className="header-gif" /> */}
      </div>

      <div className="about-content">
        <p className="intro-text">
          eMart is an innovative e-commerce platform designed to provide a seamless and efficient shopping experience. 
          Our journey in developing this project has been an incredible learning experience, filled with teamwork, dedication, and knowledge-sharing. 💡🚀
        </p>

        <div className="why-section">
          <h2>Why We Created eMart? 🤔</h2>
          <p>
            We built eMart to understand real-world e-commerce applications, enhance our technical skills, and create a user-friendly online shopping platform. 
            This project allowed us to implement various technologies while solving real-time challenges in web development. 🏗️💻
          </p>
        </div>

        <div className="team-section">
          <h2>Meet Our Team 👨‍💻👩‍💻</h2>
          {/* <img src={teamGif} alt="Teamwork GIF" className="team-gif" /> */}
          <p className="team-leader"><strong>Team Leader:</strong> Prajakta Adsure 🌟</p>
          <p><strong>Team Members:</strong></p>
          <ul className="team-list">
            <li>Rahul Mhatre</li>
            <li>Ram Agarwal</li>
            <li>Shantanu Jibkathe</li>
            <li>Atul More</li>
            <li>Ashish Wadhai</li>
            <li>Adarsh Gupta</li>
            <li>Sejal Lokhande</li>
          </ul>
        </div>

        <div className="thank-you-section">
          <h2>Special Thanks 🙏</h2>
          <p>A heartfelt thank you to our teachers for their guidance and support throughout this journey. 💖</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
