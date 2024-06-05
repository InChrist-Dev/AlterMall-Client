// components/CategoryButtons.js
'use client'
import React from 'react';
import Link from 'next/link';
import ImageButton from '../component/imagebutton.js';
import styles from '../page.module.css';

const CategoryButtons = () => {
  return (
    <div style={{ width: '94%', margin: '0 auto' }}>
      <p className={styles.categoryTitle}>
        카테고리<span className={styles.categorySub}>|건강식품</span>
      </p>
      <div className={styles.imageButtonGrid}>
        <Link href='/categories/dessert'>
          <ImageButton imagePath="dessert.jpg" altText="디저트" />
        </Link>
        <Link onClick = {() => alert('준비중입니다.')} href='/'>
          <ImageButton imagePath="salad.jpg" altText="식재료" />
        </Link>
        <Link onClick = {() => alert('준비중입니다.')} href='/'>
          <ImageButton imagePath="free.jpg" altText= "양념/소스" />
        </Link>
        <Link href='/categories/drink'>
          <ImageButton imagePath="drink.jpg" altText="차,음료" />
        </Link>
      </div>
   
      <div className={styles.imageButtonGridMobile}>
        <Link href='/categories/dessert'>
          <div>
          <img src="breads.png" altText="디저트" />
          <p>디저트</p>
          </div>
       
        </Link>
        <Link href='/'>
        <div>
        <img src="sick.png" altText="식재료" />
          <p>식재료</p>
          </div>
       
        </Link>
        <Link href='/'>
          
          <div>
          <img src="jam.png" altText=" 양념/소스" />
          <p>양념/소스</p>
          </div>
        </Link>
        <Link href='/categories/drink'>
        <div>
        <img src="drinks.png" altText="차,음료" />
          <p>음료</p>
          </div>
       
        </Link>
      
     
      </div>
    </div>
  );
};

export default CategoryButtons;
