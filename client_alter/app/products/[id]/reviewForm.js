'use client'
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './products.module.css';

const EnhancedReviewForm = (id) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('rate', rating);
      formData.append('item_id', id);
      formData.append('img', image);

      const response = await fetch('https://altermall.site/review', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
      });
      if (response.ok) {
        alert('리뷰가 성공적으로 제출되었습니다.');
      } else {
        console.error('리뷰 제출에 실패하였습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
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