import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Orders component mounted."); // Logs when component mounts
    console.log("User data:", user);

    if (!user?.userId) {
      console.error("User ID is not available.");
      return;
    }

    const fetchOrders = async () => {
      console.log("Fetching orders for user ID:", user.userId);
      
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/user/${user.userId}`
        );
        
        console.log("API Response:", response);
        console.log("Fetched Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response || error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
   
    <div className="container mt-5">
       <div>
       </div><br></br>
      <h2 className="mb-4 text-center">📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover orders-table">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>#{order.orderId}</td>
                  <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}</td>
                  <td>${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        console.log("Navigating to OrderDetails for Order ID:", order.orderId);
                        navigate(`/OrderDetails/${order.orderId}`);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
