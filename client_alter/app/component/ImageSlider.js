// components/ImageSlider.js
'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex ));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex ));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex));
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
        <img src="/zero.png" alt="이미지3" className={`${styles.sliderImage} ${styles.smallOnly}`} />
        <img src="/003.png" alt="이미지3" className={`${styles.sliderImage} ${styles.largeOnly}`} />
        <img src="/001.png" alt="이미지1" className={`${styles.sliderImage} ${styles.largeOnly}`} />
        <img src="/002.png" alt="이미지2" className={`${styles.sliderImage} ${styles.largeOnly}`}/>
        
       
      </div>

    </div>
  );
};

export default ImageSlider;