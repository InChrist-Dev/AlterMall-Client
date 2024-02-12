'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

 
  


export function LogOutBtn() {
 
    // const params = useSearchParams();
    // const query = params.get('code');
    // console.log(`${query} query is`)

    const url = 'https://udtown.site/auth/google';
    const fetchData = async () => {
      const response = await fetch(url, {

    });
    const data2 = await response.status;
    const data = await response.json();
    Cookies.remove('accessToken');
  };
   
    
   
  
 
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => { window.location.href='https://udtown.site/auth/logout'}}/>)
} 