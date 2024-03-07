'use client'
// UserInfo.jsx
import React from 'react';
import styles from './user.module.css';
import { useEffect } from 'react';

const UserInfo = (props) => {
  const fetchData = async() =>{
    const response = await fetch(`https://altermall.site/customer/order/`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMTcyMzQ0ODU4NTY4ODIxNTA2MyIsImlhdCI6MTcwOTc5ODAxOCwiZXhwIjoxNzA5ODEyNDE4fQ.FRRKHhRKIuq8v9oqJVaTzlaeM2YGy9jBG-kCrr8kjkw`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);

  }
  useEffect(()=>{
    fetchData();
  },[])
  console.log(props)
  return (
    <div className={styles.topArea}>
    <div className={styles.greeting}>
      {/* <div className={styles.lank}>프로건강러</div> */}
      <div><b>{props.name}</b>님, 안녕하세요!</div>
    </div>
    {/* <div className={styles.couInfo}>
      주문배송
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
    </div> */}
    <div className={styles.couInfo}>
      쿠폰
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
    <div className={styles.couInfo}>
      포인트
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
    <div className={styles.topAreaMobile}>
    <div className={styles.greeting}>
      {/* <div className={styles.lank}>프로건강러</div> */}
      <div><b>{props.name}</b>님, 안녕하세요!</div>
    </div>
    {/* <div className={styles.couInfo}>
      주문배송
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
    </div> */}
    <div className={styles.couInfoMobile}>
      쿠폰
      <div className={styles.orderInfoMobile}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
    <div className={styles.couInfo}>
      포인트
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
    </div>
   
   
  </div>
  );
};

export default UserInfo;
