// seller.js
'use client'

import React, { useState, useEffect } from 'react';
import styles from './direct.module.css';
import DeliveryInfoModal from '../Modal';
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

  const [quantity, setQuantity] = useState([]);
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [amounts, setAmounts] = useState(1);
  const [requestOption, setRequestOption] = useState(''); // 선택한 요청사항
  const [customRequest, setCustomRequest] = useState(''); // 직접 입력한 요청사항
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

  const handleClick = async () => {
    let amount = amounts;
    // 상품 목록을 표시하는 부분에서 첫 번째 상품의 이름을 추출합니다.
    const firstItemName = items.length > 0 ? items[0].item_name : '';

    // 첫 번째 상품 이외의 상품 개수를 계산합니다.
    const otherItemsCount = items.length > 1 ? items.length - 1 : 0;

    const tosspayments = await loadTossPayments('live_ck_E92LAa5PVbPo4JbZKdGB87YmpXyJ');

    amount += getSub();

    if (delivery) {
      console.log(items);

      await fetch('https://udtown.site/customer/order', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'seller_id': items.seller_id,
          'order_id': myUuid,
          'addr': delivery.addr,
          'addr_detail': delivery.addr_detail,
          'requests': requestOption,
          'amount': amount,
          'delivery_type': deliveryInfo,
          'phone': delivery.phone,
          'customer_name': delivery.name,
        }),
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (response.status == 405) {
          alert('주문 실패하였습니다');
        } else if (response.status == 201) {
          await fetch('https://udtown.site/customer/orderdetail', {
            method: 'post',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: orderItems,
            }),
          }).then(async (response) => {
            if (response.status == 405) {
              alert('주문 실패하였습니다');
            } else if (response.status == 201) {
              const data = await response.json();
              console.log(data)
            }
          }).finally(

          )
          await tosspayments.requestPayment('카드', {
            orderId: myUuid,
            amount: amount,
            orderName: `${firstItemName}외 ${otherItemsCount}건`,
            successUrl: 'https://udtown.site/customer/confirm',
            failUrl: window.location.origin,
          });
        }
      }).catch((error) => {
        console.error('주문 처리 중 오류가 발생했습니다:', error);
      });
    } else {
      alert('배송지를 먼저 등록해주세요');
    }
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
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
      return 4000 + calculateTotalPrice();
    } else if (deliveryInfo == 'daily') {
      return 4000 + calculateTotalPrice();
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };

  const getSub = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return 4000;
    } else if (deliveryInfo == 'daily') {
      return 4000;
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };

  const selDeliver = (id) => {
    setDelivery(deliveryList[id]);
  };

  const calculateTotalPrice = () => {
    return items.price*amounts;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/category/${props.searchParams.itemId}`);
      const data = await response.json();

      setAmounts(props.searchParams.amount);
      setItems(data);

      const response2 = await fetch(`https://udtown.site/customer/deliver`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data2 = await response2.json();
      console.log(data2);

      setDeliveryList(data2.data.rows);
      setDelivery(data2.data.rows[0]);
      setInfo(data.data.rows[0]);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
              </button>
            </div>
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
                <option value="normal">일반 배송</option>
                <option value="daily">당일 배송</option>
              </select>
              <img src={getImageUrl()} className={styles.postImage} alt="배송 이미지" />
            </div>
            <div className={styles.requestBox}>
              <label>배송시 요청사항</label>
              <div>
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
                {items.map((item, index) => (
                  <tr key={index} className={styles.productCard}>
                    <td style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={`https://udtown.site/${item.img}`}
                        alt={item.item_name}
                        className={styles.productImage}
                      />
                    </td>
                    <td>{item.item_name}</td>
                    <td>
                      <p>{item.price}원</p>
                    </td>
                    <td>
                      <div className={styles.quantityControl}>
                        <span>{item.stock}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.stickySidebar}>
        <h2>주문 결제 금액</h2>
        <div style={{ border: '1px solid #ddd', marginTop: '20px', marginBottom: '20px' }}></div>
        <div>상품금액: {calculateTotalPrice().toLocaleString()}원</div>
        <div>배송비: {getSub().toLocaleString()}원</div>
        <div>
          <strong>총 주문 가격:</strong> {getPay().toLocaleString()}원
        </div>
        <button className={styles.BuyButton} onClick={handleClick}>{getPay().toLocaleString()}원 결제하기</button>
      </div>
    </div>
  );
};

export default Checkout;
