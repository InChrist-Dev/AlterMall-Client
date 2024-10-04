"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import styles from "./category.module.css"; // 스타일링을 위한 CSS 모듈
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faAppleWhole,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemPage = (props) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const category = props.params.category;
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // 정렬 순서 상태 추가

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://altermall.site/category/sellers/${category}`
      );
      const result = await response.json();
      console.log(result);
      setData(result.data.rows);

      // 건강 지수로 정렬
      const sorted = result.data.rows.sort((a, b) => {
        const aRating =
          a.Items.reduce((sum, item) => sum + (item.healthRating || 0), 0) /
          a.Items.length;
        const bRating =
          b.Items.reduce((sum, item) => sum + (item.healthRating || 0), 0) /
          b.Items.length;
        return sortOrder === "desc" ? bRating - aRating : aRating - bRating;
      });
      setSortedData(sorted);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.7,
    slidesToScroll: 3,
  };

  // id에 따라 다른 단어를 설정
  let displayWord;
  switch (category) {
    case "dessert":
      displayWord = "디저트";
      break;
    case "salad":
      displayWord = "샐러드";
      break;
    case "free":
      displayWord = "락토프리";
      break;
    case "drink":
      displayWord = "음료";
      break;
    default:
      displayWord = "알 수 없는 카테고리";
  }

  return (
    <div>
      {/* 정렬 버튼 추가 */}
      <div className={styles.sortButtonContainer}>
        <button className={styles.sortButton} onClick={toggleSortOrder}>
          건강 지수 {sortOrder === "desc" ? "높은 순" : "낮은 순"} 정렬
        </button>
      </div>

      {sortedData.length > 0 &&
        sortedData.map((data) => (
          <Link
            key={data.SellerDetail.id}
            href={`/categories/${category}/category/${data.SellerDetail.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.masterContainer}>
              <div className={styles.banner}>
                <div className={styles.intro}>
                  <div className={styles.logoBorder}>
                    <img
                      src={`https://altermall.site/${data.SellerDetail.logo}`}
                      className={styles.logo}
                    />
                  </div>
                  <h1 className={styles.name}>{data.User.name}</h1>
                </div>
                <div className={styles.plus}>
                  더보기
                  <FontAwesomeIcon
                    className={styles.plusIcon}
                    icon={faPlusCircle}
                    size="1x"
                  />
                </div>
              </div>

              <div className={styles.recommendations}>
                <p className={styles.slogan}>{data.slogan}</p>
                <div className={styles.items}>
                  <Slider {...settings}>
                    {data.Items &&
                      data.Items.map((item) => (
                        <div key={item.item_id} className={styles.item}>
                          <Link
                            href={`/products/${item.item_id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <div className={styles.itemContainer}>
                              <img
                                src={`https://altermall.site/${item.img}`}
                                alt={item.item_name}
                                className={styles.itemImage}
                              />
                              <div className={styles.itemOverlay}>
                                <span className={styles.itemName}>
                                  {item.item_name}
                                </span>

                                {/* 건강 지수 표시 */}
                                {item.healthRating && (
                                  <div className={styles.healthRatingContainer}>
                                    <div className={styles.healthRating}>
                                      {[1, 2, 3, 4, 5].map((apple) => (
                                        <FontAwesomeIcon
                                          key={apple}
                                          icon={faAppleWhole}
                                          style={{
                                            color:
                                              apple <= item.healthRating
                                                ? "#4CAF50"
                                                : "#ccc",
                                          }}
                                          className={styles.appleIcon}
                                        />
                                      ))}
                                      <span
                                        className={styles.healthRatingValue}
                                      >
                                        {item.healthRating.toFixed(1)}
                                      </span>
                                      {/* '?' 버튼 추가 */}
                                      <button className={styles.infoButton}>
                                        <FontAwesomeIcon
                                          icon={faCircleQuestion}
                                        />
                                        {/* 툴팁 */}
                                        <div className={styles.tooltip}>
                                          이 상품의 건강 지수는 영양 성분과
                                          원재료를 기반으로 평가되었습니다.
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ItemPage;
