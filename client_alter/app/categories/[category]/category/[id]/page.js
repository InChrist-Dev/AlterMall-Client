"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./category.module.css"; // 스타일링을 위한 CSS 모듈
import Cookies from "js-cookie";
import { IoCartOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get("accessToken");

const ItemPage = (props) => {
  const [categoryS, setCategoryS] = useState([]);
  const [sortBy, setSortBy] = useState("lowest");
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);

  const id = props.params.id;
  console.log(id);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://altermall.site/category/seller?id=${id}&sortby=${sortBy}&p=${currentPage}`
      );
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      setCategoryList(data.data.items);
      setPage(data.data.totalPages);
      console.log(data.data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, [currentPage, sortBy, displayCount]);

  const indexOfLastProduct = currentPage * displayCount;
  const indexOfFirstProduct = indexOfLastProduct - displayCount;

  const pageNumbers = [];
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData();
  };

  const handleSubmit = useCallback((item) => {
    if (accessToken) {
      fetch(`https://altermall.site/customer/cart/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ amount: 1, item_id: item.item_id }),
      })
        .then((response) => {
          if (response.status == 400) {
            alert("장바구니에 존재하는 메뉴입니다.");
          } else if (response.status == 201) {
            alert("장바구니에 담겼습니다");
          }
        })
        .finally(() => {});
    } else {
      const cartData = localStorage.getItem("cart");
      let cartItems = [];
      if (cartData) {
        cartItems = JSON.parse(cartData);
      }

      cartItems.push({ amount: 1, Item: item });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("비회원 장바구니에 담겼습니다");
    }
  }, []);

  const handleDisplayCountChange = (e) => {
    setDisplayCount(Number(e.target.value));
    setCurrentPage(1); // 페이지 수 변경시 현재 페이지를 1로 리셋
  };

  const sortByLowestPrice = () => {
    setSortBy("lowest");
  };

  const sortByHighestPrice = () => {
    setSortBy("highest");
  };

  const sortByLatest = () => {
    setSortBy("latest");
  };

  // 건강지수순 정렬 함수 추가
  const sortByHealthRating = () => {
    setSortBy("health");
  };

  return (
    <div>
      <div className={styles.sortAndScroll}>
        <div className={styles.sortButtons}>
          <button
            onClick={sortByLowestPrice}
            className={sortBy === "lowest" ? styles.activeButton : ""}
          >
            낮은 가격순
          </button>
          ㅣ
          <button
            onClick={sortByHighestPrice}
            className={sortBy === "highest" ? styles.activeButton : ""}
          >
            높은 가격순
          </button>
          ㅣ
          <button
            onClick={sortByLatest}
            className={sortBy === "latest" ? styles.activeButton : ""}
          >
            최신순
          </button>
          ㅣ
          <button
            onClick={sortByHealthRating}
            className={sortBy === "health" ? styles.activeButton : ""}
          >
            건강지수순
          </button>
        </div>

        <div className={styles.scrollButtons}>
          <select
            id="displayCount"
            className={styles.dropInput}
            value={displayCount}
            onChange={handleDisplayCountChange}
          >
            <option value={10}>10개씩 보기</option>
            <option value={30}>30개씩 보기</option>
          </select>
          <label htmlFor="displayCount"></label>
        </div>
      </div>
      <div className={styles.productContainer}>
        {categoryList.map((item, i) => {
          const currentIndex = indexOfFirstProduct + i; // 현재 데이터의 실제 인덱스 계산
          return (
            <div key={item.item_id} className={styles.productCard}>
              <Link
                href={`/products/${item.item_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.productLink}>
                  <img
                    src={`https://altermall.site/${item.img}`}
                    alt={item.item_name}
                  />
                  <button
                    className={styles.cartBtn}
                    onClick={(e) => {
                      e.preventDefault(); // Link 클릭 이벤트 전파 중지
                      handleSubmit(item);
                    }}
                  >
                    <IoCartOutline className={styles.cartIcon} />
                    담기
                  </button>

                  <h3>{item.item_name}</h3>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <p>{item.price.toLocaleString()}원</p>
                    {/* 건강지수 표시 */}
                    {item.healthRating && (
                      <div className={styles.healthRating}>
                        <FontAwesomeIcon
                          icon={faAppleWhole}
                          className={styles.appleIcon}
                        />
                        <span>{item.healthRating.toFixed(1)}</span>
                      </div>
                    )}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={
              currentPage === number ? styles.activePage : styles.pageNumber
            }
            onClick={() => handlePageClick(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
