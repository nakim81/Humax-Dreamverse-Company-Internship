import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/MyNavbar.css";
import Logo from "../assets/turuparking-hiparking.svg";
import AuthContext from "../hooks/AuthContext";
import api from "../api/axiosConfig";

function MyNavbar() {
  const {
    logout,
    isLoggedIn,
    admin,
    userId,
    token,
    setToken,
    setIsLoggedIn,
    setUserId,
    setAdmin,
  } = useContext(AuthContext);

  const [isParkinglotHovered, setIsParkinglotHovered] = useState(false);
  const [isParkinglotActive, setIsParkinglotActive] = useState(false);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [isPBookActive, setIsBookActive] = useState(false);
  const [isMyPageHovered, setIsMyPageHovered] = useState(false);
  const [isMyPageActive, setIsMyPageActive] = useState(false);
  const [isCarHovered, setIsCarHovered] = useState(false);
  const [isCarActive, setIsCarActive] = useState(false);
  const [isPayHovered, setIsPayHovered] = useState(false);
  const [isPayActive, setIsPayActive] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isAdminCarHovered, setIsAdminCarHovered] = useState(false);
  const [isAdminCarActive, setIsAdminCarActive] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("userId");
    const storedAdmin = localStorage.getItem("admin");

    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken); // token 상태 업데이트
    }

    if (storedId) {
      setUserId(storedId);
    }

    if (storedAdmin) {
      setAdmin(storedAdmin === "true"); // 문자열 'true'를 부울 true로 변환, 그 외의 경우는 false로 변환
    }
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await api.post("/user/logout");

      // 로컬 스토리지에서 사용자 정보와 토큰 삭제
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      // 로그아웃 상태 반영
      logout();

      alert("로그아웃되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleLogoClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handleParkinglotClick = () => {
    setIsParkinglotActive(true);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handleBookClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(true);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handleMyPageClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(true);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handleCarClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(true);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handlePayClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(true);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
  };

  const handleAdminClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(true);
    setIsAdminCarActive(false);
  };
  const handleAdminCarClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsCarActive(false);
    setIsPayActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(true);
  };

  return (
    <Navbar
      className="navbar sticky-top"
      expand="lg"
      style={{ backgroundColor: "#FFA07A" }}
    >
      <Navbar.Brand as={Link} to="/" onClick={handleLogoClick}>
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "40px", marginLeft: "20px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="justify-content-center">
          {isLoggedIn && (
            <>
              <NavLink
                to="/user/parkinglot"
                className="nav-link text-white active"
                style={{
                  fontSize: isParkinglotHovered ? "large" : "medium",
                  fontWeight: isParkinglotActive ? "800" : "400",
                  transition: "all 0.3s ease",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsParkinglotHovered(true)}
                onMouseLeave={() => setIsParkinglotHovered(false)}
                onClick={handleParkinglotClick}
              >
                주차장 조회
              </NavLink>
              <NavLink
                to={`/user/booklist`}
                className="nav-link text-white"
                style={{
                  fontSize: isBookHovered ? "large" : "medium",
                  fontWeight: isPBookActive ? "800" : "400",
                  transition: "all 0.3s ease",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsBookHovered(true)}
                onMouseLeave={() => setIsBookHovered(false)}
                onClick={handleBookClick}
              >
                이용 내역
              </NavLink>
              <NavLink
                to={`/user/${userId}/mypage`}
                className="nav-link text-white"
                style={{
                  fontSize: isMyPageHovered ? "large" : "medium",
                  fontWeight: isMyPageActive ? "800" : "400",
                  transition: "all 0.3s ease",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsMyPageHovered(true)}
                onMouseLeave={() => setIsMyPageHovered(false)}
                onClick={handleMyPageClick}
              >
                마이페이지
              </NavLink>
              <NavLink
                to={`/user/car`}
                className="nav-link text-white"
                style={{
                  fontSize: isCarHovered ? "large" : "medium",
                  fontWeight: isCarActive ? "800" : "400",
                  transition: "all 0.3s ease",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsCarHovered(true)}
                onMouseLeave={() => setIsCarHovered(false)}
                onClick={handleCarClick}
              >
                차량 관리
              </NavLink>
              <NavLink
                to={`/user/pay`}
                className="nav-link text-white"
                style={{
                  fontSize: isPayHovered ? "large" : "medium",
                  fontWeight: isPayActive ? "800" : "400",
                  transition: "all 0.3s ease",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsPayHovered(true)}
                onMouseLeave={() => setIsPayHovered(false)}
                onClick={handlePayClick}
              >
                결제수단
              </NavLink>
              {admin && (
                <NavLink
                  to={"/admin"}
                  className="nav-link text-white"
                  style={{
                    fontSize: isAdminHovered ? "17px" : "15px",
                    fontWeight: isAdminActive ? "800" : "400",
                    transition: "all 0.3s ease",
                  }}
                  // 추가: 마우스 이벤트 핸들러
                  onMouseEnter={() => setIsAdminHovered(true)}
                  onMouseLeave={() => setIsAdminHovered(false)}
                  onClick={handleAdminClick}
                >
                  관리자 페이지
                </NavLink>
              )}
              {admin && (
                <NavLink
                  to={"/admin/enter"}
                  className="nav-link text-white"
                  style={{
                    fontSize: isAdminCarHovered ? "17px" : "15px",
                    fontWeight: isAdminCarActive ? "800" : "400",
                    transition: "all 0.3s ease",
                  }}
                  // 추가: 마우스 이벤트 핸들러
                  onMouseEnter={() => setIsAdminCarHovered(true)}
                  onMouseLeave={() => setIsAdminCarHovered(false)}
                  onClick={handleAdminCarClick}
                >
                  차량 입차
                </NavLink>
              )}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Nav>
        {isLoggedIn ? (
          <Button variant="outline-light" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <>
            <NavLink to="/login" className="nav-link text-white">
              로그인
            </NavLink>
            <NavLink to="/signup" className="nav-link text-white">
              회원가입
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default MyNavbar;
