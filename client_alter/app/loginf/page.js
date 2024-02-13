'use client'
import { useState } from 'react';
import styles from './loginf.module.css';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          Cookies.set('accessToken', json.accessToken, { expires: 1 });  // 1일 동안 유지되도록 설정
          window.location.href="https://altermall.shop/admin_seller"
        });
      } catch (error) {
        // 에러 처리
        console.error('Failed to send like request', error);
      }
  };
  

  return (
    <div className={styles.container}>
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
        <button className={styles.button}  onClick={handleSubmit}>확인</button>
      </span>
    </div>
  );
}
