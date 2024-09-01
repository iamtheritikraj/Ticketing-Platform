// src/pages/ProfilePage.js

import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../Design/profilePage.css"; // Ensure this CSS file is correctly linked

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login"); // Redirect to login if no token is present
          return;
        }

        const { data } = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile", error);
        navigate("/login"); // Redirect to login if there's an error fetching user data
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=150`}
          alt="User Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Bookings:</strong>{user.bookings}
          </p>
          <button className="update-btn">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
