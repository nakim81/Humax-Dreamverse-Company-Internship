import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [userId, setUserId] = useState(null);

  return (
    <>
      <h1>주차장 관리</h1>
      <input
        type="text"
        placeholder="userId 입력"
        value={userId || ""}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <div className="btnContainer">
        <button
          className="btn"
          onClick={() => (document.location.href = `/user/${userId}`)}
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
          onClick={() => (document.location.href = `/user/${userId}/book`)}
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
          onClick={() =>
            (document.location.href = `/user/${userId}/parkinglot`)
          }
        >
          주차장
        </button>
      </div>
    </>
  );
};

export default Home;
