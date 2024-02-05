// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from './order.module.css'
import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const DeliveryInfoModal = ({ closeModal,deliveryList  }) => {
  const [showAllAddresses, setShowAllAddresses] = useState(false);


  const showAllAddressesModal = () => {
    setShowAllAddresses(true);
  };

  const closeAllAddressesModal = () => {
    setShowAllAddresses(false);
  };
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

    saveDeliveryInfo({ name, phoneNumber, address, detailAddress});

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
          "phone": phone,
          "address_name":addressname,
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

  const delDeliver = async (id) => {
    try {
      const response = await fetch(`https://udtown.site/customer/deliver/${id}`, {
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
      {showAllAddresses ? (
          // 새로운 배송지 목록을 보여주는 모달
          <div>
            <h3>전체 배송지 목록</h3>
            <ul>
              {deliveryList.length>0?deliveryList.map((delivery) => (
                <li key={delivery.id}>
                  {delivery.address_name} - {delivery.addr} {delivery.addr_detail} - {delivery.phone}
                  <button onClick={()=>{delDeliver(delivery.id)}}>X</button>
                </li>
              )):''}
            </ul>
            <button onClick={closeAllAddressesModal}>닫기</button>
          </div>
        ) : (
          // 기존 배송지 정보를 입력하는 모달
          <>
         
            {/* ... (기존 코드) */}
            <button onClick={showAllAddressesModal}>배송지 목록 보기</button>
            {/* ... (기존 코드) */}
          </>
        )}
    

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
        onChange={(e) => setPhoneNumber(e, 'part1')}
      />
      -
      <input
        type="text"
        maxLength="4"
        value={phoneNumber.part2}
        onChange={(e) => setPhoneNumber(e, 'part2')}
      />
      -
      <input
        type="text"
        maxLength="4"
        value={phoneNumber.part3}
        onChange={(e) => setPhoneNumber(e, 'part3')}
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
