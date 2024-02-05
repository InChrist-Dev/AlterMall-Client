// seller.js
'use client'

import React, { useState,useEffect } from 'react';
import styles from './order.module.css';
import DeliveryInfoModal from './Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAllDeliveryInfoModal, setShowAllDeliveryInfoModal] = useState(false);
  const [deliveryList, setDeliveryList] = useState([]);
  // 간단한 상태 관리를 위해 useState 사용
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [quantity, setQuantity] = useState([]);
  const [items,setItems] = useState([]);
  const [orderName,setOrderName] = useState('');
  const handleClick = async () => {
    let amount = 0;
    const tosspayments = await loadTossPayments(
      'test_ck_yZqmkKeP8gyQllO0EnM4VbQRxB9l'
    );
    items.OrderDetails.map((item)=>{
      amount += item.price*item.stock;
    });
    
    await tosspayments.requestPayment('카드',{
      orderId: items.order_id,
      amount: amount,
      orderName: "알아서 조합해봄",
      successUrl: window.location.origin + "/api/payments",
      failUrl: window.location.origin,
     
    });
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
      (total, index) => total + items[index].Item.price * quantity[index],
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

  // 함수를 통해 배송 정보 업데이트
  const updateDeliveryInfo = (key, value) => {
    setDeliveryInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
   
  };

  const getImageUrl = () => {
    // 이미지 주소는 사용자가 제공한 것을 사용합니다.
    if (deliveryInfo.method === 'standard') {
      return './post.jpg';
    } else if (deliveryInfo.method === 'express') {
      return './today.jpg';
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };
  const selDeliver=(id)=>{
    setDeliveryInfo(deliveryList[id])
  }
  // 전체 주문 가격 계산
  const handleQuantityChange = (index, newAmount) => {
    const newQuantity = { ...quantity };
    newQuantity[index] = newAmount;
    setQuantity(newQuantity);

    const updatedItems = [...items];
    updatedItems[index].amount = newAmount;
    setItems(updatedItems);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/customer/order/`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      
      });
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data.data.rows[0]);
      setItems(data.data.rows[0]);

      const response2 = await fetch(`https://udtown.site/customer/deliver`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      
      });
      const data2 = await response2.json();
      console.log(data2);
      setDeliveryInfo(data2.data.rows[0]);
      setDeliveryList(data2.data.rows);
      // setItems(data.data.rows);
      
      // const initialQuantity = data.data.rows.map((item) => item.amount );
    
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
        <DeliveryInfoModal closeModal={closeModal} deliveryList={deliveryList} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.verticalInfo}>
          <div className={styles.infoTitle}>주문/결제</div>
          <div style={{border:'1px solid #ccc',marginTop:'50px',marginBottom:'20px'}}></div>
          <div className={styles.deliveryInfo}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
      <h2 className={styles.categoryTitle}>배송지 정보</h2>
    {/* 장인 버튼 */} <button className={styles.moreButton} onClick={openModal}>
        배송지 변경 ▶
      </button></div>
            <div className={styles.AddressBox}>
            {deliveryInfo.length > 0? deliveryInfo[0].name:''}
            <div>{deliveryInfo.length > 0? deliveryInfo[0].addr:''} {deliveryInfo.length > 0?deliveryInfo[0].addr_detail:''}</div>
            <div>{deliveryInfo.length > 0? deliveryInfo[0].phone:''}</div>
            </div>
            <div style={{border:'1px solid #ccc',marginTop:'50px',marginBottom:'20px'}}></div>
            <div className={styles.postBox}>
            <label>배송방법</label>
            <select
              className={styles.postOption}
              value={deliveryInfo.method}
              onChange={(e) => updateDeliveryInfo('method', e.target.value)}
            >
              <option value="standard">일반 배송</option>
              <option value="express">당일 배송</option>
            </select>
            <img src={getImageUrl()} className={styles.postImage} alt="배송 이미지" />

            </div>
        
          </div>

          <div className={styles.orderItems}>
            <h2>주문 물품 정보</h2>
            <table className={styles.productTable}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedItems.length === items.length}
                  onChange={toggleAllItemsSelection}
                />
                
              </th>
              <th>상품</th>
              <th>가격</th>
              <th>취소</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {/* {items.OrederDetails.map((items, index) => (
              <tr key={index} className={styles.productCard}>
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItemSelection(index)}
                  />
                </td>
                <td style={{display:'flex' , alignItems: 'center',}}>
                  
                  <img
                    src={`https://udtown.site/${items.Item.img}`}
                    alt={items.Item.item_name}
                    className={styles.productImage}
                  />
                
                    {items.Item.item_name}
                   
                 
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
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.amount - 1)
                      }
                    >-
                    </button>
                    <span>{items.amount}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(index,  items.amount + 1)
                      }
                    >+
                    </button>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
          </div>
        </div>
      </div>

      <div className={styles.stickySidebar}>
        <h2 >주문 결제 금액</h2>
        <div style={{border:'1px solid #ddd',marginTop:'20px',marginBottom:'20px'}}></div>
        <div>할인금액: 0원</div>
        <div>상품권: 0원</div>
        <div>
          <strong>총 주문 가격:</strong> {calculateTotalPrice().toLocaleString()}원
        </div>
        <button className={styles.BuyButton} onClick={handleClick}>{calculateTotalPrice().toLocaleString()}원 결제하기</button>
      </div>
    </div>
  );
};

export default Checkout;