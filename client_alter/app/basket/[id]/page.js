// ItemPage.jsx
'use client'
import React, { useEffect, useState,useCallback } from 'react';
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
  const [quantity, setQuantity] = useState([]);
  const [items,setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/customer/cart/89122e30-b9c5-11ee-9d01-07fefcbd1ba0`);
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data.data.rows);
      setCategoryName(sampleData.categoryName);
      setCategoryPrice(sampleData.categoryPrice);
      setCategoryS(sampleData.categoryS);
      setItems(data.data.rows);
      
      const initialQuantity = data.data.rows.map((item) => item.amount );
    
      setQuantity(initialQuantity);

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
  
  const handleSubmit = async () =>{
    await fetch('http://211.45.170.37:3000/customer/order',{
      method:'post',
      body:JSON.stringify({
        "order_id":"wdasdawdsdwa",
        "addr":"rich building",
        "addr_detail":"5th floor",
        "post":"11032",
        "requests":"빠르게 배송해 주세요",
        "state":"wait",
        "amount":1,
        "createdAt":"2024-01-23T08:11:41.000Z",
        "item_id":"e8f12213-5585-4c3d-ac52-89ce9bf9440f",}),
      headers:{
    
          "Content-Type":"application/json",
      },
  }).then((response) => {
    if (response.status == 405) {
      alert('삭제 실패하였습니다');
    } else if (response.status == 201) {
      alert('삭제되었습니다');
    }


  })
  }
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
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(items.length).keys()]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, index) => total + items[index].Item.price * quantity[index],
      0
    );
  };

  const handleQuantityChange = (index, newAmount) => {
    const newQuantity = { ...quantity };
    newQuantity[index] = newAmount;
    setQuantity(newQuantity);

    const updatedItems = [...items];
    updatedItems[index].amount = newAmount;
    setItems(updatedItems);
  };

  const Cancel = useCallback(
    (id) => {
     
      fetch(`http://211.45.170.37:3000/customer/cart/${id}`, {
        method: 'DELETE',
    
      })
        .then((response) => {
          if (response.status == 405) {
            alert('삭제 실패하였습니다');
          } else if (response.status == 201) {
            alert('삭제되었습니다');
          }


        })
        .finally(() => {
          window.location.reload();
        });

    },
    [],
  );
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
            {items.slice(0, displayCount).map((items, index) => (
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
                    src={`http://211.45.170.37:3000/${items.Item.img}`}
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
            ))}
          </tbody>
        </table>
     
      </div>
      <div className={styles.totalPrice}>
          총 가격: {calculateTotalPrice()}원
        </div>
        <div className={styles.Buttons}>
        <button className={styles.addToCartButton} onClick={()=>{location.href='/'}}>쇼핑 계속하기</button>
        <button className={styles.BuyButton} onClick={()=>{handleSubmit()}}>바로구매</button>
        </div>
        
    </div>
  );
};

export default ItemPage;
