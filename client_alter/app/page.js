'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ImageButton from './component/imagebutton';
import styles from './page.module.css';
import Link from 'next/link';
import { NextURL } from 'next/dist/server/web/next-url';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryName,setCategoryName] = useState(['낙곱새','피자','치킨','햄버거']);
  const [categoryPrice,setCategoryPrice] = useState([10000,2000,30000,30000]);
  const [categoryS,setCategoryS] = useState([1,2,3,4]);
  const [categoryImage, SetCategoryImage] = useState( ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg']);
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
      <div style={{width:'80%',margin:'0 auto',}}>
      <p className={styles.categoryTitle}>카테고리<span className={styles.categorySub}>|건강식품</span></p>
      <div className={styles.imageButtonGrid}>
        <Link href='/category/dessert'>
        <ImageButton imagePath="dessert.jpg" altText="디저트" />
        </Link>
        <Link href='/category/salad'>
        <ImageButton imagePath="salad.jpg" altText="샐러드" />
        </Link>
        
         <button className={styles.largeButton}><Link href='/foodstory'> <img
        src='recommend.png'  // imagePath에 이미지 파일의 경로를 전달
        
        style={{ width: '100%', height: '100%', objectFit: 'fill'}}
      /></Link></button>
        
       
        <Link href='/category/free'>
        <ImageButton imagePath="free.jpg" altText=" 락토프리" />
        </Link>
        <Link href='/category/drink'>
        <ImageButton imagePath="drink.jpg" altText="음료" />
        </Link>
        
        
       
      </div>
      </div>
     
      <div style={{width:'80%',margin:'0 auto',}}>
      <p className={styles.categoryTitle}>장인의 추천<span className={styles.categorySub}> |얼터몰 인증 건강장인의 추천음식!</span></p>
      {/* 장인 버튼 */}
      <div className={styles.artisanButtons}>
        <button className={styles.re_largeButton}>
        <img href="pro.jpg"></img></button>
        {categoryName.map((categoryName, i) => {
              return (
                 <div style={{marginLeft:'50px'}}>
        <button className={styles.re_smallButton} style={{ backgroundImage: `url(${categoryImage[i]})` }}></button>

        <div className={styles.recommend_title}>{categoryName}</div>
        <div className={styles.recommend_price}>{categoryPrice[i]}</div>
        <div>{categoryS[i]}</div>
</div>
              )

            })}

    
      </div>
      </div>
     
    </div>
  );
};

export default HomePage;
