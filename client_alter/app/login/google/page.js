'use client'

import { useSearchParams } from "next/navigation";



export default async function handler(){
  try{
    const params = URLSearchParams(window.location.hash.substring(1));
    const query = params.get('access_token');
    console.log(`${query} query is`)

    const url = `/auth/google/login/`;
  //   const fetchData = async () => {
  //     const response = await fetch(url, {
  //     method:'get',
   
  //     redirect:'follow',
     

  //   });
  //   const data = await response.status;
  //   console.log(data);
  // };
    fetchData();
    console.log('dd');
    return (<div>success</div>);
  }
  catch(error){
    console.error(error);
    return (<div>fail</div>);
  }
 
  } 

