import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Chatbot from "./Chatbot";
import AuthContext from "../AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?.userId;
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [superCoins, setSuperCoins] = useState(0);
  const [useSuperCoins, setUseSuperCoins] = useState({});

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    fetchProducts();
    if (userId) {
      checkMembershipStatus();
      fetchSuperCoins();
    }
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const checkMembershipStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setIsMember(response.data?.member || false);
    } catch (error) {
      console.error("Error checking membership status:", error);
    }
  };

  const fetchSuperCoins = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/supercoins/${userId}`);
      setSuperCoins(response.data?.balance || 0);
    } catch (error) {
      console.error("Error fetching SuperCoins:", error);
      setSuperCoins(50);
    }
  };

  const toggleSuperCoins = (productId) => {
    setUseSuperCoins((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      setMessage("⚠ Please login to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/cart/add", null, {
        params: { userId, productId, quantity }
      });

      if (response.status === 200) {
        setMessage("✅ Product added to cart successfully!");
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        storedCart.push({ productId, quantity });
        localStorage.setItem("cart", JSON.stringify(storedCart));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("❌ Failed to add product to cart.");
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      )}
      <Header />
      <marquee className="marquee">🔥 Limited Time Offers! Get the Best Deals on Electronics, Fashion, and More! 🛍</marquee>
      <div className="hero-section">
        <Carousel controls indicators interval={2000} pause={false} fade>
          {[ "Electronic1.jpg","fashion.jpg","Clothes1.jpg", "grocery2.jpg","Furniture1.jpg","grocery1.jpg" ].map((img, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-image-container">
                <img src={`./Images/${img}`} className="d-block w-100" alt={`Banner ${index + 1}`} />
              </div>
              <Carousel.Caption>
                <h3>
                  {index === 0
                    ? "Exclusive Deals on Electronics"
                    : "Flash Sale - Up to 70% Off"}
                </h3>
                <p>
                  {index === 0
                    ? "Grab the latest gadgets at unbeatable prices!"
                    : "Upgrade your wardrobe with trending styles."}
                </p>
                <a href={`/subcategories/${index + 2}`} className="btn btn-warning">
                  Shop Now
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {message && <p className="alert-message">{message}</p>}

      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.map((product) => {
            const originalPrice = product.price;
            const discountedPrice = (originalPrice * 0.9).toFixed(2);
            const isChecked = useSuperCoins[product.productId] || false;
            const finalPrice = (
              isMember
                ? discountedPrice - (isChecked ? 50 : 0)
                : originalPrice - (isChecked ? 50 : 0)
            ).toFixed(2);

            return (
              <div key={product.productId} className="col-md-4 mb-4">
                <div className="card product-card">
                  <img
                    src={product.producturl || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={product.productName}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="product-description">{product.description}</p>

                    {/* Pricing Section */}
                    <div className="product-pricing">
                      <p className="price-label"><strong>Original Price:</strong></p>
                      <p className="original-price">
                        {isMember ? <del>₹{originalPrice}</del> : `₹${originalPrice}`}
                      </p>

                      <p className="price-label"><strong>Discounted Price:</strong></p>
                      <p className="discount-price">
                        {isMember ? `₹${discountedPrice}` : <del>₹{discountedPrice}</del>}
                      </p>

                      <div className="supercoin-container">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSuperCoins(product.productId)}
                        />
                        <label>💰 Use 50 SuperCoins</label>
                      </div>

                      <p className="final-price">
                        <span>⚡ Final Price: </span>
                        <span className="highlight-price">₹{finalPrice}</span>
                      </p>
                    </div>

                    <p className="d-flex justify-content-between">
                      <button className="btn btn-success me-2" onClick={() => addToCart(product.productId, 2)}>Add to Cart</button>
                      <button className="btn btn-primary" onClick={() => navigate(`/product/${product.productId}`)}>Buy Now</button>
                    </p>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Chatbot products={products} />
    </div>
  );
};

export default Dashboard;
