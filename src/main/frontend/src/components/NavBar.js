import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/MyNavbar.css";
import Logo from "../assets/turuparking-hiparking.svg";
import AuthContext from "../hooks/AuthContext";
import api from "../api/axiosConfig";

function MyNavbar() {
  const {
    logout,
    isLoggedIn,
    admin,
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
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isAdminCarHovered, setIsAdminCarHovered] = useState(false);
  const [isAdminCarActive, setIsAdminCarActive] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("userId");
    const storedAdmin = localStorage.getItem("admin");
    const activeMenu = localStorage.getItem("activeMenu");

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

    if (activeMenu) {
      switch (activeMenu) {
        case "parkinglot":
          setIsParkinglotActive(true);
          break;
        case "book":
          setIsBookActive(true);
          break;
        case "myPage":
          setIsMyPageActive(true);
          break;
        case "admin":
          setIsAdminActive(true);
          break;
        case "adminCar":
          setIsAdminCarActive(true);
          break;
        default:
          setIsParkinglotActive(false);
          setIsBookActive(false);
          setIsMyPageActive(false);
          setIsAdminActive(false);
          setIsAdminCarActive(false);
          break;
      }
    }
  }, [setAdmin, setIsLoggedIn, setToken, setUserId]);

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
    setIsAdminActive(false);
    setIsAdminCarActive(false);
    localStorage.removeItem("activeMenu");
  };

  const handleParkinglotClick = () => {
    setIsParkinglotActive(true);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
    localStorage.setItem("activeMenu", "parkinglot");
  };

  const handleBookClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(true);
    setIsMyPageActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
    localStorage.setItem("activeMenu", "parkinglot");
  };

  const handleMyPageClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(true);
    setIsAdminActive(false);
    setIsAdminCarActive(false);
    localStorage.setItem("activeMenu", "myPage");
  };

  const handleAdminClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsAdminActive(true);
    setIsAdminCarActive(false);
    localStorage.setItem("activeMenu", "admin");
  };
  const handleAdminCarClick = () => {
    setIsParkinglotActive(false);
    setIsBookActive(false);
    setIsMyPageActive(false);
    setIsAdminActive(false);
    setIsAdminCarActive(true);
    localStorage.setItem("activeMenu", "adminCar");
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
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ marginRight: "5px" }}
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        style={{ justifyContent: "flex-end", overflow: "hidden" }}
      >
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
                  display: "flex",
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                  alignItems: "center",
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
                  display: "flex",
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsBookHovered(true)}
                onMouseLeave={() => setIsBookHovered(false)}
                onClick={handleBookClick}
              >
                이용 내역
              </NavLink>
              <NavLink
                to={`/user/mypage`}
                className="nav-link text-white"
                style={{
                  fontSize: isMyPageHovered ? "large" : "medium",
                  fontWeight: isMyPageActive ? "800" : "400",
                  transition: "all 0.3s ease",
                  display: "flex",
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // 추가: 마우스 이벤트 핸들러
                onMouseEnter={() => setIsMyPageHovered(true)}
                onMouseLeave={() => setIsMyPageHovered(false)}
                onClick={handleMyPageClick}
              >
                마이페이지
              </NavLink>
              {admin && (
                <NavLink
                  to={"/admin"}
                  className="nav-link text-white"
                  style={{
                    fontSize: isAdminHovered ? "large" : "medium",
                    fontWeight: isAdminActive ? "800" : "400",
                    transition: "all 0.3s ease",
                    display: "flex",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
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
                    fontSize: isAdminCarHovered ? "large" : "medium",
                    fontWeight: isAdminCarActive ? "800" : "400",
                    transition: "all 0.3s ease",
                    display: "flex",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // 추가: 마우스 이벤트 핸들러
                  onMouseEnter={() => setIsAdminCarHovered(true)}
                  onMouseLeave={() => setIsAdminCarHovered(false)}
                  onClick={handleAdminCarClick}
                >
                  차량 입출차
                </NavLink>
              )}
            </>
          )}
          {isLoggedIn ? (
            <Button
              variant="outline-light"
              onClick={handleLogout}
              style={{ whiteSpace: "nowrap", marginLeft: "10px" }}
            >
              로그아웃
            </Button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="nav-link text-white"
                style={{ whiteSpace: "nowrap", marginLeft: "10px" }}
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="nav-link text-white"
                style={{ whiteSpace: "nowrap" }}
              >
                회원가입
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
