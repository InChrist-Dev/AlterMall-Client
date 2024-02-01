'use client';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react'

export default async function LogOutBtn(req,res){
  try{
    const query = await req.query;
    return ( <div>{query}</div>)
  }
  catch(error){
    console.error(error);
  }
 
  } 