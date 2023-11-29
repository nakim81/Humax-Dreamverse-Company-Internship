import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuth from "../useAuth";

const MyPage = () => {
    useAuth();
    const history = useNavigate();
    const handleViewInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await axios.get('http://localhost:8080/user/mypage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 응답을 알림창으로 출력합니다.
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
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const phoneNum = prompt('새로운 전화번호를 입력하세요. (수정하지 않는다면 현재 전화번호 입력)');
            const email = prompt('새로운 이메일을 입력하세요. (수정하지 않는다면 현재 이메일 입력)');

            const response = await axios.put('http://localhost:8080/user/mypage', {
                phoneNum,
                email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await axios.delete('http://localhost:8080/user/withdraw', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            alert('회원탈퇴가 성공적으로 처리되었습니다.');
            history('/');
        } catch (error) {
            console.error('Error deleting user account', error);
        }
    };

    return (
        <>
            <div>
                <h1>MyPage</h1>
                <button onClick={handleViewInfo}>내 정보 조회</button>
                <button onClick={handleUpdateInfo}>내 정보 수정</button>
                <button onClick={handleDeleteAccount}>회원탈퇴</button>
            </div>
        </>
    );
};

export default MyPage;
