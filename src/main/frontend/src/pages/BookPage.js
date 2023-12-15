import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BookPage.module.css";
import AuthContext from "../hooks/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BookPage = () => {
  const { userId, token } = useContext(AuthContext);
  const { parkingId } = useParams();
  const navigate = useNavigate();

  const [carData, setCarData] = useState([]);
  const [payData, setPayData] = useState([]);

  const [reserveForm, setReserveForm] = useState({
    parkingLotId: parkingId,
    carId: "",
    payId: "",
    ticket: "",
    startTime: "",
    endTime: "",
    price: "0",
  });

  const tickets = [
    {
      name: "종일권",
      type: "Day",
      price: "25000",
      startTime: "00:00:00",
      endTime: "23:59:59",
    },
    {
      name: "1시간권",
      type: "Time",
      price: "3000",
      startTime: "00:00:00",
      endTime: "23:59:59",
    },
  ];

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 6);

  const fetchCarData = async (token) => {
    try {
      const response = await axios.get(API_BASE_URL + `/user/car`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarData(response.data);
    } catch (error) {
      console.error("carData 요청 에러: ", error);
    }
  };

  const fetchPayData = async (userId, token) => {
    try {
      const response = await axios.get(API_BASE_URL + `/user/pay`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayData(response.data);
    } catch (error) {
      console.error("carData 요청 에러: ", error);
    }
  };

  useEffect(() => {
    fetchCarData(token);
    fetchPayData(userId, token);
  }, [userId, token]);

  const handleSubmitClick = async () => {
    try {
      await axios.post(API_BASE_URL + `/user/book`, reserveForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("예약이 완료되었습니다.");
      navigate(`/user/parkinglot`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.result.resultDescription);
      } else {
        console.error("Cancle 요청 에러:", error);
        alert("예약 실패");
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (reserveForm.ticket !== "") {
      setReserveForm((prevData) => ({
        ...prevData,
        startTime: `${date.toISOString().split("T")[0]} ${
          reserveForm.startTime.split(" ")[1]
        }`,
      }));
      setReserveForm((prevData) => ({
        ...prevData,
        endTime: `${date.toISOString().split("T")[0]} ${
          reserveForm.endTime.split(" ")[1]
        }`,
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setReserveForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTicketChange = (event) => {
    const { value } = event.target;

    setReserveForm((prevData) => ({
      ...prevData,
      ticket: value === "-1" ? "" : tickets[value].type,
    }));
    setReserveForm((prevData) => ({
      ...prevData,
      startTime:
        value === "-1"
          ? ""
          : `${selectedDate.toISOString().split("T")[0]} ${
              tickets[value].startTime
            }`,
    }));
    setReserveForm((prevData) => ({
      ...prevData,
      endTime:
        value === "-1"
          ? ""
          : `${selectedDate.toISOString().split("T")[0]} ${
              tickets[value].endTime
            }`,
    }));
    setReserveForm((prevData) => ({
      ...prevData,
      price: value === "-1" ? "0" : tickets[value].price,
    }));
  };

  return (
    <>
      <div className={styles["BookPage"]}>
        <div className={styles["bookHeader"]}>
          <div className={styles["bookBackBtn"]}>
            <ArrowBackIcon
              onClick={() => navigate("/user/parkinglot")}
              className={styles["bookArrowBackIcon"]}
            />
            주차권 예약
          </div>
        </div>

        <div className={styles["container"]}>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={today}
              maxDate={nextWeek}
              inline
            />
            <hr />
            <div className={styles["bookTextContainer"]}>
              <div className={styles["bookMiddleText"]}>주차권 선택</div>
              <select
                onChange={handleTicketChange}
                className={styles["select"]}
              >
                <option value="-1">주차권 종류를 선택하세요</option>
                {tickets.map((ticket, index) => (
                  <option value={index}>
                    {ticket.name} {ticket.price}원 이용시간: {ticket.startTime}{" "}
                    ~ {ticket.endTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles["bookWarningContainer"]}>
            <div className={styles["bookWarning"]}>
              <div className={styles["bookWarningText"]}>주차권 유의사항</div>
              <li className={styles["bookWarningTextList"]}>
                예약하신 주차장은 주차장 입차 시 관리자 확인 후 등록된
                결제수단으로 자동결제 됩니다.
              </li>
              <li className={styles["bookWarningTextList"]}>
                주차권 사용시간 외 초과되는 시간은 현장요금으로 출차 시 등록된
                결제수단으로 자동결제 됩니다.
              </li>
            </div>
          </div>
          <hr />
          {carData.length === 0 ? (
            <div className={styles["bookTextContainer"]}>
              <div className={styles["bookColorText"]}>이용 차량</div>
              <button
                className={styles["linkButton"]}
                onClick={() => (document.location.href = `/user/car`)}
              >
                자동차를 등록해주세요.
              </button>
            </div>
          ) : (
            <div className={styles["bookTextContainer"]}>
              <div className={styles["bookColorText"]}>이용 차량</div>
              <select
                name="carId"
                value={reserveForm.carId}
                onChange={handleSelectChange}
                className={styles["select"]}
              >
                <option value="">차를 선택하세요</option>
                {carData.map((car) => (
                  <option value={car.carId}>
                    {car.carName} {car.carNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <hr />
          {payData.length === 0 ? (
            <div className={styles["bookTextContainer"]}>
              <div className={styles["bookColorText"]}>결제 수단</div>
              <button
                className={styles["linkButton"]}
                onClick={() => (document.location.href = `/user/pay`)}
              >
                결제 수단을 등록해주세요.
              </button>
            </div>
          ) : (
            <div className={styles["bookTextContainer"]}>
              <div className={styles["bookColorText"]}>결제 수단</div>
              <select
                name="payId"
                value={reserveForm.payId}
                onChange={handleSelectChange}
                className={styles["select"]}
              >
                <option value="">결제 수단을 선택하세요</option>
                {payData.map((pay) => (
                  <option value={pay.payId}>
                    {pay.payName} {pay.payNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <hr />
          <div className={styles["bookChargeContainer"]}>
            <div className={styles["bookChargeText"]}>
              <div>총 결제예정 요금</div>
              <div>{reserveForm.price} 원</div>
            </div>
          </div>

          <button
            onClick={() => handleSubmitClick()}
            className={styles["reserveButton"]}
          >
            {" "}
            예약하기{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookPage;
