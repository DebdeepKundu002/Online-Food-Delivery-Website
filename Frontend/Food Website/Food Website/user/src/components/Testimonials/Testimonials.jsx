import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Testimonials.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/review/recent`);
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          setTimeout(() => {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          }, 1000);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial-containerxx">
      <h2 className="testimonial-title">Our Clients Say!</h2>
      <p className="testimonial-subtitle">
        Real stories from real people who trusted us and loved the results we delivered.
      </p>

      <div className="testimonial-wrapper">
        <div className="testimonial-content" ref={scrollRef}>
          {reviews.map((review) => (
            <div className="testimonial-card" key={review._id}>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={review.rating >= star ? "star active" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="testimonial-text">"{review.thoughts}"</p>
              <p className="client-name"><strong>{review.name}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
