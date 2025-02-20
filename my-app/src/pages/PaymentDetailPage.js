import React, { useState } from "react";

const PaymentDetailPage = ({ userId }) => { // Accepting userId as a prop
    const [paymentId, setPaymentId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [orderId, setOrderId] = useState("");
    const [message, setMessage] = useState("");

    const apiBaseUrl = `http://localhost:8080/api/paymentdetails/${userId}`;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!paymentMethod || !paymentStatus || !orderId) {
            setMessage("❌ All fields are required.");
            return;
        }

        const paymentDetail = {
            paymentMethod,
            paymentStatus,
            order: { orderId },
        };

        try {
            const response = await fetch(apiBaseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentDetail),
            });

            if (response.ok) {
                setMessage("✅ Payment details saved successfully!");
                resetForm();
            } else {
                setMessage("❌ Failed to save payment details.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ An error occurred while saving payment details.");
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!paymentId || !paymentMethod || !paymentStatus || !orderId) {
            setMessage("❌ All fields are required for update.");
            return;
        }

        const paymentDetail = {
            paymentMethod,
            paymentStatus,
            order: { orderId },
        };

        try {
            const response = await fetch(`${apiBaseUrl}/${paymentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentDetail),
            });

            if (response.ok) {
                setMessage("✅ Payment details updated successfully!");
                resetForm();
            } else {
                setMessage("❌ Failed to update payment details.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ An error occurred while updating payment details.");
        }
    };

    const handleDelete = async () => {
        if (!paymentId) {
            setMessage("❌ Please enter a Payment ID to delete.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/${paymentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessage("✅ Payment details deleted successfully!");
                resetForm();
            } else {
                setMessage("❌ Failed to delete payment details.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ An error occurred while deleting payment details.");
        }
    };

    const resetForm = () => {
        setPaymentId("");
        setPaymentMethod("");
        setPaymentStatus("");
        setOrderId("");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Payment Method:</label>
                    <input
                        type="text"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Status:</label>
                    <input
                        type="text"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Order ID:</label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment ID (For Update/Delete):</label>
                    <input
                        type="text"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                    />
                </div>
                <button type="submit">Create Payment</button>
                <button type="button" onClick={handleUpdate} style={{ marginLeft: "10px" }}>
                    Update Payment
                </button>
                <button type="button" onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
                    Delete Payment
                </button>
            </form>
            {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
        </div>
    );
};

export default PaymentDetailPage;
