import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import styles from "./MyPage.module.css";
import api from '../api/axiosConfig';

const MyPage = () => {
    const history = useNavigate();
    const handleViewInfo = async () => {
        try {
            const response = await api.get('/user/mypage');

            const userInfo = response.data.body;
            alert(`
                아이디: ${userInfo.id}
                전화번호: ${userInfo.phoneNum}
                이메일: ${userInfo.email}
            `);
        } catch (error) {
            console.error('Error getting user info', error);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            const phoneNum = prompt('새로운 전화번호를 입력하세요. (전화번호를 수정하지 않는다면 취소 클릭)');
            const email = prompt('새로운 이메일을 입력하세요. (이메일을 수정하지 않는다면 취소 클릭)');

            await api.put('/user/mypage', {
                phoneNum,
                email
            });

            alert('정보가 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('Error updating user info', error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete('/user/withdraw');

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('admin');
            alert('회원탈퇴가 성공적으로 처리되었습니다.');
            history('/');
        } catch (error) {
            console.error('Error deleting user account', error);
        }
    };

    return (
        <>
            <div className={styles["mypage-container"]}>
                <h1>MyPage</h1>
                <button onClick={handleViewInfo}>내 정보 조회</button>
                <button onClick={handleUpdateInfo}>내 정보 수정</button>
                <button onClick={handleDeleteAccount}>회원탈퇴</button>
                <Link to="/"><button className={styles["home-button"]}>홈으로</button></Link>
            </div>
        </>
    );
};

export default MyPage;
