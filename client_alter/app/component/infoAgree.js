// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from '../order/delivery.module.css'
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const InfoAgree = ({ closeModal }) => {
 
 
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
    
      <FontAwesomeIcon icon={faX} className={styles.cancelBtn} onClick={closeModal} />
            
        <h2>개인정보 수집·이용 동의서(필수)</h2><br/>
        <label className={styles.label}>개인정보 수집·이용 동의</label>
 


    <table className={styles.agree}>
    <thead>
        <tr>
        <th>수집 목적</th>
        <th>수집 항목</th>
        <th>보유 기간</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>온라인 쇼핑 구매자에 대한 상품 결제 및 배송 정보</td>
        <td>길제정보, 수취인명, 휴대폰 번호, 수취인 주소, 구매상품정보</td>
        <td>신고 후 업무 목적 달성 후 파기 (단, 타 법령에 따른 법령에서 규정한 기간 동안 보존)</td>
        </tr>
       
       
      
    </tbody>
    </table>

       
       
     
    
       
      </div>
    </div>
  );
};

export default InfoAgree;
