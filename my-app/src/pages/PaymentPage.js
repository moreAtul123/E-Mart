import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from "axios";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "../styles/Payment.css";

const PaymentPage = () => {
  const { user, token } = useContext(AuthContext);
  const userId = user?.userId;
  const location = useLocation();
  const navigate = useNavigate();

  const { finalPrice, cartItems } = location.state || {};

  const [userDetails, setUserDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(userResponse.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setMessage("Failed to fetch user details.");
        setMessageType("danger");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  // Handle Payment Submission
  const handlePayment = async () => {
    if (!paymentMethod) {
      setMessage("Please select a payment method.");
      setMessageType("danger");
      return;
    }

    const paymentData = {
      userId,
      paymentMethod,
      amount: finalPrice || 0,
      status: "Completed",
    };

    try {
      await axios.post(`http://localhost:8080/api/pdf/sendInvoice/${userId}`);
      setMessage("Payment successful! Invoice sent to your email.");
      setMessageType("success");
      setTimeout(() => navigate("/orderconfirmed"), 1000); // Redirect after success
    } catch (error) {
      console.error("Payment failed:", error);
      setMessage("Payment failed. Try again.");
      setMessageType("danger");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Payment Page</h2>

      {message && <Alert variant={messageType}>{message}</Alert>}

      {loading ? (
        <p>Loading payment details...</p>
      ) : (
        <>
          {userDetails ? (
            <div className="payment-form">
              <h4>User Details</h4>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={userDetails.name} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" value={userDetails.address} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={userDetails.email} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" value={userDetails.mobileNumber} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI">UPI</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button onClick={handlePayment} className="pay-button">
                Proceed to Pay
              </Button>
            </div>
          ) : (
            <p>No user details found.</p>
          )}

          <h1>
            <strong>Final Price:</strong> ₹{(finalPrice || 0).toFixed(2)}
          </h1>

          <h4 className="product-title">🛍 Products in Order</h4>
          <div className="product-list">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map(({ product, quantity }) => (
                <Card key={product.productId} className="product-card">
                  <Card.Img variant="top" src={product.producturl} alt={product.productName} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <p>
                      <strong>Quantity:</strong> {quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
