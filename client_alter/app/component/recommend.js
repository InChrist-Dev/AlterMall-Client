'use client'
import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';
import { IoCartOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Recommend() {
  const [recommend, setRecommend] = useState([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    swipeToSlide: true,
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (item) => {
    // Handle add to cart functionality
    console.log("Item added to cart:", item);
  };

  return (
    <div className={styles.titleMobile} style={{ width: '96%', margin: '0 auto', paddingTop: '10px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className={styles.categoryTitleMobile}>회원님을 위한 추천상품</p>
      </div>
      <div className={styles.productContainer}>
        <Slider {...settings}>
          {recommend.length > 0 ? recommend.map((item) => {
            return (
              <div key={item.item_id} className={styles.productCard}>
                <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
                  <div className={styles.productLink}>
                    <img src={`https://altermall.site/${item.img}`} alt={item.item_name} /> 
                    <button className={styles.cartBtn} onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(item);
                    }}>
                      <IoCartOutline className={styles.cartIcon} />담기
                    </button>
                    <h3>{item.item_name}</h3>
                    <p>{item.price}원</p>
                  </div>
                </Link>
              </div>
            );
          }) : ''}
        </Slider>
      </div>
    </div>
  );
}
