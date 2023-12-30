import React from 'react';
import styles from './component.module.css'
const ImageButton = ({ imagePath, altText, onClick }) => {
  return (
    <button
      className={styles.imageButton}
      onClick={onClick}
      
    >
      <img
        src={imagePath}  // imagePath에 이미지 파일의 경로를 전달
        alt={altText}
        className={styles.buttonImage}
      />
    </button>
  );
};

export default ImageButton;
