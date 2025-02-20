import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext"; // Import AuthContext
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Profile.css"; // Custom styles

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [updatedUser, setUpdatedUser] = useState({}); // Store edited data

  const userId = authContext?.user?.userId;
  const token = authContext?.token;

  useEffect(() => {
    if (!userId) {
      console.warn("User ID is not available");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setUpdatedUser(response.data); // Pre-fill edit form
        setError(null);
      } catch (err) {
        setError("Failed to fetch user profile");
        console.error(err);
      }
    };

    fetchUserProfile();
  }, [userId, token]);

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Save edited user data
  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(updatedUser);
      setIsEditing(false); // Close edit mode
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user details.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        {error && <p className="error-text">{error}</p>}

        {isEditing ? (
          // Edit Profile Form
          <div className="edit-form">
            <input type="text" name="name" value={updatedUser.name} onChange={handleInputChange} placeholder="Name" />
            <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} placeholder="Email" />
            <input type="text" name="mobileNumber" value={updatedUser.mobileNumber} onChange={handleInputChange} placeholder="Mobile" />
            <textarea name="address" value={updatedUser.address} onChange={handleInputChange} placeholder="Address"></textarea>
            <button className="btn btn-success" onClick={handleUpdateUser}>Save Changes</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          // Display User Profile
          <>
            {userData ? (
              <ul className="profile-list">
                <li><strong>User ID:</strong> {userData.userId}</li>
                <li><strong>Name:</strong> {userData.name}</li>
                <li><strong>Email:</strong> {userData.email}</li>
                <li><strong>Mobile:</strong> {userData.mobileNumber}</li>
                <li><strong>Address:</strong> {userData.address || "N/A"}</li>
                <li><strong>Membership:</strong> {userData.member ? "Active" : "Inactive"}</li>
              </ul>
            ) : (
              <p className="loading-text">Loading...</p>
            )}

            {/* Edit Button (Delete Button Removed) */}
            <div className="profile-buttons">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
