import React, { useEffect, useState } from 'react';
import './DeliveryCart.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const DeliveryCart = () => {
  const { user, loading } = useAuth();
  const [order, setOrder] = useState(null);
  const [otp, setOtp] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [redirectTimer, setRedirectTimer] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/${orderId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const foundOrder = res.data.data;
        if (foundOrder.status !== 'Canceled' && foundOrder.status !== 'Delivered') {
          setOrder(foundOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchOrder();
  }, [user]);

  const handleOTPSubmit = async () => {
    if (!otp || !orderId) {
      setDeliveryStatus('Please enter OTP');
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/order/verifyotp/${orderId}`,
        JSON.stringify({ otp }),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setDeliveryStatus('The item is Delivered Properly');
        setOtp('');
        setOtpAttempts(0);
        fetchOrder();

        // Start 10-second countdown before redirect
        let countdown = 10;
        setRedirectTimer(countdown);
        const intervalId = setInterval(() => {
          countdown -= 1;
          setRedirectTimer(countdown);
          if (countdown <= 0) {
            clearInterval(intervalId);
            navigate('/');
          }
        }, 1000);
      }
    } catch (err) {
      const attempts = otpAttempts + 1;
      setOtpAttempts(attempts);

      if (attempts >= 5) {
        alert('There has been a problem with the OTP. Please ask the user to contact the Admin.');
      }

      setDeliveryStatus(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  const calculateTotals = () => {
    if (!order) return { subtotal: 0, deliveryFee: 0, total: 0 };

    let subtotal = 0;
    order.cartItems.forEach(item => {
      subtotal += item.food.price * item.quantity;
    });
    return { subtotal, deliveryFee: 0, total: subtotal };
  };

  const { subtotal, deliveryFee, total } = calculateTotals();
  const individualUserName = order?.userId?.fullname || '';

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className="login-warning">Please login as delivery boy to view your orders.</p>;
  if (!order) return <p>No valid order found for delivery.</p>;

  return (
    <div className="user-orders-container">
      <motion.div className="food-header" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="One">FOOD FACTION</h1>
        <h3 className="Oneoo">Order Your Favourite Food Here</h3>
      </motion.div>

      <motion.div className="company-container" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="fcdetails">{individualUserName}&apos;s Order Details</h2>
      </motion.div>

      <div className="cart-table">
        <div className="cart-header">
          <span>Item Name</span>
          <span>Food Counter</span>
          <span>Category</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>

        {order.cartItems.map((item, index) => (
          <div className="cart-row" key={index}>
            <span>{item.food.name}</span>
            <span>{item.food.food_counter_id?.name || 'N/A'}</span>
            <span>{item.food.category}</span>
            <span>{item.quantity}</span>
            <span>₹{item.food.price}</span>
          </div>
        ))}
      </div>

      <div className="cart-bottom-section">
        <div className="cart-total">
          <h3>Cart Total</h3>
          <div className="summary-line">Subtotal <span>₹{subtotal}</span></div>
          <div className="summary-line">Delivery Fee <span>₹{deliveryFee}</span></div>
          <hr />
          <div className="summary-line total">Total <span>₹{total}</span></div>
          <button className="checkout-btn">PROCEED TO CONFIRM</button>
        </div>

        <div className="otp-section">
          <p>If you have the OTP, enter it here</p>
          <div className="otp-input-wrapper">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOTPSubmit}>Submit OTP</button>
          </div>
          {deliveryStatus && <p className="delivery-status-msg">{deliveryStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCart;
