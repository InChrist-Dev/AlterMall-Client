// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from '../order/delivery.module.css'
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoBuy = ({ closeModal }) => {
 
 
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
    
      <FontAwesomeIcon icon={faX} className={styles.cancelBtn} onClick={closeModal} />
            
        <h2>처리 위탁 및 3자 제공 동의</h2><br/>
        <label className={styles.label}>개인정보 제 3자 제공 동의</label>
 


    
     
    
       
      </div>
    </div>
  );
};

export default InfoBuy;
