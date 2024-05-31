// components/ImageSlider.js
'use client'
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styles from '.././page.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: dots => (
      <ul style={{ margin: "0px" }}> {dots} </ul>
    )
  };

  return (
    <div className={styles.slider}>
      <Slider  className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }} {...settings}>
        <div>
          <img src="/dapumda.png" alt="이미지3" className={styles.sliderImage} />
        </div>
        <div>
          <img src="/003.png" alt="이미지3" className={styles.sliderImage} />
        </div>
        <div>
          <img src="/001.png" alt="이미지1" className={styles.sliderImage} />
        </div>
        <div>
          <img src="/002.png" alt="이미지2" className={styles.sliderImage} />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
