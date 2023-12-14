import React, { useEffect, useState } from "react";
import "./AdminUserPage.css";
import axios from "axios";
import {API_BASE_URL} from "../constants";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_BASE_URL + `/admin/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("admin user data error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="adminUserPage">
        <div className="adminUserPageContainer">
          <div className="adminUserPageHeader">
            <h1>사용자 관리</h1>
          </div>
          <div className="adminUserPageBody">
            <table border="1" className="userTable">
              <thead>
                <tr className="userTable_tr">
                  <th> </th>
                  <th>ID</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId} className="userTable_body_tr">
                    <td>{user.userId}</td>
                    <td>{user.id}</td>
                    <td>{user.phoneNum}</td>
                    <td>{user.email}</td>
                    <td>{user.admin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
