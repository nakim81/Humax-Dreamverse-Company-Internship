import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import api from "../api/axiosConfig";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState({
    id: "",
    phoneNum: "",
    email: "",
  });
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isUpdateInfo, setIsUpdateInfo] = useState(false);
  const [updatePhoneNum, setUpdatePhoneNum] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("/user/mypage");
      const userInfo = response.data.body;
      setUserInfos({
        id: userInfo.id,
        phoneNum: userInfo.phoneNum,
        email: userInfo.email,
      });
      setUpdatePhoneNum(userInfo.phoneNum);
      setUpdateEmail(userInfo.email);
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewInfo = async () => {
    setIsOpenInfo((isOpenInfo) => !isOpenInfo);
  };

  const handleUpdateOpen = () => {
    setIsOpenInfo(true);
    setIsUpdateInfo((isUpdateInfo) => !isUpdateInfo);
  };

  const handleUpdateInfo = async () => {
    try {
      await api.put("/user/mypage", {
        phoneNum: updatePhoneNum,
        email: updateEmail,
      });

      alert("정보가 성공적으로 수정되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error updating user info", error);
    } finally {
      setIsUpdateInfo(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete("/user/withdraw");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("admin");
      alert("회원탈퇴가 성공적으로 처리되었습니다.");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user account", error);
    }
  };

  return (
    <>
      <div className={styles["mypage-container"]}>
        <Link to="/">
          <button className={styles["home-button"]}> ← 홈으로</button>
        </Link>
        <div className={styles["user-container"]}>
          {userInfos.id ? (
            <>
              <div className={styles["hi-text"]}>안녕하세요</div>
              <div className={styles["user-img-container"]}>
                <div className={styles["user-id-text"]}>{userInfos.id}님</div>
                <button onClick={handleViewInfo}>내 정보 조회</button>
              </div>
              {isOpenInfo && (
                <div>
                  <div className={styles.infosContainer}>
                    <div className={styles.infoContainer}>
                      <div className={styles.label}>아이디</div>
                      <div className={styles.infoText}>{userInfos.id}</div>
                    </div>
                    <div className={styles.infoContainer}>
                      <div className={styles.label}>전화번호</div>
                      {isUpdateInfo ? (
                        <input
                          type="text"
                          placeholder="전화번호를 입력하세요."
                          value={updatePhoneNum}
                          className={styles.infoInput}
                          onChange={(e) => setUpdatePhoneNum(e.target.value)}
                        />
                      ) : (
                        <div className={styles.infoText}>
                          {userInfos.phoneNum}
                        </div>
                      )}
                    </div>
                    <div className={styles.infoContainer}>
                      <div className={styles.label}>이메일</div>
                      {isUpdateInfo ? (
                        <input
                          type="text"
                          placeholder="이메일을 입력하세요."
                          value={updateEmail}
                          className={styles.infoInput}
                          onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                      ) : (
                        <div className={styles.infoText}>{userInfos.email}</div>
                      )}
                    </div>
                  </div>
                  {isUpdateInfo && (
                    <div className={styles.updateBtnContainer}>
                      <button onClick={handleUpdateInfo}>수정완료</button>
                      <button onClick={() => setIsUpdateInfo(false)}>
                        취소
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles["hi-text"]}>안녕하세요</div>
              <div className={styles["user-img-container"]}>
                <div className={styles["user-id-text"]}>
                  로그인이 필요합니다.
                </div>
                <button onClick={() => navigate("/login")}>로그인</button>
              </div>
            </>
          )}
        </div>
        <div className={styles["list-container"]}>
          <div
            className={styles["list"]}
            onClick={() => navigate("/user/booklist")}
          >
            이용내역
            <ArrowForwardIosIcon />
          </div>
          <div className={styles["list"]} onClick={() => navigate("/user/pay")}>
            결제 수단 관리
            <ArrowForwardIosIcon />
          </div>
          <div className={styles["list"]} onClick={() => navigate("/user/car")}>
            차량 정보 관리
            <ArrowForwardIosIcon />
          </div>
          <div
            className={styles["list"]}
            onClick={() => navigate("/user/favorites")}
          >
            즐겨찾기 목록 관리
            <ArrowForwardIosIcon />
          </div>
        </div>
        <div className={styles["btn-container"]}>
          <button onClick={handleUpdateOpen}>내 정보 수정</button>
          <button onClick={handleDeleteAccount}>회원탈퇴</button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
