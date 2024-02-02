'use client'
import { useSearchParams } from "next/navigation";


export default async function handler(){
  try{
    const router = useSearchParams();
    const query = router;
    console.log(`${query} query is`)

    const url = `https://udtown.site/auth/google/login/redirect?${query}`;
    const fetchData = async () => {
      const response = await fetch(url, {
      method:'get',
      headers: {
        'Content-Type': 'application/json',
      },
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

