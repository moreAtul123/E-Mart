import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const location = useLocation();

  const { finalPrice, cartItems } = location.state || {};

  console.log("Final Price from location:", finalPrice);
  console.log("Cart Items from location:", cartItems);

  const totalAmount = finalPrice || 0;
  const usedSuperCoins = 50;
  const earnedSuperCoins = Math.floor(totalAmount * 0.10);
  const paymentMethod = sessionStorage.getItem("paymentMethod") || "Unknown";

  console.log("Total Amount:", totalAmount);
  console.log("Payment Method:", paymentMethod);

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && orderId === null) {
      console.log("Placing order with:", {
        userId: user.id,
        totalAmount,
        paymentMethod,
        orderDetails: cartItems,
      });

      fetch("http://localhost:8282/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          totalAmount,
          paymentMethod,
          orderDetails: cartItems,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order placed successfully:", data);
          setOrderId(data.orderId);
          updateSuperCoinBalance(user.id, (user.supercoin || 0) + earnedSuperCoins);
        })
        .catch((error) => console.error("Error storing order:", error.message));
    }
  }, [user.id, totalAmount, paymentMethod, cartItems, orderId]);

  const updateSuperCoinBalance = (userId, newBalance) => {
    console.log(`Updating SuperCoin balance for user ${userId} to ${newBalance}`);

    fetch(`http://localhost:8282/update-supercoin/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supercoin: newBalance }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("SuperCoin balance updated successfully");
        sessionStorage.setItem("user", JSON.stringify({ ...user, supercoin: newBalance }));
      })
      .catch((error) => console.error("Error updating SuperCoin balance:", error.message));
  };

  const handleDownloadInvoice = () => {
    if (orderId) {
      console.log(`Downloading invoice for order ID: ${orderId}`);
      window.location.href = `http://localhost:8282/api/invoice/download/${orderId}`;
    } else {
      console.warn("Order ID not found, invoice download aborted.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg p-4">
        <div className="text-success display-3">✅</div>
        <h2 className="text-success mt-3">Order Confirmed!</h2>
        <p className="text-muted">Thank you for your purchase. Your order has been successfully placed.</p>

        {/* <h4 className="fw-bold">Order Summary</h4>
        <p>Order ID: <strong>{orderId || "Generating..."}</strong></p>
        <p>Total Amount Paid: <strong>₹{totalAmount}</strong></p>
        <p className="text-primary">Used SuperCoins: <strong>{usedSuperCoins}</strong></p>
        <p className="text-success">Earned SuperCoins: <strong>{earnedSuperCoins}</strong></p>
        <p className="text-info">Payment Method: <strong>{paymentMethod}</strong></p>

        <div className="row mt-4"></div>

        <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>Go to Home</button>
        {orderId && (
          <button className="btn btn-secondary mt-3 ms-3" onClick={handleDownloadInvoice}>
            Download Invoice
          </button>
        )} */}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
