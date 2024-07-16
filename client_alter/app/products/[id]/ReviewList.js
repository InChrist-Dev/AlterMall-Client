'use client'
import React, { useState } from 'react';
import styles from './products.module.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ReviewList = ({ reviews, openModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem} onClick={() => openModal(review)}>
          <div className={styles.reviewHeader}>
            <div className={styles.reviewName}>
              <span className={styles.reviewAuthor}>{maskUserId(review.User.name)}</span>
              <div className={styles.reviewRating}>{renderStars(review.rate)}</div>
            </div>
            <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
          <div className={styles.reviewContent}>
            {review.img && (
              <img 
                src={`https://altermall.site/${review.img}`} 
                alt="Review" 
                className={styles.reviewThumbnail}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(`https://altermall.site/${review.img}`);
                }}
              />
            )}
            <p className={styles.reviewText}>{review.content}</p>
          </div>
        </div>
      ))}
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
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReviewList;