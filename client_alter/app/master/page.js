'use client'
import React, { useState,useEffect } from 'react';
import styles from './master.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Recommend() {
  const [masterCategory, setMasterCategory] = useState(['글루텐 장인', '슈가 장인', '락토 장인', '알러지 장인']);

  const [master, setMaster] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState(['맛으로 승부하겠습니다', '건강으로 승부하겠습니다', '건강한 음식, 맛있는 음식', '아이들 안성맞춤 건강식',]);
  const [categoryS, setCategoryS] = useState(['Top 음료', 'Top디저트', 'Top샐러드', 'Top 케이크']);
  const [categoryImage, SetCategoryImage] = useState(['/chef/chef1.jpg', '/chef/chef2.jpg', '/chef/chef3.jpg', '/chef/chef4.jpg']);
const [currentIndex, setCurrentIndex] = useState(0);
const [favorites, setFavorites] = useState([false, false, false, false]); // Initialize with false for each master

const fetchData = async () => {
  try {
    const response = await fetch(`http://211.45.170.37:3000/User/seller`);
    const data = await response.json();

    // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
    console.log(data.data.seller);
    setMaster(data.data.seller)
    

    // 데이터를 state로 업데이트하는 로직을 추가합니다.
    // 예를 들어, setCategoryName(data.data.items.map(item => item.item_name));
    // 필요한 모든 state를 업데이트해야 합니다.
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};

// useEffect 안에서 fetchData 함수를 호출합니다.
useEffect(() => {
  fetchData();
}, []); 

const toggleFavorite = (index) => {
  const newFavorites = [...favorites];
  newFavorites[index] = !newFavorites[index];
  setFavorites(newFavorites);
};
// 좌우 이동 함수 추가
const goToPrevSlide = () => {
  const newIndex = (currentIndex - 1 + masterName.length) % masterName.length;
  setCurrentIndex(newIndex);
};

const goToNextSlide = () => {
  const newIndex = (currentIndex + 1) % masterName.length;
  setCurrentIndex(newIndex);
};
console.log(master)
return (
  <div style={{ width: '80%', margin: '0 auto', paddingTop: '50px' }}>
    {/* 장인 버튼 */}
    {masterCategory.map((masterCategory, i) => {
      return (
        <div className={styles.masterContainer} key={i}>
          <p className={styles.categoryTitle}>
            {masterCategory}
            <span className={styles.categorySub}> | 얼터몰의 장인들을 소개합니다!</span>
          </p>
          <div className={styles.artisanButtons}>
            {master.map((master, j) => {
              return (
             
                  <div className={styles.re_container} style={{ transform: `translateX(${-currentIndex * 110}%)` }}>
                       <a href='/seller' key={j}>
                    <button className={styles.re_smallButton} style={{ backgroundImage: `url('http://211.45.170.37:3000/${master.User.profile}')` }}>
                      {/* Heart icon with conditional style based on favorite status */}
                  
                    </button>
                     </a>
                     <div style={{display:'flex',justifyContent:'space-between',padding:'2px',verticalAlign:'middle'}}>
                     <div className={styles.recommend_title}>{master.User.name}</div>
                    <FontAwesomeIcon
                        icon={favorites[j]? solidHeart: regularHeart}
                        className={favorites[j] ? styles.favoriteIcon : ''}
                        onClick={() => toggleFavorite(j)}
                      />
                     </div>
                    

                    <div className={styles.recommend_price}>{master.slogan}</div>
                  </div>
               
              );
            })}
          </div>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.leftArrow} onClick={goToPrevSlide} />
          <FontAwesomeIcon icon={faChevronRight} className={styles.rightArrow} onClick={goToNextSlide} />
        </div>
      );
    })}
  </div>
);
};

