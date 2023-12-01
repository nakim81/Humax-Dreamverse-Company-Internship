import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import HeroImage from "../assets/home-bg.jpg";

const Home = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/user/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      setUserId(null);

      alert("로그아웃되었습니다.");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      {/* <h1>주차장 관리</h1>
      <br />
      {userId ? (
        <>
          <h2>유저 번호: {userId}</h2>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <button>
            <Link to="/login">로그인</Link>
          </button>
          <button>
            <Link to="/signup">회원가입</Link>
          </button>
        </>
      )}
      <br />
      <div className="btnContainer">
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/${userId}/mypage`)}
        >
          마이페이지
        </button>
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/${userId}/car`)}
        >
          차량 관리
        </button>
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/${userId}/booklist`)}
        >
          주차권 예약
        </button>
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/${userId}/pay`)}
        >
          결제수단
        </button>
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/parkinglot`)}
        >
          주차장
        </button>
      </div> */}
      <img src={HeroImage} alt="hero-image" />
    </>
  );
};

export default Home;
