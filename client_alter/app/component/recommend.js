
'use client'
import React, { useState } from 'react';
import styles from '../page.module.css';
export default function Recommend(){
  const [categoryName,setCategoryName] = useState(['사과당근주스', '쌀 쿠키', '샐러드', '쌀 케이크']);
  const [categoryId,setCategoryId] = useState([13212, 5345, 25253, 235235]);
    const [categoryPrice,setCategoryPrice] = useState(['10,000원','10,000원','10,000원','10,000원',]);
    const [categoryS,setCategoryS] = useState(['Top 음료','Top디저트','Top샐러드','Top 케이크']);
    const [categoryImage, SetCategoryImage] = useState( ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg']);
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
      window.location.href = '/category';
    };
    return (
    
    <div style={{width:'80%',margin:'0 auto', paddingTop:'300px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <p className={styles.categoryTitle}>장인의 추천<span className={styles.categorySub}> |얼터몰 인증 건강장인의 추천음식!</span></p>
    {/* 장인 버튼 */} <button onClick={toggleShowMore} className={styles.moreButton}>
        더보기 ▶
      </button>
      </div>
  
    <div className={styles.artisanButtons}>
      <button className={styles.re_largeButton}>
      <img href="pro.jpg"></img></button>
      {categoryName.map((categoryName, i) => {
            return (<a href={`/products/${categoryId[i]}`}>
               <div className={styles.re_container}>
      <button className={styles.re_smallButton} style={{ backgroundImage: `url(${categoryImage[i]})` }}></button>
    
      <div className={styles.recommend_title}>{categoryName}</div>
      <div className={styles.recommend_image}>{categoryS[i]}</div>
      <div className={styles.recommend_price}>{categoryPrice[i]}</div>
     
    </div>
    </a>
            )
    
          })}
    
    
    </div>
    </div>);
};

