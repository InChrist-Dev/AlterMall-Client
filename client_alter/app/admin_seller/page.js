// ItemPage.jsx
'use client'
import React, { useEffect, useState,useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './admin_seller.module.css'; // Import the CSS module
import { v4 as uuidv4 } from 'uuid';

import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');

const ItemPage = (props) => {
  const [orders,setOrders] = useState([]);
  const [items,setItems] = useState([]);
  const myUuid = uuidv4();
  console.log(myUuid);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/seller/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        });
      const data = await response.json();
      console.log(data.data.rows);
      setOrders(data.data.rows);


    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
    try {
      const response = await fetch(`https://udtown.site/seller/items`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        });
      const data = await response.json();
      console.log(data.data.rows);
      setItems(data.data.rows);


    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }

  };
  const handleQuantityChange = (index, newAmount) => {
   
    if (newAmount >= 0) {
   
      const updatedItems = [...items];
      updatedItems[index].stock = newAmount;
      setItems(updatedItems);
    } else {
    

      const updatedItems = [...items];
      updatedItems[index].stock = 0;
      setItems(updatedItems);
    }};
  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);

  const Cancel = useCallback(
    (id) => {
     
      fetch(`https://udtown.site/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
    
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

  const Update = useCallback(
    (id,stock) => {
     
      fetch(`https://udtown.site/category/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'stock': stock,
        }),
    
      })
        .then((response) => {
          if (response.status == 405) {
            alert('수정 실패하였습니다');
          } else if (response.status == 201) {
            alert('수정되었습니다');
          }


        })
        .finally(() => {
          window.location.reload();
        });

    },
    [],
  );
  return (
    <div style={{'marginBottom':'100px'}}>
      <h1 className={styles.title}>관리자 주문/조회</h1>
      <div className={styles.basketContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
           
              <th>상품</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>취소</th>
              <th>재고</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index} className={styles.productCard}>
              
                <td style={{display:'flex' , alignItems: 'center',}}>
                  
                  <img
                    src={`https://udtown.site/${items.img}`}
                    alt={items.item_name}
                    className={styles.productImage}
                  />
                  <td>
                  {items.category}
                  </td>
                   
                    {items.item_name}
                  
                    
                   
                 
                </td>
                <td>
                  <p>{items.price}원</p>
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
                  <button
                      onClick={() =>
                        handleQuantityChange(index, items.stock - 1)
                      }
                    >-
                    </button>
                    <span>{items.stock}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(index,  items.stock + 1)
                      }
                    >+
                    </button>
                    <button
                      onClick={() =>
                        Update(items.id,items.stock)
                      }
                    >재고저장
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <table className={styles.orderTable}>
        <thead>
            <tr>
            <th>이미지</th>
              <th>주문 ID</th>
              <th>상품명</th>
              <th>가격</th>
              
              <th>주문 일자</th>
              <th>주문자 정보</th>
              <th>배송 정보</th>
              <th>상태</th>
              <th>취소</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className={styles.orderRow}>
                   <img
                    src={`https://udtown.site/${order.Item.img}`}
                    alt={order.Item.item_name}
                    className={styles.productImage}
                  />
                <td>{order.Order.order_id}</td>
                <td>{order.Item.item_name}</td>
                <td>{order.Item.price}원</td>
              
                <td>{order.Order.createdAt}</td>
                <td>
                  <p>주문자명: {order.Order.customer_name}</p>
                  <p>연락처: {order.Order.phone}</p>
                  <p>우편번호: {order.Order.post}</p>
                  <p>주소: {order.Order.addr} {order.Order.addr_detail}</p>
                </td>
                <td>
                  <p>배송 유형: {order.Order.delivery_type}</p>
                  <p>특별 요청: {order.Order.requests}</p>
                </td>
                <td>{order.Order.state}</td>
                <td>
                  <button
                    className={styles.cancelButton}
                    
                  >
                    취소
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
      
      
        
    </div>
  );
};

export default ItemPage;
