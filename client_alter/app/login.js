'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
const fetchData = async () => {
  try {
    const response = await fetch('https://accounts.google.com/o/oauth2/v2/auth?client_id=531194003469-j54ppl86mr4a8orolgdbfia6asho979m.apps.googleusercontent.com&redirect_uri=http://localhost:8000/auth/google/login/redirect&response_type=code&scope=email profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    
      redirect: 'follow',
    });
    const data = await response.json();
    if (response.status == 200) {
     console.log(data);

    } else if (response.status == 201) {
      console.log(data);
    } else {
     
      console.log(data);
    }

  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};


export function LoginBtn() {
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => {window.location.href='https://accounts.google.com/o/oauth2/v2/auth?client_id=1034112248015-vkavbpp4tuuchguilgb9mpgitghsimd6.apps.googleusercontent.com&redirect_uri=https://udtown.site/auth/google/login/redirect&response_type=code&scope=email profile'}}/>)
} 