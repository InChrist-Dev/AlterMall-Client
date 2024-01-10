
'use client'
import React, { useState } from 'react';
import styles from './master.module.css';
export default function Recommend() {
  const [masterCategory, setMasterCategory] = useState(['글루텐 장인', '슈가 장인', '락토 장인', '알러지 장인']);

  const [masterName, setMasterName] = useState(['김프리', '이장인', '편수빈', '박프리']);
  const [categoryPrice, setCategoryPrice] = useState(['맛으로 승부하겠습니다', '건강으로 승부하겠습니다', '건강한 음식, 맛있는 음식', '아이들 안성맞춤 건강식',]);
  const [categoryS, setCategoryS] = useState(['Top 음료', 'Top디저트', 'Top샐러드', 'Top 케이크']);
  const [categoryImage, SetCategoryImage] = useState(['/chef/chef1.jpg', '/chef/chef2.jpg', '/chef/chef3.jpg', '/chef/chef4.jpg']);
  return (

    <div style={{ width: '80%', margin: '0 auto', paddingTop: '50px' }}>
      <p className={styles.categoryTitle}>장인 소개<span className={styles.categorySub}> |얼터몰의 장인들을 소개합니다!</span></p>
      {/* 장인 버튼 */}
      {masterCategory.map((masterCategory, i) => {
        return (
          <div className={styles.masterContainer}>
            {masterCategory}
            <div className={styles.artisanButtons}>

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
          </div>)
      })}
    </div>);
};

