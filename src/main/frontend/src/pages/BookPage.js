import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookPage.css";
import useAuth from "../useAuth";
import AuthContext from "../hooks/AuthContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const BookPage = () => {
    useAuth();
    const { userId, token } = useContext(AuthContext);
    const {parkingId} = useParams();

    const [carData, setCarData] = useState([]);
    const [payData, setPayData] = useState([]);

    const [reserveForm, setReserveForm] = useState({
        parkingLotId: parkingId,
        carId: '',
        payId: '',
        ticket: '',
        startTime: '',
        endTime: '',
        price: '0',
    });

    const tickets = [{name: '종일권', type:'Day', price:'25000', startTime:"00:00:00", endTime:"23:59:59"},
                     {name: '1시간권', type:'Time', price:'3000', startTime:"00:00:00", endTime:"23:59:59"}];

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 6);

    const fetchCarData = async (userId, token) => {
        try{
            const response = await axios.get(`http://localhost:8080/user/${userId}/car`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setCarData(response.data)
        }catch (error){
            console.error('carData 요청 에러: ', error)
        }
    }

    const fetchPayData = async (userId, token) => {
        try{
            const response = await axios.get(`http://localhost:8080/user/${userId}/pay`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setPayData(response.data)
        }catch (error){
            console.error('carData 요청 에러: ', error)
        }
    }

     useEffect(() => {
            fetchCarData(userId, token)
            fetchPayData(userId, token)
     }, [userId, token])

    const handleSubmitClick = async () => {
        try{
            await axios.post(`http://localhost:8080/user/book`, reserveForm, {
                 headers: {'Authorization': `Bearer ${token}`}
            })
            alert('예약이 완료되었습니다.')
        }catch (error){
            if(error.response && error.response.status === 400){
                            alert(error.response.data.result.resultDescription)
            }else{
                console.error('Cancle 요청 에러:', error)
                alert("예약 실패")
            }
        }
    }

     const handleDateChange = (date) => {
        setSelectedDate(date)
        if(reserveForm.ticket!==''){
            setReserveForm((prevData) => ({
              ...prevData,
              "startTime": `${date.toISOString().split('T')[0]} ${reserveForm.startTime.split(' ')[1]}`,
            }))
            setReserveForm((prevData) => ({
              ...prevData,
              "endTime": `${date.toISOString().split('T')[0]} ${reserveForm.endTime.split(' ')[1]}`,
            }))
        }
     };

    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setReserveForm((prevData) => ({
          ...prevData,
          [name]: value,
        }))
    }

    const handleTicketChange = (event) => {
        const {value} = event.target

        setReserveForm((prevData) => ({
          ...prevData,
          "ticket": value==='-1' ? '' : tickets[value].type,
        }))
        setReserveForm((prevData) => ({
          ...prevData,
          "startTime": value==='-1' ? '' : `${selectedDate.toISOString().split('T')[0]} ${tickets[value].startTime}`,
        }))
        setReserveForm((prevData) => ({
          ...prevData,
          "endTime": value==='-1' ? '' : `${selectedDate.toISOString().split('T')[0]} ${tickets[value].endTime}`,
        }))
        setReserveForm((prevData) => ({
          ...prevData,
          "price": value==='-1' ? '0' : tickets[value].price,
        }))
    }

    return (
        <>
            <div className>
                <p className="title1">주차권 예약</p>

                <div className="container">
                    <div>
                        <DatePicker
                            selected = {selectedDate}
                            onChange={handleDateChange}
                            minDate={today}
                            maxDate={nextWeek}
                            inline
                        />
                        <div>
                            <select
                                onChange={handleTicketChange}
                                className="select"
                            >
                                <option value='-1'>주차권 종류를 선택하세요</option>
                                {tickets.map((ticket, index) =>(
                                    <option value={index}>
                                    {ticket.name} {ticket.price}원 이용시간: {ticket.startTime} ~ {ticket.endTime}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {carData == '' ? (
                        <div>
                            <hr/>
                            <button
                                className="linkButton"
                                onClick={() => (document.location.href = `/user/${userId}/car`)}
                            >
                                자동차를 등록해주세요.
                            </button>
                        </div>
                    ) : (
                        <div>
                            <hr/>
                            <select
                                name="carId" value={reserveForm.carId}
                                onChange={handleSelectChange}
                                className="select"
                            >
                                <option value="">차를 선택하세요</option>
                                {carData.map((car) =>(
                                    <option value={car.carId}>{car.carName} {car.carNumber}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {payData == '' ? (
                        <div>
                            <hr/>
                            <button
                                className="linkButton"
                                onClick={() => (document.location.href = `/user/${userId}/pay`)}
                            >
                                결제 수단을 등록해주세요.
                            </button>
                        </div>
                     ) : (
                        <div>
                            <hr/>
                            <select
                                name="payId" value={reserveForm.payId}
                                onChange={handleSelectChange}
                                className="select"
                            >
                                <option value="">결제 수단을 선택하세요</option>
                                {payData.map((pay) =>(
                                    <option value={pay.payId}>{pay.payName} {pay.payNumber}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <hr/>
                        <p> <span>결제 금액</span> {reserveForm.price}원</p>
                    </div>

                    <button onClick={()=>handleSubmitClick()} className="reserveButton"> 예약하기 </button>
                </div>
            </div>
        </>
    );
};

export default BookPage;