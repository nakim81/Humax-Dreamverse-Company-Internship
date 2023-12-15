import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Adminpage.module.css";
import ParkingList from "../components/ParkingList";
import AuthContext from "../hooks/AuthContext";
import AdminSideBar from "../components/AdminSideBar";

const AdminPage = () => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
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

  return (
    <>
      <AdminSideBar />
      <div className={styles["adminPage"]}>
        <div className={styles["adminHeader"]}>
          <div className={styles["largeBoldText"]}>관리자 페이지</div>
        </div>
        <div className={styles["adminBody"]}>
          <div className={styles["parkingListContainer"]}>
            <ParkingList />
          </div>
        </div>
      </div>

      {showAdminModal && (
        <div className={styles["modalAdminOverlay"]}>
          <div className={styles["modalAdminContent"]}>
            <p>관리자 권한이 존재하지 않습니다.</p>
            <button
              className={styles["adminCloseBtn"]}
              onClick={handleCloseAdminModal}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {showLoadingModal && (
        <div className={styles["modalAdminOverlay"]}>
          <div className={styles["modalAdminContent"]}>
            <p> 로딩중입니다. </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
