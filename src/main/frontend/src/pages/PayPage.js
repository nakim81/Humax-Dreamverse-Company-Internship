import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import axios from "axios";

const PayPage = () => {
  const { token } = useContext(AuthContext);
  const [responseData, setResponseData] = useState(null);
  const url = `http://localhost:8080/user/pay`;

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
      const url = `http://localhost:8080/user/pay/${id}`;

      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
        })
        .catch((error) => {
          console.log("데이터 삭제 실패");
        });
    };

    // 결제 수단 추가
    const handleAddPayment = () => {
      const updatedData = [...data, newPayment];
      setData(updatedData);

      const url = `http://localhost:8080/user/pay`;
      console.log(token);
      axios
        .post(url, newPayment, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
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
      /*
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      */
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

      const url = `http://localhost:8080/user/pay/${id}`;

      const updatedItem = editedData;

      axios
        .patch(url, updatedItem, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(updatedData);
        })
        .catch((error) => {
          console.log("데이터 수정 실패");
        });

      setEditItemId(null);
    };

    const nameOptions = ["국민", "신한", "우리", "농협"]; // 결제 은행 이름
    const typeOptions = ["카드", "현금", "기타"]; // 결제 방식

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ width: "60%", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "20px", margin: "10px 0" }}>
            등록된 결제 수단
          </h2>
          <ul
            style={{
              padding: 0,
              listStyle: "none",
              color: "white",
              fontSize: "15px",
            }}
          >
            {data.map((payment) => (
              <li
                key={payment.payId}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "orange",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {editItemId === payment.payId ? (
                  <div style={{ padding: "5px", borderRadius: "5px" }}>
                    <div>
                      <label>ID:</label>
                    </div>
                    <div>
                      <label>Type:</label>
                      <select
                        value={editedData.payType}
                        onChange={(e) => handleInputChange(e, "payType")}
                      >
                        <option value="카드">카드</option>
                        <option value="현금">현금</option>
                      </select>
                    </div>
                    <div>
                      <label>Name:</label>
                      <select
                        value={editedData.payName}
                        onChange={(e) => handleInputChange(e, "payName")}
                      >
                        <option value="국민">국민</option>
                        <option value="신한">신한</option>
                        <option value="우리">우리</option>
                        <option value="농협">농협</option>
                      </select>
                    </div>
                    <div>
                      <label>Number:</label>
                      <input
                        type="text"
                        value={editedData.payNumber}
                        onChange={(e) => handleInputChange(e, "payNumber")}
                      />
                    </div>
                    <button onClick={() => handleSave(payment.payId)}>
                      저장
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: "5px", borderRadius: "5px" }}>
                    <p>Type: {payment.payType}</p>
                    <p>Name: {payment.payName}</p>
                    <p>Number: {payment.payNumber}</p>
                  </div>
                )}
                <div>
                  {editItemId !== payment.payId && (
                    <button
                      onClick={() => handleEdit(payment.payId, payment)}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(payment.payId)}
                    style={{
                      border: "none",
                      marginLeft: "5px",
                      backgroundColor: "transparent",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ fontSize: "15px", marginTop: "20px" }}>
            <h3 style={{ cursor: "pointer" }} onClick={toggleAddPayment}>
              {" "}
              + 결제 수단 추가
            </h3>
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
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, payName: e.target.value })
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
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        payNumber: e.target.value,
                      })
                    }
                    placeholder="Number"
                  ></input>
                )}
                <button onClick={handleAddPayment}>추가하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 수정된 부분: 토큰이 있는지 먼저 체크하고, 있을 시에만 axios 요청. useEffect훅을 사용하여 새로 로딩될때마다 실행
  useEffect(() => {
    if (token) {
      // 토큰이 존재하는 경우에만 GET 요청을 수행
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
    }
  }, [token]);

  // 토큰이 없는 경우 로딩 중을 표시
  if (!token) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="App">
      <h1>PayPage</h1>
      {responseData ? (
        <pre>
          <PaymentList payments={responseData} />
        </pre>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default PayPage;
