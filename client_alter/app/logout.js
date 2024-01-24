'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react'

export function LogOutBtn(){
  return ( <FontAwesomeIcon   className="userIcon"icon={faUser} onClick={() => { signOut() }}/>)
  } 