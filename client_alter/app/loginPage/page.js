'use client'
import { useState } from 'react';
import styles from './login_selller.module.css';
import Cookies from 'js-cookie';
import DeliveryInfoModal from './Modal';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async () => {
  
    console.log(username,password)
   
    try {
        const response = await fetch('https://udtown.site/auth/seller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": username,
            "pw": password,
           
          }), 
        }) .then((res) => res.json())
        .then((json) => {
          console.log(json.accessToken)
          console.log(json.position)
          Cookies.set('position', json.position, { expires: 1 });  // 1일 동안 유지되도록 설정
          Cookies.set('accessToken', json.accessToken, { expires: 1 });  // 1일 동안 유지되도록 설정
          if(json.position == 'seller'){
            window.location.href="https://altermall.shop/admin_seller"
          }else{
            alert('사장님 계정이 아닙니다. 다시 확인해주세요')
          }
         
        });
      } catch (error) {
        // 에러 처리
        console.error('Failed to send like request', error);
      }
  };
  const handleSubmit1 = async () => {
  
    console.log(username,password)
   
    try {
        const response = await fetch('https://udtown.site/auth/local/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": username,
            "pw": password,
           
          }), 
        }) .then((res) => res.json())
        .then((json) => {
          console.log(json)
          Cookies.set('position', json.position, { expires: 1 });  // 1일 동안 유지되도록 설정
          Cookies.set('accessToken', json.accessToken, { expires: 1 });  // 1일 동안 유지되도록 설정
          if(json.position == 'customer'){
            window.location.href="https://altermall.shop/user"
          }else{
            alert('구매자 계정이 아닙니다. 다시 확인해주세요')
          }
       
        });
      } catch (error) {
        // 에러 처리
        console.error('Failed to send like request', error);
      }
  };
  

  return (
    <div className={styles.container}>
       <div style={{ display: showModal ? 'block' : 'none' }}>
        <DeliveryInfoModal closeModal={closeModal} />
      </div>
      <h1>로그인</h1>
      <span  className={styles.form}>
        <label className={styles.label} htmlFor="username">아이디</label>
        <input className={styles.input}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label} htmlFor="password">비밀번호</label>
        <input className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button className={styles.registerBtn} onClick={openModal}>
                회원가입
              </button>
              <div className={styles.groupBtn}>
              <button className={styles.sellerButton}  onClick={handleSubmit}>사장님 로그인</button>
        <button className={styles.localButton}  onClick={handleSubmit1}>회원 로그인</button>
              </div>
      
        
      </span>
      <h3>소셜 로그인</h3>
      <img className={styles.google} src='/google.png'  onClick={()=>{window.location.href="https://udtown.site/auth/google"}}/>
    </div>
  );
}
