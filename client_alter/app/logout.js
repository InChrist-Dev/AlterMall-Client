'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

 
  


export function LogOutBtn() {
 
    // const params = useSearchParams();
    // const query = params.get('code');
    // console.log(`${query} query is`)


    
   
  
 
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => {  Cookies.remove('accessToken');  Cookies.remove('position');}}/>)
} 