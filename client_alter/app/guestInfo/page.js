'use client'
// pages/Guest.js
import { useState } from "react";
import styles from './guestInfo.module.css';

const GuestInfo = (props) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (event) => {
    setOrderNumber(event.target.value);
  };

  const handleConfirmClick = () => {
    // 주문번호를 이용하여 주문 조회 페이지로 이동
    if (orderNumber.trim() !== '') {
      // 주문 조회 페이지로 이동하는 로직 추가
      // 예시: history.push(`/guest/${orderNumber}`);
      window.location.href=`https://altermall.shop/guest?order_id=${orderNumber}`;
      console.log(`주문번호 ${orderNumber}로 주문 조회 페이지로 이동`);
    } else {
      alert('주문번호를 입력해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비회원 주문 조회</h1>
      <div className={styles.orderInfo}>
        <p>주문번호를 입력해주세요</p>
        <input
          type="text"
          value={orderNumber}
          onChange={handleInputChange}
          placeholder="주문번호"
          className={styles.input}
        />
        <button onClick={handleConfirmClick} className={styles.confirmButton}>
          확인
        </button>
      </div>
    </div>
  );
};

export default GuestInfo;
