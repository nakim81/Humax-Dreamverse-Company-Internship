import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import AuthContext from "../hooks/AuthContext";
import {API_BASE_URL} from "../constants";

const LoginPage = () => {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useContext(AuthContext);

  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_BASE_URL + "/user/login", {
        id: userId,
        password,
      });

      login(res.data.token, res.data.userId, res.data.admin);

      alert("로그인되었습니다.");
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디 입력"
        value={userId || ""}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>로그인</button>
      <Link to="/">
        <button className={styles["home-button"]}>홈으로</button>
      </Link>
    </div>
  );
};

export default LoginPage;
