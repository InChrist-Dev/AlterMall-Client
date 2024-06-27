'use client'
import React from 'react';
import styles from './products.module.css';

const ReviewList = ({ reviews, openModal }) => {
  const maskUserId = (userId) => {
    const maskedLength = Math.ceil(userId.length / 2);
    const masked = '*'.repeat(maskedLength);
    return userId.substring(0, userId.length - maskedLength) + masked;
  };

  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem} onClick={() => openModal(review)}>
          {review.img && (
            <img 
              src={`https://altermall.site/${review.img}`} 
              alt="Review" 
              className={styles.reviewThumbnail} 
            />
          )}
          <div className={styles.reviewContent}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewAuthor}>{maskUserId(review.User.name)}</span>
              <span className={styles.reviewRating}>{'★'.repeat(review.rate)}</span>
              <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className={styles.reviewText}>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;