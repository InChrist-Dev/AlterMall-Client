import React from 'react';
import styles from './user.module.css';
import { Link } from 'react-router-dom';

import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.menuCategory}>주문관리</div>
      <ul>
        <li><Link to="/user/orders" className={styles.menuItem}>주문내역</Link></li>
        <li><Link to="/user/cancel" className={styles.menuItem}>취소/반품내역</Link></li>
        <li><Link to="/user/subscriptions" className={styles.menuItem}>정기배송 관리</Link></li>
        <li><Link to="/user/restock-alerts" className={styles.menuItem}>재입고 알림상품</Link></li>
      </ul>
  
      <div className={styles.menuCategory}>혜택관리</div>
      <ul>
        <li><Link to="/user/coupons" className={styles.menuItem}>쿠폰</Link></li>
        <li><Link to="/user/points" className={styles.menuItem}>포인트</Link></li>
      </ul>
  
      <div className={styles.menuCategory}>활동관리</div>
      <ul>
        <li><Link to="/user/recent-products" className={styles.menuItem}>최근 본 상품</Link></li>
        <li><Link to="/user/favorite-products" className={styles.menuItem}>찜한 상품</Link></li>
        <li><Link to="/user/favorite-brands" className={styles.menuItem}>관심 브랜드</Link></li>
        <li><Link to="/user/inquiries" className={styles.menuItem}>1:1문의</Link></li>
        <li><Link to="/user/product-reviews" className={styles.menuItem}>상품 후기</Link></li>
        <li><Link to="/user/product-questions" className={styles.menuItem}>상품 문의내역</Link></li>
      </ul>
  
      <div className={styles.menuCategory}>회원정보관리</div>
      <ul>
        <li><Link to="/user/shipping-address" className={styles.menuItem}>배송지 관리</Link></li>
        <li><Link to="/user/profile" className={styles.menuItem}>정보 수정</Link></li>
        <li><span onClick={()=>{ Cookies.remove('accessToken');}}className={styles.menuItem}>로그아웃</span></li>
      </ul>
    </div>
  );
};

export default SideMenu;
