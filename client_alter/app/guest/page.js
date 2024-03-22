import { useEffect } from "react";

const Guest = (props) => {
    const fetchData = async () => {
        try {
        
           
    
    
          const response = await fetch(`https://altermall.site/customer/guest_order?order_id=${props.searchParams.order_id}`);
          const data = await response.json();
    
          // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
          // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
          console.log(data);
     

    
    
    
    
    
          
   
    
        } catch (error) {
          console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
      };
    
      // useEffect 안에서 fetchData 함수를 호출합니다.
      useEffect(() => {
        fetchData();
      }, []);
};

export default Guest;