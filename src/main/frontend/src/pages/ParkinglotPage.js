import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ParkinglotPage.css";
import MapComponent from "../components/MapComponent";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

const ParkinglotPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [keyword, setKeyword] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [parkinglotData, setParkinglotData] = useState([]);
  const [selectedParkinglot, setSelectedParkinglot] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [radius, setRadius] = useState("");
  const [allParkinglots, setAllParkinglots] = useState([]);
  const [keywordPage, setKeywordPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [canGoNextKeywordPage, setCanGoNextKeywordPage] = useState(true);
  const [canGoNextAllPage, setCanGoNextAllPage] = useState(true);
  const [keywordTotalPages, setKeywordTotalPages] = useState(0);
  const [allTotalPages, setAllTotalPages] = useState(0);

  const { userId } = useParams();

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

  const handleFetchAllParkinglots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/parkinglot/all", {
        params: {
          page: allPage,
          size: size,
        },
      });
      setAllParkinglots(response.data.body.content);
      setCanGoNextAllPage(response.data.body.content.length === size);
    } catch (error) {
      console.error(
        "전체 주차장 정보를 가져오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const handleFetchParkinglots = async () => {
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

  const handleFetchParkinglotsByKeyword = async () => {
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
      setCanGoNextKeywordPage(response.data.body.content.length === size);
    } catch (error) {
      console.error("키워드 기반 주차장 검색 중 오류가 발생했습니다.", error);
    }
  };

  const handleFetchParkinglotByCodeNumber = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/parkinglot/codenumber/${codeNumber}`
      );
      setParkinglotData([response.data.body]);
    } catch (error) {
      console.error("주차장 코드넘버 기반 검색 중 오류가 발생했습니다.", error);
    }
  };

  // 키워드 기반 검색 결과의 페이지 이동 함수
  const handleKeywordPageChange = (event, value) => {
    setKeywordPage(value);
    handleFetchParkinglotsByKeyword(); // 페이지가 변경된 후 API 호출
  };

  // 전체 주차장 정보의 페이지 이동 함수
  const handleAllPageChange = (event, value) => {
    setAllPage(value);
    handleFetchAllParkinglots(); // 페이지가 변경된 후 API 호출
  };

  const handleParkinglotClick = (parkinglot) => {
    setSelectedParkinglot(parkinglot);
  };

  useEffect(() => {
    if (keywordPage !== 0) {
      handleFetchParkinglotsByKeyword();
    }
  }, [keywordPage]);

  useEffect(() => {
    if (allPage !== 0) {
      handleFetchAllParkinglots();
    }
  }, [allPage]);

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
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="primay"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ParkinglotPage
            </Typography>
            <Typography variant="h6" component="div">
              User Id: {userId}
            </Typography>
          </Toolbar>
        </AppBar>

        {selectedParkinglot && (
          <Card
            sx={{
              p: 2,
              mt: 4,
              borderColor: "secondary",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">주차장 상세 정보</Typography>
              <IconButton onClick={() => setSelectedParkinglot(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h5">
              코드넘버: {selectedParkinglot.codeNumber}
            </Typography>
            <Typography variant="h5">
              이름: {selectedParkinglot.name}
            </Typography>
            <Typography variant="h5">
              주소: {selectedParkinglot.address}
            </Typography>
            <Typography variant="h5">
              운영시간: {selectedParkinglot.operatingTime}
            </Typography>
            <Typography variant="h5">
              일반 시즌: {selectedParkinglot.normalSeason}
            </Typography>
            <Typography variant="h5">
              임차 시즌: {selectedParkinglot.tenantSeason}
            </Typography>
            <Typography variant="h5">
              시간 티켓: {selectedParkinglot.timeTicket}
            </Typography>
            <Typography variant="h5">
              일 티켓: {selectedParkinglot.dayTicket}
            </Typography>
            <Typography variant="h5">
              특별일: {selectedParkinglot.specialDay}
            </Typography>
            <Typography variant="h5">
              특별시간: {selectedParkinglot.specialHour}
            </Typography>
            <Typography variant="h5">
              특별밤: {selectedParkinglot.specialNight}
            </Typography>
            <Typography variant="h5">
              특별주말: {selectedParkinglot.specialWeekend}
            </Typography>
            <Typography variant="h5">
              적용일: {selectedParkinglot.applyDay}
            </Typography>
            <Typography variant="h5">
              적용시간: {selectedParkinglot.applyHour}
            </Typography>
            <Typography variant="h5">
              적용밤: {selectedParkinglot.applyNight}
            </Typography>
            <Typography variant="h5">
              적용주말: {selectedParkinglot.applyWeekend}
            </Typography>
            <Typography variant="h5">
              활성화 상태: {selectedParkinglot.is_active}
            </Typography>
            <Typography variant="h5">
              운영: {selectedParkinglot.operation}
            </Typography>
            <Typography variant="h5">
              생성 시간: {selectedParkinglot.createdAt}
            </Typography>
            <Typography variant="h5">
              업데이트 시간: {selectedParkinglot.updatedAt}
            </Typography>
            <Typography variant="h5">
              삭제 시간: {selectedParkinglot.deletedAt}
            </Typography>
            <Typography variant="h5">위도: {selectedParkinglot.lat}</Typography>
            <Typography variant="h5">경도: {selectedParkinglot.lon}</Typography>
            <Typography variant="h5">
              시간: {selectedParkinglot.time}
            </Typography>
            <Typography variant="h5">
              가격: {selectedParkinglot.price}
            </Typography>
          </Card>
        )}

        {/* MapComponent 추가 */}
        <MapComponent
          parkinglotData={tabValue !== 3 ? parkinglotData : allParkinglots}
        />

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
            <Tab label="코드넘버 검색" />
            <Tab label="전체 리스트 가져오기" />
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
                onClick={handleFetchParkinglots}
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
                onClick={handleFetchParkinglotsByKeyword}
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
                label="코드넘버"
                value={codeNumber}
                onChange={(e) => setCodeNumber(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFetchParkinglotByCodeNumber}
              >
                코드넘버로 주차장 검색하기
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
                onClick={handleFetchAllParkinglots}
              >
                전체 주차장 정보 가져오기
              </Button>
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
                  }}
                  onClick={() => handleParkinglotClick(parkinglot)}
                >
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
              color="secondary"
            />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ParkinglotPage;
