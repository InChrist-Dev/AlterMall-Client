'use client'
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  useEffect(() => {
    try {
      const parsedHash = new URLSearchParams(window.location.search.substring(1));
      const accessToken = parsedHash.get("accessToken");

      Cookies.set('accessToken', accessToken, { expires: 1 });  // 7일 동안 유지되도록 설정

      const login = () => {
       
        window.location.href = 'https://altermall.shop';
      };

      login();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return null; // 로그인 페이지는 아무것도 렌더링하지 않습니다.
}
