import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const FavoriteButton = ({ selectedParkinglot }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesId, setFavoriteId] = useState(0);
  const token = "Bearer " + localStorage.getItem("token");

  // 현재 선택된 주차장의 favorites Id

  useEffect(() => {
    setIsFavorite(false);
    // user Id에 해당하는 즐겨찾기 목록 조회
    const url = API_BASE_URL + `/user/favorites`;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log('서버로부터 받은 favorites 목록 데이터:', response.data);
        for (var i = 0; i < response.data.length; i++) {
          // 즐겨찾기 목록에 있는 경우 setFavorite을 false 로 변경후 탈출
          if (selectedParkinglot.parkingId === response.data[i].parking_id) {
            setFavoriteId(response.data[i].favorites_id);
            setIsFavorite(true);
            break;
          }
        }
      })
      .catch((error) => {
        console.error("Error checking favorite:", error);
      });
  }, [selectedParkinglot.parkingId, token]);

  const handleClick = () => {
    // Favorites 테이블 아이템의 상태 변경
    // console.log(`선택된 주차장: ${selectedParkinglot.parkingId}`);
    var parkingLotDto = {
      favorites_name: selectedParkinglot.name,
      parking_id: selectedParkinglot.parkingId,
    };

    // 현재 즐겨 찾기 상태가 false 일때 추가, true 일때 제거
    if (isFavorite === false) {
      setFavoriteId(favoritesId);
      const url = API_BASE_URL + `/user/favorites`;
      axios
        .post(url, parkingLotDto, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setFavoriteId(response.data.favorites_id);
          setIsFavorite(true);
        })
        .catch((error) => {
          console.log("즐겨찾기 추가 실패");
        });
    } else {
      const url = API_BASE_URL + `/user/favorites/${favoritesId}`;
      axios
        .delete(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setIsFavorite(false);
        })
        .catch((error) => {
          console.log("즐겨찾기 제거 실패", error);
        });
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "30px",
        marginLeft: "15px",
      }}
    >
      {isFavorite ? (
        <StarIcon style={{ color: "#FC6C00", fontSize: "30px" }} />
      ) : (
        <StarBorderIcon style={{ color: "#FC6C00", fontSize: "30px" }} />
      )}
    </button>
  );
};

export default FavoriteButton;
