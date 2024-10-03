"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./products.module.css"; // CSS 모듈 경로를 확인하세요.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-scroll";
import ReviewImagePreview from "./ReviewImagePreview";
import ReviewList from "./ReviewList";
import { Star } from "lucide-react";
import { auth } from "@/fire-config"; // Firebase Auth import
import { onAuthStateChanged } from "firebase/auth";

const ItemPage = (props) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(20000); // 초기 가격 설정
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState("");
  const [activeLink, setActiveLink] = useState("image1");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [review, setReview] = useState([]);
  const [rate, setRate] = useState(10);
  const [data, setData] = useState([]);
  const [guest, setGuest] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [seller, setSeller] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [likeCount, setLikeCount] = useState(1);
  const [delivery, setDelivery] = useState(0);
  const [like, setLike] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [user, setUser] = useState(null); // 현재 사용자 상태 추가

  // Firebase Auth 상태 변경 리스너 설정
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchData();
    });

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();
    // 리뷰 작성 로직을 구현합니다.
    // 필요한 경우 user.uid를 사용하여 customer_id로 저장합니다.
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://altermall.site/category/${props.params.id}`
      );
      const data = await response.json();
      setBasePrice(data.price);
      setPrice(data.price);
      setUnitPrice(data.price);
      setName(data.item_name);
      setImg(data.img);
      setStock(data.stock);
      setId(data.item_id);
      setData(data.ItemImages[0]);
      setGuest(data);
      setDelivery(data.delivery);
      setLikeCount(data.likeCount);
      setSeller(data.seller_id);

      const response2 = await fetch(
        `https://altermall.site/review/${props.params.id}`
      );
      const data2 = await response2.json();
      setReview(data2.data.rows);

      // 좋아요 상태 확인
      if (user) {
        const likeResponse = await fetch(
          `https://altermall.site/like/${props.params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              customer_id: user.uid,
            },
            credentials: "include",
          }
        );

        if (likeResponse.status === 200) {
          setLike(true);
        }
      }

      if (data.options.options && Array.isArray(data.options.options)) {
        setOptions(data.options.options);
        if (data.options.options.length > 0) {
          setSelectedOption(data.options.options[0].name);
          setPrice(data.price + data.options.options[0].additionalPrice);
        }
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    updatePrice(newQuantity, selectedOption);
  };

  const handleOptionChange = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);

    const selectedIndex = options
      ? options.findIndex((opt) => opt.name === newOption)
      : null;
    setOption(selectedIndex);

    updatePrice(quantity, newOption);
  };

  const updatePrice = (newQuantity, newOption) => {
    const selectedOptionObj = options
      ? options.find((opt) => opt.name === newOption)
      : null;
    const optionPrice = selectedOptionObj
      ? selectedOptionObj.additionalPrice
      : 0;
    const newUnitPrice = basePrice + optionPrice;
    setUnitPrice(newUnitPrice);
    const newTotalPrice = newUnitPrice * newQuantity;
    setCurrentPrice(newTotalPrice);
    setPrice(newTotalPrice);
  };

  const Quantity = () => {
    const result = [];
    for (let i = 1; i <= stock; i++) {
      result.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return result;
  };

  const likeBtn = useCallback(
    (name, img) => {
      if (user) {
        fetch(`https://altermall.site/like/${props.params.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            customer_id: user.uid,
          },
          credentials: "include",
          body: JSON.stringify({
            likeCount: likeCount + 1,
            item_name: name,
            img: img,
          }),
        }).then((response) => {
          if (response.status === 201) {
            alert("해당 상품을 찜하였습니다.");
            setLike(true);
          }
        });
      } else {
        alert("로그인 후 이용하실 수 있습니다.");
      }
    },
    [like, user]
  );

  // 장바구니에 상품을 추가하는 함수
  const handleSubmit = useCallback(async () => {
    const cartItem = {
      amount: quantity,
      item_id: props.params.id,
      option: option,
      option_name: selectedOption,
      customer_id: user.uid,
      Item: {
        item_name: name,
        img: img,
        price: unitPrice,
        options: option,
        seller_id: seller,
      },
    };

    if (user) {
      // 로그인한 사용자
      try {
        await fetch(
          "http://localhost:5000/altermall-99041/us-central1/postCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItem),
          }
        ).then((response) => {
          if (response.status === 400) {
            alert("이미 장바구니에 존재하는 상품입니다.");
          } else if (response.status === 201) {
            alert("장바구니에 추가되었습니다.");
          } else {
            alert("장바구니 추가 중 오류가 발생했습니다.");
          }
        });
      } catch (error) {
        console.error("장바구니 추가 중 오류 발생:", error);
        alert("장바구니 추가 중 오류가 발생했습니다.");
      }
    } else {
      // 비회원 사용자 처리
      const cartData = localStorage.getItem("cart");
      let cartItems = cartData ? JSON.parse(cartData) : [];
      cartItems.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("비회원 장바구니에 추가되었습니다.");
    }
  }, [
    quantity,
    selectedOption,
    option,
    props.params.id,
    user,
    name,
    img,
    unitPrice,
    seller,
  ]);

  // 즉시 구매 함수
  const handleBuy = () => {
    // 즉시 구매 로직을 구현합니다.
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
                <FontAwesomeIcon
                  onClick={() => {
                    likeBtn(name, img);
                  }}
                  style={{ color: "#f0571b" }}
                  icon={solidHeart}
                  size="2x"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    likeBtn(name, img);
                  }}
                  style={{ color: "#f0571b" }}
                  icon={regularHeart}
                  size="2x"
                />
              )}
            </div>
            <p>
              <span>재고 </span> {stock}
            </p>
            <p>
              <span>제작일</span> 일요일 15시 ~ 금요일 15시(공휴일 제외)
            </p>
          </div>
          <div className={styles.productOptions}>
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
            <div className={styles.dropdown}>
              <label>주문수량</label>
              <select
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
              >
                {Quantity()}
              </select>
            </div>
            <div className={styles.price}>
              <p>{price.toLocaleString()}원</p>
            </div>
            <button className={styles.addToCartButton} onClick={handleSubmit}>
              장바구니
            </button>
            <button
              className={styles.BuyButton}
              onClick={() => {
                handleBuy(id, quantity);
              }}
            >
              바로구매
            </button>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.itemImg}
              src={data.img1 ? `https://altermall.site/${data.img1}` : ""}
              alt=""
            />
            {data.img2 && (
              <img
                className={styles.itemImg}
                src={`https://altermall.site/${data.img2}`}
                alt=""
              />
            )}
            {data.img3 && (
              <img
                className={styles.itemImg}
                src={`https://altermall.site/${data.img3}`}
                alt=""
              />
            )}
            {data.img4 && (
              <img
                className={styles.itemImg}
                src={`https://altermall.site/${data.img4}`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ borderBottom: "0.5px solid #ddd" }}></div>

      <div className={`${styles.menubar} ${isSticky ? styles.sticky : ""}`}>
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
                className={
                  activeLink === "image2" ? styles.activeLink : styles.Link
                }
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
                className={
                  activeLink === "image3" ? styles.activeLink : styles.Link
                }
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
                className={
                  activeLink === "image1" ? styles.activeLink : styles.Link
                }
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
                className={
                  activeLink === "image4" ? styles.activeLink : styles.Link
                }
              >
                구매후기
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <div className={styles.detail} id="image2">
          <img src={`https://altermall.site/${data.desc1}`} alt="" />
        </div>
        {/* 기타 이미지들 */}
        <div className={styles.detail}>
          <img src="/3333.jpg" alt="" />
        </div>
        <div className={styles.detail}>
          <img src="/back1.jpg" alt="" />
        </div>
        <div className={styles.detail}>
          <img src="/back2.jpg" alt="" />
        </div>

        <div className={styles.reviewContainer} id="image4">
          <h2 className={styles.division}>리뷰</h2>
          <ReviewImagePreview reviews={review} />
          <ReviewList reviews={review} />
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
              <label htmlFor="content" className={styles.label}>
                내용
              </label>
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
              <label htmlFor="image" className={styles.label}>
                이미지
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              리뷰 제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
