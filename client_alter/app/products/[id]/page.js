// ItemPage.js
'use client'
import React, { useState } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ItemPage = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(20000); // Assume an initial price

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    // Adjust the price based on quantity (you can implement your own logic)
    setPrice(newQuantity * 20000); // Adjust the price based on your business logic
  };

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productImage}>
        {/* Assume productImage is a prop passed from parent component */}
        <img src='/food/ham.jpg' alt="Product Image" />
      </div>

      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h1 >햄버거{props.params.id} </h1>
          <p>배달방법: 특급배달</p>
          <p>제품구성: 밀가루, 버터, 우유, 달걀, 설탕포함</p>
          <p>보관법: 냉동보관</p>
          <p>안내: 해당제품은 보관 후 3일 안에 드셔주세요</p>
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
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              {/* Add more quantity options as needed */}
            </select>
          </div>

          <div className={styles.price}>
            <p>{price.toLocaleString()}원</p>
          </div>
          <button className={styles.addToCartButton} onClick={()=>{location.href='/basket/salad'}}>장바구니</button>
          <button className={styles.BuyButton}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
