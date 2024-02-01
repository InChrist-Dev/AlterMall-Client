'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react'

export default function LogOutBtn(req,res){
  try{
    return ( <div>{req.query}</div>)
  }
  catch(error){
    console.error(error);
  }
 
  } 