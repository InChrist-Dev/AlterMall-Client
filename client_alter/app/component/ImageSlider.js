// components/ImageSlider.js
'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {/* Images */}
        <img src="/1.jpg" alt="이미지1" className={styles.sliderImage} />
        <img src="/2.jpg" alt="이미지2" className={styles.sliderImage} />
       
      </div>

      {/* Arrow Buttons */}
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={styles.leftArrow}
        onClick={handlePrev}
      />
      <FontAwesomeIcon
        icon={faChevronRight}
        className={styles.rightArrow}
        onClick={handleNext}
      />
    </div>
  );
};

export default ImageSlider;
