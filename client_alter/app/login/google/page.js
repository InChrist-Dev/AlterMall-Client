'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react'

const LogOutBtn=(req,res)=>{
  try{
    const query = req.query;
    return ( <div>{query}</div>)
  }
  catch(error){
    console.error(error);
  }
 
  } 

export default LogOutBtn;