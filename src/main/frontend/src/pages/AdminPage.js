import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./Adminpage.css";
import axios from "axios";
import ParkingList from "../components/ParkingList";

const AdminPage = () => {
    const navigate = useNavigate();
    const [parkingData, setParkingData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/parkinglots`)
                setParkingData(res.data)
            } catch (err) {
                console.error('admin parking data error', err)
            }
        }

        fetchData();
    }, []);

    const handleParkingAddBtnClick = () => {
        navigate('/admin/parking/add')
    }

    return (
        <div className="adminPage">
            <div className="adminHeader">
                <h1>관리자 페이지</h1>
                <button
                    className="parkingAddBtn"
                    onClick={handleParkingAddBtnClick}
                >주차장 등록</button>
            </div>
            <div className="adminBody">
                <div className="parkingListContainer">
                    <ParkingList data={parkingData} />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;