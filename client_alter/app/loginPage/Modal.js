// DeliveryInfoModal.js
'use client'
import React from 'react';
import styles from './signin.module.css'
import { useState } from 'react';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const DeliveryInfoModal = ({ closeModal,refresh  }) => {
  const [showAllAddresses, setShowAllAddresses] = useState(false);



  const [addressname, setAddressName] = useState('');
  const [name,setName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
  const checkId = async(id) => {
    try {
      const response = await fetch(`https://altermall.site/auth/idcheck?id=${id}`, {
      
      });

      if (response.status == 200) {
       
  
      } else if (response.status == 201) {
        alert('저장되었습니다');
        closeModal();
        window.location.reload;
      } else {
        
      }
      const data = await response.json();
      console.log(data)
      if(data.result == false){
        alert('이미 존재하는 아이디입니다.')
      }else{
        alert('사용 가능한 아이디입니다. ')
      }
 
    } catch (error) {
      // 에러 처리
      console.error('Failed to send like request', error);
    }

  };



  const handleSubmit = async () => {


    
    try {
      const response = await fetch('https://altermall.site/auth/local/signin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          "id": id,
          "name": name,
          "phone":phone,
          "email":email,
          "pw": pw
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
      const response = await fetch(`https://altermall.site/customer/deliver/}`, {
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
        setRefresh(!refresh)
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
    

        <h2>간편 회원가입</h2>
      
        <label className={styles.label}>이름</label>
        <input  className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label className={styles.label}>이메일</label><button  className={styles.idCheck} onClick={()=>{checkId(id)}}>중복확인</button>
        <input className={styles.input} type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label className={styles.label}>비밀번호</label>
        <input className={styles.input} type="text" value={pw} onChange={(e) => setPw(e.target.value)} />
        {/* <label className={styles.label}>전화번호</label>
        <input className={styles.input} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label className={styles.label}>이메일</label>
        <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
         */}

        
       <div className={styles.buttonContainer}>
       <button  className={styles.acceptButton} onClick={handleSubmit}>가입</button>
        <button  className={styles.cancelButton}onClick={closeModal}>취소</button>
       </div>
    
       
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
