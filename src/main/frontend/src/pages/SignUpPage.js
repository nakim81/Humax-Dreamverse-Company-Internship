import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [email, setEmail] = useState(null);

    const history = useNavigate();

    const handleSignUp = async () => {
        try {
            await axios.post('http://localhost:8080/user/sign-up', { id, password, phoneNum, email });
            alert('회원가입되었습니다.');
            history('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles["sign-up-container"]}>
            <h1>회원가입</h1>
            <input
                type="text"
                placeholder="아이디 입력"
                value={id || ""}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호 입력"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="전화번호 입력"
                value={phoneNum || ""}
                onChange={(e) => setPhoneNum(e.target.value)}
            />
            <input
                type="email"
                placeholder="이메일 입력"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button onClick={handleSignUp}>회원가입</button>
        </div>
    );
};

export default SignUpPage;
