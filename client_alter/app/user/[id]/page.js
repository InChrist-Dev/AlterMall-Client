import React from 'react';
import styles from './user.module.css';

const MyPage = () => {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.topArea}>
        <div className={styles.greeting}>
          <div className={styles.lank}>프로건강러</div>
          <div><b>김왕밤</b>님, 안녕하세요!</div>
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

      <div className={styles.middleArea}>
      <div className={styles.sideMenu}>
  <div className={styles.menuCategory}>주문관리</div>
  <ul>
    <li>주문내역</li>
    <li>취소/반품내역</li>
    <li>정기배송 관리</li>
    <li>재입고 알림상품</li>
  </ul>

  <div className={styles.menuCategory}>혜택관리</div>
  <ul>
    <li>쿠폰</li>
    <li>포인트</li>
  </ul>

  <div className={styles.menuCategory}>활동관리</div>
  <ul>
    <li>최근 본 상품</li>
    <li>찜한 상품</li>
    <li>관심 브랜드</li>
    <li>1:1문의</li>
    <li>상품 후기</li>
    <li>상품 문의내역</li>
  </ul>

  <div className={styles.menuCategory}>회원정보관리</div>
  <ul>
    <li>배송지 관리</li>
    <li>정보 수정</li>
  </ul>
</div>
<div className={styles.rightArea}>
<div className={styles.recentOrders}>
          <h3>최근 주문 내역</h3>
          {/* 주문 내역 아이템들 */}
        </div>   <div className={styles.recentOrders}>
          <h3>최근 본 상품</h3>
          {/* 주문 내역 아이템들 */}
        </div>
        {/* 최근 본 상품, 찜한 상품, 상품 후기, 1:1문의 등 추가 */}
      </div>
      </div>

     
    </div>
  );
};

export default MyPage;
