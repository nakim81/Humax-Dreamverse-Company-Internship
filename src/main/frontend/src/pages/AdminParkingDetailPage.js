import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AdminParkingDetailPage.module.css";
import { API_BASE_URL } from "../constants";
import AdminSideBar from "../components/AdminSideBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ParkingDetail from "../components/ParkingDetail";

const AdminParkingDetailPage = () => {
  const navigate = useNavigate();
  const { parkingId } = useParams();
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + `/admin/parkinglots/${parkingId}`
        );
        setParkingData(res.data);
      } catch (err) {
        console.error("admin parking data error", err);
      }
    };

    fetchData();
  }, [parkingId]);

  const createdAtObject = new Date(parkingData.createdAt);
  const updatedAtObject = new Date(parkingData.updatedAt);
  const fotmattedCreatedDate = createdAtObject.toLocaleString();
  const fotmattedUpdatedDate = updatedAtObject.toLocaleString();

  const handleDeleteClick = async () => {
    try {
      await axios.delete(API_BASE_URL + `/admin/parkinglots/${parkingId}`);
      navigate("/admin");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/admin/parking/update/${parkingId}`);
  };

  return (
    <>
      <AdminSideBar />
      <div className={styles.ParkingDetailPage}>
        <div className={styles.APAHeader}>
          <ArrowBackIcon
            onClick={() => navigate("/admin")}
            className={styles.parkingArrowBackIcon}
          />
        </div>
        <div className={styles.parkingDetailContainer}>
          <div className={styles.parkingDetail}>
            <ParkingDetail parkingData={parkingData} />
          </div>
          <div className={styles.parkingDetailFooter}>
            <div>
              <div className={styles.dateContainer}>
                <div className={styles.boldText}>등록 일자</div>
                <div>{fotmattedCreatedDate}</div>
              </div>
              <div className={styles.dateContainer}>
                <div className={styles.boldText}>수정 일자</div>
                <div>{fotmattedUpdatedDate}</div>
              </div>
            </div>
            <div className={styles.parkingDetailBtns}>
              <button className={styles.modeEditBtn} onClick={handleEditClick}>
                수정하기
              </button>
              <button className={styles.deleteBtn} onClick={handleDeleteClick}>
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminParkingDetailPage;
