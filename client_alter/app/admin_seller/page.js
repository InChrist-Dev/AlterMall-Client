"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./admin_seller.module.css"; // Import the CSS module
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get("accessToken");

const ItemPage = (props) => {
  const [files, setFiles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [next, setNext] = useState([]);
  const [pay, setPay] = useState([]);
  const [items, setItems] = useState([]);
  const [isOrder, setIsOrder] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [deliveryType, setDeliveryType] = useState("all");
  const [orderState, setOrderState] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("today"); // 기간 선택을 위한 상태 추가
  const [startDate, setStartDate] = useState(""); // 커스텀 시작일
  const [endDate, setEndDate] = useState(""); // 커스텀 종료일
  const [paySummary, setPaySummary] = useState([]); // 정산표 데이터를 위한 상태 추가
  const myUuid = uuidv4();

  console.log(myUuid);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const combinedFiles = [...files, ...acceptedFiles];
      setFiles(combinedFiles);
    },
    [files]
  );

  const fetchData = async () => {
    // 주문 데이터 가져오기
    try {
      const response = await fetch(
        `https://altermall.site/seller/order?time=today`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setOrders(data.data.rows);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }

    // 정산표 데이터 가져오기
    try {
      let url = `https://altermall.site/seller/paidSummary?period=${selectedPeriod}`;
      if (selectedPeriod === "custom") {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPaySummary(data.data.rows);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }

    // 오늘의 정산표 가져오기
    try {
      const response = await fetch(
        `https://altermall.site/seller/paid?time=today`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPay(data.data.rows);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }

    // 상품 데이터 가져오기
    try {
      const response = await fetch(`https://altermall.site/seller/items`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setItems(data.data.rows);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleQuantityChange = (index, newAmount) => {
    const updatedItems = [...items];
    updatedItems[index].stock = Math.max(newAmount, 0);
    setItems(updatedItems);
  };

  const handleNameChange = (index, newName) => {
    const updatedItems = [...items];
    updatedItems[index].item_name = newName;
    setItems(updatedItems);
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedItems = [...items];
    updatedItems[index].price = newPrice;
    setItems(updatedItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDisplayCountChange = (e) => {
    setDeliveryType(e.target.value);
  };

  const handleDisplayChange = (e) => {
    setOrderState(e.target.value);
  };

  const setDate = (data) => {
    const date = new Date(data);
    const formattedDate = date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    });
    return formattedDate;
  };

  const setPaid = useCallback((order) => {
    if (confirm("주문을 수정하시겠습니까?")) {
      fetch(`https://altermall.site/seller/order/${order.order_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.status == 405) {
            alert("수정 실패하였습니다");
          } else if (response.status == 201) {
            alert("해당 주문을 수정하였습니다");
          }
        })
        .finally(() => {
          window.location.reload();
        });
    }
  }, []);

  const Update = useCallback((id, stock, name, price) => {
    files.forEach((file, index) => {
      formData.append(`img`, file);
    });
    fetch(`https://altermall.site/category/item`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: stock,
        item_name: name,
        price: price,
        item_id: id,
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status == 405) {
        alert("수정 실패하였습니다");
      } else if (response.status == 200) {
        alert("수정되었습니다");
        window.location.reload();
      }
    });
  }, []);

  const {} = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    disabled: uploadDisabled,
  });

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    fetchData(period);
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      fetchData("custom");
    }
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <h1 className={styles.title}>상품 관리</h1>
      <div className={styles.basketContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th>재고</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index} className={styles.productCard}>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`https://altermall.site/${items.img}`}
                    alt={items.item_name}
                    className={styles.productImage}
                  />
                </td>
                <td>
                  <input
                    className={styles.nameInput}
                    placeholder={items.item_name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.nameInput}
                    placeholder={items.price + "원"}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.stock - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      className={styles.quantityInput}
                      placeholder={items.stock}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.stock + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOrder ? (
        <>
          <h2 className={styles.title}>이전 주문 내역</h2>
          <div className={styles.basketContainer}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>주문 일자</th>
                  <th>주문자 정보</th>
                  <th>배송 정보</th>
                  <th>상태</th>
                  <th>수락</th>
                  <th>상세</th>
                </tr>
              </thead>
              <tbody>
                {pay
                  .filter(
                    (order) =>
                      (orderState === "all" || order.state === orderState) &&
                      (deliveryType === "all" ||
                        order.delivery_type === deliveryType)
                  )
                  .map((order, index) => (
                    <>
                      <tr key={index} className={styles.orderRow}>
                        <td>
                          {order.OrderDetails[0].item_name}외{" "}
                          {order.OrderDetails
                            ? order.OrderDetails.length - 1
                            : ""}{" "}
                          건
                        </td>
                        <td>{setDate(order.createdAt)}</td>
                        <td>
                          <p>주문자명: {order.customer_name}</p>
                          <p>연락처: {order.phone}</p>
                          <p>
                            주소:{" "}
                            <b>
                              {order.addr} {order.addr_detail}
                            </b>
                          </p>
                        </td>
                        <td>
                          <p>
                            {order.delivery_type === "daily" ? (
                              <img
                                src="/today.jpg"
                                className={styles.postImage}
                                alt="따끈 배송"
                              />
                            ) : order.delivery_type === "normal" ? (
                              <img
                                src="post.jpg"
                                className={styles.postImage}
                                alt="택배 배송"
                              />
                            ) : null}
                          </p>
                          <p>요청 사항: {order.requests}</p>
                        </td>
                        {order.state === "paid" ? (
                          <td style={{ color: "green", fontWeight: "bold" }}>
                            결제완료
                          </td>
                        ) : order.state === "accept" ? (
                          <td style={{ color: "red", fontWeight: "bold" }}>
                            제조중
                          </td>
                        ) : order.state === "deliver" ? (
                          <td style={{ color: "blue", fontWeight: "bold" }}>
                            전송완료
                          </td>
                        ) : null}
                        <td>
                          {order.state === "paid" ? (
                            <button
                              onClick={() => setPaid(order)}
                              className={styles.accessButton}
                            >
                              수락
                            </button>
                          ) : order.state === "accept" ? (
                            <button
                              onClick={() => setPaid(order)}
                              className={styles.accessButton}
                            >
                              완료
                            </button>
                          ) : null}
                        </td>
                        <td>
                          <button
                            className={styles.detailBtn}
                            onClick={() => setSelectedOrder(!selectedOrder)}
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="9">
                          {selectedOrder && (
                            <div>
                              <table className={styles.detailTable}>
                                <tbody>
                                  {order.OrderDetails.map((detail, index) => (
                                    <tr key={index}>
                                      <td>{detail.item_name}</td>
                                      <td>{detail.price}원</td>
                                      <td>{detail.stock}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}

      <button onClick={() => setIsOrder(!isOrder)}>이전 내역</button>

      <button
        onClick={() => {
          Cookies.remove("accessToken");
          Cookies.remove("position");
          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default ItemPage;
