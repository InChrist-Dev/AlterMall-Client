'use client'
import { useState } from 'react';
import styles from './loginf.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password)
   
    try {
        const response = await fetch('https://udtown.site/auth/seller', {
          method: 'POST',
          body: JSON.stringify({
            'id':username,
            'pw': password,
          }), 
        });
  
        if (response.status == 200) {
         
    
        } else if (response.status == 201) {
          alert('저장되었습니다');
     
        } else {
          
        }
      } catch (error) {
        // 에러 처리
        console.error('Failed to send like request', error);
      }
  };
  

  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="username">아이디</label>
        <input className={styles.input}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label} htmlFor="password">비밀번호</label>
        <input className={styles.input}
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">확인</button>
      </form>
    </div>
  );
}
