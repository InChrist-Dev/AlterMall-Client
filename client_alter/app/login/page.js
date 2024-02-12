'use client'
import { useEffect } from 'react';

import Cookies from 'js-cookie';

export default async function handler(){
  try{
    const parsedHash = new URLSearchParams(window.location.search.substring(1));
    const accessToken = parsedHash.get("accessToken");

    Cookies.set('accessToken', accessToken, { expires: 1 });  // 7일 동안 유지되도록 설정

      alert('로그인 되었습니다');
      window.location.href='https://altermall.shop';


    
  }
  catch(error){
    console.error(error);
    return (<div>loading...</div>);
  }
 
  } 

