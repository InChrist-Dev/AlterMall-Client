// seller.js
'use client'

import React, { useState } from 'react';
import styles from './order.module.css';

const Checkout = () => {
  // 간단한 상태 관리를 위해 useState 사용
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    method: 'standard',
  });

  const [orderItems, setOrderItems] = useState([
    { name: '상품1', price: 20000 },
    { name: '상품2', price: 30000 },
    // ... 다른 상품들
  ]);

  // 함수를 통해 배송 정보 업데이트
  const updateDeliveryInfo = (key, value) => {
    setDeliveryInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  // 전체 주문 가격 계산
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.verticalInfo}>
          <div className={styles.infoTitle}>주문/결제</div>
          <div style={{border:'1px solid #ccc',marginTop:'50px',marginBottom:'20px'}}></div>
          <div className={styles.deliveryInfo}>
            <h2>배송지 정보</h2>
            홍길동
            <div>경기도 의정부시 00로 00동00호</div>
            <div>010-0000-0000</div>
            <label>배송방법</label>
            <select
              value={deliveryInfo.method}
              onChange={(e) => updateDeliveryInfo('method', e.target.value)}
            >
              <option value="standard">일반 배송</option>
              <option value="express">퀵 배송</option>
            </select>
          </div>

          <div className={styles.orderItems}>
            <h2>주문 물품 정보</h2>
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price.toLocaleString()}원
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.stickySidebar}>
        <h2 >주문 결제 금액</h2>
        <div style={{border:'1px solid #ddd',marginTop:'20px',marginBottom:'20px'}}></div>
        <div>할인금액: 0원</div>
        <div>상품권: 0원</div>
        <div>
          <strong>총 주문 가격:</strong> {totalAmount.toLocaleString()}원
        </div>
        {/* 추가적인 결제 정보 */}
      </div>
    </div>
  );
};

export default Checkout;