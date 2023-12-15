import React, { useState, useRef } from "react";
import styles from "./AdminSideBar.module.css";
import { useNavigate, NavLink, Router } from "react-router-dom";

const AdminSideBar = ({ width = 200 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [xPosition, setXPosition] = useState(width);
  const side = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
    if (xPosition === width) {
      setXPosition(0);
    } else {
      setXPosition(width);
    }
  };

  const handleClose = async () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const Menus = [
    { name: "주차장 관리", path: "/admin", exact: true },
    { name: "주차장 등록", path: "/admin/parking/add" },
    { name: "사용자 관리", path: "/admin/user" },
  ];

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button onClick={() => toggleMenu()} className={styles.toggleBtn}>
          {isOpen ? (
            <div className={styles.toggleBtnText} onClick={() => handleClose}>
              닫기
            </div>
          ) : (
            <div className={styles.toggleBtnText} onClick={() => handleClose}>
              메뉴
            </div>
          )}
        </button>
        <div className={styles.content}>
          <div className={styles.sidebarContent}>
            {Menus.map((menu, index, exact) => {
              return (
                <>
                  <NavLink
                    exact
                    to={menu.path}
                    end={exact}
                    key={index}
                    style={({ isActive }) => ({
                      fontSize: "20px",
                      fontWeight: isActive ? "bold" : "none",
                      color: "black",
                      textDecoration: "none",
                      padding: "5px 0",
                    })}
                  >
                    {menu.name}
                  </NavLink>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
