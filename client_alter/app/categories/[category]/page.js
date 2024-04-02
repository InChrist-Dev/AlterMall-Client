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
  const testData = {
    "exist": true,
    "data": {
      "count": 1,
      "rows": [
        {
          "id": "rabe",
          "addr": "경기도 의정부 범골로 107번 125-22 1",
          "slogan": "건강한 쌀가루 빵, 라이스 베이커리",
          "company_num": "123123-123123",
          "bank": "농협 3021550941961 송채영",
          "category": [
            "dessert"
          ],
          "User": {
            "name": "라베",
            "profile": "upload/profiles/1707914495865.png"
          },
          "SellerDetail": {
            "id": "rabe",
            "img": "upload/profiles/1708586116510.jpeg",
            "logo": "upload/profiles/1708586116510.png",
            "title": "밀가루 없는 빵 라이스 베이커리",
            "content": "Q. “사장님! 라베(RaBe)매장을 시작하게된 계기가 무엇인가요?”\nA. “둘째 딸이 피부가 갈라지는 건선 피부염이 있었어요.\n초등학교 여학생이던 딸이 디저트를 좋아했는데, 먹기만 하면 피부가 갈라져서 고민이었죠, 저도 당뇨가 있었는데 먹을 수 있는 음식이 제한되었고요\"\n\n“딸에게도, 저에게도 문제는 첨가물이었어요! 그래서 정제 당과 밀가루와 같은 첨가물이 안 들어간 쌀 빵을 만들었더니, 아이도 맛있어하고 건선 증상도 안정되더라고요!\"\n\n“그러던중, 딸 건강 문제로 함께 고민하던 남편이 건강한 디저트 음식점을 열어보라고 권유해서 시작하게 되었어요”",
            "createdAt": "2024-02-18T14:46:35.000Z",
            "updatedAt": "2024-02-22T07:15:16.000Z"
          },
          "Items": [
            {
              "item_id": "64063f97-606d-4fb7-92c2-689e4b8ce29f",
              "item_name": "제로 홍국 쌀 식빵",
              "price": 5400,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490645189.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-18T06:21:10.000Z",
              "updatedAt": "2024-03-26T05:07:33.000Z"
            },
            {
              "item_id": "4bd5df3e-1f32-4aa4-ba11-6280b4b852e6",
              "item_name": "제로 쑥 쌀 식빵",
              "price": 5400,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490632801.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-18T06:20:43.000Z",
              "updatedAt": "2024-03-27T01:51:07.000Z"
            },
            {
              "item_id": "36708253-4cc6-45c0-8acd-3ae5ac7edb92",
              "item_name": "제로 백미 쌀 식빵",
              "price": 5000,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490607301.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-18T06:19:50.000Z",
              "updatedAt": "2024-03-27T04:13:52.000Z"
            },
            {
              "item_id": "1c8c25e8-4ceb-4b69-a0f9-bc121bbf72a5",
              "item_name": "우유 쌀 식빵",
              "price": 5400,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490585091.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-16T07:33:52.000Z",
              "updatedAt": "2024-03-27T01:51:02.000Z"
            },
            {
              "item_id": "45d17570-6880-4a71-8f24-c9c447985cc3",
              "item_name": "단호박 크림치즈 쌀 식빵",
              "price": 6700,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490619889.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-14T03:49:15.000Z",
              "updatedAt": "2024-03-27T01:50:59.000Z"
            },
            {
              "item_id": "8264c3b7-fa14-43d4-98d9-80d4070ed016",
              "item_name": "오징어 먹물 치즈  쌀 식빵",
              "price": 7000,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490671675.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-14T03:48:59.000Z",
              "updatedAt": "2024-03-26T05:07:33.000Z"
            },
            {
              "item_id": "7db005f0-7ccc-4cd0-a5c8-3f67b2d20b86",
              "item_name": "바질 올리브 치즈 쌀  식빵",
              "price": 6700,
              "stock": 5,
              "max_stock": 5,
              "isSelling": true,
              "img": "upload/itemImgs/1708490658555.jpeg",
              "category": "dessert",
              "seller_id": "rabe",
              "createdAt": "2024-02-14T03:48:35.000Z",
              "updatedAt": "2024-03-27T01:50:52.000Z"
            }
          ]
        }
      ]
    }
  }
  console.log(testData.data.rows[0]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/sellers/${category}`);
      const data = await response.json();
      console.log(data)
      // // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      // setCategoryList(data.data.items);
      // setPage(data.data.totalPages);
      // console.log(data.data)
      setData(data.data.rows[0])
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
    </div>
  );
};

export default ItemPage;
