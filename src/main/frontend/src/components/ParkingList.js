import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import styles from "./ParkingList.module.css";
import { API_BASE_URL } from "../constants";
import axios from "axios";

const ParkingList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("주차장");
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
        setSearchTerm("");
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        API_BASE_URL +
          `/admin/parkinglots/searchaddress?address=${searchAddress}`
      );
      if (response) {
        const data = await response.data;
        setSearchResults(data);
        setSearchAddress("");
      } else {
        console.error("Failed to fetch search address results");
      }
    } catch (error) {
      console.error("Error during search address:", error);
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
      <div className={styles.parkingSearchContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.selectKeyword}>
            <label>검색 범위</label>
            <select
              className={styles.select}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            >
              <option value="주차장">주차장명</option>
              <option value="주소">주소</option>
            </select>
          </div>
          {searchKeyword === "주차장" ? (
            <>
              <input
                type="text"
                placeholder="주차장 이름을 입력하세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.parkingSearch}
              />
              <button
                className={styles.parkingSearchBtn}
                onClick={handleSearch}
              >
                검색
              </button>
            </>
          ) : (
            <></>
          )}

          {searchKeyword === "주소" ? (
            <>
              <input
                type="text"
                placeholder="주소를 입력하세요."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className={styles.parkingSearch}
              />
              <button
                className={styles.parkingSearchBtn}
                onClick={handleSearchAddress}
              >
                검색
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {loading && (
          <div className={styles.parkingLoadText}>불러오는 중입니다.</div>
        )}
        <button className={styles.parkingFullBtn} onClick={handleFullSearch}>
          전체 리스트 보기
        </button>
      </div>
      {searchResults.length === 0 ? (
        <>
          <div className={styles.noneParking}>일치하는 주차장이 없습니다.</div>
        </>
      ) : (
        <>
          <div className={styles.parkingList}>
            {currentItems.map((item, index) => (
              <Link
                key={index}
                to={`/admin/parking/${item.parkingId}`}
                exact
                className={styles.parkingContainer}
              >
                <div>
                  <div className={styles.parkingName}>{item.name}</div>
                  <div className={styles.parkingAddress}>{item.address}</div>
                </div>
                <div className={styles.isActive}>
                  {item.is_active === "1" ? (
                    <div className={styles.parkingDetailIsActive}>운영중</div>
                  ) : (
                    <div className={styles.parkingDetailIsNotActive}>
                      운영 예정
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <Pagination
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ParkingList;
