'use client'
import React, { useState, useEffect, useCallback } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, scroll } from 'react-scroll';
import Cookies from 'js-cookie';
import Modal from './Modal';
// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');

const position = Cookies.get('position');

const ItemPage = (props) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(20000); // Assume an initial price
  const [newprice, setNewPrice] = useState(20000); // Assume an initial price
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState('');
  const [activeLink, setActiveLink] = useState("image1"); // 기본값으로 첫 번째 섹션을 설정
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState([]);
  const [rate, setRate] = useState(10);
  const [data, setData] = useState([]);
  const [guest, setGuest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // sticky 상태를 추적하기 위한 상태 추가

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReview = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('rate', rate);
      formData.append('item_id', props.params.id);
      formData.append('img', image);

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
      } else {
        console.error('리뷰 제출에 실패하였습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/${props.params.id}`);
      const data = await response.json();
      setPrice(data.price);
      setNewPrice(data.price);
      setName(data.item_name);
      setImg(data.img);
      setStock(data.stock);
      setId(data.item_id);
      setData(data.ItemImages[0]);
      setGuest(data);
      setLikeCount(data.likeCount);
      const response2 = await fetch(`https://altermall.site/review/${props.params.id}`);
      const data2 = await response2.json();
      setReview(data2.data.rows);

      const like = await fetch(`https://altermall.site/like/${props.params.id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      })
      .then((response) => {
        if (response.status == 200) {
          setLike(true);
        }
      });

    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
    if (position === 'guest') {
      Cookies.remove('accessToken');
      Cookies.remove('position');
    }

    const handleScroll = () => {
      if (window.scrollY > 100) { // 스크롤 위치에 따라 값을 조정하세요
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const likeBtn = useCallback((name, img) => {
    fetch(`https://altermall.site/like/${props.params.id}`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({ likeCount: likeCount + 1, item_name: name, img: img }),
    })
    .then((response) => {
      if (response.status == 401) {
        alert('로그인 후 이용하실 수 있습니다');
      } else if (response.status == 201) {
        alert('해당상품을 찜하였습니다');
      }
    });
  }, [like]);

  const handleSubmit = useCallback((id) => {
    if (accessToken) {
      fetch(`https://altermall.site/customer/cart/`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ amount: quantity, item_id: props.params.id }),
      })
      .then((response) => {
        if (response.status == 400) {
          alert('장바구니에 존재하는 메뉴입니다.');
        } else if (response.status == 201) {
          alert('장바구니에 담겼습니다');
        }
      });
    } else {
      const cartData = localStorage.getItem('cart');
      let cartItems = [];
      if (cartData) {
        cartItems = JSON.parse(cartData);
      }
      cartItems.push({ amount: quantity, Item: guest });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('비회원 장바구니에 담겼습니다');
    }
  }, [quantity, id]);

  const maskUserId = (userId) => {
    const maskedLength = Math.ceil(userId.length / 2);
    const masked = '*'.repeat(maskedLength);
    return userId.substring(0, userId.length - maskedLength) + masked;
  };

  const handleBuy = (itemId, amount) => {
    if (accessToken) {
      window.location.href = `/order/direct?itemId=${itemId}&amount=${amount}`;
    } else {
      const cartData = localStorage.getItem('cart');
      let cartItems = [];
      if (cartData) {
        cartItems = JSON.parse(cartData);
      }
      cartItems.push({ amount: quantity, Item: guest });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('비회원 주문페이지로 이동합니다.');
      window.location.href = `/basket`;
    }
  };

  return (
    <div>
      <div className={styles.productDetailContainer}>
        <div className={styles.productImage}>
          <img src={`https://altermall.site/${img}`} alt="Product Image" />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.productInfo}>
            <div className={styles.productTitle}>
              <h1>{name}</h1>
              {like ? (
                <FontAwesomeIcon onClick={() => { likeBtn(name, img) }} style={{ "color": "#f0571b" }} icon={solidHeart} size='2x' />
              ) : (
                <FontAwesomeIcon onClick={() => { likeBtn(name, img) }} style={{ "color": "#f0571b" }} icon={regularHeart} size='2x' />
              )}
            </div>
            <p><span>재고 </span> {stock}</p>
            <p><span>제작일</span> 일요일 15시 ~ 금요일 15시(공휴일 제외)</p>
          </div>
          <div className={styles.productOptions}>
            <div className={styles.dropdown}>
              <label>주문수량</label>
              <select onChange={(e) => handleQuantityChange(e.target.value)}>
                {Quantity()}
              </select>
            </div>
            <div className={styles.price}>
              <p>{price.toLocaleString()}원</p>
            </div>
            <button className={styles.addToCartButton} onClick={() => { handleSubmit(); }}>장바구니</button>
            <button className={styles.BuyButton} onClick={() => { handleBuy(id, quantity) }}>바로구매</button>
          </div>
          <div className={styles.imageContainer}>
            <img className={styles.itemImg} src={data.img1 ? `https://altermall.site/${data.img1}` : ''} />
            {data.img2 ? <img className={styles.itemImg} src={data.img2 ? `https://altermall.site/${data.img2}` : ''} /> : ''}
            {data.img3 ? <img className={styles.itemImg} src={data.img3 ? `https://altermall.site/${data.img3}` : ''} /> : ''}
            {data.img4 ? <img className={styles.itemImg} src={data.img4 ? `https://altermall.site/${data.img4}` : ''} /> : ''}
          </div>
        </div>
      </div>
      <div style={{ borderBottom: '0.5px solid #ddd' }}></div>

      <div className={`navigation ${isSticky ? styles.sticky : ''}`}>
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
                className={activeLink === "image2" ? styles.activeLink : styles.Link}
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
                className={activeLink === "image3" ? styles.activeLink : styles.Link}
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
                className={activeLink === "image1" ? styles.activeLink : styles.Link}
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
                className={activeLink === "image4" ? styles.activeLink : styles.Link}
              >
                구매후기
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <div className={styles.detail} id="image2">
          <img src={`https://altermall.site/${data.desc1}`} />
        </div>
        <div className={styles.detail}>
          {data.desc2 ? <img src={`https://altermall.site/${data.desc2}`} /> : ''}
        </div>
        <div className={styles.detail} id="image3">
          {data.desc3 ? <img src={`https://altermall.site/${data.desc3}`} /> : ''}
        </div>
        <div className={styles.detail}>
          {data.desc4 ? <img src={`https://altermall.site/${data.desc4}`} /> : ''}
        </div>
        <div className={styles.detail}>
          {data.desc5 ? <img src={`https://altermall.site/${data.desc5}`} /> : ''}
        </div>

        <div className={styles.detail}>
          <img src="/3333.jpg" />
        </div>
        <div className={styles.detail}>
          <img src="/back1.jpg" />
        </div>
        <div className={styles.detail}>
          <img src="/back2.jpg" />
        </div>

        <div className={styles.reviewContainer} id="image4">
          <h2 className={styles.division}>리뷰</h2>
          <div className={styles.reviews}>
            {review.map((review) => (
              <div key={review.id} onClick={() => openModal(review)} className={styles.review}>
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
