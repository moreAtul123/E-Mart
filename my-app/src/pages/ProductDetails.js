import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import AuthContext from "../AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [superCoins, setSuperCoins] = useState(0);
  const [useSuperCoins, setUseSuperCoins] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
      setProduct(data);
    } catch (error) {
      setError("❌ Could not load product details. Try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

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
      setSuperCoins(0);
    }
  };

  useEffect(() => {
    fetchProduct();
    if (userId) {
      checkMembershipStatus();
      fetchSuperCoins();
    }
  }, [fetchProduct, userId]);

  const toggleSuperCoins = () => {
    setUseSuperCoins((prevState) => !prevState);
  };

  const addToCart = async () => {
    if (!userId) {
      setMessage("⚠ Please log in to add items to your cart.");
      return;
    }

    setCartLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/cart/add", null, {
        params: { userId, productId: id, quantity: 1 },
      });

      if (response.status === 200) {
        setMessage("✅ Product added to cart successfully!");
      }
    } catch (error) {
      setMessage("❌ Failed to add product to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = () => {
    navigate("/payment");
  };

  if (loading) return <div className="loading">⏳ Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const originalPrice = parseFloat(product.price);
  const discountedPrice = (originalPrice * 0.9).toFixed(2);
  const superCoinDiscount = 50;
  const finalPrice = (
    isMember ? discountedPrice - (useSuperCoins ? superCoinDiscount : 0) 
             : originalPrice - (useSuperCoins ? superCoinDiscount : 0)
  ).toFixed(2);

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="image-container">
          <img
            src={product.producturl || "https://via.placeholder.com/500"}
            alt={product.productName}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.productName}</h1>
          <p className="product-category">
            Category: <span>{product.category?.categoryName || "Uncategorized"}</span>
          </p>

          <div className="product-pricing">
            <p className="price-label"><strong>Original Price:</strong></p>
            <p className="original-price">
              {isMember ? <del>₹{originalPrice}</del> : `₹${originalPrice}`}
            </p>

            <p className="price-label"><strong>Discounted Price:</strong></p>
            <p className="discount-price">
              {!isMember ? <del>₹{discountedPrice}</del> : `₹${discountedPrice}`}
            </p>

            <div className="supercoin-container">
              <input
                type="checkbox"
                id="useSuperCoins"
                checked={useSuperCoins}
                onChange={toggleSuperCoins}
              />
              <label htmlFor="useSuperCoins">💰 Use 50 SuperCoins (₹50 Discount)</label>
            </div>

            <p className="final-price">
              <span>⚡ Final Price: </span>
              <span className="highlight-price">₹{finalPrice}</span>
            </p>
          </div>

          <div className="buttons">
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
            <button className="add-to-cart-btn" onClick={addToCart} disabled={cartLoading}>
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
          <p className="delivery-info">
            🚚 Free delivery by <strong>Tomorrow</strong> if ordered today.
          </p>
          {message && <p className="alert-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
