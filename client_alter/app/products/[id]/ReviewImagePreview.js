'use client'
import React, { useState } from 'react';
import styles from './products.module.css';

const ReviewImagePreview = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsWithImages = reviews.filter(review => review.img);
  console.log(reviews)
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
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
            onClick={(e) => {
              e.stopPropagation();
              handleImageClick(`https://altermall.site/${review.img}`);
            }}
          />
        ))}
      </div>
      <button onClick={nextSlide} className={styles.sliderButton}>&#10095;</button>
      {selectedImage && (
        <ImageModal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};
const ImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className={styles.imageModal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Enlarged review" className={styles.enlargedImage} />
        <button className={styles.closeButton} onClick={onClose}>X</button>
      </div>
    </div>
  );
};
export default ReviewImagePreview;