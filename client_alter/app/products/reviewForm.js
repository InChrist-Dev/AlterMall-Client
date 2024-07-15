'use client'
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './[id]/products.module.css';

const EnhancedReviewForm = () => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log({ content, rating, image });
    // Reset form after submission
    setContent('');
    setRating(0);
    setImage(null);
  };

  return (
    <div className={styles.reviewFormContainer}>
      <h2 className={styles.reviewFormTitle}>리뷰 작성</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>별점</label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                fill={star <= rating ? "#f0571b" : "none"}
                stroke={star <= rating ? "#f0571b" : "#ccc"}
                className={styles.star}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>내용</label>
          <textarea
            id="content"
            rows={4}
            className={styles.textarea}
            placeholder="리뷰 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>이미지</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
        >
          리뷰 제출
        </button>
      </form>
    </div>
  );
};

export default EnhancedReviewForm;