'use client'
// UserInfo.jsx
import React, { useEffect, useState,useCallback } from 'react';
import styles from './pages.module.css';
import { fetchData } from 'next-auth/client/_utils';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const OrderHistory = () => {
  const [orders,setOrders] = useState([]);
  const [orderdetail,setOrderdetail] = useState([]);
  const [name,setName] = useState([]);
  const [selectedOrder,setSelectedOrder] = useState(false)
  try{
    const fetchData = async() =>{
      const response = await fetch(`http://localhost:8000/customer/order/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data.data.rows);
      setOrders(data.data.rows);
      setName(data.data.rows[0].OrderDetails[0])
      setOrderdetail(data.data.rows[0].OrderDetails)
    }
    useEffect(()=>{
      fetchData();
    },[])
  }catch{

  }
  const Cancel = useCallback(
    (id) => {
      const answer = confirm('주문을 취소하시겠습니까? 판매자가 수락했을 경우 취소가 불가능합니다.')
      if(answer){
        fetch(`http://localhost:8000/customer/cancel`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'order_id':id,
          })
  
        })
          .then((response) => {
            console.log(response)
            if (response.status == 405) {
              alert('삭제 실패하였습니다');
            } else if (response.status == 201) {
              alert('삭제되었습니다');
            } else if (response.status == 200) {
              alert('삭제되었습니다');
            }
  
  
          })
          .finally(() => {
            // window.location.reload();
          });
      }else{
        
      }
  

    },
    [],
  );
  return (
    <div>
      <div className={styles.topArea}>
      주문내역
    
  </div>
  {orders.map((order, index) => (
              <>
              <h3>{order.createdAt.slice(0,10)}</h3>
               <table className={styles.orderTable}>
           
          <tbody>
                <tr key={index} className={styles.orderRow}>
               
                  <img
                    src={`http://localhost:8000/${order.OrderDetails[0].img}`}
                    alt={order.OrderDetails[0].item_name}
                    className={styles.productImage}
                  />
                 
                  <td>{order.OrderDetails[0].item_name}외 {orderdetail.length}건</td>
                  <td>{order.amount}원</td>
                  
                  <td>
                    <p>주문자명: {order.customer_name}</p>
                
                    <p>주소: {order.addr} {order.addr_detail}</p>
                    <p>전화번호: {order.phone}</p>
                    <p>요청사항: {order.requests}</p>
                  </td>
                  <td>
                    <p>{order.delivery_type === 'daily' ? (
                      <img src='../../today.jpg' className={styles.postImage} alt="따끈 배송" />
                    ) : order.delivery_type === 'normal' ? (
                      <img src='../../post.jpg' className={styles.postImage} alt="택배 배송" />
                    ) : null}</p>
                    <p>  {order.state === 'paid' ? (
                      <span>결제완료</span>
                    ) : order.state === 'accept' ? (
                      <span>제조중</span>
                    ) : order.state === 'deliver' ? (
                      <span>전송완료</span>
                    ):order.state === 'cancelled' ? (
                      <span>결제취소</span>
                    ): null}</p>
                  </td>
                  
                  <td>
                {order.state!='cancelled'?<button className={styles.deleteButton}
                      onClick={() =>
                        {Cancel(order.order_id)}
                      }
                    >X
                    </button>:''}
                </td>
                  {/* 선택된 주문에 대한 상세 정보를 나타내는 부분 */}
                  <td>
                    <button
                      className={styles.detailBtn}
                      onClick={() => setSelectedOrder(!selectedOrder)}
                    >
                      상세보기
                    </button>
                    </td>
                </tr>
                <tr>
                  <td colSpan="9">
                    {selectedOrder && (
                      <div >

                        <table className={styles.detailTable}>
                      
                          <tbody>
                            {order.OrderDetails.map((detail, index) => (
                              <tr key={index}>
                                <td>  <img
                                  src={`http://localhost:8000/${detail.img} `}
                                  alt={detail.item_name}
                                  className={styles.productImage}
                                /></td>
                                <td>{detail.item_name}</td>
                                <td>{detail.price}원</td>
                                <td>{detail.stock}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>
                </tbody>
                </table>

              </>
            ))}
  </div>
  );
};

export default OrderHistory;
