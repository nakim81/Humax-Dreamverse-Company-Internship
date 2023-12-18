import React, { useEffect, useContext, useState, useCallback } from "react";
import styles from "./Favorites.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import AuthContext from "../hooks/AuthContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LatLonMap from "../components/LatLonMap";

const FavoritesPage = () => {
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favIdData, setFavIdData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState([]);

  //   const handleToggleDetail = (index) => {
  //     setIsDetailOpen((prev) => {
  //       const newState = [...prev];
  //       newState[index] = !newState[index];
  //       return newState;
  //     });
  //   };

  const handleToggleDetail = (index) => {
    setIsDetailOpen((prev) => {
      const newState = Array(prev.length).fill(false);
      newState[index] = !prev[index];

      return newState;
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(API_BASE_URL + `/user/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavIdData(res);

      const res2Requests = res.data.map((item) =>
        axios.get(API_BASE_URL + `/parkinglot/parkingId/${item.parking_id}`)
      );

      const res2Responses = await Promise.all(res2Requests);

      setFavData(res2Responses);
    } catch (err) {
      console.error("fav data error", err);
    }
  }, [token]);

  const handleFavClick = async (favoriteId) => {
    try {
      await axios.delete(API_BASE_URL + `/user/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData();
      alert("즐겨찾기가 삭제되었습니다.");
      setIsDetailOpen([]);
    } catch (err) {
      console.log("delete fav error", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [fetchData, userId, token]);

  return (
    <>
      <div className={styles.FavoritesPage}>
        <div className={styles.favHeader}>
          <div className={styles.favAddBtnContainer}>
            <div className={styles.favAddBackBtn}>
              <ArrowBackIcon
                onClick={() => navigate("/user/mypage")}
                className={styles.favArrowBackIcon}
              />
              즐겨찾기 목록 관리
            </div>
          </div>
          <button
            className={styles.favAddBtn}
            onClick={() => navigate("/user/parkinglot")}
          >
            즐겨찾기 추가
          </button>
        </div>

        <div className={styles.favsContainer}>
          {favData.length === 0 ? (
            <div>즐겨찾기 된 주차장이 없습니다.</div>
          ) : (
            <></>
          )}
          {favData.map((fav, index) => (
            <div
              className={styles.favContentContainer}
              key={fav.data.body.parkingId}
            >
              <div className={styles.favContent}>
                <div>
                  <div className={styles.nameText}>{fav.data.body.name}</div>
                  <div className={styles.addressText}>
                    {fav.data.body.address}
                  </div>
                </div>
                <div className={styles.favMoreVertIcon}>
                  <MoreVertIcon onClick={() => handleToggleDetail(index)} />
                </div>
              </div>
              {isDetailOpen[index] && (
                <div className={styles.detailContainer}>
                  <div className={styles.map}>
                    <LatLonMap
                      lat={fav.data.body.lat}
                      lon={fav.data.body.lon}
                      height={200}
                    />
                  </div>
                  {fav.data.body.normalSeason !== "NULL" && (
                    <div className={styles.detailTexts}>
                      <div className={styles.detailLabel}>성수기</div>
                      <div className={styles.detailText}>
                        {fav.data.body.normalSeason}
                      </div>
                    </div>
                  )}
                  {fav.data.body.tenantSeason !== "NULL" && (
                    <div className={styles.detailTexts}>
                      <div className={styles.detailLabel}>비수기</div>
                      <div className={styles.detailText}>
                        {fav.data.body.tenantSeason}
                      </div>
                    </div>
                  )}
                  {fav.data.body.timeTicket !== "NULL" && (
                    <div className={styles.detailTexts}>
                      <div className={styles.detailLabel}>기본 요금</div>
                      <div className={styles.detailText}>
                        {fav.data.body.timeTicket}
                      </div>
                    </div>
                  )}
                  {fav.data.body.operatingTime !== "NULL" && (
                    <div className={styles.detailTexts}>
                      <div className={styles.detailLabel}>운영 시간</div>
                      <div className={styles.detailText}>
                        {fav.data.body.operatingTime
                          .split(",")
                          .map((time, index) => (
                            <div key={index}>{time.trim()}</div>
                          ))}
                      </div>
                    </div>
                  )}
                  <div className={styles.BtnContainer}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() =>
                        handleFavClick(favIdData.data[0].favorites_id)
                      }
                    >
                      즐겨찾기 삭제
                    </button>
                    <button
                      className={styles.moreBtn}
                      onClick={() =>
                        navigate(`/user/parkinglot/${fav.data.body.parkingId}`)
                      }
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
