import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./PayPage.css";

const PayPage = () => {
  const { token } = useContext(AuthContext);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  function PaymentList({ payments }) {
    const [data, setData] = useState(payments);
    const [newPayment, setNewPayment] = useState({
      payId: "",
      payName: "",
      payType: "",
      payNumber: "",
    });

    const toggleAddPayment = () => {
      setShowAddPayment((prevState) => !prevState); // 현재 상태의 반대로 변경하여 토글합니다.
    };

    const [showAddPayment, setShowAddPayment] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [editedData, setEditedData] = useState({
      payId: "",
      payName: "",
      payType: "",
      payNumber: "",
    });

    // 결제 수단 삭제
    const handleDelete = (id) => {
      const updatedData = data.filter((item) => item.payId !== id);
      const url = API_BASE_URL + `/user/pay/${id}`;

      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((error) => {
          console.log("데이터 삭제 실패");
        });
    };

    // 결제 수단 추가
    const handleAddPayment = () => {
      const updatedData = [...data, newPayment];
      setData(updatedData);

      const url = API_BASE_URL + `/user/pay`;
      console.log(token);
      axios
        .post(url, newPayment, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((error) => {
          console.log("데이터 추가 실패");
        });

      // 추가 후에 입력 필드 초기화
      setNewPayment({
        payId: "",
        payName: "",
        payType: "",
        payNumber: "",
      });

      setShowAddPayment(false); // 추가 창을 닫습니다.
    };

    const handleEdit = (id, payment) => {
      setEditItemId(id);
      setEditedData(payment);
    };

    const handleInputChange = (e, field) => {
      let updatedValue = { ...editedData, [field]: e.target.value };

      setEditedData(updatedValue);
    };

    // 결제수단 수정
    const handleSave = (id) => {
      const updatedData = data.map((item) => {
        if (item.payId === id) {
          return editedData;
        }
        return item;
      });

      setData(updatedData);

      const url = API_BASE_URL + `/user/pay/${id}`;

      const updatedItem = editedData;

      axios
        .patch(url, updatedItem, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((error) => {
          console.log("데이터 수정 실패");
        });

      setEditItemId(null);
    };

    const nameOptions = ["국민", "신한", "우리", "농협"]; // 결제 은행 이름
    const typeOptions = ["카드", "현금", "기타"]; // 결제 방식

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div className="payHeader">
            <div className="payAddBackBtn">
              <ArrowBackIcon
                onClick={() => navigate("/user/mypage")}
                className="payArrowBackIcon"
              />
              결제 수단 관리
            </div>
          </div>
          <div style={{ width: "60%", maxWidth: "600px" }}>
            <p style={{ fontSize: "20px", margin: "10px 0" }}>
              등록된 결제 수단
            </p>
            <div className="paylistsContainer">
              {data.map((payment) => (
                <div key={payment.payId} className="payListContainer">
                  {editItemId === payment.payId ? (
                    <div className="paylist">
                      <div>
                        <label>결제 방식</label>
                        <select
                          value={editedData.payType}
                          onChange={(e) => handleInputChange(e, "payType")}
                          className="paySelect"
                        >
                          <option value="카드">카드</option>
                          <option value="현금">현금</option>
                        </select>
                      </div>
                      <div>
                        <label>결제 은행</label>
                        <select
                          value={editedData.payName}
                          onChange={(e) => handleInputChange(e, "payName")}
                          className="paySelect"
                        >
                          <option value="국민">국민</option>
                          <option value="신한">신한</option>
                          <option value="우리">우리</option>
                          <option value="농협">농협</option>
                        </select>
                      </div>
                      <div>
                        <label>카드 / 계좌 번호</label>
                        <input
                          type="text"
                          value={editedData.payNumber}
                          onChange={(e) => handleInputChange(e, "payNumber")}
                          className="payInput"
                        />
                      </div>
                      <div className="payAddBtnContainer">
                        <button
                          className="payAddBtn"
                          onClick={() => handleSave(payment.payId)}
                        >
                          저장
                        </button>
                        <button
                          className="payBtn"
                          onClick={() => setEditItemId(null)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: "5px", borderRadius: "5px" }}>
                      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                        {payment.payType}
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        {payment.payName} {payment.payNumber}
                      </div>
                    </div>
                  )}
                  <div>
                    {editItemId !== payment.payId && (
                      <>
                        <button
                          onClick={() => handleEdit(payment.payId, payment)}
                          className="payBtn"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(payment.payId)}
                          className="payBtn"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "15px", marginTop: "20px" }}>
              <div
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={toggleAddPayment}
              >
                {" "}
                + 결제 수단 추가
              </div>
              {showAddPayment && (
                <div
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <select
                    value={newPayment.payType}
                    className="paySelect"
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, payType: e.target.value })
                    }
                  >
                    <option value="">결제 방식</option>
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* payType이 카드인 경우에만 노출 */}
                  {newPayment.payType === "카드" && (
                    <select
                      value={newPayment.payName}
                      className="paySelect"
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          payName: e.target.value,
                        })
                      }
                    >
                      <option value="">결제 은행</option>
                      {nameOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {newPayment.payType === "카드" && (
                    <input
                      type="text"
                      value={newPayment.payNumber}
                      className="payInput"
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          payNumber: e.target.value,
                        })
                      }
                      placeholder="카드 / 계좌 번호"
                    ></input>
                  )}
                  <button className="payBtn" onClick={handleAddPayment}>
                    추가하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    // 토큰이 있을 때에만 전송
    if (token) {
      const fetchData = async () => {
        const url = API_BASE_URL + `/user/pay`;
        try {
          const res = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setResponseData(res.data);
        } catch (err) {
          console.error("결제수단 정보 갱신 실패");
        }
      };

      fetchData();
    }
  }, [token]);

  // 토큰이 없는 경우 로딩 중을 표시
  if (!token) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      {responseData ? (
        <PaymentList payments={responseData} />
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default PayPage;
