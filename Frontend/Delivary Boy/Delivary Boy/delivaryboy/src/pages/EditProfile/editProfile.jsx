import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./editProfile.css";
import { useAuth } from "../../Context/AuthContext";

const EditProfile = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("Available"); // ✅ NEW STATE
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/deliveryBoy/me`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const user = res.data.deliveryBoy;
          setFullname(user.fullname);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber || "");
          setStatus(user.status || "Available"); // ✅ LOAD STATUS
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/deliveryBoy/updateprofile`,
        { fullname, email, phoneNumber, status }, // ✅ SEND STATUS
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Profile updated");
        await fetchUser();
        navigate("/profile");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="edit-container">
      <motion.form
        className="edit-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Edit Profile</h2>

        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* ✅ STATUS DROPDOWN */}
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="status-select"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <button type="submit" className="save-btn">Save</button>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="cancel-btn"
        >
          Cancel
        </button>
      </motion.form>
    </div>
  );
};

export default EditProfile;
