import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import "./ParkingList.css";
import { API_BASE_URL } from "../constants";
import axios from "axios";

const ParkingList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const filteredData = searchResults.filter(
    (parking) => parking.deleteFlag !== true
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_BASE_URL + `/admin/parkinglots/search?name=${searchTerm}`
      );
      if (response) {
        const data = await response.data;
        setSearchResults(data);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFullSearch = async () => {
    setSearchTerm("");
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL + `/admin/parkinglots`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("admin parking data error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_BASE_URL + `/admin/parkinglots`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("admin parking data error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="parkingSearchContainer">
        <div>
          <input
            type="text"
            placeholder="주차장 이름을 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="parkingSearch"
          />
          <button className="parkingSearchBtn" onClick={handleSearch}>
            검색
          </button>
        </div>
        {loading && <div className="parkingLoadText">불러오는 중입니다.</div>}
        <button className="parkingFullBtn" onClick={handleFullSearch}>
          전체 리스트 보기
        </button>
      </div>
      <div className="parkingList">
        {currentItems.map((item, index) => (
          <Link
            key={index}
            to={`/admin/parking/${item.parkingId}`}
            className="parkingContainer"
          >
            <div className="parkingName">{item.name}</div>
            <div className="parkingAddress">{item.address}</div>
          </Link>
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ParkingList;
