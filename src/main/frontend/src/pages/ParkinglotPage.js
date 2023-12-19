import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import FavoriteButton from "../components/FavoritesComponent";
import { API_BASE_URL } from "../constants";
import {
  TextField,
  Button,
  Card,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import AuthContext from "../hooks/AuthContext";
import styles from "./ParkinglotPage.module.css";

const ParkinglotPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");

  const [keyword, setKeyword] = useState("");
  const [keywordPage, setKeywordPage] = useState(1);
  const [keywordTotalPages, setKeywordTotalPages] = useState(0);
  const [allPage, setAllPage] = useState(1);
  const [allTotalPages, setAllTotalPages] = useState(0);
  const [backendAllPage, setBackendAllPage] = useState(0);
  const [backendKeywordPage, setBackendKeywordPage] = useState(0);

  const [allParkinglots, setAllParkinglots] = useState([]);

  const [parkingId, setParkingId] = useState("");
  const [parkinglotData, setParkinglotData] = useState([]);
  const [selectedParkinglot, setSelectedParkinglot] = useState(null);
  const [isParkinglotSelected, setIsParkinglotSelected] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  const [tabValue, setTabValue] = useState(0);

  const [initialLoad, setInitialLoad] = useState(true);
  const [initialLoad2, setInitialLoad2] = useState(true);

  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const size = 10;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FC6C00", // 차분한 주황색으로 변경
      },
      secondary: {
        main: "#CD853F",
      },
    },
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 버튼 클릭 이벤트 핸들러 내에서 직접 API 호출
  const handleFetchParkinglotsButtonClick = async () => {
    setAllParkinglots([]);
    try {
      const response = await axios.get(API_BASE_URL + "/parkinglot/nearby", {
        params: {
          latitude: latitude,
          longitude: longitude,
          radius: radius,
        },
      });
      if (response.data.body && Array.isArray(response.data.body)) {
        setParkinglotData(response.data.body);
      } else {
        console.error("Unexpected response", response);
      }
    } catch (error) {
      console.error(
        "주변 주차장 정보를 가져오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const handleFetchParkinglotByParkingIdButtonClick = async () => {
    setAllParkinglots([]);
    try {
      const response = await axios.get(
        API_BASE_URL + `/parkinglot/parkingId/${parkingId}`
      );
      setParkinglotData([response.data.body]);
    } catch (error) {
      console.error("주차장 코드넘버 기반 검색 중 오류가 발생했습니다.", error);
    }
  };

  // 전체 주차장 정보를 가져오는 함수
  const fetchAllParkinglots = useCallback(async () => {
    setParkinglotData([]);
    try {
      const response = await axios.get(API_BASE_URL + "/parkinglot/all", {
        params: {
          page: backendAllPage,
          size: size,
        },
      });
      setAllParkinglots(response.data.body.content);
      setAllTotalPages(response.data.body.totalPages);
    } catch (error) {
      console.error(
        "전체 주차장 정보를 가져오는 중 오류가 발생했습니다.",
        error
      );
    }
  }, [backendAllPage]);

  const fetchParkinglotsByKeyword = useCallback(async () => {
    setAllParkinglots([]);
    try {
      const response = await axios.get(API_BASE_URL + "/parkinglot/search", {
        params: {
          keyword: keyword,
          page: backendKeywordPage,
          size: size,
        },
      });
      setParkinglotData(response.data.body.content);
      setKeywordTotalPages(response.data.body.totalPages);
    } catch (error) {
      console.error("키워드 기반 주차장 검색 중 오류가 발생했습니다.", error);
    }
  }, [keyword, backendKeywordPage]);

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/user/searchHistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchHistory(response.data.body);
    } catch (error) {
      console.error("검색 내역을 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  const deleteSearchHistoryItem = async (id) => {
    try {
      await axios.delete(API_BASE_URL + `/user/searchHistory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSearchHistory(); // 삭제 후 검색 내역을 다시 불러옵니다.
    } catch (error) {
      console.error("검색 내역을 삭제하는 중 오류가 발생했습니다.", error);
    }
  };

  // 검색 버튼 클릭 이벤트 핸들러
  const handleFetchParkinglotsByKeywordButtonClick = async () => {
    setKeywordPage(1); // 검색 버튼을 누르면 페이지를 초기화
    fetchParkinglotsByKeyword();
  };

  const handleFetchAllParkinglotsButtonClick = async () => {
    setAllPage(1);
    fetchAllParkinglots();
  };

  useEffect(() => {
    if (!initialLoad) {
      fetchParkinglotsByKeyword();
    } else {
      setInitialLoad(false);
    }
  }, [keywordPage, initialLoad, fetchParkinglotsByKeyword]);

  useEffect(() => {
    if (!initialLoad2) {
      fetchAllParkinglots();
    } else {
      setInitialLoad2(false);
    }
  }, [allPage, initialLoad2, fetchAllParkinglots]);

  // 키워드 기반 검색 결과의 페이지 이동 함수
  const handleKeywordPageChange = (event, value) => {
    setKeywordPage(value);
    setBackendKeywordPage(value - 1);
  };

  const handleAllPageChange = (event, value) => {
    setAllPage(value);
    setBackendAllPage(value - 1);
  };

  const handleParkinglotClick = async (parkinglot) => {
    // console.log(token);
    // console.log(`sending request with parking ID : ${parkinglot.parkingId}`);
    try {
      // 주차장 클릭 시 해당 주차장의 id를 서버에 POST 요청으로 보냅니다.
      await axios.post(
        API_BASE_URL + `/user/searchHistory/${parkinglot.parkingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("검색 내역 등록 실패", error);
    }

    setSelectedParkinglot(parkinglot);
    setIsParkinglotSelected(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToReservationPage = () => {
    navigate(`/user/book/${selectedParkinglot.parkingId}`, {
      state: { selectedParkinglot },
    });
  };

  const handleDismissClick = () => {
    setSelectedParkinglot(null);
    setIsParkinglotSelected(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          m: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {/* MapComponent 추가 */}
          <MapComponent
            parkinglotData={tabValue !== 3 ? parkinglotData : allParkinglots}
            isParkinglotSelected={isParkinglotSelected}
            selectedParkinglot={selectedParkinglot}
          />
          {selectedParkinglot && (
            <Card
              className="infoCard"
              sx={{
                p: 2,
                marginTop: "20px",
                borderColor: "secondary",
                borderWidth: 1,
                borderStyle: "solid",
                width: "25vw", // 카드 크기 고정
                height: "56vh", // 카드 크기 고정
                overflow: "auto", // 내용이 많아질 경우 스크롤 생김
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className={styles["parkingMiddleText"]}>
                  주차장 상세 정보
                </div>
                <IconButton onClick={handleDismissClick}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <div className={styles["parkingDetailHeader"]}>
                <div className={styles["parkingID"]}>
                  {selectedParkinglot.parkingId}
                </div>
                <div className={styles["parkingName"]}>
                  {selectedParkinglot.name}
                </div>
                <div variant="body2">{selectedParkinglot.codeNumber}</div>
              </div>
              <div className={styles["parkingTextContainer"]}>
                <div className={styles["parkingMiddleText"]}>요금정보</div>
                <div className={styles["parkingBoldText"]}>주차요금 정보</div>
                {selectedParkinglot.normalSeason !== "NULL" && (
                  <div className={styles.labelContainer}>
                    <div className={styles.label}>성수기</div>
                    <div className={styles.graytext}>
                      {selectedParkinglot.normalSeason}
                    </div>
                  </div>
                )}
                {selectedParkinglot.tenantSeason !== "NULL" && (
                  <div className={styles.labelContainer}>
                    <div className={styles.label}>비수기</div>
                    <div className={styles.graytext}>
                      {selectedParkinglot.tenantSeason}
                    </div>
                  </div>
                )}
                {selectedParkinglot.timeTicket !== "NULL" && (
                  <div className={styles.labelContainer}>
                    <div className={styles.label}>기본요금</div>
                    <div className={styles.graytext}>
                      {selectedParkinglot.timeTicket}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles["parkingTextContainer"]}>
                <div className={styles["parkingMiddleText"]}>시설정보</div>
                <div className={styles["parkingBoldText"]}>기본정보</div>
                <div variant="body2">{selectedParkinglot.address}</div>
                <div className={styles["parkingBoldText"]}>운영시간</div>
                <div variant="body2">
                  {selectedParkinglot.operatingTime
                    .split(",")
                    .map((time, index) => (
                      <div key={index}>{time.trim()}</div>
                    ))}
                </div>
              </div>
              <div className={styles["parkingDetailFooter"]}>
                <button
                  className={styles.detailBtn}
                  onClick={() =>
                    navigate(`/user/parkinglot/${selectedParkinglot.parkingId}`)
                  }
                >
                  자세히 보기
                </button>
                <div className={styles.btnContainer}>
                  <button
                    className={styles["getBookParkingBtn"]}
                    onClick={goToReservationPage}
                  >
                    예약하기
                  </button>
                  <FavoriteButton selectedParkinglot={selectedParkinglot} />
                </div>
              </div>
            </Card>
          )}
        </Box>

        <Box
          sx={{
            width: "50%",
            border: "1px solid",
            borderColor: "divider",
            p: 2,
            mt: 4,
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab style={{ wordBreak: "keep-all" }} label="위치 기반 검색" />
            <Tab style={{ wordBreak: "keep-all" }} label="키워드 검색" />
            <Tab style={{ wordBreak: "keep-all" }} label="주차장 번호 검색" />
            <Tab
              style={{ wordBreak: "keep-all" }}
              label="전체 리스트 가져오기"
            />
            <Tab style={{ wordBreak: "keep-all" }} label="검색 내역 확인" />
          </Tabs>

          {tabValue === 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <TextField
                variant="outlined"
                label="위도"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="경도"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="반경(km)"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
              <button
                className={styles["getParkingBtn"]}
                onClick={handleFetchParkinglotsButtonClick}
              >
                주변 주차장 정보 가져오기
              </button>
            </Box>
          )}

          {tabValue === 1 && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <TextField
                variant="outlined"
                label="키워드"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className={styles["getParkingBtn"]}
                onClick={handleFetchParkinglotsByKeywordButtonClick}
              >
                키워드로 주차장 검색하기
              </button>
            </Box>
          )}

          {tabValue === 2 && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <TextField
                variant="outlined"
                label="주차장 번호"
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
              />
              <button
                className={styles["getParkingBtn"]}
                onClick={handleFetchParkinglotByParkingIdButtonClick}
              >
                주차장 ID로 주차장 검색하기
              </button>
            </Box>
          )}

          {tabValue === 3 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <button
                className={styles["getParkingBtn"]}
                onClick={handleFetchAllParkinglotsButtonClick}
              >
                전체 주차장 정보 가져오기
              </button>
            </Box>
          )}

          {tabValue === 4 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                mt: 4,
              }}
            >
              <button
                className={styles["getParkingBtn"]}
                onClick={fetchSearchHistory}
              >
                검색 내역 가져오기
              </button>
              {searchHistory.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    direction: "row",
                    alignItems: "center",
                    width: "50%",
                    border: "1px solid",
                    borderColor: "divider",
                    p: 2,
                    mt: 2,
                  }}
                >
                  <div variant="body1">{item.parkinglot.codeNumber}</div>
                  <div variant="body1">{item.parkinglot.name}</div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteSearchHistoryItem(item.historyId)}
                  >
                    삭제
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {(tabValue !== 3 ? parkinglotData : allParkinglots) &&
            (tabValue !== 3 ? parkinglotData : allParkinglots).map(
              (parkinglot, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    borderColor: "secondary.main",
                    borderWidth: 1,
                    borderStyle: "solid",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      transform: "translateY(-10px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleParkinglotClick(parkinglot)}
                >
                  <div variant="h6">{parkinglot.parkingId}</div>
                  <div variant="h6">{parkinglot.name}</div>
                  <div variant="body1">{parkinglot.address}</div>
                  <div variant="body1">{parkinglot.codeNumber}</div>
                </Card>
              )
            )}
        </Box>

        {tabValue === 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={keywordTotalPages}
              page={keywordPage}
              onChange={handleKeywordPageChange}
              color="primary"
            />
          </Box>
        )}
        {tabValue === 3 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={allTotalPages}
              page={allPage}
              onChange={handleAllPageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ParkinglotPage;
