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
        <Link href='/category/dessert'>
          <ImageButton imagePath="dessert.jpg" altText="디저트" />
        </Link>
        <Link href='/category/salad'>
          <ImageButton imagePath="salad.jpg" altText="샐러드" />
        </Link>
        <button className={styles.largeButton}>
          <Link href='/master'>
            <img
              src='recommend.png' // imagePath에 이미지 파일의 경로를 전달
              style={{ width: '100%', height: '100%', objectFit: 'fill' }}
            />
          </Link>
        </button>
        <Link href='/category/free'>
          <ImageButton imagePath="free.jpg" altText=" 락토프리" />
        </Link>
        <Link href='/category/drink'>
          <ImageButton imagePath="drink.jpg" altText="음료" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryButtons;
