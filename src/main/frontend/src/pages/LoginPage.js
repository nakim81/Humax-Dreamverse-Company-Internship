// LoginPage.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState(null);

    const history = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8080/user/login', { id: userId, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            alert('로그인되었습니다.');
            history('/');
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
        </div>
    );
};

export default LoginPage;
