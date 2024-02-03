'use client'

import { useRouter, useSearchParams } from "next/navigation";



export default async function handler(){
  try{
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("accessToken");
    console.log(`${accessToken} query is`)

    const url = `https://udtown.site/auth/google/`;
    const fetchData = async () => {
      const response = await fetch(url, {
    
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
   
      redirect:'follow',
     

    }).then((res) => console.log(res.json()));
    const data = await response.status;
    console.log(data);
    const data1 = await response.status;
    console.log(data1);
  };
    fetchData();
    console.log('dd');
    return (<div>success</div>);
  }
  catch(error){
    console.error(error);
    return (<div>fail</div>);
  }
 
  } 

