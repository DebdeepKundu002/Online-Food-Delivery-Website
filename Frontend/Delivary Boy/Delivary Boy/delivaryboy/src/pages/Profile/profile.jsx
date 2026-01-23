// pages/Profile/profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcCamera } from 'react-icons/fc';
import { motion } from 'framer-motion';
import './profile.css';
import { useAuth } from '../../Context/AuthContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/150");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.profilePhoto) setPreviewImage(user.profilePhoto);
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/deliveryBoy/updatephoto`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        const updated = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/deliveryBoy/me`, {
          withCredentials: true,
        });
        setUser(updated.data.deliveryBoy);
        setPreviewImage(updated.data.deliveryBoy.profilePhoto);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account?")) return;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/deliveryBoy/delete/${user._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        alert("Account deleted");
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Deletion error:", err);
    }
  };

  if (!user) return <div className="profile-loading">Loading...</div>;

  return (
    <motion.div className="profile-wrapper" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.div className="profile-box" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
        <div className="profile-pic-container">
          <label htmlFor="image-upload" className="image-upload-label">
            <motion.img src={previewImage} alt="Profile" className="profile-pic" whileHover={{ scale: 1.05 }} />
            <motion.div className="camera-overlay" whileHover={{ scale: 1.1 }}>
              <FcCamera size={22} />
            </motion.div>
            <input id="image-upload" type="file" onChange={handleImageUpload} hidden />
          </label>
        </div>
        <motion.h2>{user.fullname}</motion.h2>
        <div className="user-info-group">
          <motion.p className="user-email">{user.email}</motion.p>
          <motion.p className="user-email">{user.phoneNumber}</motion.p>
          <motion.p className="user-email">{user.status}</motion.p>
        </div>
        <motion.div className="profile-actions">
          <button onClick={() => navigate('/profile/edit')}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
