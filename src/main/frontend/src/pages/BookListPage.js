import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import "./BookListPage.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {API_BASE_URL} from "../constants";

const BookListPage = () => {
    const { token } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [bookData, setBookData] = useState([]);
    const [totalPage, setTotalPage]  = useState();
    const [showPay, setShowPay] = useState([]);
    const [state, setState] = useState(false);

    const fetchBookData = async (page, state, token) => {
        try {
            console.log(state)
            const url = API_BASE_URL + `/user/book?page=${page-1}` + (state ? `&state=READY_TO_USE` : ``)
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setBookData(response.data.body.content)
            setShowPay(Array(response.data.body.content.length).fill(false))
            setTotalPage(response.data.body.totalPages)
        } catch (err) {
            console.error('book data error', err)
        }
    }

    useEffect(() => {
        fetchBookData(page, state, token);
    }, [page, state, token]);

    const cancelBookClick = async (index, bookId, token) => {
        try{
            await axios.patch(API_BASE_URL + `/user/book/cancel/${bookId}`, {}, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            alert('예약이 취소되었습니다.')
            setBookData((prevData) => {
              const newData = [...prevData];
              newData[index] = { ...newData[index], 'state': '예약 취소' };
              return newData;
            });
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
        fetchBookData(value, state, token);
    };

    const handleFilter = () => {
        fetchBookData(1, !state, token);
        setState(!state);
        setPage(1);
    }

    return (
        <>
            {bookData.length === 0 ? (
                <h3 style={{textAlign: 'center', marginTop: '20%'}}> 이용 내역이 없습니다. </h3>
            ):(
                <div>
                    <h1 style={{textAlign: 'center', marginTop: '20px'}}>이용 내역 조회</h1>

                    <div style={{textAlign: 'center'}}>
                        <label>
                            <input type="checkbox" onChange={handleFilter}/>
                               이용 대기만
                        </label>
                    </div>

                    <div className = "gridContainer">
                        {bookData.map((book, index) => (
                            <div key={index} className="bookContainer">
                                <p><span className="bookState">{book.state}</span> {book.parkingLotName}</p>
                                <p>차 번호: {book.carNumber}</p>
                                <p>티켓 종류: {book.ticket}</p>
                                <p>이용 시간: {book.startTime} ~ {book.endTime}</p>
                                <button
                                    onClick={() => handlePayClick(index)}
                                    className="buttons"
                                >
                                    결제 상세
                                </button>
                                <button
                                    onClick={() => cancelBookClick(index, book.bookId, token)}
                                    className="buttons"
                                >
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

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Pagination
                            onChange={handlePageChange}
                            page={page}
                            count={totalPage}

                        />
                    </div>

                </div>
            )}
        </>
    );
};

export default BookListPage;