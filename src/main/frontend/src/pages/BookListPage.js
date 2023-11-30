import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookListPage.css";
import Pagination from "@mui/material/Pagination";
import useAuth from "../useAuth";

const BookListPage = () => {
    useAuth();
    const jwtToken = localStorage.getItem('token');

    const [page, setPage] = useState(1);
    const [bookData, setBookData] = useState([]);
    const [totalPage, setTotalPage]  = useState();
    const [showPay, setShowPay] = useState([]);

    const fetchBookData = async (page, jwtToken) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/book?page=${page-1}`, {
                headers: {Authorization: `Bearer ${jwtToken}`}
            })
            setBookData(response.data.body.content)
            setShowPay(Array(response.data.body.content.length).fill(false))
            setTotalPage(response.data.body.totalPages)
        } catch (err) {
            console.error('book data error', err)
        }
    }

    useEffect(() => {
        fetchBookData(page, jwtToken);
    }, [page, jwtToken]);

    const cancelBookClick = async (bookId, jwtToken) => {
        try{
            await axios.patch(`http://localhost:8080/user/book/cancel/${bookId}`, {
                headers: {Authorization: `Bearer ${jwtToken}`}
            })
            alert('예약이 취소되었습니다.')
            fetchBookData()
        }catch (error){
            if(error.response && error.response.status === 400){
                alert(error.response.data.result.resultDescription)
            }else{
                console.error('Cancle 요청 에러:', error)
                alert("서버 장애")
            }
        }
    }

    const handlePayClick = (index) => {
        setShowPay((prevStates) => {
        return prevStates.map((state, i) => (i === index ? !state : state));
      });
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchBookData(page);
    };

    return (
        <>
            <div>
                <h1>이용 내역 조회</h1>
                <div class = "gridContainer">
                    {bookData.map((book, index) => (
                        <div key={index} className="bookContainer">
                            <p><span className="bookState">{book.state}</span> {book.parkingLotName}</p>
                            <p>차 번호: {book.carNumber}</p>
                            <p>티켓 종류: {book.ticket}</p>
                            <p>이용 시간: {book.startTime} ~ {book.endTime}</p>
                            <button
                            onClick={() => handlePayClick(index)}
                            className="button">
                                결제 상세
                            </button>
                            <button
                            onClick={() => cancelBookClick(book.bookId, jwtToken)}
                            className="button">
                                예약 취소
                            </button>
                            {showPay[index] && (
                                <div>
                                    <p>결제 수단: {book.payName}</p>
                                    <p>결제 금액: {book.price}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <Pagination
                    onClick={()=>handlePageChange()}
                    page={page}
                    count={totalPage}
                />

            </div>
        </>
    );
};

export default BookListPage;