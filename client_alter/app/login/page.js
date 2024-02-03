'use client'

import { useSearchParams } from "next/navigation";



export default async function handler(){
  try{
    const params = new URLSearchParams(window.location.hash.substring(1));
    const query = params.get('accessToken');
    console.log(`${query} query is`)

    const url = `https://udtown.site/auth/google/login/`;
    const fetchData = async () => {
      const response = await fetch(url, {
    
      headers: {
        Authorization: `Bearer  ${basicToken}`,
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

