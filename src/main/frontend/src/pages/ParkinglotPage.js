import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../components/MapComponent";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

const ParkinglotPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");

  const [keyword, setKeyword] = useState("");
  const [keywordPage, setKeywordPage] = useState(0);
  const [keywordTotalPages, setKeywordTotalPages] = useState(0);

  const [allParkinglots, setAllParkinglots] = useState([]);

  const [parkingId, setParkingId] = useState("");
  const [parkinglotData, setParkinglotData] = useState([]);
  const [selectedParkinglot, setSelectedParkinglot] = useState(null);
  const [isParkinglotSelected, setIsParkinglotSelected] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  const [tabValue, setTabValue] = useState(0);

  const [initialLoad, setInitialLoad] = useState(true);

  const { userId } = useParams();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const size = 10;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFA07A", // 차분한 주황색으로 변경
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
      const response = await axios.get(
        "http://localhost:8080/parkinglot/nearby",
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            radius: radius,
          },
        }
      );
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
        `http://localhost:8080/parkinglot/parkingId/${parkingId}`
      );
      setParkinglotData([response.data.body]);
    } catch (error) {
      console.error("주차장 코드넘버 기반 검색 중 오류가 발생했습니다.", error);
    }
  };

  // 전체 주차장 정보를 가져오는 함수
  const handleFetchAllParkinglotsButtonClick = async () => {
    setParkinglotData([]);
    try {
      const response = await axios.get("http://localhost:8080/parkinglot/all");
      if (response.data.body && Array.isArray(response.data.body)) {
        setAllParkinglots(response.data.body);
      } else {
        console.error("Unexpected response", response);
      }
    } catch (error) {
      console.error(
        "전체 주차장 정보를 가져오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const fetchParkinglotsByKeyword = async () => {
    setAllParkinglots([]);
    try {
      const response = await axios.get(
        "http://localhost:8080/parkinglot/search",
        {
          params: {
            keyword: keyword,
            page: keywordPage,
            size: size,
          },
        }
      );
      setParkinglotData(response.data.body.content);
      setKeywordTotalPages(response.data.body.totalPages);
    } catch (error) {
      console.error("키워드 기반 주차장 검색 중 오류가 발생했습니다.", error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/searchHistory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchHistory(response.data.body);
    } catch (error) {
      console.error("검색 내역을 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  const deleteSearchHistoryItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/searchHistory/${id}`, {
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
    setKeywordPage(0); // 검색 버튼을 누르면 페이지를 초기화
    fetchParkinglotsByKeyword();
  };

  useEffect(() => {
    if (!initialLoad) {
      fetchParkinglotsByKeyword();
    } else {
      setInitialLoad(false);
    }
  }, [keywordPage]);

  // 키워드 기반 검색 결과의 페이지 이동 함수
  const handleKeywordPageChange = (event, value) => {
    setKeywordPage(value - 1); // 페이지 번호를 0부터 시작하도록 -1을 해줌
  };

  const handleParkinglotClick = async (parkinglot) => {
    console.log(token);
    console.log(`sending request with parking ID : ${parkinglot.parkingId}`);
    try {
      // 주차장 클릭 시 해당 주차장의 id를 서버에 POST 요청으로 보냅니다.
      await axios.post(
        `http://localhost:8080/user/searchHistory/${parkinglot.parkingId}`,
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
  };

  const goToReservationPage = () => {
    navigate(`/user/${userId}/book`, { state: { selectedParkinglot } });
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
                width: "20vw", // 카드 크기 고정
                height: "56vh", // 카드 크기 고정
                overflow: "auto", // 내용이 많아질 경우 스크롤 생김
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">주차장 상세 정보</Typography>
                <IconButton onClick={handleDismissClick}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body2">
                ID: {selectedParkinglot.parkingId}
              </Typography>
              <Typography variant="body2">
                코드넘버: {selectedParkinglot.codeNumber}
              </Typography>
              <Typography variant="body2">
                이름: {selectedParkinglot.name}
              </Typography>
              <Typography variant="body2">
                주소: {selectedParkinglot.address}
              </Typography>
              <Typography variant="body2">
                운영시간: {selectedParkinglot.operatingTime}
              </Typography>
              <Typography variant="body2">
                시간 티켓: {selectedParkinglot.timeTicket}
              </Typography>
              <Typography variant="body2">
                위도: {selectedParkinglot.lat}
              </Typography>
              <Typography variant="body2">
                경도: {selectedParkinglot.lon}
              </Typography>
              <Typography variant="body2">
                가격: {selectedParkinglot.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={goToReservationPage}
              >
                예약하기
              </Button>
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
            <Tab label="위치 기반 검색" />
            <Tab label="키워드 검색" />
            <Tab label="주차장 번호 검색" />
            <Tab label="전체 리스트 가져오기" />
            <Tab label="검색 내역 확인" />
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFetchParkinglotsButtonClick}
              >
                주변 주차장 정보 가져오기
              </Button>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFetchParkinglotsByKeywordButtonClick}
              >
                키워드로 주차장 검색하기
              </Button>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFetchParkinglotByParkingIdButtonClick}
              >
                주차장 Id로 주차장 검색하기
              </Button>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFetchAllParkinglotsButtonClick}
              >
                전체 주차장 정보 가져오기
              </Button>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={fetchSearchHistory}
              >
                검색 내역 가져오기
              </Button>
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
                  <Typography variant="body1">
                    {item.parkinglot.codeNumber}
                  </Typography>
                  <Typography variant="body1">
                    {item.parkinglot.name}
                  </Typography>
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
                  <Typography variant="h6">{parkinglot.parkingId}</Typography>
                  <Typography variant="h6">{parkinglot.name}</Typography>
                  <Typography variant="body1">{parkinglot.address}</Typography>
                  <Typography variant="body1">
                    {parkinglot.codeNumber}
                  </Typography>
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
      </Box>
    </ThemeProvider>
  );
};

export default ParkinglotPage;
