'use client'
// UserInfo.jsx
import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { fetchData } from 'next-auth/client/_utils';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const OrderHistory = () => {
  try{
    const fetchData = async() =>{
      const response = await fetch(`https://udtown.site/customer/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data)
     
    }
    useEffect(()=>{
      fetchData();
    })
  }catch{

  }
 
  return (
    <div>
      <div className={styles.topArea}>
      주문내역
   
  </div>
  </div>
  );
};

export default OrderHistory;
