import React, { useState, useContext } from "react";
import AuthContext from "../hooks/AuthContext";
import "./AdminEnterPage.css";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import CalculateCost from "../components/CalculateCost.js"
import {
  Tabs,
  Tab,
} from "@mui/material";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const AdminEnterPage = () => {
    const { token } = useContext(AuthContext);
    const [tab, setTab] = useState(0);
    const [enterForm, setEnterForm] = useState({
        parkingLotName: '',
        carNumber: ''
    });
    const [outForm, setOutForm] = useState({
        parkingLotName: '',
        carNumber: ''
    });
    const theme = createTheme({
        palette: {
          primary: {
            main: "#FC6C00", // 차분한 주황색으로 변경
          },
        },
     });

    const handleEnterClick = async (parkingLotName, carNumber, jwtToken) => {
        try{
            await axios.patch(API_BASE_URL + `/admin/book/enter`, enterForm, {
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

    const handleOutClick = async (parkingLotName, carNumber, jwtToken) => {
        try{
            const response = await axios.patch(API_BASE_URL + `/admin/book/out`, outForm, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            var cost = CalculateCost(
                            30,
                            15,
                            2000,
                            500,
                            25000,
                            moment(response.data.body.enterTime, 'YYYY-MM-DD HH:mm'),
                            moment()
                        )
            cost = cost - response.data.body.price
            console.log(cost)
            if(cost > 0){
                alert(`초과 비용은 ${cost}원입니다.`)
            }
            else{
                alert('출차되었습니다.')
            }
        }catch (error){
            if(error.response && error.response.status === 400){
                alert(error.response.data.result.resultDescription)
            }else{
                console.error('Cancle 요청 에러:', error)
            }
        }
    }

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    }

    const handleEnterFormChange = (e) => {
        const { name, value } = e.target;
        setEnterForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleOutFormChange = (e) => {
        const { name, value } = e.target;
        setOutForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="centered-container" >
                <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
                    <Tab style={{ wordBreak: "keep-all" }} label="차량 입차" />
                    <Tab style={{ wordBreak: "keep-all" }} label="차량 출차" />
                </Tabs>

                {tab === 0 ? (
                    <div>
                        <h1 className="title">차량 입차</h1>

                        <div>
                            <input
                                type="text"
                                name="parkingLotName"
                                value={enterForm.parkingLotName}
                                onChange={handleEnterFormChange}
                                placeholder="주차장 이름을 입력하세요."
                                className="content"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="carNumber"
                                value={enterForm.carNumber}
                                onChange={handleEnterFormChange}
                                placeholder="차번호를 입력하세요."
                                className="content"
                            />
                        </div>

                        <button onClick={()=>handleEnterClick()} className="enterButton"> 입차 </button>

                    </div>
                ) : (
                    <div>
                        <h1 className="title">차량 출차</h1>

                        <div >
                            <input
                                type="text"
                                name="parkingLotName"
                                value={outForm.parkingLotName}
                                onChange={handleOutFormChange}
                                placeholder="주차장 이름을 입력하세요."
                                className="content"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="carNumber"
                                value={outForm.carNumber}
                                onChange={handleOutFormChange}
                                placeholder="차번호를 입력하세요."
                                className="content"
                            />
                        </div>

                        <button onClick={()=>handleOutClick()} className="enterButton"> 출차 </button>

                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default AdminEnterPage;