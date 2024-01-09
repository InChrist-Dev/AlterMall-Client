
'use client'
import React, { useState } from 'react';
import styles from './master.module.css';
export default function Recommend(){
    const [masterName,setMasterName] = useState(['김프리', '이장인', '편수빈', '박프리']);
    const [categoryPrice,setCategoryPrice] = useState(['10,000원','10,000원','10,000원','10,000원',]);
    const [categoryS,setCategoryS] = useState(['Top 음료','Top디저트','Top샐러드','Top 케이크']);
    const [categoryImage, SetCategoryImage] = useState( ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg']);
    return (
    
    <div style={{width:'80%',margin:'0 auto', paddingTop:'300px'}}>
    <p className={styles.categoryTitle}>장인 소개<span className={styles.categorySub}> |얼터몰의 장인들을 소개합니다!</span></p>
    {/* 장인 버튼 */}
    <div className={styles.artisanButtons}>
      <button className={styles.re_largeButton}>
      <img href="pro.jpg"></img></button>
      {masterName.map((masterName, i) => {
            return (
               <div className={styles.re_container}>
      <button className={styles.re_smallButton} style={{ backgroundImage: `url(${categoryImage[i]})` }}></button>
    
      <div className={styles.recommend_title}>{masterName}</div>
      <div className={styles.recommend_image}>{categoryS[i]}</div>
      <div className={styles.recommend_price}>{categoryPrice[i]}</div>
     
    </div>
            )
    
          })}
    
    
    </div>
    </div>);
};

