import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/MyNavbar.css";
import Logo from "../assets/turuparking-hiparking.svg";

function MyNavbar() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <Navbar
      className="navbar sticky-top"
      expand="lg"
      style={{ backgroundColor: "#FFA07A" }}
    >
      <Navbar.Brand href="/">
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "40px", marginLeft: "20px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          {token && (
            <>
              <NavLink
                to="/user/parkinglot"
                className="nav-link text-white active"
                activeStyle={{ fontWeight: "bolder" }}
              >
                주차장 조회
              </NavLink>
              <NavLink
                to={`/user/${userId}/book`}
                className="nav-link text-white"
                activeStyle={{ fontWeight: "bold" }}
              >
                주차권 예약
              </NavLink>
              <NavLink
                to={`/user/${userId}/mypage`}
                className="nav-link text-white"
                activeStyle={{ fontWeight: "bold" }}
              >
                마이페이지
              </NavLink>
              <NavLink
                to={`/user/${userId}/car`}
                className="nav-link text-white"
                activeStyle={{ fontWeight: "bold" }}
              >
                차량 관리
              </NavLink>
              <NavLink
                to={`/user/${userId}/pay`}
                className="nav-link text-white"
                activeStyle={{ fontWeight: "bold" }}
              >
                결제수단
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Nav>
        {token ? (
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
