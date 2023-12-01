import React, { useState } from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import "./ParkingList.css"

const ParkingList = ({ data }) => {
    const filteredData = data.filter((parking) => (parking.deleteFlag !== true));

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = searchTerm
        ? filteredData.filter((parking) =>
            parking.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredData.slice(offset, offset + itemsPerPage);

    return (
        <div>
            <div className="parkingSearchContainer">
                <input
                    type="text"
                    placeholder="주차장 이름을 입력하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="parkingSearch"
                />
            </div>
            <div className="parkingList">
                {currentItems
                    .map((item, index) => (
                        <Link key={index} to={`/admin/parking/${item.parkingId}`} className="parkingContainer">
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