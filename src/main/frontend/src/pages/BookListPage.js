import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import "./BookListPage.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const BookListPage = () => {
    const { token } = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const [bookData, setBookData] = useState([]);
    const [totalPage, setTotalPage]  = useState();
    const [showPay, setShowPay] = useState([]);

    const fetchBookData = async (page, token) => {
        try {
            const response = await axios.get(`http://3.38.97.205:3000/user/book?page=${page-1}`, {
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
        fetchBookData(page, token);
    }, [page, token]);

    const cancelBookClick = async (index, bookId, token) => {
        try{
            await axios.patch(`http://3.38.97.205:3000/user/book/cancel/${bookId}`, {}, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            alert('예약이 취소되었습니다.')
            setBookData((prevData) => {
              // 새로운 배열을 생성하고 0번째 객체의 name을 3으로 변경
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
        console.log(page);
        fetchBookData(page);
    };

    return (
        <>
            {bookData == '' ? (
                <h3 style={{textAlign: 'center', marginTop: '20%'}}> 이용 내역이 없습니다. </h3>
            ):(
                <div>
                    <h1 style={{textAlign: 'center', marginTop: '20px'}}>이용 내역 조회</h1>
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