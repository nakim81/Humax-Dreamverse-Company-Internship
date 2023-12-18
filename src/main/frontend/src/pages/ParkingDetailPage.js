import React, { useEffect, useState } from "react";
import styles from "./ParkingDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import FavoriteButton from "../components/FavoritesComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ParkingDetail from "../components/ParkingDetail";

const ParkingDetailPage = () => {
  const { parkingId } = useParams();
  const [parkingData, setParkingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + `/admin/parkinglots/${parkingId}`
        );
        setParkingData(res.data);
      } catch (err) {
        console.error("detail parking data error", err);
      }
    };

    fetchData();
  }, [parkingData, parkingId, setParkingData]);

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

  const goToReservationPage = () => {
    navigate(`/user/book/${parkingData.parkingId}`, {
      state: { parkingData },
    });
  };

  return (
    <>
      <div className={styles.DetailPage}>
        <div className={styles.detailHeader}>
          <div className={styles.headerBtnContainer}>
            <div className={styles.favAddBtnContainer}>
              <div className={styles.favAddBackBtn}>
                <ArrowBackIcon
                  onClick={() => navigate(-1)}
                  className={styles.favArrowBackIcon}
                />
              </div>
            </div>
            <div>
              <button onClick={() => navigate("/")} className={styles.homeBtn}>
                홈으로
              </button>
              <button
                onClick={() => navigate("/user/parkinglot")}
                className={styles.parkingBtn}
              >
                다른 주차장 검색하기
              </button>
            </div>
          </div>
        </div>
        <div className={styles.parkingDetailContent}>
          <ParkingDetail parkingData={parkingData} />
        </div>
        <div className={styles.infoFooter}>
          <button
            className={styles.getBookParkingBtn}
            onClick={goToReservationPage}
          >
            예약하기
          </button>
          <FavoriteButton selectedParkinglot={parkingData} />
        </div>
      </div>
    </>
  );
};

export default ParkingDetailPage;
