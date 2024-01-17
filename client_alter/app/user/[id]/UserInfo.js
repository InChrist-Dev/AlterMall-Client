// UserInfo.jsx
import React from 'react';
import styles from './user.module.css';

const UserInfo = (props) => {
  console.log(props)
  return (
    <div className={styles.topArea}>
    <div className={styles.greeting}>
      <div className={styles.lank}>프로건강러</div>
      <div><b>{props.name}</b>님, 안녕하세요!</div>
    </div>
    <div className={styles.couInfo}>
      주문배송
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
    </div>
    <div className={styles.couInfo}>
      쿠폰
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
    <div className={styles.couInfo}>
      포인트
      <div className={styles.orderInfo}>
      <div className={styles.coupon}>0</div>
      </div>
     
    </div>
   
  </div>
  );
};

export default UserInfo;
