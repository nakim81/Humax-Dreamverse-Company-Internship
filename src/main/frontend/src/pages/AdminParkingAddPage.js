import React, {useCallback, useState} from "react";
import "./AdminParkingAddPage.css"
import { Form } from 'react-bootstrap';
import axios from "axios";
import AddressPost from "../components/AddressPost";

const AdminParkingAddPage = () => {
    const [parkingInfo, setParkingInfo] = useState({
        codeNumber: '',
        name: '',
        address: '',
        operatingTime: '',
        normalSeason: '',
        tenantSeason: '',
        timeTicket: '',
        dayTicket: '',
        specialDay: '',
        specialHour: '',
        specialNight: '',
        specialWeekend: '',
        applyDay: '',
        applyHour: '',
        applyNight: '',
        applyWeekend: '',
        is_active: 0,
        operation: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        lat: '',
        lon: '',
        time: '',
        price: '',
    });

    const [isAddressPostOpen, setAddressPostOpen] = useState(false);
    const [searchKey, setSearchKey] = useState(0);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleAddressComplete = (data) => {
        setParkingInfo((prevInfo) => ({
            ...prevInfo,
            address: data.address
        }));
        handleOpenAddressPost()
    }

    const handleOpenAddressPost = useCallback(() => {
        setAddressPostOpen((isAddressPostOpen) =>  !isAddressPostOpen);
        setSearchKey((prevKey) => prevKey + 1);
    }, [isAddressPostOpen]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
        setParkingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: newValue,
        }));
    };

    const getCoordinates = async (address) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=AIzaSyDGesdIMmYT3gPJsNOhTM76b0Qk4WN7N-E`
            );

            const { results } = response.data;
            if (results && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                return { lat, lon:lng };
            } else {
                console.error('Google Maps API returned no results.');
            }
        } catch (error) {
            console.error('Error fetching Google Maps API:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const coordinates = await getCoordinates(parkingInfo.address);

        setParkingInfo((prevInfo) => ({
            ...prevInfo,
            lat: coordinates.lat,
            lon: coordinates.lon,
        }))

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
        setParkingInfo((prevInfo) => ({
            ...prevInfo,
            createdAt: formattedDate,
        }));

        handleOnAddModalClick()

    };

    const handleOnAddModalClick = () => {
        setAddModalOpen((isAddModalOpen) =>  !isAddModalOpen);
    }

    const handleParkingSubmit = async (e) => {
        e.preventDefault()


        try {
            await axios.post(
                "http://localhost:8080/admin/parkinglots",
                parkingInfo
            );

            setAddModalOpen((isAddModalOpen) =>  !isAddModalOpen);
        } catch (error) {
            console.error("Error posting data to API:", error);
        }
    }

    return (
        <>
            <div className="AdminParkingAddPage">
                <div className="APAHeader">
                    <h1>주차장 등록</h1>
                </div>
                <div className="APABody">
                    <Form onSubmit={handleSubmit} className="parkingForm">
                        <Form.Group className="parkingFormInput" controlId="formCodeNumber">
                            <Form.Label className="parkingFromLabel">코드 넘버 *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="코드 넘버를 입력하세요."
                                name="codeNumber"
                                value={parkingInfo.codeNumber}
                                onChange={handleChange}
                                required
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formName">
                            <Form.Label className="parkingFromLabel">주차장 이름 *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="주차장 이름을 입력하세요."
                                name="name"
                                value={parkingInfo.name}
                                onChange={handleChange}
                                required
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formAddress">
                            <Form.Label className="parkingFromLabel">주소 *</Form.Label>
                            <button
                                onClick={handleOpenAddressPost}
                                className="addressPostBtn"
                            >주소찾기</button>
                            <Form.Control
                                type="text"
                                placeholder="주소를 입력하세요."
                                name="address"
                                value={parkingInfo.address}
                                onChange={handleChange}
                                required
                                disabled
                                className="parkingFromControl"
                            />
                            <AddressPost
                                key={searchKey}
                                isOpen={isAddressPostOpen}
                                onComplete={handleAddressComplete}
                                onClose={handleOpenAddressPost}
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formOperatingTime">
                            <Form.Label className="parkingFromLabel">운영 시간 *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="운영 시간을 입력하세요."
                                name="operatingTime"
                                value={parkingInfo.operatingTime}
                                onChange={handleChange}
                                required
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formNormalSeason">
                            <Form.Label className="parkingFromLabel">Normal Season 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Normal Season 가격을 입력하세요."
                                name="normalSeason"
                                value={parkingInfo.normalSeason}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formTenantSeason">
                            <Form.Label className="parkingFromLabel">Tenant Season 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tenant Season 가격을 입력하세요."
                                name="tenantSeason"
                                value={parkingInfo.tenantSeason}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formTimeTicket">
                            <Form.Label className="parkingFromLabel">Time Ticket</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Time Ticket 가격을 입력하세요."
                                name="timeTicket"
                                value={parkingInfo.timeTicket}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formDayTicket">
                            <Form.Label className="parkingFromLabel">Day Ticket</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Day Ticket 가격을 입력하세요."
                                name="dayTicket"
                                value={parkingInfo.dayTicket}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formSpecialDay">
                            <Form.Label className="parkingFromLabel">Special Day 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Special Day 가격을 입력하세요."
                                name="specialDay"
                                value={parkingInfo.specialDay}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formSpecialHour">
                            <Form.Label className="parkingFromLabel">Special Hour 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Special Hour 가격을 입력하세요."
                                name="specialHour"
                                value={parkingInfo.specialHour}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formSpecialNight">
                            <Form.Label className="parkingFromLabel">Special Night 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Special Night 가격을 입력하세요."
                                name="specialNight"
                                value={parkingInfo.specialNight}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formSpecialWeekend">
                            <Form.Label className="parkingFromLabel">Special Weekend 가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Special Weekend 가격을 입력하세요."
                                name="specialWeekend"
                                value={parkingInfo.specialWeekend}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formApplyDay">
                            <Form.Label className="parkingFromLabel">Apply Day</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apply Day 가격을 입력하세요."
                                name="applyDay"
                                value={parkingInfo.applyDay}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formApplyHour">
                            <Form.Label className="parkingFromLabel">Apply Hour</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apply Hour 가격을 입력하세요."
                                name="applyHour"
                                value={parkingInfo.applyHour}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formApplyNight">
                            <Form.Label className="parkingFromLabel">Apply Night</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apply Night 가격을 입력하세요."
                                name="applyNight"
                                value={parkingInfo.applyNight}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formApplyWeekend">
                            <Form.Label className="parkingFromLabel">Apply Weekend</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apply Weekend 가격을 입력하세요."
                                name="applyWeekend"
                                value={parkingInfo.applyWeekend}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formIsActive">
                            <Form.Check
                                type="checkbox"
                                label="현재 운영 중"
                                name="is_active"
                                checked={parkingInfo.is_active === 1}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formOperation">
                            <Form.Label className="parkingFromLabel">Operation</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Operation을 입력하세요."
                                name="operation"
                                value={parkingInfo.operation}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formTime">
                            <Form.Label className="parkingFromLabel">시간</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="시간을 입력하세요."
                                name="time"
                                value={parkingInfo.time}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>

                        <Form.Group className="parkingFormInput" controlId="formPrice">
                            <Form.Label className="parkingFromLabel">가격</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="가격을 입력하세요."
                                name="price"
                                value={parkingInfo.price}
                                onChange={handleChange}
                                className="parkingFromControl"
                            />
                        </Form.Group>


                        <button type="submit" className="parkingFormAddBtn">
                            등록
                        </button>
                    </Form>
                </div>

                {isAddModalOpen && (
                    <div>
                        <div className="modalOverlay" onClick={handleOnAddModalClick}>
                            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                                <div className="modalContentHeader">
                                </div>
                                <div className="modalContentBody">
                                    등록하시겠습니까?
                                </div>
                                <div className="modalContentFooter">
                                    <button
                                        type="text"
                                        className="modalCloseBtn"
                                        onClick = {handleOnAddModalClick}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="modalDeleteBtn"
                                        onClick = {handleParkingSubmit}
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
};

export default AdminParkingAddPage;