// Complete.js

import React from 'react';
import styles from './complete.module.css';
import Cookies from 'js-cookie';
import { useState } from 'react';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
export default async function Complete() {
  const [order,setOrder] = useState([]);
  const response = await fetch(`https://udtown.site/customer/order/`,{
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  
  });
  const data = await response.json();
  console.log(data.data.rows[0]);
  // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
  setOrder(data.data.rows[0]);

  // const { card } = data.data.rows[0];

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
