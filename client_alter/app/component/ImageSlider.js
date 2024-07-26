// components/ImageSlider.js
'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from '.././page.module.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sliderRef = useRef(null);

  const smallImages = [
    { link:'https://altermall.shop/categories/dessert',src: "/04.png", alt: "이미지0" },
    { link: 'https://example.com/link2', src: "/05.png", alt: "이미지1" },
    { link: 'https://example.com/link3', src: "/zero.png", alt: "이미지2" },
    { link: 'https://example.com/link4', src: "/popup.png", alt: "이미지3" },
  ];

  const largeImages = [
    { link: 'https://example.com/link5', src: "/4.png", alt: "이미지0" },
    { link: 'https://example.com/link6', src: "/5.png", alt: "이미지1" },
    { link: 'https://example.com/link7', src: "/001.png", alt: "이미지2" },
    { link: 'https://example.com/link8', src: "/002.png", alt: "이미지3" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setCurrentIndex(0); // Reset to first image when screen size changes
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = isSmallScreen ? smallImages : largeImages;

  const handleSwipe = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleSwipe();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleImageClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]); // Add images.length as a dependency

  return (
    <div className={styles.slider} ref={sliderRef}>
      <div
        className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={styles.sliderImage}
            onClick={() => handleImageClick(image.link)}
            style={{ pointerEvents: 'auto' }} // 추가: 클릭 이벤트가 작동하도록 설정
          />
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            style={{ pointerEvents: 'auto' }} // 추가: 클릭 이벤트가 작동하도록 설정
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;