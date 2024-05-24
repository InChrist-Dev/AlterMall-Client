import React from 'react';
import styles from './products.module.css'

function Modal({ review, closeModal }) {

  const maskUserId = (userId) => {
    const maskedLength = Math.ceil(userId.length / 2);
    const masked = '*'.repeat(maskedLength);
    return userId.substring(0, userId.length - maskedLength) + masked;
  };

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalCenter}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <div>
            <h2>리뷰 내용</h2>
            <img src={`https://altermall.site/${review.img}`} alt="이미지 없음" className={styles.reviewImg} />
            <p>{review.content}</p>
            <p>작성자: {maskUserId(review.User.name)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
