<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

function PaymentList({ payments }) {
  const [data, setData] = useState(payments);
  const [newPayment, setNewPayment] = useState({
    payId: '',
    payName: '',
    payType: '',
    payNumber: ''
  });
  const toggleAddPayment = () => {
    setShowAddPayment(prevState => !prevState); // 현재 상태의 반대로 변경하여 토글합니다.
  };

  // TEST: 유저 정보 토큰
  Cookies.set('test', 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdW1teSIsImlhdCI6MTcwMTMxMjk3MywiZXhwIjoxNzAxMzE2NTczfQ.fLBXRYAtsqGcQ9mxdNoo1F5nQngpOC0Kjft4ig9a8UA');

  const [showAddPayment, setShowAddPayment] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editedData, setEditedData] = useState({
    payId: '',
    payName: '',
    payType: '',
    payNumber: ''
  });



  // 결제 수단 삭제
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.payId !== id);

    // TODO : URL 값 수정
    const url = `http://localhost:8080/user/1/pay/${id}`;

    const token = Cookies.get('test');

    axios.delete(url, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        setData(updatedData);
      })
      .catch(error => {
        console.log('데이터 삭제 실패');
      });
  };


  // 결제 수단 추가
  const handleAddPayment = () => {

    const updatedData = [...data, newPayment];
    setData(updatedData);

    const token = Cookies.get('test');

    // TODO : URL 값 수정
    const url = `http://localhost:8080/user/1/pay`;


    axios.post(url, newPayment, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        setData(updatedData);
      })
      .catch(error => {
        console.log('데이터 추가 실패');
      });


    // 추가 후에 입력 필드 초기화
    setNewPayment({
      payId: '',
      payName: '',
      payType: '',
      payNumber: ''
    });

    setShowAddPayment(false); // 추가 창을 닫습니다.
  };

  const handleEdit = (id, payment) => {
    setEditItemId(id);
    setEditedData(payment);
  };

  const handleInputChange = (e, field) => {
    let updatedValue = { ...editedData, [field]: e.target.value };

    if (field === 'payType' && e.target.value === '현금') {
      updatedValue = { ...updatedValue, payName: '현금' };
      // 현금일 경우 payName을 '현금'으로 설정하고 payType을 '0'으로 설정합니다.
      updatedValue = { ...updatedValue, payNumber: '0' };
    }

    setEditedData(updatedValue);
  };

  // 결제수단 수정
  const handleSave = (id) => {
    const updatedData = data.map(item => {
      if (item.payId === id) {
        return editedData;
      }
      return item;
    });

    setData(updatedData);

    // TODO : URL 값 수정
    const url = `http://localhost:8080/user/1/pay/${id}`;

    const token = Cookies.get('test');

    const updatedItem = editedData;

    axios.patch(url, updatedItem, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        setData(updatedData);
      })
      .catch(error => {
        console.log('데이터 수정 실패');
      });

    setEditItemId(null);

  };

  const nameOptions = ['국민', '신한', '우리', '농협']; // 결제 은행 이름
  const typeOptions = ['카드', '현금', '기타']; // 결제 방식

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '60%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '20px', margin: '10px 0' }}>등록된 결제 수단</h2>
        <ul style={{ padding: 0, listStyle: 'none', color: 'white', fontSize: '15px' }}>
          {data.map(payment => (
            <li key={payment.payId} style={{ marginBottom: '10px', backgroundColor: 'orange', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {editItemId === payment.payId ? (
                <div style={{ padding: '5px', borderRadius: '5px'}}>
                  <div>
                    <label>ID:</label>
                  </div>
                  <div>
                    <label>Type:</label>
                    <select value={editedData.payType} onChange={(e) => handleInputChange(e, 'payType')}>
                      <option value="카드">카드</option>
                      <option value="현금">현금</option>
                    </select>
                  </div>
                  <div>
                    <label>Name:</label>
                    <select value={editedData.payName} onChange={(e) => handleInputChange(e, 'payName')}>
                      <option value="국민">국민</option>
                      <option value="신한">신한</option>
                      <option value="우리">우리</option>
                      <option value="농협">농협</option>
                    </select>
                  </div>
                  <div>
                    <label>Number:</label>
                    <input type="text" value={editedData.payNumber} onChange={(e) => handleInputChange(e, 'payNumber')} />
                  </div>
                  <button onClick={() => handleSave(payment.payId)}>저장</button>
                </div>
              ) : (
                <div style={{ padding: '5px', borderRadius: '5px' }}>
                  <p>Type: {payment.payType}</p>
                  <p>Name: {payment.payName}</p>
                  <p>Number: {payment.payNumber}</p>
                </div>
              )}
              <div>
                {editItemId !== payment.payId && (
                  <button onClick={() => handleEdit(payment.payId, payment)} style={{ border: 'none', backgroundColor: 'transparent', fontSize: '20px', color: 'white' }}>Edit</button>
                )}
                <button onClick={() => handleDelete(payment.payId)} style={{ border: 'none', marginLeft: '5px', backgroundColor: 'transparent', fontSize: '15px', color: 'white' }}>X</button>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ fontSize: '15px', marginTop: '20px' }}>
          <h3 style={{ cursor: 'pointer' }} onClick={toggleAddPayment}> + 결제 수단 추가</h3>
          {showAddPayment && (
            <div style={{ padding: '20px', borderRadius: '10px', marginTop: '10px' }}>
              <select
                value={newPayment.payType}
                onChange={(e) => setNewPayment({ ...newPayment, payType: e.target.value })}
              >
                <option value="">결제 방식</option>
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {/* payType이 카드인 경우에만 노출 */}
              {newPayment.payType === '카드' && (
                <select 
                  value={newPayment.payName} 
                  onChange={(e) => setNewPayment({ ...newPayment, payName: e.target.value })}
                >
                  <option value="">결제 은행</option>
                  {nameOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {newPayment.payType === '카드' && (
                <input
                  type="text"
                  value={newPayment.payNumber}
                  onChange={(e) => setNewPayment({ ...newPayment, payNumber: e.target.value })}
                  placeholder="Number">
                </input>
              )}
              <button onClick={handleAddPayment}>추가하기</button>
=======
import React from "react";
import useAuth from "../useAuth";

const PayPage = () => {
    useAuth();
    return (
        <>
            <div>
                <h1>PayPage</h1>
>>>>>>> 6a099d10c70034b44a1fb5e176d2614c3241d236
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PayPage() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // GET 요청 보내기
    axios.get('http://localhost:8080/user/1/pay')
      .then(response => {
        // 응답 데이터를 상태(State)에 저장
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>PayPage</h1>
      {responseData ? ( // responseData가 존재하는 경우에만 데이터를 표시
        <pre>
          <PaymentList payments={responseData} />
        </pre>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default PayPage;