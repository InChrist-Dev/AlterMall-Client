// seller.js
'use client'

import React, { useState, useEffect } from 'react';
import styles from './order.module.css';
import DeliveryInfoModal from './Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryList, setDeliveryList] = useState([]);
  const [delivery, setDelivery] = useState([]);
  // 간단한 상태 관리를 위해 useState 사용
  const [deliveryInfo, setDeliveryInfo] = useState('normal');
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [requestOption, setRequestOption] = useState(''); // 선택한 요청사항
  const [customRequest, setCustomRequest] = useState(''); // 직접 입력한 요청사항
  const [save,setSave] = useState(false);
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
    let amount = 0;
    // 상품 목록을 표시하는 부분에서 첫 번째 상품의 이름을 추출합니다.
    const firstItemName = items.length > 0 ? items[0].item_name : '';

    // 첫 번째 상품 이외의 상품 개수를 계산합니다.
    const otherItemsCount = items.length > 1 ? items.length - 1 : 0;

    const tosspayments = await loadTossPayments(
      'live_ck_E92LAa5PVbPo4JbZKdGB87YmpXyJ'
    );
    items.map((item) => {
      amount += item.price * item.stock;
    });
    amount += getSub();
   
    if (delivery) {
      console.log(items);

      await fetch('https://udtown.site/customer/order', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          'order_id': info.order_id,
          'addr': delivery.addr,
          'addr_detail': delivery.addr_detail,
          'requests': requestOption,
          'amount': amount,
          'delivery_type': deliveryInfo,
          'phone': delivery.phone,
          'customer_name':delivery.name,
        
        }),
      });
    
      await tosspayments.requestPayment('카드', {
        orderId: info.order_id,
        amount: amount,
        orderName: `${firstItemName}외 ${otherItemsCount}건`,
        successUrl: 'https://udtown.site/customer/confirm',
        failUrl: window.location.origin,
      });

    } else {
      alert('배송지를 먼저 등록해주세요')
    }







    // }).then(async (response) => {
    //   if (response.status == 405) {
    //     alert('주문 실패하였습니다');
    //   } else if (response.status == 201) {
    //     alert('주문페이지로 넘어갑니다');
    //     console.log(response);
    //     const data = await response.json();
    //     console.log(data)
    //   }


    // }).finally(

    // )
  }

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
 
  };
  const toggleItemSelection = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };
  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, index) => total + items[index].price * items[index].stock,
      0
    );
  };

  const toggleAllItemsSelection = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(items.length).keys()]);
    }
  };


  const getImageUrl = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return './post.jpg';
    } else if (deliveryInfo == 'daily') {
      return './today.jpg';
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const getPay = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return 4000+calculateTotalPrice();
    } else if (deliveryInfo == 'daily') {
      return 4000+calculateTotalPrice();
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
    setDelivery(deliveryList[id])
    setSave(!save);
    closeModal();
  }
  // 전체 주문 가격 계산
  const handleQuantityChange = (index, newAmount) => {
    if (newAmount >= 0) {
      const newQuantity = { ...quantity };
      newQuantity[index] = newAmount;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].stock = newAmount;
      setItems(updatedItems);
    } else {
      const newQuantity = { ...quantity };
      newQuantity[index] = 0;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].stock = 0;
      setItems(updatedItems);
    }

  };
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/customer/payproduct`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });
      const data = await response.json();
      console.log(data)

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.

      setItems(data.data.rows[0].OrderDetails);

      const response2 = await fetch(`https://udtown.site/customer/deliver`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });
      const data2 = await response2.json();
     
      setDeliveryList(data2.data.rows);
      setDelivery(data2.data.rows[0])
      setInfo(data.data.rows[0]);
      setSelectedItems([...Array(data.data.rows[0].OrderDetails.length).keys()]);

  
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, [delivery]);



  return (
    <div className={styles.checkoutContainer}>
      <div style={{ display: showModal ? 'block' : 'none' }}>
        <DeliveryInfoModal closeModal={closeModal} deliveryList={deliveryList} selDeliver={selDeliver} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.verticalInfo}>
          <div className={styles.infoTitle}>주문/결제</div>
          <div style={{ border: '1px solid #ccc', marginTop: '50px', marginBottom: '20px' }}></div>
          <div className={styles.deliveryInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 className={styles.categoryTitle}>배송지 정보</h2>
              {/* 장인 버튼 */} <button className={styles.moreButton} onClick={openModal}>
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
                <option value="normal">일반 배송</option>
                <option value="daily">당일 배송</option>
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
        {/* 직접 입력 창 */}
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
                  {/* <th>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedItems.length === items.length}
                      onChange={toggleAllItemsSelection}
                    />

                  </th> */}
                  <th>이미지</th>
                  <th>상품명</th>
                  <th>가격</th>
              
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? items.map((items, index) => (
                  <tr key={index} className={styles.productCard}>
                    {/* <td>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectedItems.includes(index)}
                        onChange={() => toggleItemSelection(index)}
                      />
                    </td> */}
                    <td style={{ display: 'flex', alignItems: 'center', }}>

                      <img
                        src={`https://udtown.site/${items.img}`}
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
                        {/* <button
                          onClick={() =>
                            handleQuantityChange(index, items.stock - 1)
                          }
                        >-
                        </button> */}
                        <span>{items.stock}</span>
                        {/* <button
                          onClick={() =>
                            handleQuantityChange(index, items.stock + 1)
                          }
                        >+
                        </button> */}
                      </div>
                    </td>
                  </tr>
                )) : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.stickySidebar}>
        <h2 >주문 결제 금액</h2>
        <div style={{ border: '1px solid #ddd', marginTop: '20px', marginBottom: '20px' }}></div>
        <div> 상품금액:{calculateTotalPrice().toLocaleString()}원</div>
        {/* <div>할인금액: 0원</div>
        <div>상품권: 0원</div> */}
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