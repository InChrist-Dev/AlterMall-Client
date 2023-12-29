'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ImageButton from './component/imagebutton';
import styles from './page.module.css';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <div >
  

      {/* 이미지 슬라이더 */}
      <div className={styles.slider}>
        <div
          className={styles.imageSlider}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {/* 이미지 1 */}
          <img src="/1.jpg" alt="이미지1" className={styles.sliderImage} />

          {/* 이미지 2 */}
          <img src="/2.jpg" alt="이미지2" className={styles.sliderImage} />

          {/* 이미지 3 */}
          <img src="/3.jpg" alt="이미지3" className={styles.sliderImage} />
        </div>

        {/* 화살표 버튼 */}
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

      {/* 이미지 버튼 */}
      <div style={{width:'90%',margin:'0 auto',}}>
      <p className={styles.categoryTitle}>카테고리</p>
      <div className={styles.imageButtonGrid}>
        <ImageButton imagePath="dessert.jpg" altText="버튼 이미지" />
        <ImageButton imagePath="salad.jpg" altText="버튼 이미지" />
        <button className={styles.largeButton}>사장님이 추천하는 건강음식</button>
        <ImageButton imagePath="free.jpg" altText="버튼 이미지" />
        <ImageButton imagePath="drink.jpg" altText="버튼 이미지" />
      </div>
      </div>
     

      <h1 className={styles.categoryTitle}>장인의 추천</h1>
      {/* 장인 버튼 */}
      <div className={styles.artisanButtons}>
        <button className={styles.largeButton}>장인사진</button>
        <button className={styles.smallButton}>음식1</button>
        <button className={styles.smallButton}>음식2</button>
        <button className={styles.smallButton}>음식3</button>
        <button className={styles.smallButton}>음식4</button>
      </div>
    </div>
  );
};

export default HomePage;
