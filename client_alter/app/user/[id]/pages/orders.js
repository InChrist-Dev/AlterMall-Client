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

  try{
    const fetchData = async() =>{
      const response = await fetch(`https://udtown.site/customer/order/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data.data.rows);
      setOrders(data.data.rows);
      
    }
    useEffect(()=>{
      fetchData();
    },[])
  }catch{

  }
  const Cancel = useCallback(
    (id) => {

      fetch(`https://udtown.site/customer/cancel`, {
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
          }


        })
        .finally(() => {
          // window.location.reload();
        });

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
                <tr key={index} className={styles.orderRow}>
               
                  <img
                    src={`https://udtown.site/${orderdetail.img}`}
                    alt={orderdetail.item_name}
                    className={styles.productImage}
                  />
                  <td>{order.amount}원</td>
                  <td>{orderdetail.item_name}외 {orderdetail.length}건</td>
                  <td>{order.updatedAt}</td>
                  <td>
                    <p>주문자명: {order.customer_name}</p>
                    <p>연락처: {order.phone}</p>
                    <p>우편번호: {order.post}</p>
                    <p>주소: {order.addr} {order.addr_detail}</p>
                  </td>
                  <td>
                    <p>배송 유형: {order.delivery_type}</p>
                    <p>요청 사항: {order.requests}</p>
                  </td>
                  <td>{order.state}</td>
                  <td>
                <button className={styles.deleteButton}
                      onClick={() =>
                        {Cancel(order.order_id)}
                      }
                    >X
                    </button>
                </td>
                  {/* 선택된 주문에 대한 상세 정보를 나타내는 부분 */}

                </tr>
            

              </>
            ))}
  </div>
  );
};

export default OrderHistory;
