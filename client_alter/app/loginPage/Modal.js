// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from '../order/order.module.css'
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const DeliveryInfoModal = ({ closeModal  }) => {
  const [showAllAddresses, setShowAllAddresses] = useState(false);



  const [addressname, setAddressName] = useState('');
  const [name,setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const addressClick = () => {
    const newIsAddress = !isAddress;
    setIsAddress(newIsAddress);
  }

  const handleSave = () => {
    // Validation logic can be added here

    saveDeliveryInfo({ name, address, detailAddress});

    // Close the modal after saving
    closeModal();
  };
  const handleComplete = (data) => {
    let fullAddress = data.address;
    setAddress(fullAddress);

  };



  const handleSubmit = async () => {
    
    try {
      const response = await fetch('https://udtown.site/customer/deliver', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          "addr": address,
          "addr_detail": detailAddress,
          
          "address_name":addressname,
          "name": name
        }), 
      });

      if (response.status == 200) {
       
  
      } else if (response.status == 201) {
        alert('저장되었습니다');
        closeModal();
        window.location.reload;
      } else {
        
      }
    } catch (error) {
      // 에러 처리
      console.error('Failed to send like request', error);
    }
  };

  const delDeliver = async () => {
    try {
      const response = await fetch(`https://udtown.site/customer/deliver/}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      
      });

      if (response.status == 200) {
       
  
      } else if (response.status == 201) {
        alert('삭제되었습니다');
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
        <label>아이디</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>비밀번호</label>
        <input type="text" value={pw} onChange={(e) => setPw(e.target.value)} />
        <label>비밀번호 확인</label>
        <input type="text" value={pw} onChange={(e) => setPwCheck(e.target.value)} />

        
       
    
        <button onClick={handleSubmit}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
