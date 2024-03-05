'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



 
  


export function LoginBtn() {
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => { window.location.href='http://localhost:3000/loginPage'}}/>)
} 