'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/dist/server/api-utils';
let url = 'https://accounts.google.com/o/oauth2/v2/auth';
url += `?client_id=1034112248015-vkavbpp4tuuchguilgb9mpgitghsimd6.apps.googleusercontent.com`
url += `&redirect_uri=https://altermall.shop/login/google`
url += '&response_type=code'
url += '&scope=email profile' 

const fetchData = async () => {
  try {
    redirect(url);
    console.log(response);


   


  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};


export function LoginBtn() {
  console.log(url)
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => {window.location.href = `${url}`}}/>)
} 