'use client'
import React, { useState, useEffect, useCallback } from 'react';
import styles from './products.module.css'; // Ensure the correct path to your CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, scroll } from 'react-scroll';
import Cookies from 'js-cookie';
import ReviewImagePreview from './ReviewImagePreview';
import ReviewList from './ReviewList';
import { Star } from 'lucide-react';

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
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  const [likeCount, setLikeCount] = useState(1);
  const [option, setOption] = useState(0);
  const [like, setLike] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // sticky 상태를 추적하기 위한 상태 추가
  const [currentPrice, setCurrentPrice] = useState(0);
  const [rating, setRating] = useState(0);
 const [unitPrice, setUnitPrice] = useState(0);
  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };



  const handleReview = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('rate', rating);
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
      } else if(response.status==401){
        alert('로그인 후 작성해주세요');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/${props.params.id}`);
      const data = await response.json();
      console.log(data)
      setBasePrice(data.price);
      setNewPrice(data.price);
      setPrice(data.price);
      setName(data.item_name);
      setImg(data.img);
      setStock(data.stock);
      setId(data.item_id);
      setData(data.ItemImages[0]);
      setGuest(data);
      setLikeCount(data.likeCount);

      if (data.options.options && Array.isArray(data.options.options)) {
        setOptions(data.options.options);
        // Set the first option as default if it exists
        if (data.options.options.length > 0) {
          setSelectedOption(data.options.options[0].name);
          setPrice(data.price + data.options.options[0].additionalPrice);
        }
      }
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
    console.log("Options:", options); // 옵션 로그 추가
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
    updatePrice(newQuantity, selectedOption);
  };

  const handleOptionChange = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    updatePrice(quantity, newOption);
  };

  const updatePrice = (newQuantity, newOption) => {
    const selectedOptionObj = options.find(opt => opt.name === newOption);
    const optionPrice = selectedOptionObj ? selectedOptionObj.additionalPrice : 0;
    const newUnitPrice = basePrice + optionPrice;
    setUnitPrice(newUnitPrice);
    const newTotalPrice = newUnitPrice * newQuantity;
    setCurrentPrice(newTotalPrice);
    setPrice(newTotalPrice);
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

  const handleSubmit = useCallback(() => {
    const cartItem = {
      amount: quantity,
      item_id: props.params.id,
      option: currentPrice / quantity, 
      price: currentPrice / quantity, // 단위 가격
      option_name: selectedOption,
      Item: {
        item_name: name,
        img: img,
        price: basePrice,
        options: option
      }
    };
  
    if (accessToken) {
      fetch(`https://altermall.site/customer/cart/`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(cartItem),
      })
      .then((response) => {
        if (response.status === 400) {
          alert('이미 장바구니에 존재하는 상품입니다.');
        } else if (response.status === 201) {
          alert('장바구니에 추가되었습니다.');
          // 로컬 스토리지에도 저장
          const cartData = localStorage.getItem('cart');
          let cartItems = cartData ? JSON.parse(cartData) : [];
          cartItems.push(cartItem);
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      });
    } else {
      // 비회원 사용자 처리
      const cartData = localStorage.getItem('cart');
      let cartItems = cartData ? JSON.parse(cartData) : [];
      cartItems.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('비회원 장바구니에 추가되었습니다.');
    }
  }, [quantity, selectedOption, currentPrice, props.params.id, name, img, basePrice, options, accessToken]);
  const handleBuy = () => {
    const orderItem = {
      itemId: props.params.id,
      amount: quantity,
      option: selectedOption,
      price: unitPrice  // 단가를 전달
    };

    if (accessToken) {
      const queryString = new URLSearchParams(orderItem).toString();
      window.location.href = `/order/direct?${queryString}`;
    } else {
      const cartData = localStorage.getItem('cart');
      let cartItems = cartData ? JSON.parse(cartData) : [];
      cartItems.push({ ...orderItem, Item: { ...guest, price: unitPrice } });
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
          <select onChange={(e) => handleQuantityChange(Number(e.target.value))}>
            {Quantity()}
          </select>
        </div>
        {options.length > 0 && (
          <div className={styles.dropdown}>
            <label>옵션</label>
            <select onChange={handleOptionChange} value={selectedOption}>
              {options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name} (+{option.additionalPrice}원)
                </option>
              ))}
            </select>
          </div>
        )}
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

      <div className={`styles.menubar ${isSticky ? styles.sticky : ''}`}>
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
          <ReviewImagePreview reviews={review} />
          <ReviewList reviews={review} openModal={openModal} />
          
        </div>

        <div className={styles.reviewFormContainer}>
      <h2 className={styles.reviewFormTitle}>리뷰 작성</h2>
      <form onSubmit={handleReview} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>별점</label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                fill={star <= rating ? "#f0571b" : "none"}
                stroke={star <= rating ? "#f0571b" : "#ccc"}
                className={styles.star}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>내용</label>
          <textarea
            id="content"
            rows={4}
            className={styles.textarea}
            placeholder="리뷰 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>이미지</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
        >
          리뷰 제출
        </button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default ItemPage;
