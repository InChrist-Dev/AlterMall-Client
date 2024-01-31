'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const fetchData = async () => {
  try {
    const response = await fetch('https://udtown.site/auth/google/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    if (response.status == 200) {
     console.log(response.json);

    } else if (response.status == 201) {
      console.log(response.json);
    } else {
      console.log(response.json);
    }

  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};


export function LoginBtn() {
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => {fetchData(); }}/>)
} 