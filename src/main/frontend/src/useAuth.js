import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인 후 이용해주세요.');
            history('/login');
        } else {
            axios.get('http://localhost:8080/user/mypage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // 토큰이 유효한 경우 아무런 동작을 하지 않습니다.
                })
                .catch(error => {
                    // 토큰이 유효하지 않은 경우 로그인 페이지로 이동합니다.
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    alert('다시 로그인해주세요.');
                    history('/login');
                });
        }
    }, []);
};

export default useAuth;
