// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from './order.module.css'
import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';

const DeliveryInfoModal = ({ closeModal, saveDeliveryInfo }) => {
  const [addressname, setAddressName] = useState('');
  const [name,setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  const [phone,setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
  const addressClick = () => {
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



  const handleSubmit = async () => {
    try {
      const response = await fetch('http://211.45.170.37:3000/customer/deliver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "customer_id": "89122e30-b9c5-11ee-9d01-07fefcbd1ba0",
          "addr": address,
          "addr_detail": detailAddress,
          "phone": phone,
          "post": "string",
          "name": name
        }), 
      });

      if (response.status == 200) {
       
  
      } else if (response.status == 201) {
        alert('저장되었습니다');
        closeModal();
      } else {
        
      }
    } catch (error) {
      // 에러 처리
      console.error('Failed to send like request', error);
    }
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <h2>배송지 정보 추가</h2>
        <label>배송지 구분</label>
        <input type="text" value={addressname} onChange={(e) => setAddressName(e.target.value)} />

        <label>이름</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>전화번호</label>
        <div className={styles.call}>
        <input
        type="text"
        maxLength="3"
        value={phoneNumber.part1}
        onChange={(e) => handlePhoneNumberChange(e, 'part1')}
      />
      -
      <input
        type="text"
        maxLength="4"
        value={phoneNumber.part2}
        onChange={(e) => handlePhoneNumberChange(e, 'part2')}
      />
      -
      <input
        type="text"
        maxLength="4"
        value={phoneNumber.part3}
        onChange={(e) => handlePhoneNumberChange(e, 'part3')}
      />
        </div>
       
        <label>주소</label>
        <div className={styles.addressButton}>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={() => { addressClick() }}> 검색</button>


        </div>
        {isAddress ? <span><DaumPostcode onComplete={handleComplete} /></span> : ''}
        <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />

        <button onClick={handleSubmit}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
