import React from 'react';
import styles from './user.module.css';
import Link from 'next/link';

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
    <div className={styles.menuCategory}>주문관리</div>
    <ul>
      <li><Link href="/user/orders">주문내역</Link></li>
      <li><Link href="/user/subscriptions">취소/반품내역</Link></li>
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
  );
};

export default SideMenu;