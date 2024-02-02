'use client'

import { useSearchParams } from "next/navigation";



export default async function handler(){
  try{
    const params = useSearchParams();
    const query = params.get('code');
    console.log(`${query} query is`)

    const url = `https://udtown.site/auth/google/login/redirect?code=${query}`;
    const fetchData = async () => {
      const response = await fetch(url, {
      method:'get',
   
      redirect:'follow',
     

    });
    const data = await response.status;
    console.log(data);
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

