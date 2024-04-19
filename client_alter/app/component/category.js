// components/CategoryButtons.js
'use client'
import React from 'react';
import Link from 'next/link';
import ImageButton from '../component/imagebutton.js';
import styles from '../page.module.css';

const CategoryButtons = () => {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
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
          <ImageButton imagePath="dessert.jpg" altText="디저트" />
        </Link>
        <Link href='/'>
          <ImageButton imagePath="salad.jpg" altText="식재료" />
        </Link>
        <Link href='/'>
          <ImageButton imagePath="free.jpg" altText=" 양념/소스" />
        </Link>
        <Link href='/categories/drink'>
          <ImageButton imagePath="drink.jpg" altText="차,음료" />
        </Link>
      
     
      </div>
    </div>
  );
};

export default CategoryButtons;
