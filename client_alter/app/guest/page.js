'use client'
import { useEffect ,useState} from "react";
import styles from './guest.module.css';
const Guest = (props) => {
  const [data,setData] = useState();
    const fetchData = async () => {
        try {
        
           
    
    
          const response = await fetch(`https://altermall.site/customer/guest_order?order_id=${props.searchParams.order_id}`);
          const data = await response.json();
    
          // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
          // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
          setData(data);
     

    
    
    
    
    
          
   
    
        } catch (error) {
          console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
      };
    
      // useEffect 안에서 fetchData 함수를 호출합니다.
      useEffect(() => {
        fetchData();
      }, []);
      return (
        <div className={styles.container}>
        <h1 className={styles.title}>비회원 주문 조회</h1>
        {data ? (
          <div className={styles.orderInfo}>
            <p className={styles.orderDate}>주문일시: {data.data.rows[0].createdAt.slice(0, 10)}</p>
            <p className={styles.itemCount}>주문 상품 수: {data.data.totalItemCount}</p>
            <p className={styles.totalAmount}>총 주문 금액: {data.data.rows[0].amount}원</p>
            <div className={styles.productList}>
              {data.data.rows[0].OrderDetails.map((detail, index) => (
                <div key={index} className={styles.productItem}>
                  <img src={`https://altermall.site/${detail.img}`} alt={detail.item_name} className={styles.productImage} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{detail.item_name}</p>
                    <p className={styles.itemPrice}>가격: {detail.price}원</p>
                    <p className={styles.itemStock}>수량: {detail.stock}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.deliveryInfo}>
              <p className={styles.deliveryTitle}>배송 정보</p>
              <p>수령인: {data.data.rows[0].customer_name}</p>
              <p>주소: {data.data.rows[0].addr} {data.data.rows[0].addr_detail}</p>
              <p>전화번호: {data.data.rows[0].phone}</p>
              <p>배송 요청사항: {data.data.rows[0].requests}</p>
            </div>
          </div>
        ) : (
          <p className={styles.noOrder}>주문 정보가 없습니다.</p>
        )}
      </div>
      );
};

export default Guest;