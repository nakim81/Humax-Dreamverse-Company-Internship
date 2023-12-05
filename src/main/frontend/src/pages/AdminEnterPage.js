import React, { useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import "./AdminEnterPage.css";
import axios from "axios";

const AdminEnterPage = () => {
    const { token } = useContext(AuthContext);
    const [enterForm, setEnterForm] = useState({
            parkingLotName: '',
            carNumber: ''
        });

    const handleEnterClick = async (parkingLotName, carNumber, jwtToken) => {
        try{
            const response = await axios.patch(`http://3.38.97.205:3000/admin/book/enter`, enterForm, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            alert('입차되었습니다.')
        }catch (error){
            if(error.response && error.response.status === 400){
                alert(error.response.data.result.resultDescription)
            }else{
                console.error('Cancle 요청 에러:', error)
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnterForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <>
            <div className="centered-container" >
                <h1 className="title">차량 입차</h1>

                <div >
                    <input
                        type="text"
                        name="parkingLotName"
                        value={enterForm.parkingLotName}
                        onChange={handleInputChange}
                        placeholder="주차장 이름을 입력하세요."
                        className="content"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="carNumber"
                        value={enterForm.carNumber}
                        onChange={handleInputChange}
                        placeholder="차번호를 입력하세요."
                        className="content"
                    />
                </div>

                <button onClick={()=>handleEnterClick()} className="enterButton"> 입차 </button>
            </div>
        </>
    );
};

export default AdminEnterPage;