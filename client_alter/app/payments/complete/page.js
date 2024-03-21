// Complete.js
'use client'
import React from 'react';
import styles from './complete.module.css';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const position = Cookies.get('position');

export default function Complete(props) {
  const [order,setOrder] = useState([]);
  const [orderDetail,setOrderDetail] = useState([]);
  const [name,setName] = useState('');
  const fetchData = async () => {
    try {
      if(position=='guest'){
        const response = await fetch(`https://altermall.site/customer/guest_order?order_id=${props.searchParams.orderId}`, {
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
        setOrderDetail(data.data.rows[0].OrderDetails)
        setName(data.data.rows[0].OrderDetails[0].item_name)
      }
      else{
        const response = await fetch(`https://altermall.site/customer/order/`, {
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
        setOrderDetail(data.data.rows[0].OrderDetails)
        setName(data.data.rows[0].OrderDetails[0].item_name)
      }
      
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
          {orderDetail? `${name}외 ${orderDetail.length-1}건`:''}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>구매자명:</span>
          {order? order.customer_name:''}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>주문번호:</span>
          {order? order.order_id:''}
        </li>
      
        <li className={styles.infoListItem}>
          <span className={styles.label}>배송지:</span>
          {order? order.addr:''}  {order? order.addr_detail:''}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>요청사항:</span>
          {order? order.requests:''}
        </li>
      
      </ul>
    </div>
  </div>
    
  );
}
