import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle, Cart3, List } from "react-bootstrap-icons";
import "../styles/Header.css";
import AuthContext from "../AuthContext";
import LanguageContext from "../Context/LanguageContext";
import axios from "axios";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const userId = user?.userId;

  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [translations, setTranslations] = useState({
    home: "Home",
    products: "Products",
    categories: "Categories",
    orders: "Orders",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    supercoins: "SuperCoins",
  });

  useEffect(() => {
    if (!userId) return;
    fetchCartCount();
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    fetchTranslations(language);
  }, [language]);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTranslations = async (lang) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/translations?lang=${lang}`);
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Marquee Announcement */}
      <marquee className="announcement-bar" behavior="scroll" direction="left">
        Welcome to eMart! Enjoy amazing deals and discounts on your favorite products.
      </marquee>
      
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8ExH1zQPwZ4z3pa4gdCl76l9eJ4T7Ai8iw&s"
              alt="E-Mart Logo"
              className="logo-img"
            />
          </Link>

          <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <List size={25} />
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">{translations.home}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/productlist">{translations.products}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/categorylist">{translations.categories}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">{translations.orders}</Link></li>
            </ul>

            <div className="auth-section d-flex align-items-center">
              <select
                className="form-select w-auto me-3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>

              <Link to="/cart" className="cart-icon">
                <Cart3 size={22} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              {user ? (
                <div className="d-flex align-items-center">
                  <span className="user-info d-none d-lg-block">
                    {userData?.name} | <span className="supercoins">{userData?.supercoins} 🪙</span>
                  </span>
                  <Link to="/profile" className="profile-icon">
                    <PersonCircle size={20} />
                  </Link>
                  <button className="btn btn-danger fw-bold ms-2" onClick={handleLogout}>{translations.logout}</button>
                </div>
              ) : (
                <button className="btn btn-danger btn-sm w-100 mt-2" onClick={() => navigate("/login")}>{translations.login || "Login"}</button>
              )}
            </div>

            {user && (
              <div className="mobile-user-info d-lg-none">
                <Link to="/profile" className="btn btn-light btn-sm w-100">{translations.profile}</Link>
                <button className="btn btn-danger btn-sm w-100 mt-2" onClick={handleLogout}>{translations.logout}</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;