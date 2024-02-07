// Complete.js
'use client'
import React from 'react';
import styles from './complete.module.css';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
export default function Complete() {
  const [order,setOrder] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/customer/order/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data)
      setOrder(data.data.rows[0]);


      // const initialQuantity = data.data.rows[0].OrderDetails.map((item) => item.amount );

      // setQuantity(initialQuantity);




      // 데이터를 state로 업데이트하는 로직을 추가합니다.
      // 예를 들어, setCategoryName(data.data.items.map(item => item.item_name));
      // 필요한 모든 state를 업데이트해야 합니다.
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
  <div  className={styles.back}>
    <div  className={styles.ground}></div>
<div className={styles.container}>
      <h1 className={styles.title}>결제가 완료되었습니다</h1>
      <ul className={styles.infoList}>
        <li className={styles.infoListItem}>
          <span className={styles.label}>결제 상품:</span>
          {searchParams.orderId}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>주문번호:</span>
          {searchParams.orderId}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>결제승인날짜:</span>
          {/* {Intl.DateTimeFormat().format(new Date(payments.approvedAt))} */}
        </li>
      </ul>
    </div>
  </div>
    
  );
}
