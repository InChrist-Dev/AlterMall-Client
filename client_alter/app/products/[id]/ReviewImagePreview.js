'use client'
import React from 'react';
import styles from './products.module.css';

const ReviewImagePreview = ({ reviews }) => {
  const reviewsWithImages = reviews.filter(review => review.img);
  
  return (
    <div className={styles.reviewImagePreview}>
      {reviewsWithImages.map((review, index) => (
        <img 
          key={index} 
          src={`https://altermall.site/${review.img}`} 
          alt="Review preview" 
          className={styles.previewImage}
        />
      ))}
    </div>
  );
};

export default ReviewImagePreview;