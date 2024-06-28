'use client'
import React from 'react';
import styles from './products.module.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ReviewList = ({ reviews, openModal }) => {
  const maskUserId = (userId) => {
    const maskedLength = Math.ceil(userId.length / 2);
    const masked = '*'.repeat(maskedLength);
    return userId.substring(0, userId.length - maskedLength) + masked;
  };

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className={styles.star} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className={styles.star} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.star} />);
      }
    }

    return stars;
  };

  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem} onClick={() => openModal(review)}>
          <div className={styles.reviewHeader}>
            <span className={styles.reviewAuthor}>{maskUserId(review.User.name)}</span>
            <div className={styles.reviewRating}>{renderStars(review.rate)}</div>
            <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
          <div className={styles.reviewContent}>
            {review.img && (
              <img 
                src={`https://altermall.site/${review.img}`} 
                alt="Review" 
                className={styles.reviewThumbnail} 
              />
            )}
            <p className={styles.reviewText}>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;