// ItemPage.jsx
'use client'
import React, { useState, useEffect } from 'react';
import styles from './local.module.css'; // Import the CSS module

const ItemPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 여기서 아이템 데이터를 가져오는 로직을 구현합니다.
    // 이 예제에서는 더미 데이터를 사용합니다.
    const fetchedItems = [
      { id: 1, name: '상품1', price: 5000 },
      { id: 2, name: '상품2', price: 10000 },
      { id: 3, name: '상품3', price: 15000 },
    ];
    setItems(fetchedItems);
  }, []);

  const handleAddToCart = (item) => {
    const cartData = localStorage.getItem('cart');
    let cartItems = [];
    if (cartData) {
      cartItems = JSON.parse(cartData);
    }
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('장바구니에 추가되었습니다.');
  };

  return (
    <div>
      <h1 className={styles.title}>상품 목록</h1>
      <div className={styles.itemContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <p>{item.name}</p>
            <p>{item.price}원</p>
            <button onClick={() => handleAddToCart(item)}>장바구니에 추가</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
