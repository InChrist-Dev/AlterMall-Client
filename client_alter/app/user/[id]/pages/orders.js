'use client'
// UserInfo.jsx
import React, { useEffect, useState, useCallback } from 'react';
import styles from './pages.module.css';
import { fetchData } from 'next-auth/client/_utils';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);
  const [name, setName] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(false)
  try {
    const fetchData = async () => {
      const response = await fetch(`https://altermall.site/customer/order/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((response) => {
        console.log(response)
        if (response.status == 401) {
          alert('다시 로그인 해주세요');
          Cookies.remove('accessToken');
          window.location.href='/'
        }


      });
      const data = await response.json();
      console.log(data);
      setOrders(data.data.rows);
      setName(data.data.rows[0].OrderDetails[0])
      setOrderdetail(data.data.rows[0].OrderDetails)
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
        주문내역

      </div>
      {orders.map((order, index) => (
        <>
          <h3>{order.createdAt.slice(0, 10)}</h3>

          <div className={styles.AddressBox}>

            <div className={styles.containerBox}>
              <div className={styles.orderBox}>
              <div className={styles.orderBox}>
                <img
                  src={`https://altermall.site/${order.OrderDetails[0].img}`} 
                  alt={order.OrderDetails[0].item_name}
                  className={styles.productImage}
                />
                <div className={styles.titleBox}>
                  <div className={styles.orderTitle}>
                  <div className={styles.title}>{order.OrderDetails[0].item_name}외 {orderdetail.length}건</div>
                  <div className={styles.price}>{order.amount}원</div>
                  </div>
                  

                  <div>
                    <p>{order.customer_name}</p>

                    <p>{order.addr} {order.addr_detail}</p>
                    <p> {order.phone}</p>
                    <p>요청사항: {order.requests}</p>
                  </div>
                </div>
                </div>
                <div className={styles.descriptBox}>
                <div>
                    {order.state != 'cancelled' ? <button className={styles.deleteButton}
                      onClick={() => { Cancel(order.order_id) }
                      }
                    >주문 취소
                    </button> : ''}
                  </div>
                  <div className={styles.descriptStyle}>
                    <p>{order.delivery_type === 'daily' ? (
                      <img src='../../today.jpg' className={styles.postImage} alt="따끈 배송" />
                    ) : order.delivery_type === 'normal' ? (
                      <img src='../../post.jpg' className={styles.postImage} alt="택배 배송" />
                    ) : null}</p>
                    <p className={styles.pStyle}>  {order.state === 'paid' ? (
                      <span style={{'color':'green','fontWeight':'bold'}}>결제완료</span>
                    ) : order.state === 'accept' ? (
                      <span style={{'color':'red','fontWeight':'bold'}}>제조중</span>
                    ) : order.state === 'deliver' ? (
                      <span style={{'color':'blue','fontWeight':'bold'}}>전송완료</span>
                    ) : order.state === 'cancelled' ? (
                      <span>결제취소</span>
                    ) : null}</p>
                  </div>

              
                  {/* 선택된 주문에 대한 상세 정보를 나타내는 부분 */}
                  <div>
                    <button
                      className={styles.detailBtn}
                      onClick={() => setSelectedOrder(!selectedOrder)}
                    >
                      상세보기
                    </button>
                  </div>
                </div>

              </div>


              <tr>
                <td colSpan="9">
                  {selectedOrder && (
                    <div >

                      <table className={styles.detailTable}>

                        <tbody>
                          {order.OrderDetails.map((detail, index) => (
                            <tr key={index}>
                              <td>  <img
                                src={`https://altermall.site/${detail.img} `}
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
            </div>
          </div>

        </>
      ))}
    </div>
  );
};

export default OrderHistory;
