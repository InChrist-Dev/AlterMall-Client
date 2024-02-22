// Footer.jsx

import React from 'react';
import styles from './component.module.css';  // Create a separate CSS module for styling

const Footer = () => {
  return (
    <span>
      <div style={{border:'0.5px solid #ddd'}}></div>
   
    <footer className={styles.footer}>
 
          <div className={styles.column}>
            
        <img className={styles.logo} src='/logo1.jpg'></img>
        <div className={styles.privacy}><a href='/privacy.html'>개인정보처리방침</a>|<a href='/service.html'>이용약관</a></div>
      </div>
    
      <div className={styles.column}>
        <h3 className={styles.title}>회사소개</h3>
        <p>상호명 및 호스팅 서비스 제공: 아이엔씨 개발팀</p>
        <p>대표이사: 이정훈</p>
        <p>경기도 의정부시 용현로42 104동 1003호</p>
        <p>사업자 등록번호: 723-30-01491</p>
        <p>유선번호: 010-8933-8962</p>
        <p>통신판매업 신고번호: 2024-의정부송산-0014</p>
     
      </div>
      <div className={styles.column}>
        <h3 className={styles.title}>Contact Us</h3>
        
        <p>경기도 의정부시 민락동 692-8 A동 5층</p>
        <p>Email: altermall@naver.com</p>
       
      
      </div>
 
    </footer>
    <p className={styles.tong}>얼터몰은 통신판매중개자이며 통신판매의 당사자가 아닙니다. 얼터몰은 상품,거래정보 및 거래 등에 대하여 책임을 지지 않습니다.</p>
   
    </span>
  );
};

export default Footer;
