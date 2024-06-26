'use client'
import React, { useState } from 'react';
import styles from './products.module.css';

const ReviewImagePreview = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsWithImages = reviews.filter(review => review.img);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviewsWithImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviewsWithImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.reviewImagePreview}>
      <button onClick={prevSlide} className={styles.sliderButton}>&#10094;</button>
      <div className={styles.imageContainer}>
        {reviewsWithImages.map((review, index) => (
          <img 
            key={index} 
            src={`https://altermall.site/${review.img}`} 
            alt="Review preview" 
            className={`${styles.previewImage} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
      <button onClick={nextSlide} className={styles.sliderButton}>&#10095;</button>
    </div>
  );
};

export default ReviewImagePreview;