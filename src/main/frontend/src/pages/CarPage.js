import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CarPage.css";

const CarPage = () => {

    const {userId} = useParams();
    const [carData, setCarData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}/car`)
                setCarData(res.data)
                } catch (err) {
                console.error('car data error', err)
            }
        }

        fetchData();
    }, [userId, carData]);

    return (
        <>
            <div>
                <h1>CarPage</h1>
                <p>사용자 ID: {userId}</p>
                {carData.map((car, index) => (
                    <div key={index}>
                        <div className="carContainer">
                            <p>차량 이름: {car.carName}</p>
                            <p>차량 번호: {car.carNumber}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CarPage;