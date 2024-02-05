'use client'

import { useRouter, useSearchParams } from "next/navigation";

import Cookies from 'js-cookie';

export default async function handler(){
  try{
    const parsedHash = new URLSearchParams(window.location.search.substring(1));
    const accessToken = parsedHash.get("accessToken");
    console.log(`${accessToken} query is`)
    Cookies.set('accessToken', accessToken, { expires: 7 });  // 7일 동안 유지되도록 설정
    const url = `https://udtown.site/auth/google`;

   
    return (<button onClick={window.location.href='https://altermall.shop'}/>);
  }
  catch(error){
    console.error(error);
    return (<div>loading...</div>);
  }
 
  } 

