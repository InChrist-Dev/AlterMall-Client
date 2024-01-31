// seller.js
'use client'

import React, { useState,useEffect } from 'react';
import styles from './direct.module.css';
import DeliveryInfoModal from '../Modal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';
const Checkout = (props) => {
  const [showModal, setShowModal] = useState(false);
  // 간단한 상태 관리를 위해 useState 사용
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    method: 'standard',
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [items,setItems] = useState([]);
  const [deliver,setDeliver] = useState([]);
  
  const myUuid = uuidv4();
  console.log(myUuid);
  console.log(props);
  const handleClick = async () => {
    const tosspayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );

    await tosspayments.requestPayment('카드',{
      amount: calculateTotalPrice(),
      orderId: myUuid,
      orderName: items.item_name,
      successUrl: window.location.origin + "/api/payments",
      failUrl: window.location.origin,
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
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

    return items.price * quantity;
   
    
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
      return '../post.jpg';
    } else if (deliveryInfo.method === 'express') {
      return '../today.jpg';
    }
    // 다른 배송 방법에 대한 이미지 주소를 추가할 수 있습니다.
  };

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
      const response = await fetch(`http://211.45.170.37:3000/category/${props.searchParams.itemId}`);
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data);
    
      setItems(data);
      
      const initialQuantity = parseInt(props.searchParams.amount);
    
      setQuantity(initialQuantity);



      // 데이터를 state로 업데이트하는 로직을 추가합니다.
      // 예를 들어, setCategoryName(data.data.items.map(item => item.item_name));
      // 필요한 모든 state를 업데이트해야 합니다.
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  const fetchDeliver = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/customer/deliver/89122e30-b9c5-11ee-9d01-07fefcbd1ba0`);
      const data = await response.json();
  
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
   
      setDeliver(data.data.rows[0]);
     
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
    fetchDeliver();
  }, []);
  return (
    <div className={styles.checkoutContainer}>
        <div style={{ display: showModal ? 'block' : 'none' }}>
        <DeliveryInfoModal closeModal={closeModal} />
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
            {deliver.name}
            <div>{deliver.addr} {deliver.addr_detail}</div>
            <div>{deliver.phone}</div>
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
          
              <tr  className={styles.productCard}>
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                  
                    onChange={() => toggleItemSelection(index)}
                  />
                </td>
                <td style={{display:'flex' , alignItems: 'center',}}>
                  
                  <img
                    src={`http://211.45.170.37:3000/${items.img}`}
                    alt={items.item_name}
                    className={styles.productImage}
                  />
                
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
                        setQuantity(quantity - 1)
                      }
                    >-
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(quantity + 1)
                      }
                    >+
                    </button>
                  </div>
                </td>
              </tr>
            
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