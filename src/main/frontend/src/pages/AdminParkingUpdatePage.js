import React, { useCallback, useEffect, useState } from "react";
import "./AdminParkingAddPage.css";
import { Form } from "react-bootstrap";
import axios from "axios";
import AddressPost from "../components/AddressPost";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API_BASE_URL } from "../constants";
import AdminSideBar from "../components/AdminSideBar";

const AdminParkingUpdatePage = () => {
  const navigate = useNavigate();
  const { parkingId } = useParams();
  const [parkingInfo, setParkingInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + `/admin/parkinglots/${parkingId}`
        );
        setParkingInfo(res.data);
      } catch (err) {
        console.error("admin parking data error", err);
      }
    };

    fetchData();
  }, [parkingId]);

  const [isAddressPostOpen, setAddressPostOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleAddressComplete = (data) => {
    setParkingInfo((prevInfo) => ({
      ...prevInfo,
      address: data.address,
    }));
    handleOpenAddressPost();
  };

  const handleOpenAddressPost = useCallback(() => {
    setAddressPostOpen((isAddressPostOpen) => !isAddressPostOpen);
    setSearchKey((prevKey) => prevKey + 1);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
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
        )}&key=${process.env.REACT_APP_GOOGLE_APP_KEY}`
      );

      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { lat, lon: lng };
      } else {
        console.error("Google Maps API returned no results.");
      }
    } catch (error) {
      console.error("Error fetching Google Maps API:", error);
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
    }));

    handleOnAddModalClick();
  };

  const handleOnAddModalClick = () => {
    setAddModalOpen((isAddModalOpen) => !isAddModalOpen);
  };

  const handleParkingSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        API_BASE_URL + `/admin/parkinglots/${parkingId}`,
        parkingInfo
      );

      setAddModalOpen((isAddModalOpen) => !isAddModalOpen);
      navigate(`/admin/parking/${parkingId}`);
    } catch (error) {
      console.error("Error posting data to API:", error);
    }
  };

  const renderFormGroup = (
    label,
    name,
    type,
    required,
    disabled,
    placeholder = ""
  ) => {
    const inputProps = {
      type: type,
      placeholder: placeholder || `${label}(을/를) 입력하세요.`,
      name: name,
      value: parkingInfo[name],
      onChange: handleChange,
      required: required === true,
      disabled: disabled === true,
      className: "parkingFormControl",
    };

    return (
      <Form.Group
        className="parkingFormInput"
        controlId={`form${name}`}
        key={name}
      >
        <Form.Label className="parkingFormLabel">{label}</Form.Label>
        {type === "checkbox" ? (
          <Form.Check
            type={type}
            label={label}
            name={name}
            checked={parkingInfo[name] === "1"}
            onChange={handleChange}
          />
        ) : (
          <Form.Control {...inputProps} />
        )}
      </Form.Group>
    );
  };

  return (
    <>
      <AdminSideBar />
      <div className="AdminParkingAddPage">
        <div className="APAHeader">
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            className="parkingArrowBackIcon"
          />
        </div>
        <div className="APABody">
          <Form onSubmit={handleSubmit} className="parkingForm">
            {renderFormGroup("코드 넘버 *", "codeNumber", "text", true)}
            {renderFormGroup("주차장 이름 *", "name", "text", true)}
            <Form.Group className="parkingFormInput" controlId="formAddress">
              <Form.Label className="parkingFormLabel">
                주소 *{" "}
                <button
                  onClick={handleOpenAddressPost}
                  className="addressPostBtn"
                >
                  주소찾기
                </button>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="주소(을/를) 입력하세요."
                name="address"
                value={parkingInfo.address}
                onChange={handleChange}
                required
                disabled
                className="parkingFormControl"
              />
              <AddressPost
                key={searchKey}
                isOpen={isAddressPostOpen}
                onComplete={handleAddressComplete}
                onClose={handleOpenAddressPost}
              />
            </Form.Group>
            {renderFormGroup("운영 시간 *", "operatingTime", "text", true)}
            {renderFormGroup("성수기 가격", "normalSeason", "text")}
            {renderFormGroup("비수기 가격", "tenantSeason", "text")}
            {renderFormGroup("시간권 가격", "timeTicket", "text")}
            {renderFormGroup("일일권 가격", "dayTicket", "text")}
            {renderFormGroup("휴일 일일권 가격", "specialDay", "text")}
            {renderFormGroup("휴일 주간 가격", "specialHour", "text")}
            {renderFormGroup("휴일 야간 가격", "specialNight", "text")}
            {renderFormGroup("휴일 주말 가격", "specialWeekend", "text")}
            {renderFormGroup("일일권 승인 날짜", "applyDay", "text")}
            {renderFormGroup("시간권 승인 날짜", "applyHour", "text")}
            {renderFormGroup("야간권 승인 날짜", "applyNight", "text")}
            {renderFormGroup("주말권 승인 날짜", "applyWeekend", "text")}
            {renderFormGroup("현재 운영 중", "is_active", "checkbox")}
            {renderFormGroup("참고 사항", "operation", "text")}
            {renderFormGroup("시간", "time", "text")}
            {renderFormGroup("가격", "price", "text")}
            <button type="submit" className="parkingFormAddBtn">
              등록
            </button>
          </Form>
        </div>

        {isAddModalOpen && (
          <div>
            <div className="modalOverlay" onClick={handleOnAddModalClick}>
              <div
                className="modalContent"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modalContentHeader"></div>
                <div className="modalContentBody">수정하시겠습니까?</div>
                <div className="modalContentFooter">
                  <button
                    type="text"
                    className="modalCloseBtn"
                    onClick={handleOnAddModalClick}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="modalDeleteBtn"
                    onClick={handleParkingSubmit}
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminParkingUpdatePage;
