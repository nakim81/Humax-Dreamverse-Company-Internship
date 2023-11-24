import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CarPage.css";

const CarPage = () => {

    const {userId} = useParams();
    const [carData, setCarData] = useState([]);
    const [carUpdate, setCarUpdate] = useState(false);
    const [updatedCarName, setUpdatedCarName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}/car`)
                setCarData(res.data)
                console.log(res.data)
                } catch (err) {
                console.error('car data error', err)
            }
        }

        fetchData();
    }, [userId]);

    const handleUpdateBtnClick = () => {
        setCarUpdate((carUpdate) => !carUpdate);
    }

    const handleNameChange = (e) => {
        setUpdatedCarName(e.target.value);
    }

    return (
        <>
            <h1>CarPage</h1>
            <p>사용자 ID: {userId}</p>
            {carData.map((car, index) => (
                <div key={index}>
                    <div className="carContainer">
                        {carUpdate ? (
                            <div className="carUpdateContainer">
                                <input
                                    type="text"
                                    value={updatedCarName}
                                    onChange={handleNameChange}
                                    placeholder="차량 이름을 입력하세요."
                                    className="carNameInput"
                                />
                                <input
                                    type="text"
                                    value={car.carNumber}
                                    placeholder="차량 번호를 입력하세요."
                                    className="carNameInput"
                                />
                            </div>
                        ) : (
                            <div className="carTextContainer">
                                <p className="carNameText">{car.carName}</p>
                                <p className="carNumberText">{car.carNumber}</p>
                            </div>
                        )
                        }
                        <div className="carBtnContainer">
                            <button onClick={handleUpdateBtnClick} className="updateBtn">
                                수정
                            </button>
                            <button className="deleteBtn">삭제</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CarPage;