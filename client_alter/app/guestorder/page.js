// seller.js
'use client'

import React, { useState, useEffect } from 'react';
import styles from './order.module.css';
import DeliveryInfoModal from './Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import DaumPostcode from 'react-daum-postcode';
// 쿠키에서 토큰을 가져오기
const myUuid = uuidv4();
console.log(myUuid);
const accessToken = Cookies.get('accessToken');
const Checkout = (props) => {
  const [order, setOrder] = useState([]);
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
  const [pw, setPW] = useState(''); // 직접 입력한 요청사항

  const [name, setName] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [phoneNumber3, setPhoneNumber3] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
  // 라디오 버튼 선택 시 호출되는 함수
  const handleOptionChange = (e) => {
    setRequestOption(e.target.value);
    // 선택한 값이 '직접입력'이면 직접 입력 창을 활성화
    if (e.target.value === '직접입력') {
      setCustomRequest('');
    }
  };
  const calculateTotalPrice = () => {
    let amount = 0;
    items.map((item) => {
      amount += item.price * item.stock;
    });
    return amount;
  };
  // 직접 입력 창 값 변경 시 호출되는 함수
  const handleCustomRequestChange = (e) => {
    setCustomRequest(e.target.value);
  };
  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };
  const handlePWChange = (e) => {
    setPW(e.target.value);
  };
  const handleClick = async () => {
    let amount = amounts;


    const firstItemName = items.length > 0 ? items[0].item_name : '';

    // 첫 번째 상품 이외의 상품 개수를 계산합니다.
    const otherItemsCount = items.length > 1 ? items.length - 1 : 0;

    const tosspayments = await loadTossPayments(
      'live_ck_E92LAa5PVbPo4JbZKdGB87YmpXyJ'
  
    );
    items.map((item) => {
      amount += item.price * item.stock;
    });
    console.log(amount)



    console.log(items);

    await fetch('https://altermall.site/customer/order', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        'order_id': order.order_id,
        'addr': address,
        'addr_detail': detailAddress,
        'requests': requestOption + '공동현관문 번호: ' + customRequest + request,
        'amount': calculateTotalPrice() + 3500,
        'delivery_type': deliveryInfo,
        'phone': phoneNumber1 + '-' + phoneNumber2 + '-' + phoneNumber3,
        'customer_name': name,
        'seller_id': items[0].seller_id
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
            items: items,
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
            orderId: order.order_id,
            amount: calculateTotalPrice() + 3500,
            orderName: `${firstItemName}외 ${otherItemsCount}건`,
            successUrl: 'https://altermall.site/customer/confirm',
            failUrl: window.location.origin,
          })
        )


        console.log(response);
        const data = await response.json();
        console.log(data)
      }


    })









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
  const addressClick = () => {
    const newIsAddress = !isAddress;
    setIsAddress(newIsAddress);
  }


  const handleComplete = (data) => {
    let fullAddress = data.address;
    setAddress(fullAddress);

  };


  // const toggleAllItemsSelection = () => {
  //   if (selectedItems.length === items.length) {
  //     setSelectedItems([]);
  //   } else {
  //     setSelectedItems([...Array(items.length).keys()]);
  //   }
  // };


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
      return 3500 + calculateTotalPrice();
    } else if (deliveryInfo == 'daily') {
      return 3500 + calculateTotalPrice();
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const getSub = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo == 'normal') {
      return 3500;
    } else if (deliveryInfo == 'daily') {
      return 3500;
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const selDeliver = (id) => {
    setDelivery(deliveryList[id])
  }

  const fetchData = async () => {
    try {




      const cartString = localStorage.getItem('order'); // 로컬 스토리지에서 데이터 가져오기
      const cartJson = JSON.parse(cartString); // JSON으로 변환

      console.log(cartJson);
      setOrder(cartJson);
      setItems(cartJson.items);

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.

      setAmounts(props.searchParams.amount)

      if (data.loginFail) {
        alert('다시 로그인 해주세요.');
        Cookies.remove('accessToken');
        window.location.href = 'https://altermall.shop/loginPage';
      }






      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.


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


      // const initialQuantity = data.data.rows[0].OrderDetails.map((item) => item.amount );

      // setQuantity(initialQuantity);




      // 데이터를 state로 업데이트하는 로직을 추가합니다.
      // 예를 들어, setCategoryName(data.data.items.map(item => item.item_name));
      // 필요한 모든 state를 업데이트해야 합니다.
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);
  console.log(deliveryList);
  return (
    <div className={styles.checkoutContainer}>
      <div style={{ display: showModal ? 'block' : 'none' }}>
        <DeliveryInfoModal closeModal={closeModal} deliveryList={deliveryList} selDeliver={selDeliver} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.verticalInfo}>
          <div className={styles.infoTitle}>비회원 주문/결제</div>
          <div style={{ border: '1px solid #ccc', marginTop: '50px', marginBottom: '20px' }}></div>
          <div className={styles.deliveryInfo}>
            <div style={{ justifyContent: 'space-between' }}>
              <h2 className={styles.categoryTitle}>배송지 정보</h2>

              <div>
                <label className={styles.label}>이름</label>
                <div>
                <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={styles.label}>전화번호</label>
                <div className={styles.call}>
                  <input
                    className={styles.inputCall}
                    type="text"
                    maxLength="3"
                    value={phoneNumber1}
                    onChange={(e) => setPhoneNumber1(e.target.value)}
                  />

                  <input
                    className={styles.inputCall}
                    type="text"
                    maxLength="4"
                    value={phoneNumber2}
                    onChange={(e) => setPhoneNumber2(e.target.value)}
                  />

                  <input
                    className={styles.inputCall}
                    type="text"
                    maxLength="4"
                    value={phoneNumber3}
                    onChange={(e) => setPhoneNumber3(e.target.value)}
                  />
                </div>
              </div>

            </div>
            <label className={styles.label}>주소</label>
            <div className={styles.addressButton}>
              <input className={styles.input} type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button className={styles.serchButton} onClick={() => { addressClick() }}>검색</button>
            </div>
            {isAddress ? <span><DaumPostcode onComplete={handleComplete} /></span> : ''}
            <div>


              <label className={styles.label}>상세 주소</label>
              <div>
              <input className={styles.input} type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
              </div>
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
                <div>
                  <label>비회원 확인번호(필수)</label>
                  <input
                    className={styles.request}
                    value={pw}
                    placeholder="직접 입력해주세요"
                    onChange={handlePWChange}
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