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
    // 여기에 폼 데이터를 처리하는 로직을 추가하세요.
    console.log('Form submitted:', { name, email, phone, deliveryDate, deliveryTime, deliveryLocation });
  };

  return (
    <div className={styles.formContainer}>
      <h1>납품 신청서</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
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
  );
};

export default SubmitForm;
