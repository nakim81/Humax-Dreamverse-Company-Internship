import React, { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [email, setEmail] = useState(null);

    const history = useNavigate();

    const checkDuplicateId = async () => {
        try {
            const res = await axios.post('http://3.38.97.205:3000/user/check-duplicate-id', { id });
            if (res.data.duplicate) {
                alert('이미 사용 중인 아이디입니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkDuplicatePhoneNum = async () => {
        try {
            const res = await axios.post('http://3.38.97.205:3000/user/check-duplicate-phoneNum', { phoneNum });
            if (res.data.duplicate) {
                alert('이미 사용 중인 전화번호입니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkDuplicateEmail = async () => {
        try {
            const res = await axios.post('http://3.38.97.205:3000/user/check-duplicate-email', { email });
            if (res.data.duplicate) {
                alert('이미 사용 중인 이메일입니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async () => {
        await checkDuplicateId();
        await checkDuplicatePhoneNum();
        await checkDuplicateEmail();
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (!phoneNum) {
            alert('전화번호를 입력해주세요.');
            return;
        }
        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        try {
            await axios.post('http://3.38.97.205:3000/user/sign-up', { id, password, phoneNum, email });
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
            <Link to="/"><button className={styles["home-button"]}>홈으로</button></Link>
        </div>
    );
};

export default SignUpPage;
