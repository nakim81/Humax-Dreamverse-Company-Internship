import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import styles from "./BookListPage.module.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import { API_BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import CalculateCost from "../components/CalculateCost";
import moment from "moment";

const BookListPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [bookData, setBookData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [showPay, setShowPay] = useState([]);
  const [state, setState] = useState(false);

  const fetchBookData = async (page, state, token) => {
    try {
      const url =
        API_BASE_URL +
        `/user/book?page=${page - 1}` +
        (state ? `&state=READY_TO_USE` : ``);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookData(response.data.body.content);
      setShowPay(Array(response.data.body.content.length).fill(false));
      setTotalPage(response.data.body.totalPages);
    } catch (err) {
      console.error("book data error", err);
    }
  };

  console.log(bookData);

  useEffect(() => {
    fetchBookData(page, state, token);
  }, [page, state, token]);

  const cancelBookClick = async (index, bookId, token) => {
    try {
      await axios.patch(
        API_BASE_URL + `/user/book/cancel/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("예약이 취소되었습니다.");
      setBookData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], state: "예약 취소" };
        return newData;
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.result.resultDescription);
      } else {
        console.error("Cancle 요청 에러:", error);
        alert("서버 장애");
      }
    }
  };

  const handlePayClick = (index) => {
    setShowPay((prevStates) => {
      return prevStates.map((state, i) => (i === index ? !state : state));
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchBookData(value, state, token);
  };

  const handleFilter = () => {
    fetchBookData(1, !state, token);
    setState(!state);
    setPage(1);
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const calculateCost = (enterTime, outTime, price) => {
    var cost = CalculateCost(
      30,
      15,
      2000,
      500,
      25000,
      moment(enterTime, "YYYY-MM-DD HH:mm"),
      moment(outTime, "YYYY-MM-DD HH:mm")
    );
    cost = cost - price;
    console.log(enterTime, outTime, price);
    console.log(cost);
    return cost;
  };

  return (
    <>
      <div>
        <div className={styles.gridContainer}>
          <div className={styles.bookHeader}>
            <div className={styles.bookBackBtn}>
              <ArrowBackIcon
                onClick={() => navigate("/user/mypage")}
                className={styles.bookArrowBackIcon}
              />
              이용 내역 조회
            </div>

            <div>
              <input type="checkbox" onChange={handleFilter} />
              이용 대기만
            </div>
          </div>
          {bookData.length === 0 ? (
            <div className={styles.nullListText}>이용 내역이 없습니다.</div>
          ) : (
            bookData.map((book, index) => (
              <div key={index} className={styles.bookContainer}>
                <div className={styles.bookName}>
                  <div className={styles.bookStateContainer}>
                    {book.state === "예약 취소" ||
                    book.state === "미사용 취소" ? (
                      <div className={styles.bookStateCancel}>{book.state}</div>
                    ) : (
                      <></>
                    )}
                    {book.state === "이용 종료" ? (
                      <div className={styles.bookStateEnd}>{book.state}</div>
                    ) : (
                      <></>
                    )}
                    {book.state === "이용 대기" ? (
                      <div className={styles.bookStateStart}>{book.state}</div>
                    ) : (
                      <></>
                    )}
                    {book.state === "이용중" ? (
                      <div className={styles.bookStateUse}>{book.state}</div>
                    ) : (
                      <></>
                    )}
                    {book.parkingLotName}
                  </div>
                  <button
                    className={styles.parkingDetailBtn}
                    onClick={() =>
                      navigate(`/user/parkinglot/${book.parkingLotId}`)
                    }
                  >
                    주차장 상세 보기
                  </button>
                </div>
                <div className={styles.grayText}>주차권 / {book.ticket}</div>
                <div className={styles.listFooter}>
                  <div className={styles.timeContainer}>
                    <div className={styles.startTime}>
                      {new Intl.DateTimeFormat("ko-KR", options).format(
                        new Date(book.startTime)
                      )}
                    </div>
                    <div className={styles.endTime}>
                      ~{" "}
                      {new Intl.DateTimeFormat("ko-KR", options).format(
                        new Date(book.endTime)
                      )}
                    </div>
                  </div>
                  <div className={styles.priceText}>
                    {/* {book.price} */}
                    {calculateCost(book.enterTime, book.outTime, book.price) >
                    0 ? (
                      <>
                        {book.price +
                          calculateCost(
                            book.enterTime,
                            book.outTime,
                            book.price
                          )}
                      </>
                    ) : (
                      <>{book.price}</>
                    )}
                    원
                  </div>
                </div>

                <div className={styles.bookBtnContainer}>
                  {showPay[index] ? (
                    <ExpandLessIcon
                      onClick={() => handlePayClick(index)}
                      className={styles.detailButtons}
                    />
                  ) : (
                    <ExpandMoreIcon
                      onClick={() => handlePayClick(index)}
                      className={styles.detailButtons}
                    />
                  )}
                </div>
                {showPay[index] && (
                  <div className={styles.showPay}>
                    <div className={styles.largeBoldText}>예약 상세</div>
                    <div className={styles.payDetailContainer}>
                      <div>
                        <div className={styles.colorMediumText}>이용 차량</div>
                        <div className={styles.mediumText}>
                          {book.carNumber}
                        </div>
                      </div>
                      <div>
                        <div className={styles.colorMediumText}>결제 수단</div>
                        <div className={styles.mediumText}>{book.payName}</div>
                      </div>
                      {book.enterTime !== null && (
                        <div>
                          <div className={styles.colorMediumText}>
                            입차 시간
                          </div>
                          <div className={styles.mediumText}>
                            {new Intl.DateTimeFormat("ko-KR", options).format(
                              new Date(book.enterTime)
                            )}
                          </div>
                        </div>
                      )}
                      {book.outTime !== null && (
                        <div>
                          <div className={styles.colorMediumText}>
                            출차 시간
                          </div>
                          <div className={styles.mediumText}>
                            {new Intl.DateTimeFormat("ko-KR", options).format(
                              new Date(book.outTime)
                            )}
                          </div>
                        </div>
                      )}
                      {calculateCost(book.enterTime, book.outTime, book.price) >
                        0 && (
                        <div>
                          <div className={styles.colorMediumText}>
                            이용 금액
                          </div>
                          <div className={styles.costContainer}>
                            <div className={styles.mediumText}>
                              {book.price}
                            </div>
                            <div className={styles.plus}> + </div>
                            <div className={styles.addPriceTexts}>
                              <div className={styles.addPriceText}>
                                추가요금{" "}
                                {calculateCost(
                                  book.enterTime,
                                  book.outTime,
                                  book.price
                                )}
                              </div>
                            </div>{" "}
                            원
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.cancleTextContainer}>
                      <div className={styles.mediumText}>※ 취소/환불규정</div>
                      <div className={styles.listText}>
                        <li>
                          예약 후 미사용한 주차권은 예약날짜 내 취소가
                          가능합니다.
                        </li>
                        <li>
                          취소 신청은 '마이페이지 - 이용내역'에서 가능합니다.
                        </li>
                        <li>
                          주차권 예약 후 이용가능 시간에 입차했을 경우, 주차권은
                          자동으로 사용되어 취소/환불이 불가능합니다.
                        </li>
                        <li>
                          단, 사용한 주차장에서 서비스 제공에 문제가 생겼거나,
                          그 제공수준이 현저히 낮을 경우에 한해 전액 환불 받을
                          수 있습니다.
                        </li>
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      <button
                        onClick={() =>
                          cancelBookClick(index, book.bookId, token)
                        }
                        className={styles.cancleBtn}
                      >
                        예약 취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {bookData.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Pagination
              onChange={handlePageChange}
              page={page}
              count={totalPage}
            />
          </div>
        )}
        ;
      </div>
    </>
  );
};

export default BookListPage;
