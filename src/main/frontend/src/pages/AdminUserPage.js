import React, { useEffect, useState } from "react";
import styles from "./AdminUserPage.module.css";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import AdminSideBar from "../components/AdminSideBar";
import Pagination from "../components/Pagination";

const AdminUserPage = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentUsers = users.slice(offset, offset + itemsPerPage);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL + `/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("admin user data error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (userId) => {
    try {
      await axios.patch(API_BASE_URL + `/admin/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error("Error patch data to admin add API:", error);
    }
  };

  const handleCheckboxChange = (userId, isChecked) => {
    if (isChecked) {
      setCheckedUsers((prev) => [...prev, userId]);
      return;
    }

    if (!isChecked && checkedUsers.includes(userId)) {
      setCheckedUsers(checkedUsers.filter((item) => item !== userId));
      return;
    }
    return;
  };

  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    handleCheckboxChange(value, e.target.checked);
  };

  const handleDeleteSubmit = async (checkedUsers) => {
    try {
      for (const userId of checkedUsers) {
        await axios.delete(API_BASE_URL + `/admin/withdraw/${userId}`);
        console.log("success");
      }
      fetchData();
    } catch (error) {
      console.error("Error delete data to admin delete API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminSideBar />
      <div className={styles.adminUserPage}>
        <div className={styles.adminUserPageContainer}>
          <div className={styles.adminUserPageHeader}>
            <div className={styles.headerText}>사용자 관리</div>
          </div>
          {loading && <div className={styles.loadText}>불러오는 중입니다.</div>}
          <div className={styles.adminUserPageBody}>
            <table border="1" className={styles.userTable}>
              <thead>
                <tr className={styles.userTable_tr}>
                  <th> </th>
                  <th>ID</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.userId} className={styles.userTable_body_tr}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedUsers.includes(user.id)}
                        onChange={(e) => checkHandler(e, user.id)}
                      />
                    </td>
                    <td>{user.id}</td>
                    <td>{user.phoneNum}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.admin ? (
                        <div>
                          YES
                          <button
                            className={styles.adminXBtn}
                            onClick={() => handleAdminSubmit(user.id)}
                          >
                            권한 삭제
                          </button>
                        </div>
                      ) : (
                        <div>
                          NO
                          <button
                            className={styles.adminOBtn}
                            onClick={() => handleAdminSubmit(user.id)}
                          >
                            권한 부여
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            pageCount={Math.ceil(users.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
          <div className={styles.footer}>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDeleteSubmit(checkedUsers)}
            >
              선택한 회원 삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
