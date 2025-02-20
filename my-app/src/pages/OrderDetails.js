import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(`Fetching order details for orderId: ${orderId}`);
        const response = await axios.get(`http://localhost:8080/api/orderdetails/order/${orderId}`);
        console.log("Response Data:", response.data);

        if (response.data.length > 0) {
          setOrderDetails(response.data);
          console.log("Order details set successfully:", response.data);
        } else {
          setError("No order details found.");
          console.warn("No order details found for this order.");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Error fetching order details. Please try again.");
      } finally {
        setLoading(false);
        console.log("Order details fetching process completed.");
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  console.log("Current State - Order Details:", orderDetails);
  console.log("Loading State:", loading);
  console.log("Error State:", error);

  if (loading) {
    console.log("Loading order details...");
    return <p>Loading order details...</p>;
  }
  
  if (error) {
    console.log("Error:", error);
    return <p className="error">{error}</p>;
  }

  return (
    <div className="order-container">
      <h2>Order Details for Order #{orderId}</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back to Orders</button>
      {orderDetails.length === 0 ? (
        <p>No order details found for this order.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Detail ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((detail, index) => {
              console.log(`Rendering row ${index + 1}:`, detail);

              // Ensure order date exists and format it properly
              const formattedDate = detail.order?.orderDate
                ? new Date(detail.order.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A";

              return (
                <tr key={detail.orderDetailId}>
                  <td>{detail.orderDetailId}</td>
                  <td>{detail.product?.productName || "Unknown Product"}</td>
                  <td>{detail.product?.description || "No description available"}</td>
                  <td>{detail.quantity}</td>
                  <td>{formattedDate}</td>
                  <td>${detail.price.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDetails;
