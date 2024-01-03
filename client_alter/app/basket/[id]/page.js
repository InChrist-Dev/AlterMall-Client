// ItemPage.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './basket.module.css'; // Import the CSS module

const sampleData = {
  categoryName: ['사과당근주스', '쌀 쿠키', '샐러드', '쌀 케이크'],
  categoryPrice: [10000, 20000, 30000, 40000],
  categoryS: [1, 2, 3, 4],
  categoryImage: [
    '/food/nack.jpg',
    '/food/pizza.jpg',
    '/food/chicken.jpg',
    '/food/ham.jpg',
  ],
};

const ItemPage = (props) => {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);
  const [categoryS, setCategoryS] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    // Simulating API fetch with sample data
    setCategoryName(sampleData.categoryName);
    setCategoryPrice(sampleData.categoryPrice);
    setCategoryS(sampleData.categoryS);
    setCategoryImage(sampleData.categoryImage);

    // Initialize quantity state
    const initialQuantity = {};
    sampleData.categoryName.forEach((name, index) => {
      initialQuantity[index] = 1;
    });
    setQuantity(initialQuantity);
  }, []);

  const toggleItemSelection = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const toggleAllItemsSelection = () => {
    if (selectedItems.length === categoryName.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(categoryName.length).keys()]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, index) => total + categoryPrice[index] * quantity[index],
      0
    );
  };

  const handleQuantityChange = (index, value) => {
    // Prevent quantity from going below 1
    const newQuantity = Math.max(0, value);
    setQuantity((prevQuantity) => ({ ...prevQuantity, [index]: newQuantity }));
  };
  
  return (
    <div>
      <h1 className={styles.title}>장바구니</h1>
      <div className={styles.basketContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedItems.length === categoryName.length}
                  onChange={toggleAllItemsSelection}
                />
                
              </th>
              <th>상품</th>
              <th>가격</th>
              <th>글루텐프리 여부</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {categoryName.slice(0, displayCount).map((name, index) => (
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
                    src={categoryImage[index]}
                    alt={name}
                    className={styles.productImage}
                  />
                
                    {name}
                   
                 
                </td>
                <td>
                  <p>{categoryPrice[index]}원</p>
                </td>
                <td>
                  <p>{categoryS[index]}</p>
                </td>
                <td>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, quantity[index] - 1)
                      }
                    >-
                    </button>
                    <span>{quantity[index]}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, quantity[index] + 1)
                      }
                    >+
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
      </div>
      <div className={styles.totalPrice}>
          총 가격: {calculateTotalPrice()}원
        </div>
        <div className={styles.Buttons}>
        <button className={styles.addToCartButton} onClick={()=>{location.href='/'}}>쇼핑 계속하기</button>
        <button className={styles.BuyButton}>바로구매</button>
        </div>
        
    </div>
  );
};

export default ItemPage;
