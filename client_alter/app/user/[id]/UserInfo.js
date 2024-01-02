// UserInfo.jsx
import React from 'react';
import styles from './user.module.css';

const UserInfo = () => {
  return (
    <div className={styles.userInfo}>
      <p>~님 반갑습니다!</p>
      <div className={styles.orderAndCoupon}>
        <p>주문/배송 건수: ~</p>
        <p>쿠폰 갯수: ~</p>
      </div>
    </div>
  );
};

export default UserInfo;
