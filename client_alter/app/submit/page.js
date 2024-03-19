// SubmitForm.js
'use client'
import React, { useState } from 'react';
import styles from './submit.module.css'; // 스타일링을 위한 CSS 모듈

const SubmitForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name,
      email,
      phone,
      deliveryDate,
      deliveryTime,
      deliveryLocation
    };
  
    fetch('https://altermall.site/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        alert('성공적으로 제출되었습니다!');
        window.location.reload();
        // 성공적으로 제출된 후에 필요한 작업을 수행하세요.
      } else {
        alert('제출에 실패하였습니다');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
  };
  

  return (
    <div className={styles.submit}>
<div className={styles.formContainer}>
      <h1>납품 상담 신청서</h1>
      <h3>※상담에 필요한 대략적인 정보만 기제해주세요.</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름(회사명)</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">전화번호</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="deliveryDate">납품 날짜</label>
          <input type="date" id="deliveryDate" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="deliveryTime">납품 시간</label>
          <input type="time" id="deliveryTime" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="deliveryLocation">납품 장소</label>
          <input type="text" id="deliveryLocation" value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} required />
        </div>

        <button type="submit">신청하기</button>
      </form>
    </div>
    </div>
    
  );
};

export default SubmitForm;
