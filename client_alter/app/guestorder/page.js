// seller.js
'use client'

import React, { useState, useEffect } from 'react';
import styles from './order.module.css';
import DeliveryInfoModal from './Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Cookies from 'js-cookie';
import DaumPostcode from 'react-daum-postcode';

// 쿠키에서 토큰을 가져오기

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
  const [totalShippingFee, setTotalShippingFee] = useState(0);
  const [sellerGroups, setSellerGroups] = useState({});
  const [category, setCategory] = useState([]);
  // 라디오 버튼 선택 시 호출되는 함수
  const handleOptionChange = (e) => {
    setRequestOption(e.target.value);
    // 선택한 값이 '직접입력'이면 직접 입력 창을 활성화
    if (e.target.value === '직접입력') {
      setCustomRequest('');
    }
  };
  useEffect(() => {
    const sellerGroups = {};
    console.log(items)
    if (items.length > 0) {
      items.forEach(product => {
        const sellerId = product.seller_id;
        console.log(sellerId)
        if (!sellerGroups[sellerId]) {
          sellerGroups[sellerId] = [];
        }
        sellerGroups[sellerId].push(product);
        console.log( sellerGroups[sellerId] )
       
      });
    }
    setSellerGroups(sellerGroups);

    // 각 판매자의 배송비 계산
    let totalFee = 0;
    Object.keys(sellerGroups).forEach(sellerId => {
      let sellerFee = 0;
      // 판매자별로 한 번만 배송비 계산
      let hasCalculatedFee = false;
      sellerGroups[sellerId].forEach(product => {
        if (!hasCalculatedFee) {
          if (sellerId === 'mkj0719') {
            sellerFee += 4500;
            setCategory(prevCategory => [sellerId, ...prevCategory]);
          } else if (sellerId === 'rabe') {
            sellerFee += 3500;
            setCategory(prevCategory => [sellerId, ...prevCategory]);
          }else if(sellerId =='h9101562'){
            sellerFee += 4500;
            setCategory(prevCategory => [sellerId, ...prevCategory]);
          }else if(sellerId =='janexz'){
            sellerFee += 3500;
            setCategory(prevCategory => [sellerId, ...prevCategory]);
          }else if(sellerId =='youngun133@naver.com'){
            sellerFee += 4000;
            setCategory(prevCategory => [sellerId, ...prevCategory]);
          }
          hasCalculatedFee = true; // 한 번만 계산되도록 플래그 설정
        }
      });
      totalFee += sellerFee;
    });
    console.log(totalFee)
    setTotalShippingFee(totalFee);
  }, [items])
 
  useEffect(() => {
    const handleUnload = () => {
      Cookies.remove('accessToken');
      Cookies.remove('position');
      console.log('페이지를 벗어났습니다.');
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  const calculateTotalPrice = () => {
    let amount = 0;
    let categories ='';
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

    let categories ='';
    const firstItemName = items.length > 0 ? items[0].item_name : '';

    // 첫 번째 상품 이외의 상품 개수를 계산합니다.
    const otherItemsCount = items.length > 1 ? items.length - 1 : 0;

    const tosspayments = await loadTossPayments(
      'live_ck_E92LAa5PVbPo4JbZKdGB87YmpXyJ'
  
    );
    items.map((item) => {
      amount += item.price * item.stock;
    });
    category.map((category) => {
      categories += `,${category}`;
    });
    amount += getSub();
    console.log(categories);
    if(address == ''){
      alert(`주소를 입력해주세요`)
    }else if(detailAddress == ''){
      alert(`상세주소를 입력해주세요`)
    }else  if(pw == ''){
      alert(`비밀번호를 입력해주세요`)
    }else  if(phoneNumber1 == ''){
      alert(`전화번호를 입력해주세요`)
    }else if(phoneNumber2 == ''){
      alert(`전화번호를 입력해주세요`)
    }else if(phoneNumber3 == ''){
      alert(`전화번호를 입력해주세요`)
    }else if(name == ''){
      alert(`이름을 입력해주세요`)
    }else {
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
          'amount': getPay(),
          'delivery_type': deliveryInfo,
          'phone': phoneNumber1 + '-' + phoneNumber2 + '-' + phoneNumber3,
          'customer_name': name,
          'customer_id': order.order_id,
          'seller_id':categories,
          "pw": pw,
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
             
              localStorage.setItem('pw', JSON.stringify({"pw":pw}));
              const data = await response.json();
              console.log(data)
            }
  
  
          }).finally(
  
            await tosspayments.requestPayment('카드', {
              orderId: order.order_id,
              amount: getPay() ,
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
  
    }

  
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
      return totalShippingFee + calculateTotalPrice();
    } else if (deliveryInfo == 'daily') {
      return totalShippingFee + calculateTotalPrice();
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const getSub = () => {

    if (deliveryInfo == 'normal') {
      return totalShippingFee;
    } else if (deliveryInfo == 'daily') {
      return totalShippingFee;
    }

  };

  const selDeliver = (id) => {
    setDelivery(deliveryList[id])
  }
  const sellerName = (sellerId) =>{
    if(sellerId =='rabe'){
      return '라베';
    }else if(sellerId =='mkj0719'){
      return '그린페블';
    }else if(sellerId =='h9101562'){
      return '다품다';
    }else if(sellerId =='janexz'){
      return '희건';
    }else if(sellerId =='youngun133@naver.com'){
      return '당가라 과자점';
    }

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
          <div className={styles.infoSub}>※비회원 주문은 취소가 불가능합니다. 신중히 결제해주세요</div>
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
                  <option value="노크x,문앞에 두고 가주세요">노크X, 문앞에 두고 가주세요</option>
                  <option value="부재시 경비실에 맡겨주세요">부재시 경비실에 맡겨주세요</option>
                  <option value="잘라서 주세요">잘라서 주세요</option>
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
        {
          Object.keys(sellerGroups).map((sellerId) => (
            <div key={sellerId}>
                 <div className={styles.SellerBox}>
              <h2>{sellerName(sellerId)} 주문 상품</h2>
              </div>
              <table className={styles.productTable}>
          
                <tbody>
                  {sellerGroups[sellerId].map(product => (
                    <tr key={product.item_id} className={styles.productCard}>
                      <td style={{ display: 'flex', alignItems: 'center', }}>
                        <img
                          src={`https://altermall.site/${product.img}`}
                          alt={product.item_name}
                          className={styles.productImage}
                        />
                      </td>
                      <td>{product.item_name}</td>
                      <td>{product.price}원</td>
                      <td>
                      <div className={styles.quantityControl}>
                    
                        <span>{product.stock}</span>
                  
                      </div>
                    </td>
                    </tr>
                  ))}
                  <tr style={{"color":"#666","fontWeight":"bold","height":"100px"}}>
                  <td>⤷</td>
                  <td>배송비</td>
                 
                  <td> + {sellerGroups[sellerId][0].delivery}원</td>
                  <td></td>
                   
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
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