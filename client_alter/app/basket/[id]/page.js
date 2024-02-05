// ItemPage.jsx
'use client'
import React, { useEffect, useState,useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './basket.module.css'; // Import the CSS module
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');


const ItemPage = (props) => {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);
  const [categoryS, setCategoryS] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [quantity, setQuantity] = useState([]);
  const [items,setItems] = useState([]);
  const myUuid = uuidv4();
  console.log(myUuid);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/customer/cart/`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }});
      
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data.data.rows);
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
    const orderItems = items.map((item) => {
      return {
        "order_id": myUuid,
        "seller_id": item.Item.seller_id,
        "stock": item.amount,//총 주문량
        "price": item.Item.price, //가격
        "item_id": item.Item.item_id,
      };
    });
    await fetch('https://udtown.site/customer/orderdetail',{
      method:'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: orderItems,
      }),
        
        
      
  
  }).then(async (response) => {
    if (response.status == 405) {
      alert('주문 실패하였습니다');
    } else if (response.status == 201) {
      alert('주문페이지로 넘어갑니다');
      console.log(response);
      const data = await response.json();
      console.log(data)
    }


  }).finally(

  )
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
    <div style={{'marginBottom':'100px'}}>
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
