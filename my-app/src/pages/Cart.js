import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../AuthContext";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { user, token } = useContext(AuthContext);
    const userId = user?.userId;

    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState("");
    const [isMember, setIsMember] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [superCoins, setSuperCoins] = useState(0);
    const [useSuperCoins, setUseSuperCoins] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchCartItems();
            checkMembershipStatus();
            loadSuperCoins();
        }
    }, [userId]);

    // ✅ Fetch Cart Items
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/cart/user/${userId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setMessage("❌ Failed to fetch cart items.");
        }
    };

    // ✅ Check Membership Status
    const checkMembershipStatus = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/users/${userId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsMember(response.data?.member || false);
        } catch (error) {
            console.error("Error checking membership status:", error);
        }
    };

    // ✅ Load SuperCoins Balance (Default 100 Coins)
    const loadSuperCoins = () => {
        const storedCoins = localStorage.getItem(`superCoins_${userId}`);
        if (storedCoins === null) {
            localStorage.setItem(`superCoins_${userId}`, "50");
            setSuperCoins(50);
        } else {
            setSuperCoins(parseInt(storedCoins, 10));
        }
    };

    // ✅ Update Quantity
    const updateQuantity = async (cartId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put(
                `http://localhost:8080/api/cart/update/${cartId}`,
                null,
                { params: { quantity: newQuantity } }
            );
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // ✅ Remove Item from Cart
    const removeFromCart = async (cartId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/remove/${cartId}`);
            setCartItems(cartItems.filter((item) => item.cartId !== cartId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // ✅ Calculate Total Price
    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const discount = isMember ? totalPrice * 0.1 : 0;
    let finalPrice = totalPrice - discount;

    // ✅ SuperCoins Calculation
    const earnedCoins = isMember ? Math.floor(totalPrice / 50) * 4 : Math.floor(totalPrice / 50) * 2;
    let superCoinsDiscount = 0;

    if (useSuperCoins && superCoins > 0) {
        superCoinsDiscount = Math.min(superCoins, Math.floor(finalPrice * 0.1)); // Max 10% discount using SuperCoins
        finalPrice -= superCoinsDiscount;
    }

    // ✅ Place Order and Update SuperCoins
    const placeOrder = async () => {
        try {
            await axios.post(`http://localhost:8080/api/paymentdetails/${userId}`, {
                userId,
                items: cartItems.map((item) => ({
                    productId: item.product.productId,
                    quantity: item.quantity,
                })),
            });

            // Update SuperCoins balance
            const newSuperCoins = superCoins - superCoinsDiscount + earnedCoins;
            localStorage.setItem(`superCoins_${userId}`, newSuperCoins);
            setSuperCoins(newSuperCoins);

            setOrderPlaced(true);
            setCartItems([]);
            setMessage("✅ Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const navigate = useNavigate();
    const handelnaviage=()=>{

        navigate("/payment",{state:{finalPrice,cartItems}})
    }
    
    const handelnaviaget=()=>{

        navigate("/orderconfirmed",{state:{finalPrice,cartItems}})
    }
    console.log(cartItems)
    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 Your Shopping Cart</h2>

            {message && <p className="alert-message">{message}</p>}

            {cartItems.length === 0 && !orderPlaced ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    {!orderPlaced ? (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item.cartId} className="cart-item">
                                        <img src={item.product.producturl} alt={item.product.name} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <h2>{item.product.productName}</h2>
                                            <h6>{item.product.description}</h6>
                                            {/* <p>Price: ₹{item.product.price}</p> */}

                                            {/* Quantity Controls */}
                                            <div className="cart-item-actions">
                                                <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                                            </div>

                                            <p className="item-total">Total: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeFromCart(item.cartId)} className="remove-btn">🗑 Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="cart-summary">
                                <h3>Order Summary</h3>
                                <p>Original Price: <strong>₹{totalPrice.toFixed(2)}</strong></p>
                                <p>Membership: {isMember ? "✅ Member ( 10% Discount)" : "❌ Not a Member"}</p>
                                {isMember && <p>You Saved: ₹{discount.toFixed(2)}</p>}

                                {/* SuperCoins Section */}
                                <p>SuperCoins Balance: 🪙 {50}</p>
                                <label>
                                    <input type="checkbox" checked={useSuperCoins} onChange={() => setUseSuperCoins(!useSuperCoins)} />
                                    {/* Use SuperCoins for Discount (Max 10%) */}
                                </label>
                                {useSuperCoins && <p>SuperCoins Discount: -₹{superCoinsDiscount.toFixed(2)}</p>}

                                <p><strong>Total Payable: ₹{finalPrice.toFixed(2)}</strong></p>

                                <button onClick={handelnaviage} className="checkout-btn">Proceed to Buy</button>
                            </div>
                        </>
                    ) : (
                        <div className="order-confirmation">
                            <h3>🎉 Order Placed Successfully!</h3>
                            <p>Thank you for shopping with us!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
