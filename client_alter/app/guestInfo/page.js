'use client'
// pages/Guest.js
import { useState } from "react";
import styles from './guestInfo.module.css';

const GuestInfo = (props) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [pw, setPW] = useState('');
  const handleInputChange = (event) => {
    setOrderNumber(event.target.value);
  };
  const handlePWChange = (event) => {
    setPW(event.target.value);
  };
  const handleConfirmClick = async() => {
    // 주문번호를 이용하여 주문 조회 페이지로 이동
    console.log(pw,orderNumber)
   
    try {
        const response = await fetch('https://altermall.site/auth/local/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": orderNumber,
            "pw": pw,
           
          }), 
        }) .then((res) => res.json())
        .then((json) => {
          console.log(json)
          Cookies.set('position', json.position, { expires: 1 });  // 1일 동안 유지되도록 설정
          Cookies.set('accessToken', json.accessToken, { expires: 1 });  // 1일 동안 유지되도록 설정
       
       
        });
      } catch (error) {
        // 에러 처리
        console.error('Failed to send like request', error);
      }
    if (orderNumber.trim() !== '') {
      // 주문 조회 페이지로 이동하는 로직 추가
      // 예시: history.push(`/guest/${orderNumber}`);
      window.location.href=`https://altermall.shop/guest?order_id=${orderNumber}`;
      console.log(`주문번호 ${orderNumber}로 주문 조회 페이지로 이동`);
    } else {
      alert('주문번호를 입력해주세요.');
    }
  };
  const handleSubmit1 = async () => {
  
   
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비회원 주문 조회</h1>
      <div className={styles.orderInfo}>
        <p>주문번호 </p>
        <input
          type="text"
          value={orderNumber}
          onChange={handleInputChange}
          placeholder="주문번호"
          className={styles.input}
        />
        <p>비밀번호</p>
        <input
          type="text"
          value={pw}
          onChange={handlePWChange}
          placeholder="비밀번호"
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
