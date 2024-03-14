import React from 'react';
import styles from './products.module.css'

function Modal({ review, closeModal }) {
  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalCenter}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <div>
            <h2>리뷰 내용</h2>
            <img src={`https://altermall.site/${review.img}`} alt="이미지 없음" className={styles.reviewImg} />
            <p>{review.content}</p>
            <p>작성자: {review.User.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
