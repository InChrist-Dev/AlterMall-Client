// seller.js
'use client'

import React, { useState, useEffect } from 'react';
import styles from './direct.module.css';
import DeliveryInfoModal from '../../order/Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
// 쿠키에서 토큰을 가져오기
const myUuid = uuidv4();
console.log(myUuid);
const accessToken = Cookies.get('accessToken');
const Checkout = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryList, setDeliveryList] = useState([]);
  const [delivery, setDelivery] = useState([]);
  // 간단한 상태 관리를 위해 useState 사용
  const [deliveryInfo, setDeliveryInfo] = useState('normal');
  const [items, setItems] = useState([]);
  const [amounts, setAmounts] = useState(1);
  const [requestOption, setRequestOption] = useState(''); // 선택한 요청사항
  const [customRequest, setCustomRequest] = useState(''); // 직접 입력한 요청사항
  const [request, setRequest] = useState(''); // 직접 입력한 요청사항
  const [refresh, setRefresh] = useState(false);
  // 라디오 버튼 선택 시 호출되는 함수
  const handleOptionChange = (e) => {
    setRequestOption(e.target.value);
    // 선택한 값이 '직접입력'이면 직접 입력 창을 활성화
    if (e.target.value === '직접입력') {
      setCustomRequest('');
    }
  };

  // 직접 입력 창 값 변경 시 호출되는 함수
  const handleCustomRequestChange = (e) => {
    setCustomRequest(e.target.value);
  };
  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };
  const handleClick = async () => {
    let amount = amounts;


    const tosspayments = await loadTossPayments(
      'live_ck_E92LAa5PVbPo4JbZKdGB87YmpXyJ'
    );

    amount += items.delivery;

    if (delivery) {
      console.log(items);

      await fetch('https://altermall.site/customer/order', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          'order_id': myUuid,
          'addr': delivery.addr,
          'addr_detail': delivery.addr_detail,
          'requests': requestOption + '공동현관문 번호: ' + customRequest + request,
          'amount': calculateTotalPrice() + items.delivery,
          'delivery_type': deliveryInfo,
          'phone': delivery.phone,
          'customer_name': delivery.name,
          'seller_id': items.seller_id
        }),
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (response.status == 405) {
          alert('주문 실패하였습니다');
        } else if (response.status == 201) {
          await fetch('https://altermall.site/customer/orderdetail', {
            method: 'post',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [{
                "order_id": myUuid,
                "seller_id": items.seller_id,
                "stock": amounts,//총 주문량
                "price": items.price, //가격
                "item_id": items.item_id,
                "item_name": items.item_name,
                "img": items.img
              }],
            }),
          }).then(async (response) => {
            if (response.status == 405) {
              alert('주문 실패하였습니다');
            } else if (response.status == 201) {
              const data = await response.json();
              console.log(data)
            }
          }).finally(

            await tosspayments.requestPayment('카드', {
              orderId: myUuid,
              amount: calculateTotalPrice() + items.delivery,
              orderName: `${items.item_name}`,
              successUrl: 'https://altermall.site/customer/confirm',
              failUrl: window.location.origin,
            })
          )
          const data = await response.json();
          console.log(data)
        }
      })
    } else {
      alert('배송지를 먼저 등록해주세요')
    }
  }

  const openModal = () => {
    setShowModal(true);
  };

  
  const closeModal = () => {
    setShowModal(false);

  };

  const calculateTotalPrice = () => {
    return items.price * amounts;


  };
  const getImageUrl = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return '../post.jpg';
    } else if (deliveryInfo == 'daily') {
      return '../today.jpg';
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const getPay = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return items.delivery + calculateTotalPrice();
    } else if (deliveryInfo == 'daily') {
      return items.delivery + calculateTotalPrice();
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const selDeliver = (id) => {
    setDelivery(deliveryList[id])
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/${props.searchParams.itemId}`);
      const data = await response.json();

      console.log(data);
      setAmounts(props.searchParams.amount)
      setItems(data);
      if (data.loginFail) {
        alert('다시 로그인 해주세요.');
        Cookies.remove('accessToken');
        window.location.href = 'https://altermall.shop/loginPage';
      }

      const response2 = await fetch(`https://altermall.site/customer/deliver`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });
      const data2 = await response2.json();
      console.log(data2)

      setDeliveryList(data2.data.rows);
      setDelivery(data2.data.rows[0])
      setInfo(data.data.rows[0]);

    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, [refresh]);
  console.log(deliveryList);
  return (
    <div className={styles.checkoutContainer}>
      <div style={{ display: showModal ? 'block' : 'none' }}>
        <DeliveryInfoModal refresh={refresh} closeModal={closeModal} deliveryList={deliveryList} selDeliver={selDeliver} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.verticalInfo}>
          <div className={styles.infoTitle}>주문/결제</div>
          <div style={{ border: '1px solid #ccc', marginTop: '50px', marginBottom: '20px' }}></div>
          <div className={styles.deliveryInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 className={styles.categoryTitle}>배송지 정보</h2>
               <button className={styles.moreButton} onClick={openModal}>
                배송지 변경 ▶
              </button></div>
            <div className={styles.AddressBox}>
              {delivery ? (
                <>
                  <div>{delivery.name}</div>
                  <div>{delivery.addr} {delivery.addr_detail}</div>
                  <div>{delivery.phone}</div>
                </>
              ) : (
                <>
                  <div>배송지 정보가 없습니다. 배송지를 변경해주세요</div>
                  <div></div>
                  <div></div>
                </>
              )}

            </div>
            <div style={{ border: '1px solid #ccc', marginTop: '50px', marginBottom: '20px' }}></div>
            <div className={styles.postBox}>
              <label>배송방법</label>
              <select
                className={styles.postOption}
                value={deliveryInfo}
                onChange={(e) => setDeliveryInfo(e.target.value)}
              >
                <option value="normal">택배 배송</option>

              </select>
              <img src={getImageUrl()} className={styles.postImage} alt="배송 이미지" />

            </div>
            <div className={styles.requestBox}>
              <label>배송시 요청사항</label>
              <div>
                {/* 옵션 선택 */}
                <select value={requestOption} onChange={handleOptionChange}>
                  <option value="">선택하세요</option>
                  <option value="노크x">노크x</option>
                  <option value="문앞에 두고 가주세요">문앞에 두고 가주세요</option>
                  <option value="직접입력">직접입력</option>
                </select>
                {requestOption === '직접입력' && (
                  <input
                    className={styles.request}
                    value={customRequest}
                    placeholder="직접 입력해주세요"
                    onChange={handleCustomRequestChange}
                  />
                )}
                <div>
                  <label>공동현관문 번호</label>
                  <input
                    className={styles.request}
                    value={request}
                    placeholder="직접 입력해주세요"
                    onChange={handleRequestChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.orderItems}>
            <h2>주문 물품 정보</h2>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>이미지</th>
                  <th>상품명</th>
                  <th>가격</th>

                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.productCard}>
                  <td style={{ display: 'flex', alignItems: 'center', }}>
                    <img
                      src={`https://altermall.site/${items.img}`}
                      alt={items.item_name}
                      className={styles.productImage}
                    />
                  </td>
                  <td>
                    {items.item_name}
                  </td>
                  <td>
                    <p>{items.price}원</p>
                  </td>
                  <td>
                    <div className={styles.quantityControl}>

                      <span>{amounts}</span>

                    </div>
                  </td>
                </tr>
                <tr style={{ "color": "#666", "fontWeight": "bold", "height": "100px" }}>
                  <td>⤷</td>
                  <td>배송비</td>

                  <td> + {items.delivery}원</td>
                  <td></td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.stickySidebar}>
        <h2 >주문 결제 금액</h2>
        <div style={{ border: '1px solid #ddd', marginTop: '20px', marginBottom: '20px' }}></div>
        <div> 상품금액:{calculateTotalPrice().toLocaleString()}원</div>
        <div>배송비: {items.delivery}원</div>
        <div>
          <strong>총 주문 가격:</strong> {getPay().toLocaleString()}원
        </div>
        <button className={styles.BuyButton} onClick={handleClick}>{getPay().toLocaleString()}원 결제하기</button>
      </div>
    </div>
  );
};

export default Checkout;