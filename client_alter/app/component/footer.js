// Footer.jsx

import React from 'react';
import styles from './component.module.css';  // Create a separate CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
          <div className={styles.column}>
        <img className={styles.logo} src='/logo1.jpg'></img>
      </div>
  
      <div className={styles.column}>
        <p className={styles.title}>회사소개</p>
        <p>상호명 및 호스팅 서비스 제공: InC개발팀</p>
        <p>대표이사: 이정훈</p>
        <p>경기도 의정부시 민락동 692-8 A동 5층</p>
        <p>사업자 등록번호: 723-30-01491</p>
        {/* Add more information as needed */}
      </div>
      <div className={styles.column}>
        <p className={styles.title}>Contact Us</p>
        
        <p>경기도 의정부시 민락동 692-8 A동 5층</p>
        <p>Email: altermall@naver.com</p>
        {/* Add more information as needed */}
      </div>
      {/* Add more columns or sections as needed */}
    </footer>
  );
};

export default Footer;
