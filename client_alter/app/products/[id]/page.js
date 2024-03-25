// ItemPage.js
'use client'
import React, { useState, useEffect,useCallback } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, scroll } from 'react-scroll';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';
// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const myUuid = uuidv4();
const ItemPage = (props) => {
  const [deliveryTime, setDeliveryTime] = useState('');

  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(20000); // Assume an initial price
  const [newprice, setNewPrice] = useState(20000); // Assume an initial price
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState('');
  const [activeLink, setActiveLink] = useState("image1"); // 기본값으로 첫 번째 섹션을 설정
  const [content, setContent] = useState('');
  const [image,setImage] = useState(null);
  const [review, setReview] = useState([]);
  const [rate, setRate] = useState(10);
  const [data, setData] = useState([]);
  const [guest, setGuest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

    // setGuest 함수를 활용하여 첫 번째 손님의 stock 속성 설정
  const updateStock = (quantity) => {
    if (guest.length > 0) {
     
    } else {
      console.error('Guest array is empty.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // 여기에 서버에 데이터를 전송하는 코드를 추가합니다.
  //   const data = { title, content };
  //   console.log(data); // 임시로 데이터를 콘솔에 출력합니다.
  //   // 서버에 데이터를 전송하는 API 호출 등의 코드를 추가해야 합니다.
  // };
  const handleReview = async (e) => {
    e.preventDefault();



    try {
      const formData = new FormData();
      formData.append('content', content); // title 媛� 異붽��
      formData.append('rate', rate);
      formData.append('item_id',props.params.id);
      formData.append(`img`, image);

      const response = await fetch('https://altermall.site/review', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
     
        },
        credentials: 'include',
        body: formData,
      });
      if (response.ok) {
        alert('리뷰가 성공적으로 제출되었습니다.');
        // 리뷰가 성공적으로 제출되었을 때 사용자를 다른 페이지로 이동시킬 수 있습니다.
      } else {
        console.error('리뷰 제출에 실패하였습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }};
  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/${props.params.id}`);
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data);
      setPrice(data.price);
      setNewPrice(data.price);
      setName(data.item_name);
      setImg(data.img);
      setStock(data.stock);
      setId(data.item_id);
      setData(data.ItemImages[0]);
      setGuest(data);
      const response2 = await fetch(`https://altermall.site/review/${props.params.id}`);
      const data2 = await response2.json();
      console.log(data2)
      setReview(data2.data.rows)
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
    // 주문 가능 시간을 계산하는 함수
    const calculateDeliveryTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
// 현재 시간이 오후 3시 이전인 경우
if (currentHour < 15) {
  // 현재 시간이 오후 3시 이후인 경우
  const nextDay = new Date(currentTime);
  nextDay.setDate(nextDay.getDate()); // 내일로 설정
  nextDay.setHours(15, 0, 0, 0); // 오후 3시로 설정
  const diffMs = nextDay - currentTime; // 내일 오후 3시까지 남은 밀리초 계산
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위로 변환
  const remainingTimeMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // 남은 시간에서 분을 추출
  const remainingTimeString =  `<strong>${diffHours}시간 ${remainingTimeMinutes}분</strong>`; // 시간과 분을 조합하여 표시
  setDeliveryTime(<p style={{'display':'inline'}}><b>{getTodayDate()}</b> 배송까지 <b>{diffHours}시간 {remainingTimeMinutes}분</b> 남았습니다.</p>);
} else {
  // 현재 시간이 오후 3시 이후인 경우
  const nextDay = new Date(currentTime);
  nextDay.setDate(nextDay.getDate() + 1); // 내일로 설정
  nextDay.setHours(15, 0, 0, 0); // 오후 3시로 설정
  const diffMs = nextDay - currentTime; // 내일 오후 3시까지 남은 밀리초 계산
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위로 변환
  const remainingTimeMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // 남은 시간에서 분을 추출
  const remainingTimeString =  `<strong>${diffHours}시간 ${remainingTimeMinutes}분</strong>`; // 시간과 분을 조합하여 표시
  setDeliveryTime(<p style={{'display':'inline'}}><b>{getTomorrowDate()}</b> 배송까지 <b>{diffHours}시간 {remainingTimeMinutes}분</b> 남았습니다.</p>);
}


    };

    // 매 분마다 주문 가능 시간을 갱신하기 위해 setInterval을 사용
    const intervalId = setInterval(calculateDeliveryTime, 60000); // 1분마다 갱신
    calculateDeliveryTime(); // 컴포넌트 마운트 시 한 번 호출

    // 컴포넌트 언마운트 시 setInterval 정리
    return () => clearInterval(intervalId);
  }, []);
  const getDayOfWeek = () => {
    const today = new Date();
    return today.getDay(); // 0(일요일) ~ 6(토요일) 사이의 값 반환
  };
  
  // 배송 가능 여부를 확인하는 함수
  const isDeliveryAvailable = () => {
    const dayOfWeek = getDayOfWeek();
    // 토요일(6) 또는 일요일(0)이면 배송 불가능
    return !(dayOfWeek === 6 || dayOfWeek === 0);
  };
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // 내일로 설정
  
    const dayOfWeek = tomorrow.getDay();
    if (dayOfWeek === 0) { // 일요일인 경우
      tomorrow.setDate(tomorrow.getDate() + 1); // 월요일로 설정
    } else if (dayOfWeek === 6) { // 토요일인 경우
      tomorrow.setDate(tomorrow.getDate() + 2); // 월요일로 설정
    }
  
    const month = tomorrow.getMonth() + 1;
    const date = tomorrow.getDate();
  
    return `${month}월 ${date}일`;
  };
  const getTodayDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // 내일로 설정
  
    const dayOfWeek = tomorrow.getDay();
    if (dayOfWeek === 0) { // 일요일인 경우
      tomorrow.setDate(tomorrow.getDate() + 1); // 월요일로 설정
    } else if (dayOfWeek === 6) { // 토요일인 경우
      tomorrow.setDate(tomorrow.getDate() + 2); // 월요일로 설정
    }
  
    const month = tomorrow.getMonth() + 1;
    const date = tomorrow.getDate();
  
    return `${month}월 ${date}일`;
  };
  
  
    // 모레의 날짜를 반환하는 함수
    const getNextNextDayDate = () => {
      const nextNextDay = new Date();
      nextNextDay.setDate(nextNextDay.getDate() + 2);
      const month = nextNextDay.getMonth() + 1;
      const date = nextNextDay.getDate();
      return `${month}월 ${date}일`;
    };
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setPrice(newQuantity * newprice); // Adjust the price based on your business logic
  };
  const Quantity = () => {
    const result = [];
    for (let i = 1; i <= stock; i++) {
      result.push(<option key={i} value={i}>{i}</option>);
    }
    return result;
  };
  const handleSubmit = useCallback(
    (id) => {
      if(accessToken){
        console.log(props.params.id);
        console.log(id)
        fetch(`https://altermall.site/customer/cart/`, {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({ amount: quantity ,item_id: props.params.id}),
        })
          .then((response) => {
      
            if (response.status == 400) {
              alert('장바구니에 존재하는 메뉴입니다.');
            } else if (response.status == 201) {
              alert('장바구니에 담겼습니다');
            }
  
  
          })
          .finally(() => {
            console.log("저장완료")
          });
      }else{
        const cartData = localStorage.getItem('cart');
        let cartItems = [];
        if (cartData) {
          cartItems = JSON.parse(cartData);
        }const updatedGuest = guest.length > 0 ? [{ ...guest[0], stock: quantity }, ...guest.slice(1)] : [];
      
        cartItems.push({ amount: quantity ,items: updatedGuest});
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert('비회원 장바구니에 담겼습니다');
      }
  

    },
    [quantity, id],
  );
 
  const maskUserId = (userId) => {
    const maskedLength = Math.ceil(userId.length / 2);
    const masked = '*'.repeat(maskedLength);
    return userId.substring(0, userId.length - maskedLength) + masked;
  };
  const handleBuy = (itemId,amount)=>{
  if(accessToken){
    window.location.href=`/order/direct?itemId=${itemId}&amount=${amount}`;

  }else{
      // 비회원 주문 처리를 위한 fetch 요청
       fetch('https://altermall.site/auth/guest/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"order_id":myUuid,"name":"guest"}),
      })
        .then(async (response) => {
          if (response.ok) {
            // 주문 정보를 서버에 성공적으로 전송한 경우
            const data = await response.json();
            console.log(data.accessToken);
            Cookies.set('accessToken', data.accessToken, { expires: 1 });  // 1일 동안 유지되도록 설정
            Cookies.set('position', data.position, { expires: 1 });  // 1일 동안 유지되도록 설정
            window.location.href="https://altermall.shop/guestorder"
          } else {
            // 주문 실패한 경우
            alert('주문 실패하였습니다');
          }
        })
        .catch((error) => {
          console.error('주문 요청 중 오류 발생:', error);
        });
    const cartData = localStorage.getItem('cart');
    let cartItems = [];
    if (cartData) {
      cartItems = JSON.parse(cartData);
    }
  // updateStock 함수 호출 예시
  const updatedGuest = guest.length > 0 ? [{ ...guest[0], stock: quantity }, ...guest.slice(1)] : [];
    
    cartItems.push({ amount: quantity ,Item: updatedGuest});
         // 비회원인 경우
         const orderInfo = {
          order_id: myUuid,
          seller_id: guest.seller_id,
          items: [guest],
          // 여기에 필요한 다른 주문 정보를 추가합니다.
        };
    localStorage.setItem('order', JSON.stringify(orderInfo));
    alert('비회원 주문페이지로 이동합니다.');
    window.location.href=`/guestorder`;
    //alert('비회원 바로구매는 서비스준비중입니다. 회원구매나 비회원 장바구니를 이용해주세요');
  }
  };
 return(
    <div>
      <div className={styles.productDetailContainer}>

     
      <div className={styles.productImage}>
        {/* Assume productImage is a prop passed from parent component */}
        <img src={`https://altermall.site/${img}`} alt="Product Image" />
      </div>

      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h1 >{name}</h1>
          {/* <p><span>배달방법 </span> 특급배달</p>
          <p><span>제품구성 </span> 밀가루, 버터, 우유, 달걀, 설탕포함</p>
          <p><span>보관법 </span> 냉동보관</p>
          <p><span>안내 </span> 해당제품은 보관 후 3일 안에 드셔주세요</p> */}
          <p><span>재고 </span> {stock}</p>
          <p><span>주문가능일</span> 일요일 15시 ~ 금요일 15시(공휴일 제외)</p>
          <p><span>배송시작일 </span>{deliveryTime}</p>
        </div>

        <div className={styles.productOptions}>
  
          <div className={styles.dropdown}>
            <label>주문수량</label>
            <select onChange={(e) => handleQuantityChange(e.target.value)}>

              {Quantity()}
              {/* Add more quantity options as needed */}
            </select>
          </div>
          <div className={styles.buy}>(10,000원 이상 구매가능)</div>
          <div className={styles.price}>
            <p>{price.toLocaleString()}원</p>
          </div>
          <button className={styles.addToCartButton} onClick={()=>{handleSubmit();}}>장바구니</button>
          <button className={styles.BuyButton} onClick={()=>{handleBuy(id,quantity)}}>바로구매</button>
        </div>
        <div className={styles.imageContainer}>
        <img className={styles.itemImg}src={data.img1?`https://altermall.site/${data.img1}`:''}/>
        {data.img2?<img className={styles.itemImg}src={data.img2?`https://altermall.site/${data.img2}`:''}/>:''}
        {data.img3?<img className={styles.itemImg}src={data.img3?`https://altermall.site/${data.img3}`:''}/>:''}
        {data.img4?<img className={styles.itemImg}src={data.img4?`https://altermall.site/${data.img4}`:''}/>:''}
        </div>
      </div>
    </div>
    <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
  
        <div className="navigation">
      <nav className="navbar">
        <ul className={styles.navList}>
          
            <li>
              <Link
                to="image2"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("image2");
                  
                }}
                className={activeLink == "image2" ? styles.activeLink : styles.Link}
              >
                상품상세
              </Link>
            </li>
            <li>
              <Link
                to="image3"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("image3");
                 
                }}
                className={activeLink == "image3" ? styles.activeLink : styles.Link}
              >
                구매정보
              </Link>
              </li>
              <li className="category-dropdown">
          <Link
                to="image1"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("image1");
                 
                }}
                className={activeLink == "image1" ? styles.activeLink : styles.Link}
              >
                배송안내
              </Link>
            </li>
              <li>
              <Link
                to="image4"
                smooth={true}
                duration={500}
                onClick={() => {
                  setActiveLink("image4");
                  
                }}
                className={activeLink == "image4" ? styles.activeLink : styles.Link}
              >
                구매후기
              </Link>
          
          </li>
        </ul>
      </nav>
    </div>
       
      <div>
        <div className={styles.detail} id="image2" >
          <img src={`https://altermall.site/${data.desc1}`}/>
        </div>
        <div className={styles.detail}>
        <img src={`https://altermall.site/${data.desc2}`} />
        </div>
        <div className={styles.detail}id="image3" >
        <img src={`https://altermall.site/${data.desc3}`}  />
        </div>
        <div className={styles.detail} >
        {data.desc4? <img src={`https://altermall.site/${data.desc4}`} />:''}
        </div>
        <div className={styles.detail} >
        {data.desc5? <img src={`https://altermall.site/${data.desc5}`} />:''}
        </div>
        <div className={styles.detail} id="image1">
          <img src="/11.jpg" />
        </div>
        <div className={styles.detail} >
          <img src="/22.jpg" />
        </div>
        <div className={styles.detail} >
          <img src="/3333.jpg" />
        </div>
        <div className={styles.detail} >
          <img src="/4444.jpg" />
        </div>
        <div className={styles.detail}>
          <img src="/back1.jpg" />
        </div> <div className={styles.detail} >
          <img src="/back2.jpg" />
        </div>

        <div className={styles.reviewContainer} id="image4">
          <h2 className={styles.division}>리뷰</h2>
            <div className={styles.reviews}>
              {review.map((review) => (
                <div key={review.id} onClick={()=> openModal(review)}className={styles.review}>
                  <img src={`https://altermall.site/${review.img}`} alt="이미지 없음" className={styles.reviewImg} />
                  <p className={styles.reviewContent}>{review.content}</p>
                  <p className={styles.maskedId}>{maskUserId(review.User.name)}</p>
                </div>
                
              ))}
               {isModalOpen && <Modal review={selectedReview} closeModal={closeModal} />}
            </div>
        </div>

        <div className={styles.reviewFormContainer}>
          <h1>리뷰 작성</h1>
          <form onSubmit={handleReview}>
            <div>
              <label htmlFor="image">이미지:</label>
              <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div>
              <label htmlFor="content">내용:</label>
              <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button type="submit">제출</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ItemPage;
