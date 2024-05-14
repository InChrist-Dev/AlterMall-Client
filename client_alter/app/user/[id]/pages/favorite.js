'use client'
// UserInfo.jsx
import React, { useEffect, useState, useCallback } from 'react';
import styles from './pages.module.css';

import Cookies from 'js-cookie';
import Link from 'next/link';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const FavoriteProductsPage  = () => {
  const [items, setItems] = useState([]);


  
  try {
    const fetchData = async () => {
      const response = await fetch(`https://altermall.site/like/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data.data);
      setItems(data.data.items);

    }
    useEffect(() => {
      fetchData();
    }, [])
  } catch {

  }
  const Cancel = useCallback(
    (id) => {
      const answer = confirm('주문을 취소하시겠습니까? 판매자가 수락했을 경우 취소가 불가능합니다.')
      if (answer) {
        fetch(`https://altermall.site/customer/cancel`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'order_id': id,
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
      } else {

      }


    },
    [],
  );
  return (
    <div>
      <div className={styles.topArea}>
        찜한 상품

      </div>
      <div className={styles.cardCell}>

      
      {items.map((item, i) => {
   
    return (
      <>
      <div key={item} className={styles.productCard}>
        <Link href={`/products/${item.item_id}`} styles={{ textDecoration: "none" }}>
          <div className={styles.productLink}>
            <img src={`https://altermall.site/${item.img}`} alt={name} /> 
            <h4 style={{'color':'black'}}> {item.item_name}</h4>
          
           
          </div>
        </Link>
      </div>
      </>
    );
  })}
    </div>
    </div>
  );
};

export default FavoriteProductsPage ;




