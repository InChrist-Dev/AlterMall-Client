"use client";
import { useState } from "react";
import styles from "./login_selller.module.css";
import Cookies from "js-cookie";
import DeliveryInfoModal from "./Modal";
import { auth, db } from "@/fire-config"; // 실제 경로에 맞게 수정하세요.
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // 사장님 로그인 함수
  const handleSellerLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.position === "seller") {
            Cookies.set("position", userData.position, { expires: 1 });
            window.location.href = "https://altermall.shop/admin_seller";
          } else {
            alert("사장님 계정이 아닙니다. 다시 확인해주세요");
          }
        } else {
          alert("사용자 정보를 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다: " + error.message);
    }
  };

  // 회원 로그인 함수
  const handleCustomerLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.position === "customer") {
            Cookies.set("position", userData.position, { expires: 1 });
            window.location.href = `${process.env.URL}/user`;
          } else {
            alert("구매자 계정이 아닙니다. 다시 확인해주세요");
          }
        } else {
          alert("사용자 정보를 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다: " + error.message);
    }
  };

  // Google 로그인 함수
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // 새로운 사용자이므로 Firestore에 데이터 저장
          await setDoc(userRef, {
            email: user.email,
            position: "customer", // 기본적으로 회원으로 설정
            // 기타 필요한 정보
          });
        }

        const userData = (await getDoc(userRef)).data();
        Cookies.set("position", userData.position, { expires: 1 });

        if (userData.position === "seller") {
          window.location.href = "https://altermall.shop/admin_seller";
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_URL}/user`;
        }
      }
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      alert("Google 로그인에 실패했습니다: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ display: showModal ? "block" : "none" }}>
        <DeliveryInfoModal closeModal={closeModal} />
      </div>
      <h1>로그인</h1>
      <span className={styles.form}>
        <label className={styles.label} htmlFor="username">
          아이디
        </label>
        <input
          className={styles.input}
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.localButton} onClick={handleCustomerLogin}>
          회원 로그인
        </button>
        <button className={styles.sellerButton} onClick={handleSellerLogin}>
          사장님 로그인
        </button>

        <div className={styles.groupBtn}>
          <div className={styles.registerText}>
            아직 회원이 아니신가요?
            <button className={styles.registerBtn} onClick={openModal}>
              {" "}
              10초 간편 회원가입
            </button>
          </div>
        </div>
      </span>

      <div className={styles.division}>소셜 로그인</div>

      <div className={styles.form}>
        <div className={styles.socialBox}>
          <img
            onClick={handleGoogleLogin}
            className={styles.btn_social_login}
            style={{ background: "#fff" }}
            src="/google_logo.webp"
            alt="Google Login"
          />
          {/* Kakao 및 Naver 로그인은 별도로 처리해야 합니다 */}
        </div>
      </div>

      {/* 기타 요소들 */}
    </div>
  );
}
