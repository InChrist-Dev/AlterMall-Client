
'use client'
import React, { useState,useEffect } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';
import { IoCartOutline } from "react-icons/io5";
import Slider from "react-slick";

export default function Recommend(){
  const [categoryName,setCategoryName] = useState(['사과당근주스', '쌀 쿠키', '샐러드', '쌀 케이크']);
  const [recommend,setRecommend] = useState([]);
  const [categoryId,setCategoryId] = useState([13212, 5345, 25253, 235235]);
    const [categoryPrice,setCategoryPrice] = useState(['10,000원','10,000원','10,000원','10,000원',]);
    const [categoryS,setCategoryS] = useState(['Top디저트','Top샐러드','Top 음료','Top락토프리']);
    const [categoryImage, SetCategoryImage] = useState( ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg']);
    const [showMore, setShowMore] = useState(false);

     // Slider settings
 const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false // This will remove the next and previous buttons
};

  const fetchData = async () => {
    try {
      const res_free = await fetch(`https://altermall.site/category?sortby=highest&category=free&product=1`);
      const res_dessert = await fetch(`https://altermall.site/category?sortby=highest&category=dessert`);
      const res_drink = await fetch(`https://altermall.site/category?sortby=highest&category=drink`);
      
      const free_data = await res_free.json();
      const dessert_data = await res_dessert.json();
      const drink_data = await res_drink.json();
      const dessert = dessert_data.data.items;
      const drink = drink_data.data.items;
      console.log(dessert_data.data)
      console.log(drink_data.data.items)
      const combinedData = dessert_data.data.items;
      setRecommend(combinedData);
      
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
    
    <div  className={styles.titleMobile} style={{width:'94%',margin:'0 auto', paddingTop:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <p className={styles.categoryTitleMobile}>회원님을 위한 추천상품</p>
      </div>
     <div className={styles.productContainer}>
     <Slider {...settings}>
     {recommend.length>0? recommend.map((item, i) => {
   
    return (
      <>
      <div key={item} className={styles.productCard}>
        <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
          <div className={styles.productLink}>
            <img src={`https://altermall.site/${item.img}`} alt={name} /> <button className={styles.cartBtn} onClick={(e)=>{
              e.preventDefault(); // Link 클릭 이벤트 전파 중지
              handleSubmit(item);}}><IoCartOutline onClick={()=>{handleSubmit(item.item_id)}} className={styles.cartIcon}/>담기</button>
              
            <h3> {item.item_name}</h3>
            <span style={{'display':'flex'}}>
            {/* <p>{item.price.toLocaleString()}원</p> */}
             
           
            </span>
           
          </div>
        </Link>
      </div>
      </>
    );
  }):''}
  </Slider>
</div>
    {/* <div className={styles.artisanButtons}>
      <button className={styles.re_largeButton}>
   </button>
      {recommend.length>0? recommend.map((Items, i) => {

            return (<a  key={Items} href={`products/${Items.data.items[0].item_id}`}>
               <div className={styles.re_container}>
      <button className={styles.re_smallButton} style={{ backgroundImage: `url('https://altermall.site/${Items.data.items[0].img}')` }}></button>
    
      <div className={styles.recommend_title}>{Items.data.items[0].item_name}</div>
      <div className={styles.recommend_image}>{categoryS[i]}</div>
      <div className={styles.recommend_price}>{Items.data.items[0].price.toLocaleString()}원</div>
     
    </div>
    </a>
            )
    
          }):''}
    
    
    </div> */}
    </div>);
};

