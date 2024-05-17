// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from '../delivery.module.css'
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const DeliveryInfoModal = ({ closeModal,deliveryList,selDeliver  }) => {
  const [showAllAddresses, setShowAllAddresses] = useState(false);


  const showAllAddressesModal = () => {
    setShowAllAddresses(true);
  };

  const closeAllAddressesModal = () => {
    setShowAllAddresses(false);
  };
  const [addressname, setAddressName] = useState('');
  const [name,setName] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [phoneNumber3, setPhoneNumber3] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
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
    if(address == ''){
      alert('주소를 입력해주세요')
    }else if(detailAddress == ''){
      alert('상세주소를 입력해주세요')
    }else if(phoneNumber1 == '' || phoneNumber2 == '' || phoneNumber3 == ''){
      alert('전화번호를 입력해주세요')
    }else if(name == ''){
      alert('이름을 입력해주세요')
    }else{
      try {
        const response = await fetch('https://altermall.site/customer/deliver', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            "addr": address,
            "addr_detail": detailAddress,
            "phone": `${phoneNumber1}-${phoneNumber2}-${phoneNumber3}`,
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
    }
   
  };
  const AllClose = (i) =>{
    closeModal();
    selDeliver(i)
  }
  const delDeliver = async (id) => {
    try {
      const response = await fetch(`https://altermall.site/customer/deliver/${id}`, {
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
        window.location.href='https://altermall.shop/order';
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
            <div className={styles.deliverContainer}>
              <div className={styles.paddingDeliver}></div>
              <div className={styles.showDeliver} onClick={closeAllAddressesModal}>닫기 ▶</div>
            </div>
            <ul>
              {deliveryList.length>0?deliveryList.map((delivery,i) => (
                <li key={delivery.id}>

                  <div className={styles.addressContainer} onClick={()=>{AllClose(i)}}>
                    <div className={styles.deliverName}>{delivery.address_name}</div>
                    <div className={styles.elseInfo}>{delivery.addr}, {delivery.addr_detail}</div>
                    <div className={styles.elseInfo}>{delivery.phone}</div>
                    <div className={styles.deleteText} onClick={()=>{delDeliver(delivery.id)}}>배송지 삭제</div>
                  </div>
                </li>
              )):''}
            </ul>

            <div className={styles.deliverContainer}>

              <div className={styles.paddingDeliver}></div>
            </div>

          </div>
        ) : (
          // 기존 배송지 정보를 입력하는 모달
          <div className={styles.deliverContainer}>
            <div className={styles.paddingDeliver}></div>
            <div className={styles.showDeliver} onClick={showAllAddressesModal}>배송지 목록 보기 ▶</div>
          </div>
        )}

        <h2>배송지 정보 추가</h2><br/>
        <label className={styles.label}>배송지 구분</label>
        <input className={styles.input} type="text" value={addressname} onChange={(e) => setAddressName(e.target.value)} />

        <label className={styles.label}>이름</label>
        <input className={styles.input}type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label className={styles.label}>전화번호</label>
        <div className={styles.call}>
        <input
        className={styles.inputCall}
        type="text"
        maxLength="3"
        value={phoneNumber1}
        onChange={(e) => setPhoneNumber1(e.target.value)}
      />
      
      <input
        className={styles.inputCall}
        type="text"
        maxLength="4"
        value={phoneNumber2}
        onChange={(e) => setPhoneNumber2(e.target.value)}
      />
      
      <input
        className={styles.inputCall}
        type="text"
        maxLength="4"
        value={phoneNumber3}
        onChange={(e) => setPhoneNumber3(e.target.value)}
      />
        </div>
       
        <label className={styles.label}>주소</label>
        <div className={styles.addressButton}>
          <input className= {styles.input} type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button className={styles.serchButton} onClick={() => { addressClick() }}>검색</button>
        </div>
        {isAddress ? <span><DaumPostcode onComplete={handleComplete} /></span> : ''}
        <input className={styles.input} type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
        <div className={styles.buttonContainer}>
          <button className={styles.acceptButton} onClick={handleSubmit}>저장</button>
          <button className={styles.cancelButton} onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
