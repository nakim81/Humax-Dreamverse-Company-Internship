import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./CarPage.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useAuth from "../useAuth";
import AuthContext from "../hooks/AuthContext";

const CarPage = () => {
    useAuth();
    const { userId } = useContext(AuthContext);
    // const jwtToken = localStorage.getItem('token');
    // useEffect(() => {
    //     if (jwtToken) {
    //         const tokenParts = jwtToken.split('.');
    //         const payload = JSON.parse(atob(tokenParts[1]));
    //         // setUserId(payload.sub);
    //     } else {
    //         console.log('토큰이 없습니다.');
    //     }
    // }, [jwtToken]);

    const [carData, setCarData] = useState([]);
    const [addCarName, setAddCarName] = useState(undefined);
    const [addCarNumber, setAddCarNumber] = useState(undefined);
    const [updateCarId, setUpdateCarId] = useState();
    const [updateCarName, setUpdateCarName] = useState('');
    const [updateCarNumber, setUpdateCarNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isAddErrorOpen, setIsAddErrorOpen] = useState(false);

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
    }, [userId]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/user/${userId}/car`);
            setCarData(res.data);
        } catch (error) {
            console.error('Error fetching car data', error);
        }
    };

    const handleNameAdd = (e) => {
        setAddCarName(e.target.value);
    }

    const handleNumberAdd = (e) => {
        setAddCarNumber(e.target.value);

        const regex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
        setIsValid(regex.test(e.target.value))
    }

    const handleOnAddErrorClick = () => {
        setIsAddErrorOpen((isAddErrorOpen) => !isAddErrorOpen)
    }

    const handleOnUpdateClick = (carName, carNumber, carId) => {
        setIsUpdateOpen((isUpdateOpen) => !isUpdateOpen);
        setUpdateCarName(carName);
        setUpdateCarNumber(carNumber);
        setUpdateCarId(carId)
    }

    const handleOnDeleteClick = (carId) => {
        setIsDeleteOpen((isDeleteOpen) => !isDeleteOpen);
        setUpdateCarId(carId)
    }

    const handleOnAddClick = () => {
        setIsAddOpen((isAddOpen) => !isAddOpen);
    }

    const handleNameChange = (e) => {
        setUpdateCarName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setUpdateCarNumber(e.target.value);

        const regex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
        setIsValid(regex.test(e.target.value))
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const addCarData = {
            carName : addCarName,
            carNumber : addCarNumber
        }

        if (!addCarName || !addCarNumber) {
            setIsAddErrorOpen((isAddErrorOpen) => !isAddErrorOpen)
        } else {
            try {
                await axios.post(`http://localhost:8080/user/${userId}/car`, addCarData)
                setIsAddOpen((isAddOpen) => !isAddOpen);
                setAddCarName('');
                setAddCarNumber('');
                await fetchData();
                // console.log(res.data)
            } catch (err) {
                console.error('car add error', err)
            }
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const updateCarData = {
            carName : updateCarName,
            carNumber : updateCarNumber
        }

        if (isValid) {
            try {
                await axios.patch(`http://localhost:8080/user/${userId}/car/${updateCarId}`, updateCarData)
                setIsUpdateOpen((isUpdateOpen) => !isUpdateOpen);
                await fetchData();
                // console.log(res.data)
            } catch (err) {
                console.error('car update error', err)
            }
        } else {
            console.log('Invalid input');
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`http://localhost:8080/user/${userId}/car/${updateCarId}`)
            setIsDeleteOpen((isDeleteOpen) => !isDeleteOpen);
            await fetchData();
            // console.log(res.data)
        } catch (err) {
            console.error('car delete error', err)
        }
    };

    return (
        <>
            <div className="carAddContainer">
                <div className="carAddBtnContainer">
                    {isAddOpen ? (
                        <button
                            onClick={handleOnAddClick}
                            className="addBtn">
                            <RemoveIcon
                                style={{fontSize: 40}}/>
                        </button>
                    ) : (
                        <button
                            onClick={handleOnAddClick}
                            className="addBtn">
                            <AddIcon
                                style={{fontSize: 40}}/>
                        </button>
                        )}
                </div>
                <div className={`carAddInputContainer ${isAddOpen ? '' : 'disable'}`}>
                    <div className="carAddHeader">
                        차량 등록
                    </div>
                    <div className="carAddContent">
                        <input
                            type = "text"
                            value = {addCarName}
                            onChange={handleNameAdd}
                            className="carNameInput"
                            placeholder="차량 이름을 입력하세요" />
                        <div className="updateCarNumberContainer">
                            <input
                                type = "text"
                                value = {addCarNumber}
                                onChange={handleNumberAdd}
                                className={`carNumberInput ${isValid ? '' : 'invalid'}`}
                                placeholder="차량 번호를 입력하세요" />
                            {!isValid && (
                                <p className="isValidText">
                                    12가1234 / 123가1234 형식으로 입력하세요.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="carAddFooter">
                        <button
                            type="submit"
                            className="createBtn"
                            onClick={handleAddSubmit}
                            disabled={!isValid}
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>

            <div className="carsContainer">
                {carData.length === 0 ? (
                    <div>
                        차량을 등록하세요.
                    </div>
                ):(
                    <div></div>
                )}
                {carData.map((car, index) => (
                    <div key={index} className="carContainer">
                        <div className="carTextContainer">
                            <p className="carNameText">{car.carName}</p>
                            <p className="carNumberText">{car.carNumber}</p>
                        </div>
                        <div className="carBtnContainer">
                            <button
                                onClick={() => handleOnUpdateClick(car.carName, car.carNumber, car.carId)}
                                className="updateBtn">
                                <ModeEditIcon
                                    style={{fontSize: 40}}/>
                            </button>
                            <button
                                onClick={() => handleOnDeleteClick(car.carId)}
                                className="deleteBtn">
                                <DeleteIcon
                                    style={{fontSize: 40}}/>
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {isUpdateOpen && (
                <div>
                    <div className="modalOverlay" onClick={handleOnUpdateClick}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <div className="modalContentHeader">
                                <div className="modalContentHeaderText">
                                    내 차량 수정
                                </div>
                                <button onClick={handleOnUpdateClick} className="closeBtn">
                                    <CloseIcon
                                        style={{fontSize: 30}}
                                    />
                                </button>
                            </div>
                            <div className="modalContentBody">
                                <input
                                    type = "text"
                                    value = {updateCarName}
                                    onChange={handleNameChange}
                                    className="carNameInput"
                                    placeholder="차량 이름을 입력하세요" />
                                <div className="updateCarNumberContainer">
                                    <input
                                        type = "text"
                                        value = {updateCarNumber}
                                        onChange={handleNumberChange}
                                        className={`carNumberInput ${isValid ? '' : 'invalid'}`}
                                        placeholder="차량 번호를 입력하세요" />
                                    {!isValid && (
                                        <p className="isValidText">
                                            12가1234 형식으로 입력하세요.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="modalContentFooter">
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    onClick={handleUpdateSubmit}
                                    className="submitBtn"
                                >
                                    완료
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {isDeleteOpen && (
                <div>
                    <div className="modalOverlay" onClick={handleOnDeleteClick}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <div className="modalContentHeader">
                            </div>
                            <div className="modalContentBody">
                                삭제하시겠습니까?
                            </div>
                            <div className="modalContentFooter">
                                <button
                                    type="text"
                                    className="modalCloseBtn"
                                    onClick = {handleOnDeleteClick}
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="modalDeleteBtn"
                                    onClick = {handleDeleteSubmit}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {isAddErrorOpen && (
                <div>
                    <div className="modalOverlay" onClick={handleOnAddErrorClick}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <div className="addErrorModalContentHeader">
                                <button onClick={handleOnAddErrorClick} className="closeBtn">
                                    <CloseIcon
                                        style={{fontSize: 30}}
                                    />
                                </button>
                            </div>
                            <div className="addErrorModalContentBody">
                                차량 이름/번호를 입력하세요.
                            </div>
                            <div className="modalContentFooter">
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default CarPage;