'use client'
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default async function handler() {
  useEffect(() => {
    try {
      const parsedHash = new URLSearchParams(window.location.search.substring(1));
      const accessToken = parsedHash.get("accessToken");

      Cookies.set('accessToken', accessToken, { expires: 1 });  // 7일 동안 유지되도록 설정

      const login = () => {
        alert('로그인 되었습니다');
        window.location.href = 'https://altermall.shop';
      };

      login();
    } catch (error) {
      console.error(error);
    }
  }, []); // 빈 배열을 전달하여 useEffect가 컴포넌트가 처음으로 마운트될 때 한 번만 실행되도록 함
}
