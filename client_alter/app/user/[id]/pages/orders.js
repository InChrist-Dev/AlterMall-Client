'use client'
// UserInfo.jsx
import React, { useEffect, useState } from 'react';
import styles from './pages.module.css';
import { fetchData } from 'next-auth/client/_utils';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const OrderHistory = () => {
  const [orders,setOrders] = useState([]);
  try{
    const fetchData = async() =>{
      const response = await fetch(`https://udtown.site/customer/order`, {
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
    })
  }catch{

  }
 
  return (
    <div>
      <div className={styles.topArea}>
      주문내역
    
  </div>
  {orders.map((items, index) => (
              <tr key={index} className={styles.productCard}>
              
                <td style={{display:'flex' , alignItems: 'center',}}>
                  
                  <img
                    src={`https://udtown.site/${items.OrderDetails[0].img}`}
                    alt={items.OrderDetails[0].item_name}
                    className={styles.productImage}
                  />
                   {orders.OrderDetails[0].item_name}외 건
                    
                   
                 
                </td>
                <td>
                  <p>{items.Item.price}원</p>
                </td>
                <td>
                <button className={styles.deleteButton}
                      onClick={() =>
                        {Cancel(items.id)}
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
            ))}
  </div>
  );
};

export default OrderHistory;
