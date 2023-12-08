import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminpage.css";
import axios from "axios";
import ParkingList from "../components/ParkingList";
import AuthContext from "../hooks/AuthContext";
import {API_BASE_URL} from "../constants";

const AdminPage = () => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [parkingData, setParkingData] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  useEffect(() => {
    if (admin === null) {
      setShowLoadingModal(true);
      return;
    }
    if (admin === 0) {
      setShowLoadingModal(false);
      setShowAdminModal(true);
    }
    if (admin === 1) {
      setShowLoadingModal(false);
    }
  }, [admin]);

  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
            API_BASE_URL + `/admin/parkinglots`
        );
        setParkingData(res.data);
      } catch (err) {
        console.error("admin parking data error", err);
      }
    };

    fetchData();
  }, []);

  const handleParkingAddBtnClick = () => {
    navigate("/admin/parking/add");
  };

  const handleUserBtnClick = () => {
    navigate("/admin/user");
  };

  return (
    <>
      <div className="adminPage">
        <div className="adminHeader">
          <h1>관리자 페이지</h1>
          <div className="adminBtnContainer">
            <button className="parkingAddBtn" onClick={handleUserBtnClick}>
              사용자 관리
            </button>
            <button
              className="parkingAddBtn"
              onClick={handleParkingAddBtnClick}
            >
              주차장 등록
            </button>
          </div>
        </div>
        <div className="adminBody">
          <div className="parkingListContainer">
            <ParkingList data={parkingData} />
          </div>
        </div>
      </div>

      {showAdminModal && (
        <div className="modalAdminOverlay">
          <div className="modalAdminContent">
            <p>관리자 권한이 존재하지 않습니다.</p>
            <button className="adminCloseBtn" onClick={handleCloseAdminModal}>
              확인
            </button>
          </div>
        </div>
      )}

      {showLoadingModal && (
        <div className="modalAdminOverlay">
          <div className="modalAdminContent">
            <p> 로딩중입니다. </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
