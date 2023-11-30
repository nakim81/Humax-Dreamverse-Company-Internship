import React, { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState(null);

    const history = useNavigate();

    const handleLogin = async () => {
        if (!userId) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:8080/user/login', { id: userId, password });
            if (res.data.token) { // 로그인 성공을 토큰의 유무로 판단
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                alert('로그인되었습니다.');
                history('/');
            } else {
                alert('아이디와 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error(error);
            alert('아이디와 비밀번호를 확인해주세요');
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
            <Link to="/"><button className={styles["home-button"]}>홈으로</button></Link>
        </div>
    );
};

export default LoginPage;
