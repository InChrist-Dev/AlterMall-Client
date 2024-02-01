
import { useSearchParams } from "next/navigation";


export default async function handler(req,res){
  try{
    const router = useSearchParams();
    const query = router;
    console.log(`${query} query is`)

    const url = `https://udtown.site/auth/google/login/redirect`;
    const fetchData = async () => {
      await fetch(url, {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect:'follow',
      body: 'router',



    })};
    fetchData();
    return (<div>success</div>);
  }
  catch(error){
    console.error(error);
    return (<div>fail</div>);
  }
 
  } 

