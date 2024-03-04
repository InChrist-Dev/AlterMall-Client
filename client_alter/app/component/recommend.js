
'use client'
import React, { useState,useEffect } from 'react';
import styles from '../page.module.css';
export default function Recommend(){
  const [categoryName,setCategoryName] = useState(['사과당근주스', '쌀 쿠키', '샐러드', '쌀 케이크']);
  const [recommend,setRecommend] = useState([]);
  const [categoryId,setCategoryId] = useState([13212, 5345, 25253, 235235]);
    const [categoryPrice,setCategoryPrice] = useState(['10,000원','10,000원','10,000원','10,000원',]);
    const [categoryS,setCategoryS] = useState(['Top디저트','Top샐러드','Top 음료','Top락토프리']);
    const [categoryImage, SetCategoryImage] = useState( ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg']);
    const [showMore, setShowMore] = useState(false);

    
  const fetchData = async () => {
    try {
      const res_free = await fetch(`https://udtown.site/category?sortby=highest&category=free&product=1`);
      const res_dessert = await fetch(`https://udtown.site/category?sortby=highest&category=dessert&product=1`);
      const res_drink = await fetch(`https://udtown.site/category?sortby=highest&category=drink&product=1`);
      const res_salad = await fetch(`https://udtown.site/category?sortby=highest&category=salad&product=1`);
      const free_data = await res_free.json();
      const dessert_data = await res_dessert.json();
      const drink_data = await res_drink.json();
      const salad_data = await res_salad.json();
      
      //setRecommend([]) //salad_data,drink_data,free_data 심사통과 후 추가해주기
   
  

    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };
  
  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []); 

    const toggleShowMore = () => {
      window.location.href = '/ranking';
    };
    return (
    
    <div style={{width:'80%',margin:'0 auto', paddingTop:'40px',marginBottom:'200px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <p className={styles.categoryTitleMobile}>회원님을 위한 추천상품</p>
    {/* 장인 버튼 <button onClick={toggleShowMore} className={styles.moreButton}>
        더보기 ▶
      </button> */}
      </div>
  
    <div className={styles.artisanButtons}>
      <button className={styles.re_largeButton}>
   </button>
      {recommend.length>0? recommend.map((Items, i) => {

            return (<a  key={Items} href={`products/${Items.data.items[0].item_id}`}>
               <div className={styles.re_container}>
      <button className={styles.re_smallButton} style={{ backgroundImage: `url('https://udtown.site/${Items.data.items[0].img}')` }}></button>
    
      <div className={styles.recommend_title}>{Items.data.items[0].item_name}</div>
      <div className={styles.recommend_image}>{categoryS[i]}</div>
      <div className={styles.recommend_price}>{Items.data.items[0].price.toLocaleString()}원</div>
     
    </div>
    </a>
            )
    
          }):''}
    
    
    </div>
    </div>);
};

