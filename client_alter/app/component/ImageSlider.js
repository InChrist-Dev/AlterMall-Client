// components/ImageSlider.js
'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div
        className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {/* Images */}
        <img src="/001.png" alt="이미지1" className={styles.sliderImage} />
        <img src="/002.png" alt="이미지2" className={styles.sliderImage} />
        <img src="/003.png" alt="이미지2" className={styles.sliderImage} />
        <img src="/004.png" alt="이미지2" className={styles.sliderImage} />
       
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
