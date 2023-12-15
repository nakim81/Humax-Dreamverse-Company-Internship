import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AdminParkingDetailPage.module.css";
import { API_BASE_URL } from "../constants";
import AdminSideBar from "../components/AdminSideBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const translatedData = {
    "코드 번호": parkingData.codeNumber,
    "운영 시간": parkingData.operatingTime,
    "평상 시즌 요금": parkingData.normalSeason,
    "임차 시즌 요금": parkingData.tenantSeason,
    "정기 티켓 요금": parkingData.timeTicket,
    "일일 티켓 요금": parkingData.dayTicket,
    "특별 일 티켓 요금": parkingData.specialDay,
    "특별 시간 티켓 요금": parkingData.specialHour,
    "특별 야간 티켓 요금": parkingData.specialNight,
    "특별 주말 티켓 요금": parkingData.specialWeekend,
    "적용 일자": parkingData.applyDay,
    "적용 시간": parkingData.applyHour,
    "적용 야간": parkingData.applyNight,
    "적용 주말": parkingData.applyWeekend,
    운영: parkingData.operation,
    시간: parkingData.time,
    가격: parkingData.price,
  };

  const createdAtObject = new Date(parkingData.createdAt);
  const updatedAtObject = new Date(parkingData.updatedAt);
  const fotmattedCreatedDate = createdAtObject.toLocaleString();
  const fotmattedUpdatedDate = updatedAtObject.toLocaleString();

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(parkingData.lat, parkingData.lon),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(
        parkingData.lat,
        parkingData.lon
      );
      // eslint-disable-next-line no-unused-vars
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });
    };

    window.kakao.maps.load(initMap);
  }, [parkingData.lat, parkingData.lon]);

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
            className="parkingArrowBackIcon"
          />
        </div>
        <div className={styles.parkingDetailContainer}>
          <div className={styles.parkingDetailHeader}>
            <div className={styles.parkingDetailName}>{parkingData.name}</div>
            <div className={styles.parkingDetailAddress}>
              {parkingData.address}
            </div>
            {parkingData.is_active === "1" ? (
              <div className={styles.parkingDetailIsActive}>운영중</div>
            ) : (
              <div className={styles.parkingDetailIsNotActive}>운영 예정</div>
            )}
          </div>
          <div className={styles.parkingDetailBody}>
            <div id="map" className={styles.parkingDetailMap}></div>
            <div className={styles.parkingDetailInfos}>
              <div className={styles.parkingDetailInfo}>
                <div className={styles.parkingDetailText}>
                  {Object.entries(translatedData).map(([key, value]) => (
                    <div key={key}>
                      {key} :{" "}
                      {value !== null && value !== "NULL" && value !== ""
                        ? value
                        : "[입력 바람]"}
                    </div>
                  ))}
                  <div>등록 일자 : {fotmattedCreatedDate}</div>
                  <div>수정 일자 : {fotmattedUpdatedDate}</div>
                </div>
              </div>
              <div className={styles.parkingDetailBtns}>
                <button
                  className={styles.modeEditBtn}
                  onClick={handleEditClick}
                >
                  수정하기
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={handleDeleteClick}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminParkingDetailPage;
