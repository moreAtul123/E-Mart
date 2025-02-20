import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [orderTotal, setOrderTotal] = useState(4949); // Example value
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order total from backend (Replace with your API call)
    // fetch("/api/order-summary").then((res) => res.json()).then((data) => setOrderTotal(data.total));
  }, []);

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    
    // Call backend API to place order (Replace with actual API call)
    console.log("Order placed with payment method:", selectedPayment);
    
    navigate("/order-confirmation"); // Redirect to order confirmation page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Secure Checkout</h2>

        {/* Delivery Address Section */}
        <div className="mb-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Delivering to Ram Agrwal</h3>
          <p className="text-sm text-gray-600">Ramdarshan Building, Juhu, Mumbai, India</p>
          <button className="text-blue-600 mt-2">Change</button>
        </div>

        {/* Payment Method Section */}
        <div className="mb-4 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Payment Method</h3>

          {["amazon-pay", "upi", "credit-card", "net-banking"].map((method) => (
            <div key={method} className="mb-2">
              <input
                type="radio"
                name="payment"
                id={method}
                value={method}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor={method} className="ml-2 capitalize">
                {method.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Order Summary</h3>
          <p className="text-lg font-bold mt-2">Total: ₹{orderTotal}</p>
          <button
            className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-md w-full"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;