'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sliderRef = useRef(null);
  const startXRef = useRef(null);
  const swipeThreshold = 50; // 스와이프 감도 조절 (낮을수록 민감)

  const smallImages = [
    { src: "/04.png", alt: "이미지0" },
    { src: "/05.png", alt: "이미지0" },
    { src: "/zero.png", alt: "이미지0" },
    { src: "/popup.png", alt: "이미지1" },
  ];

  const largeImages = [
    { src: "/001.png", alt: "이미지3" },
    { src: "/002.png", alt: "이미지4" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = isSmallScreen ? smallImages : largeImages;

  const handlePointerDown = (e) => {
    startXRef.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (startXRef.current === null) return;
    
    const endX = e.clientX;
    const diffX = startXRef.current - endX;

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    startXRef.current = null;
  };

  const handlePointerLeave = () => {
    startXRef.current = null;
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.slider} ref={sliderRef}>
      <div
        className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} className={styles.sliderImage} />
        ))}
      </div>
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