// ItemPage.jsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./basket.module.css";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/fire-config"; // 실제 경로에 맞게 수정하세요.
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/fire-config"; // Firestore 인스턴스 import

const ItemPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isStock, setIsStock] = useState(true);
  const [quantity, setQuantity] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const myUuid = uuidv4();

  // 사용자 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchData(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 장바구니 데이터 가져오기
  const fetchData = async (currentUser) => {
    try {
      if (!currentUser) {
        // 비회원인 경우 로컬 스토리지에서 장바구니 데이터 가져오기
        const cartString = localStorage.getItem("cart");
        if (!cartString) {
          alert("비회원은 제품을 담은 후 장바구니를 이용하실 수 있습니다.");
          window.location.href = "/";
          return;
        }
        const cartJson = JSON.parse(cartString);
        setItems(cartJson);
        const initialQuantity = cartJson.map((item) => item.amount);
        setQuantity(initialQuantity);
        setSelectedItems([...Array(cartJson.length).keys()]);
      } else {
        // 회원인 경우 Firestore에서 장바구니 데이터 가져오기
        const cartRef = collection(db, "carts");
        const q = query(cartRef, where("customer_id", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const cartItems = [];
        for (const docSnap of querySnapshot.docs) {
          const cartData = docSnap.data();
          const itemDoc = await getDoc(doc(db, "items", cartData.item_id));
          const itemData = itemDoc.data();

          cartItems.push({
            id: docSnap.id,
            ...cartData,
            Item: itemData,
          });
        }

        setItems(cartItems);

        const initialQuantity = cartItems.map((item) => item.amount);
        setQuantity(initialQuantity);
        setSelectedItems([...Array(cartItems.length).keys()]);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 주문 처리 함수
  const handleSubmit = async () => {
    const selectedOrderItems = items.filter((item, index) =>
      selectedItems.includes(index)
    );

    // 선택된 상품이 없으면 아무 동작도 하지 않습니다.
    if (selectedOrderItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }

    const orderItems = selectedOrderItems.map((item) => {
      return {
        order_id: myUuid,
        seller_id: item.Item.seller_id,
        stock: item.amount, // 총 주문량
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

    if (!user) {
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

      // 비회원 주문 처리를 위한 로직 추가 필요
      // 예를 들어, 비회원 주문 페이지로 리다이렉트
      window.location.href = "/guestorder";
    } else {
      // 회원인 경우 주문 정보 Firestore에 저장
      try {
        const orderRef = await addDoc(collection(db, "orders"), {
          order_id: myUuid,
          customer_id: user.uid,
          items: orderItems,
          createdAt: new Date(),
        });

        alert("주문이 완료되었습니다.");
        // 주문 완료 후 필요한 로직 추가
      } catch (error) {
        console.error("주문 처리 중 오류 발생:", error);
        alert("주문 처리에 실패하였습니다.");
      }
    }
  };

  // 상품 선택 토글
  const toggleItemSelection = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  // 모든 상품 선택/해제 토글
  const toggleAllItemsSelection = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(items.length).keys()]);
    }
  };

  // 상품 가격 계산
  const getItemPrice = (item) => {
    if (!user) {
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

  // 상품 이름 가져오기
  const getItemName = (item) => {
    if (!user) {
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
      item.Item.item_name + (selectedOption ? "-" + selectedOption.name : "")
    );
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, index) => total + getItemPrice(items[index]) * quantity[index],
      0
    );
  };

  // 수량 변경 처리
  const handleQuantityChange = (index, newAmount) => {
    if (newAmount >= 1) {
      const newQuantity = [...quantity];
      newQuantity[index] = newAmount;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].amount = newAmount;
      setItems(updatedItems);
    } else {
      const newQuantity = [...quantity];
      newQuantity[index] = 1;
      setQuantity(newQuantity);

      const updatedItems = [...items];
      updatedItems[index].amount = 1;
      setItems(updatedItems);
    }
  };

  // 장바구니 아이템 삭제
  const Cancel = useCallback(
    async (id, item_id) => {
      if (user) {
        // 회원인 경우 Firestore에서 장바구니 아이템 삭제
        try {
          await deleteDoc(doc(db, "carts", id));
          alert("삭제되었습니다");
          fetchData(user);
        } catch (error) {
          console.error("삭제 중 오류 발생:", error);
          alert("삭제 실패하였습니다");
        }
      } else {
        // 비회원인 경우 로컬 스토리지에서 아이템 삭제
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          let updatedCart = JSON.parse(cartData);
          updatedCart = updatedCart.filter(
            (item) => item.Item.item_id !== item_id
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          fetchData(user);
          alert("삭제되었습니다");
        } else {
          alert("삭제 실패하였습니다");
        }
      }
    },
    [user]
  );

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
            {items.map((item, index) => (
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
                    src={`https://altermall.site/${item.Item.img}`}
                    alt={item.Item.item_name}
                    className={styles.productImage}
                  />
                  {getItemName(item)}
                </td>
                <td>
                  <p>{getItemPrice(item)}원</p>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      Cancel(item.id, item.Item.item_id);
                    }}
                  >
                    X
                  </button>
                </td>
                <td>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, item.amount - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.amount}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, item.amount + 1)
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
