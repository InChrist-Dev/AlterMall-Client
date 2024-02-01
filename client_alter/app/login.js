'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const fetchData = async () => {
  try {
    const response = await fetch(`http://211.45.170.37:3000/login`);


   


  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};


export function LoginBtn() {
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => { }}/>)
} 