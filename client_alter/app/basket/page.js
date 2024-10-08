// ItemPage.jsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./basket.module.css"; // Import the CSS module
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get("accessToken");

const ItemPage = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [seller, setSeller] = useState("");
  const [isStock, setIsStock] = useState(true);
  const [quantity, setQuantity] = useState([]);
  const [items, setItems] = useState([]);
  const myUuid = uuidv4();

  const fetchData = async () => {
    try {
      if (!accessToken) {
        const cartString = localStorage.getItem("cart"); // 로컬 스토리지에서 데이터 가져오기
        if (!cartString) {
          alert("비회원은 제품을 담은 후 장바구니를 이용하실 수 있습니다.");
          window.location.href = "/";
        }
        const cartJson = JSON.parse(cartString); // JSON으로 변환

        console.log(cartJson);
        setItems(cartJson);

        const initialQuantity = cartJson.map((item) => item.amount);

        setQuantity(initialQuantity);
        setSelectedItems([...Array(cartJson.length).keys()]);
      } else {
        const response = await fetch(`https://altermall.site/customer/cart/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data.data.rows);
        setItems(data.data.rows);

        const initialQuantity = data.data.rows.map((item) => item.amount);

        setQuantity(initialQuantity);
        setSelectedItems([...Array(data.data.rows.length).keys()]);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const selectedOrderItems = items.filter((item, index) =>
      selectedItems.includes(index)
    );

    // 선택된 상품이 없으면 아무 동작도 하지 않습니다.
    if (selectedOrderItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    console.log(selectedOrderItems);
    const orderItems = selectedOrderItems.map((item) => {
      return {
        order_id: myUuid,
        seller_id: item.Item.seller_id,
        stock: item.amount, //총 주문량
        price: getItemPrice(item),
        item_id: item.Item.item_id,
        item_name: getItemName(item),
        img: item.Item.img,
        delivery: item.Item.delivery,
      };
    });
    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      if (item.stock > items[i].Item.stock) {
        alert(`${item.item_name} 주문량이 재고보다 많습니다. 수정해주세요`);
        return; // 함수를 빠져나옴
      }
    }
    if (!accessToken) {
      // 비회원인 경우
      const orderInfo = {
        order_id: myUuid,
        seller_id: items.seller_id,
        delivery: selectedOrderItems[0].Item.delivery,
        items: orderItems,
        // 여기에 필요한 다른 주문 정보를 추가합니다.
      };

      // 로컬 스토리지에 주문 정보 저장
      localStorage.setItem("order", JSON.stringify(orderInfo));

      // 비회원 주문 처리를 위한 fetch 요청
      await fetch("https://altermall.site/auth/guest/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: myUuid, name: "guest" }),
      })
        .then(async (response) => {
          if (response.ok) {
            // 주문 정보를 서버에 성공적으로 전송한 경우
            const data = await response.json();
            console.log(data.accessToken);
            Cookies.set("accessToken", data.accessToken, { expires: 1 }); // 1일 동안 유지되도록 설정
            Cookies.set("position", data.position, { expires: 1 }); // 1일 동안 유지되도록 설정
            window.location.href = "https://altermall.shop/guestorder";
          } else {
            // 주문 실패한 경우
            alert("주문 실패하였습니다");
          }
        })
        .catch((error) => {
          console.error("주문 요청 중 오류 발생:", error);
        });
    } else {
      if (isStock == true) {
        await fetch("https://altermall.site/customer/order", {
          method: "post",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: myUuid,
            seller_id: items[0].Item.seller_id,
          }),
        }).then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (response.status == 405) {
            alert("주문 실패하였습니다");
          } else if (response.status == 201) {
            await fetch("https://altermall.site/customer/orderdetail", {
              method: "post",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: orderItems,
              }),
            }).then(async (response) => {
              if (response.status == 405) {
                alert("주문 실패하였습니다");
              } else if (response.status == 201) {
                window.location.href = "/order";

                const data = await response.json();
                console.log(data);
              }
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
          }
        });
      }
    }
  };
  const toggleItemSelection = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const toggleAllItemsSelection = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(items.length).keys()]);
    }
  };

  const getItemPrice = (item) => {
    if (!accessToken) {
      // 비회원인 경우
      return item.price; // 이미 옵션이 반영된 가격
    } else {
      // 회원인 경우
      if (
        item.options === 0 ||
        !item.Item.options ||
        !item.Item.options.options
      ) {
        return item.Item.price;
      }
      const selectedOption = item.Item.options.options[item.options];
      return (
        item.Item.price + (selectedOption ? selectedOption.additionalPrice : 0)
      );
    }
  };

  const getItemName = (item) => {
    if (!accessToken) {
      return item.Item.item_name + "-" + item.option_name;
    }
    if (
      item.options === 0 ||
      !item.Item.options ||
      !item.Item.options.options
    ) {
      return item.Item.item_name;
    }
    const selectedOption = item.Item.options.options[item.options];
    return (
      item.Item.item_name + (selectedOption ? "-" + selectedOption.name : null)
    );
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, index) => total + getItemPrice(items[index]) * quantity[index],
      0
    );
  };

  const handleQuantityChange = (index, newAmount) => {
    if (newAmount >= 1) {
      const newQuantity = { ...quantity };
      newQuantity[index] = newAmount;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].amount = newAmount;
      setItems(updatedItems);
    } else {
      const newQuantity = { ...quantity };
      newQuantity[index] = 1;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].amount = 1;
      setItems(updatedItems);
    }
  };

  const Cancel = useCallback((id, item_id) => {
    if (accessToken) {
      fetch(`https://altermall.site/customer/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 405) {
            alert("삭제 실패하였습니다");
          } else if (response.status == 201) {
            alert("삭제되었습니다");
            fetchData();
          }
        })
        .finally(() => {
          // window.location.reload();
        });
    } else {
      // 비회원인 경우
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        let updatedCart = JSON.parse(cartData);
        console.log(updatedCart);
        updatedCart = updatedCart.filter(
          (item) => item.Item.item_id != item_id
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        fetchData(); // 장바구니 다시 불러오기
        alert("삭제되었습니다");
      } else {
        alert("삭제 실패하였습니다");
      }
    }
  }, []);
  return (
    <div style={{ marginBottom: "100px" }}>
      <h1 className={styles.title}>장바구니</h1>
      <div className={styles.basketContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={toggleAllItemsSelection}
                />
              </th>
              <th>상품</th>
              <th>가격</th>
              <th>취소</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index} className={styles.productCard}>
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItemSelection(index)}
                  />
                </td>
                <td className={styles.nameContainer}>
                  <img
                    src={`https://altermall.site/${items.Item.img}`}
                    alt={items.Item.item_name}
                    className={styles.productImage}
                  />

                  {getItemName(items)}
                </td>
                <td>
                  <p>{getItemPrice(items)}원</p>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      Cancel(items.id, items.Item.item_id);
                    }}
                  >
                    X
                  </button>
                </td>
                <td>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.amount - 1)
                      }
                    >
                      -
                    </button>
                    <span>{items.amount}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.amount + 1)
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
      <div className={styles.info}>※배송비는 가게별로 책정됩니다</div>
      <div className={styles.totalPrice}>
        총 가격: {calculateTotalPrice()}원
      </div>
      <div className={styles.Buttons}>
        <button
          className={styles.addToCartButton}
          onClick={() => {
            location.href = "/";
          }}
        >
          쇼핑 계속하기
        </button>
        <button
          className={styles.BuyButton}
          onClick={() => {
            handleSubmit();
          }}
        >
          바로구매
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
