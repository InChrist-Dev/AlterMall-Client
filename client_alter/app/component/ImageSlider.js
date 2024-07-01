// components/ImageSlider.js
'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/zero.png", alt: "이미지0", class: `${styles.sliderImage} ${styles.smallOnly}` },
    { src: "/popup.png", alt: "이미지1", class: `${styles.sliderImage} ${styles.smallOnly}` },
    { src: "/003.png", alt: "이미지2", class: `${styles.sliderImage} ${styles.largeOnly}` },
    { src: "/001.png", alt: "이미지3", class: `${styles.sliderImage} ${styles.largeOnly}` },
    { src: "/002.png", alt: "이미지4", class: `${styles.sliderImage} ${styles.largeOnly}` },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
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
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} className={image.class} />
        ))}
      </div>
      <button className={`${styles.sliderButton} ${styles.prev}`} onClick={handlePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className={`${styles.sliderButton} ${styles.next}`} onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;