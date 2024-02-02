// ItemPage.js
'use client'
import React, { useState, useEffect,useCallback } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, scroll } from 'react-scroll';


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
      const response = await fetch(`https://udtown.site/category/${props.params.id}`);
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
      fetch(`https://udtown.site/customer/cart/`, {
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
    [quantity, id],
  );

  const handleBuy = (itemId,amount)=>{
    window.location.href=`/order/direct?itemId=${itemId}&amount=${amount}`;
  };
 return(
    <div>
      <div className={styles.productDetailContainer}>

     
      <div className={styles.productImage}>
        {/* Assume productImage is a prop passed from parent component */}
        <img src={`https://udtown.site/${img}`} alt="Product Image" />
      </div>

      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h1 >{name}</h1>
          <p><span>배달방법 </span> 특급배달</p>
          <p><span>제품구성 </span> 밀가루, 버터, 우유, 달걀, 설탕포함</p>
          <p><span>보관법 </span> 냉동보관</p>
          <p><span>안내 </span> 해당제품은 보관 후 3일 안에 드셔주세요</p>
          <p><span>재고 </span> {stock}</p>
        </div>

        <div className={styles.productOptions}>
          {/* <div className={styles.dropdown}>
            <label>옵션</label>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              {/* Add more options as needed 
            </select>
          </div> */}

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
          <button className={styles.addToCartButton} onClick={()=>{handleSubmit}}>장바구니</button>
          <button className={styles.BuyButton} onClick={()=>{handleBuy(id,quantity)}}>바로구매</button>
        </div>
      </div>
    </div>
    <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
  
        <div className="navigation">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="category-dropdown">
            <Link to="image1" smooth={true} duration={500}>
              상품정보
            </Link>
          </li>
          <li>
            <Link to="image2" smooth={true} duration={500}>
              구매후기
            </Link>
          </li>
          <li>
            <Link to="image3" smooth={true} duration={500} onClick={() => scrollToImage(2)}>
              상품문의
            </Link>
          </li>
          <li>
            <Link to="image4" smooth={true} duration={500} onClick={() => scrollToImage(3)}>
              구매정보
            </Link>
          </li>
        </ul>
      </nav>
    </div>
        <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
        <div>
      <div className={styles.detail} id="image1">
        <img src="/back1.jpg" />
      </div>
      <div className={styles.detail} id="image2">
        <img src="/back2.jpg" />
      </div>
      {/* 추가적인 이미지나 섹션을 필요에 따라 계속 추가할 수 있습니다. */}
    </div>
    </div>
  );
};

export default ItemPage;
