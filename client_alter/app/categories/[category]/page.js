'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

import styles from './category.module.css'; // 스타일링을 위한 CSS 모듈
// 샘플 데이터
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');

const ItemPage = (props) => {
  const [categoryS, setCategoryS] = useState([]);
  const [sortBy, setSortBy] = useState('lowest');
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [categoryList, setCategoryList] = useState([])
  const [data, setData] = useState([])
  const category = props.params.category;
  console.log(category)
 
  
  console.log(testData.data.rows[0]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/sellers/${category}`);
      const data = await response.json();
      console.log(data)

      setData(data.data.rows)

    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * displayCount;
  const indexOfFirstProduct = indexOfLastProduct - displayCount;
  const currentProducts = categoryList.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData();

  };
  const handleSubmit = useCallback(
    (item) => {


      if (accessToken) {
        fetch(`https://altermall.site/customer/cart/`, {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({ amount: 1, item_id: item.item_id }),
        })
          .then((response) => {
            if (response.status == 400) {
              alert('장바구니에 존재하는 메뉴입니다.');
            } else if (response.status == 201) {
              alert('장바구니에 담겼습니다');
            }


          })
          .finally(() => {

          });
      } else {
        const cartData = localStorage.getItem('cart');
        let cartItems = [];
        if (cartData) {
          cartItems = JSON.parse(cartData);
        }

        cartItems.push({ amount: 1, Item: item });
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert('비회원 장바구니에 담겼습니다');
      }


    },
    [],
  );


  const sortByLowestPrice = () => {
    setSortBy('lowest');
    // 다른 처리 로직 추가
  };

  const sortByHighestPrice = () => {
    setSortBy('highest');
    // 다른 처리 로직 추가
  };

  const sortByLatest = () => {
    setSortBy('latest');
    // 다른 처리 로직 추가
    console.log(sortBy);
  };

  // id에 따라 다른 단어를 설정
  let displayWord;
  switch (category) {
    case 'dessert':
      displayWord = '디저트';
      break;
    case 'salad':
      displayWord = '샐러드';
      break;
    case 'free':
      displayWord = '락토프리';
      break;
    case 'drink':
      displayWord = '음료';
      break;
    default:
      displayWord = '알 수 없는 카테고리';
  }

  return (
    <div>
  {data.length>0 && data.map(data => (
   
    <div className={styles.masterContainer} >
      <div className={styles.banner}>  {data.SellerDetail && (
            <Link href={`/categories/${category}/category/${data.SellerDetail.id}`} style={{ textDecoration: "none",color:'black' }}>
        <div className={styles.intro}>
          <div className={styles.logoBorder}>

            <img src={`https://altermall.site/${data.SellerDetail.logo}`} className={styles.logo} />
          </div>
          <h1 className={styles.name} >{data.User.name}</h1>

        </div>
        </Link>
      )}

      </div>

      <div className={styles.recommendations}>
        <p className={styles.slogan}>{data.slogan}</p>
        <div className={styles.items}>
          {data.Items && data.Items.slice(0, 4).map(item => (
            <div key={item.item_id} className={styles.item}>
              <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
                <img src={`https://altermall.site/${item.img}`} alt={item.item_name} className={styles.itemImage} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    ))}
    </div>
  );
};

export default ItemPage;
