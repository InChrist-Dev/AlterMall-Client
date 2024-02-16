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
          'order_id':id
        })

      })
        .then((response) => {
          if (response.status == 405) {
            alert('삭제 실패하였습니다');
          } else if (response.status == 201) {
            alert('삭제되었습니다');
          }


        })
        .finally(() => {
          window.location.reload();
        });

    },
    [],
  );
  return (
    <div>
      <div className={styles.topArea}>
      주문내역
    
  </div>
  {orders.length>0 ?orders.map((order, index) => (
              <tr key={index} className={styles.productCard}>
              
                <td style={{display:'flex' , alignItems: 'center',}}>
                  
                  {/* <img
                    src={`https://udtown.site/${order.OrderDetails[0].img}`}
                    alt={order.OrderDetails[0].item_name}
                    className={styles.productImage}
                  />
                   {order.OrderDetails[0].item_name}외 건
                     */}
                   
                 
                </td>
                <td>
                  <p>{order.amount}원</p>
                </td>
                <td>
                <button className={styles.deleteButton}
                      onClick={() =>
                        {Cancel(orders.order_id)}
                      }
                    >X
                    </button>
                </td>
                <td>
                  <div className={styles.quantityControl}>
                  {items.stock}
                  </div>
                </td>
              </tr>
            )):''}
  </div>
  );
};

export default OrderHistory;
