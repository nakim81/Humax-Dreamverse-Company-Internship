import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./CarPage.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AuthContext from "../hooks/AuthContext";
import { API_BASE_URL } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CarPage = () => {
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);
  const [carData, setCarData] = useState([]);
  const [addCarName, setAddCarName] = useState("");
  const [addCarNumber, setAddCarNumber] = useState("");
  const [updateCarId, setUpdateCarId] = useState();
  const [updateCarName, setUpdateCarName] = useState("");
  const [updateCarNumber, setUpdateCarNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddErrorOpen, setIsAddErrorOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState([]);

  const handleToggleDetail = (index) => {
    setIsDetailOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = await axios.get(API_BASE_URL + `/user/car`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCarData(res.data);
        } catch (err) {
          console.error("car data error", err);
        }
      };

      fetchData();
    }
  }, [token, userId]);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE_URL + `/user/car`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarData(res.data);
    } catch (error) {
      console.error("Error fetching car data", error);
    }
  };

  const handleNameAdd = (e) => {
    setAddCarName(e.target.value);
  };

  const handleNumberAdd = (e) => {
    setAddCarNumber(e.target.value);

    const regex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
    setIsValid(regex.test(e.target.value));
  };

  const handleOnAddErrorClick = () => {
    setIsAddErrorOpen((isAddErrorOpen) => !isAddErrorOpen);
  };

  const handleOnUpdateClick = (carName, carNumber, carId) => {
    setIsUpdateOpen((isUpdateOpen) => !isUpdateOpen);
    setUpdateCarName(carName);
    setUpdateCarNumber(carNumber);
    setUpdateCarId(carId);
  };

  const handleOnDeleteClick = (carId) => {
    setIsDeleteOpen((isDeleteOpen) => !isDeleteOpen);
    setUpdateCarId(carId);
  };

  const handleOnAddClick = () => {
    setIsAddOpen((isAddOpen) => !isAddOpen);
  };

  const handleNameChange = (e) => {
    setUpdateCarName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setUpdateCarNumber(e.target.value);

    const regex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
    setIsValid(regex.test(e.target.value));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const addCarData = {
      carName: addCarName,
      carNumber: addCarNumber,
    };

    if (!addCarName || !addCarNumber) {
      setIsAddErrorOpen((isAddErrorOpen) => !isAddErrorOpen);
    } else {
      try {
        await axios.post(API_BASE_URL + `/user/car`, addCarData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAddOpen((isAddOpen) => !isAddOpen);
        setAddCarName("");
        setAddCarNumber("");
        await fetchData();
        // console.log(res.data)
      } catch (err) {
        console.error("car add error", err);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateCarData = {
      carName: updateCarName,
      carNumber: updateCarNumber,
    };

    if (isValid) {
      try {
        await axios.patch(
          API_BASE_URL + `/user/car/${updateCarId}`,
          updateCarData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsUpdateOpen((isUpdateOpen) => !isUpdateOpen);
        await fetchData();
        // console.log(res.data)
      } catch (err) {
        console.error("car update error", err);
      }
    } else {
      console.log("Invalid input");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(API_BASE_URL + `/user/car/${updateCarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleteOpen((isDeleteOpen) => !isDeleteOpen);
      await fetchData();
      // console.log(res.data)
    } catch (err) {
      console.error("car delete error", err);
    }
  };

  return (
    <>
      <div className="carAddContainer">
        <div className="carAddBtnContainer">
          <div className="carAddBackBtn">
            <ArrowBackIcon
              onClick={() => navigate("/user/mypage")}
              className="carArrowBackIcon"
            />
            차량 정보 관리
          </div>
          <div>
            {carData.length < 5 &&
              (isAddOpen ? (
                <button onClick={handleOnAddClick} className="addBtn">
                  <RemoveIcon style={{ fontSize: 40 }} />
                </button>
              ) : (
                <button onClick={handleOnAddClick} className="addBtn">
                  <AddIcon style={{ fontSize: 40 }} />
                </button>
              ))}
          </div>
        </div>
        <div className={`carAddInputContainer ${isAddOpen ? "" : "disable"}`}>
          <div className="carAddHeader">
            <h4>차량 정보를 입력해 주세요</h4>
            <li>차량은 소유주 본인 차량만 등록할 수 있습니다.</li>
            <li>
              자동결제 등의 서비스 제공을 위하여 타인, 법인 등의 차량 정보
              등록은 삼가해 주세요.
            </li>
            <li>
              타인 차량 정보 등록으로 인해 발생하는 책임은 등록자 본인에게
              있습니다.
            </li>
          </div>
          <div className="carAddContent">
            <input
              type="text"
              value={addCarName}
              onChange={handleNameAdd}
              className="carNameInput"
              placeholder="차량 이름을 입력하세요"
            />
            <div className="updateCarNumberContainer">
              <input
                type="text"
                value={addCarNumber}
                onChange={handleNumberAdd}
                className={`carNumberInput ${isValid ? "" : "invalid"}`}
                placeholder="차량 번호를 입력하세요"
              />
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
        {carData.length === 0 ? <div>차량을 등록하세요.</div> : <div></div>}
        {carData.map((car, index) => (
          <div key={car.carId} className="carsContainer">
            <div className="carContainer">
              <div className="carTextContainer">
                <p className="carText">
                  {car.carName} | {car.carNumber}
                </p>
                <div className="carMoreVertIcon">
                  <MoreVertIcon onClick={() => handleToggleDetail(index)} />
                </div>
              </div>
            </div>
            <div className="carDetailContainer">
              {isDetailOpen[index] && (
                <>
                  <div className="carDetailTextContainer">
                    <div className="carDetailText1">오토 패스 등록</div>
                    <div className="carDetailText2">
                      {car.carName} | {car.carNumber}
                    </div>
                  </div>
                  <div className="carBtnContainer">
                    <button
                      onClick={() =>
                        handleOnUpdateClick(
                          car.carName,
                          car.carNumber,
                          car.carId
                        )
                      }
                      className="updateBtn"
                    >
                      차량 정보 수정하기
                    </button>
                    <button
                      onClick={() => handleOnDeleteClick(car.carId)}
                      className="deleteBtn"
                    >
                      차량 정보 삭제하기
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="carsContainerFooter">
        <div className="carFooterText">
          <div>차량 정보 등록은 최대 5대까지 가능합니다.</div>
          <div>{carData.length} / 5</div>
        </div>
      </div>

      {isUpdateOpen && (
        <div>
          <div className="modalOverlay" onClick={handleOnUpdateClick}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <div className="modalContentHeader">
                <div className="modalContentHeaderText">차량 정보 수정</div>
                <button onClick={handleOnUpdateClick} className="closeBtn">
                  <CloseIcon style={{ fontSize: 30 }} />
                </button>
              </div>
              <div className="modalContentBody">
                <input
                  type="text"
                  value={updateCarName}
                  onChange={handleNameChange}
                  className="carNameInput"
                  placeholder="차량 이름을 입력하세요"
                />
                <div className="updateCarNumberContainer">
                  <input
                    type="text"
                    value={updateCarNumber}
                    onChange={handleNumberChange}
                    className={`carNumberInput ${isValid ? "" : "invalid"}`}
                    placeholder="차량 번호를 입력하세요"
                  />
                  {!isValid && (
                    <p className="isValidText">12가1234 형식으로 입력하세요.</p>
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
      )}

      {isDeleteOpen && (
        <div>
          <div className="modalOverlay" onClick={handleOnDeleteClick}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <div className="modalContentHeader"></div>
              <div className="modalContentBody">삭제하시겠습니까?</div>
              <div className="modalContentFooter">
                <button
                  type="text"
                  className="modalCloseBtn"
                  onClick={handleOnDeleteClick}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="modalDeleteBtn"
                  onClick={handleDeleteSubmit}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddErrorOpen && (
        <div>
          <div className="modalOverlay" onClick={handleOnAddErrorClick}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <div className="addErrorModalContentHeader">
                <button onClick={handleOnAddErrorClick} className="closeBtn">
                  <CloseIcon style={{ fontSize: 30 }} />
                </button>
              </div>
              <div className="addErrorModalContentBody">
                차량 이름/번호를 입력하세요.
              </div>
              <div className="modalContentFooter"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarPage;
