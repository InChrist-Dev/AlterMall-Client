import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './products.module.css';

const EnhancedReviewForm = () => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
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
      } else if(response.status == 401){
        alert('로그인후 작성해주세요.');
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
  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setPrice(newOption + option); // Adjust the price based on your business logic
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
    <div className={styles.reviewFormContainer}>
      <h2 className={styles.reviewFormTitle}>리뷰 작성</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
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
  );
};

export default EnhancedReviewForm;