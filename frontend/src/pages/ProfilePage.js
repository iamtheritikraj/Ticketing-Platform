import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "../Design/profilePage.css"; 
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login"); 
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
        navigate("/login"); 
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
            <strong>Bookings: </strong><a href="/YourBookings">Check Here.</a>
          </p>
          <button className="update-btn">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
