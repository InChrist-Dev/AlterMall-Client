// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from './order.module.css'
import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';

const DeliveryInfoModal = ({ closeModal, saveDeliveryInfo }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isAddress,setIsAddress] = useState(false);
    const addressClick=()=>{
        const newIsAddress = !isAddress;
        setIsAddress(newIsAddress);
    }
 
    const handleSave = () => {
      // Validation logic can be added here
  
      // Assuming validation passed, call the saveDeliveryInfo function
      saveDeliveryInfo({
        name,
        phoneNumber,
        address,
        detailAddress,
      });
  
      // Close the modal after saving
      closeModal();
    };
    const handleComplete = (data) => {
        let fullAddress = data.address;
        setAddress(fullAddress);
    
       };
    
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        
      <h2>배송지 정보 추가</h2>
        <label>이름</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>전화번호</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <label>주소</label>
        <div className={styles.addressButton}> 
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={()=>{addressClick()}}> 검색</button>
       
        
        </div>
        {isAddress? <span><DaumPostcode onComplete={handleComplete} /></span>:''}
        <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />

        <button onClick={handleSave}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
