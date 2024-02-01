'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=1034112248015-vkavbpp4tuuchguilgb9mpgitghsimd6.apps.googleusercontent.com`
    url += `&redirect_uri=http://localhost:3000/login/google`
    url += '&response_type=code'
    url += '&scope=email profile' 
	 
const fetchData = async () => {
  try {
    const response = await fetch(`http://211.45.170.37:3000/login`);


   


  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};


export function LoginBtn() {
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => { window.location.href= url}}/>)
} 