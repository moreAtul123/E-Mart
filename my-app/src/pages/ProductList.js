import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductList.css";
import AuthContext from "../AuthContext";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext);
    const userId = user?.userId;
    const [isMember, setIsMember] = useState(false);
    const [superCoins, setSuperCoins] = useState(0);
    const [useSuperCoins, setUseSuperCoins] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
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
            setSuperCoins(0);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!userId) {
            setMessage("⚠ Please login to add items to the cart.");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/cart/add",
                null,
                { params: { userId, productId, quantity } }
            );
            if (response.status === 200) {
                const { cartId } = response.data;
                setMessage("✅ Product added to cart successfully!");
                let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                storedCart.push({ cartId, productId, quantity });
                localStorage.setItem("cart", JSON.stringify(storedCart));
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            setMessage("❌ Failed to add product to cart.");
        }
    };

    const handleBuyNow = (productId) => {
        navigate(`/payment?productId=${productId}`);
    };

    const toggleSuperCoins = (productId) => {
        setUseSuperCoins((prevState) => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    return (
        <>
        <div className="product-container">
            </div>
            {/* Heading */}
            <div className="product-container">
            <div>
            </div><br></br>
            <div>
            </div><br></br>
                <h1>Products</h1>
            </div>

            {/* Message Container */}
            {message && (
                <div className="product-container alert-message" style={{ color: "red" }}>
                    <p>{message}</p>
                </div>
            )}

            {/* Product Grid */}
            <div className="product-container">
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => {
                            const discountedPrice = (product.price * 0.9).toFixed(2);
                            const coinDiscount = superCoins > 0 ? Math.min(superCoins, 50) : 50;
                            const isChecked = useSuperCoins[product.productId] || false;
                            const priceWithCoins = (product.price - (isChecked ? coinDiscount : 0)).toFixed(2);

                            return (
                                <div className="product-card" key={product.productId}>
                                    <img
                                        src={product.producturl || "https://via.placeholder.com/300"}
                                        alt={product.name || "Product Image"}
                                        className="product-image"
                                    />
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="product-description">{product.description}</p>

                                        {/* Pricing Section */}
                                        <div className="product-pricing">
                                            <p className="price-label"><strong>Original Price:</strong></p>
                                            <p className="original-price">
                                                <span>MRP: </span>
                                                {isMember ? <del>₹{product.price}</del> : `₹${product.price}`}
                                            </p>

                                            <p className="price-label"><strong>Discounted Price:</strong></p>
                                            <p className="discount-price">
                                                <span>🏷 Discounted Price: </span>
                                                {isMember ? `₹${discountedPrice}` : <del>₹{discountedPrice}</del>}
                                            </p>

                                            {/* SuperCoins Option */}
                                            <div className="supercoin-container">
                                                <input
                                                    type="checkbox"
                                                    id={`useSuperCoins-${product.productId}`}
                                                    checked={isChecked}
                                                    onChange={() => toggleSuperCoins(product.productId)}
                                                />
                                                <label htmlFor={`useSuperCoins-${product.productId}`}>
                                                    💰 Use {coinDiscount} SuperCoins
                                                </label>
                                            </div>

                                            {/* Final Price */}
                                            <p className="final-price">
                                                <span>⚡ Final Price: </span>
                                                <span className="highlight-price">
                                                    ₹{(isMember
                                                        ? (discountedPrice - (isChecked ? coinDiscount : 0)).toFixed(2)
                                                        : (product.price - (isChecked ? coinDiscount : 0)).toFixed(2))}
                                                </span>
                                            </p>
                                        </div>

                                        {/* Buttons */}
                                        <div className="product-buttons">
                                            <button className="add-to-cart" onClick={() => addToCart(product.productId, 2)}>
                                                Add to Cart
                                            </button>
                                            <button className="btn btn-primary" onClick={() => navigate(`/product/${product.productId}`)}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-products">No products found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
