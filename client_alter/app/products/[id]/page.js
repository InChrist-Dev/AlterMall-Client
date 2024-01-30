// ItemPage.js
'use client'
import React, { useState, useEffect,useCallback } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ItemPage = (props) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(20000); // Assume an initial price
  const [newprice, setNewPrice] = useState(20000); // Assume an initial price
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState('');
  const fetchData = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/category/${props.params.id}`);
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data);
      setPrice(data.price);
      setNewPrice(data.price);
      setName(data.item_name);
      setImg(data.img);
      setStock(data.stock);
      setId(data.item_id);


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
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setPrice(newQuantity * newprice); // Adjust the price based on your business logic
  };
  const Quantity = () => {
    const result = [];
    for (let i = 1; i <= 30; i++) {
      result.push(<option key={i} value={i}>{i}</option>);
    }
    return result;
  };
  const handleSubmit = useCallback(
    (event) => {
      const formData = new FormData();
      formData.append('amount', quantity); // title 媛� 異붽��
      formData.append('item_id', id); // description 媛� 異붽��
      
      formData.append('customer_id', 'c5d09ba0-b46a-11ee-a85d-8b9962d6ed6e');

      fetch(`http://211.45.170.37:3000/customer/cart/`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount: quantity ,item_id: id,customer_id: '89122e30-b9c5-11ee-9d01-07fefcbd1ba0'}),
      })
        .then((response) => {
          if (response.status == 405) {
            alert('컨텐츠 저장에 실패하였습니다');
          } else if (response.status == 201) {
            alert('저장되었습니다');
          }


        })
        .finally(() => {
          console.log("저장완료")
        });

    },
    [quantity, id, newprice],
  );
  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productImage}>
        {/* Assume productImage is a prop passed from parent component */}
        <img src={`http://211.45.170.37:3000/${img}`} alt="Product Image" />
      </div>

      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h1 >{name}</h1>
          <p>배달방법: 특급배달</p>
          <p>제품구성: 밀가루, 버터, 우유, 달걀, 설탕포함</p>
          <p>보관법: 냉동보관</p>
          <p>안내: 해당제품은 보관 후 3일 안에 드셔주세요</p>
          <p>재고: {stock}</p>
        </div>

        <div className={styles.productOptions}>
          <div className={styles.dropdown}>
            <label>옵션</label>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className={styles.dropdown}>
            <label>주문수량</label>
            <select onChange={(e) => handleQuantityChange(e.target.value)}>

              {Quantity()}
              {/* Add more quantity options as needed */}
            </select>
          </div>

          <div className={styles.price}>
            <p>{price.toLocaleString()}원</p>
          </div>
          <button className={styles.addToCartButton} onClick={handleSubmit}>장바구니</button>
          <button className={styles.BuyButton}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
