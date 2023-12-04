import { Routes, Route } from "react-router-dom";
import CarPage from "./pages/CarPage";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import BookPage from "./pages/BookPage";
import BookListPage from "./pages/BookListPage";
import PayPage from "./pages/PayPage";
import ParkinglotPage from "./pages/ParkinglotPage";
import AdminPage from "./pages/AdminPage";
import AdminParkingDetailPage from "./pages/AdminParkingDetailPage";
import AdminParkingAddPage from "./pages/AdminParkingAddPage";
import AdminParkingUpdatePage from "./pages/AdminParkingUpdatePage";
import AdminEnterPage from "./pages/AdminEnterPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<MyPage />} path="/user/:userId/mypage"/>
            <Route element={<BookPage />} path="/user/book/:parkingId"/>
            <Route element={<BookListPage />} path="/user/booklist"/>
            <Route element={<CarPage />} path="/user/car"/>
            <Route element={<PayPage />} path="/user/:userId/pay"/>
            <Route element={<ParkinglotPage />} path="/user/parkinglot"/>
            <Route element={<AdminPage />} path="/admin" />
            <Route element={<AdminParkingDetailPage />} path="/admin/parking/:parkingId" />
            <Route element={<AdminParkingAddPage />} path="/admin/parking/add" />
            <Route element={<AdminParkingUpdatePage />} path="/admin/parking/update/:parkingId" />
            <Route element={<AdminEnterPage />} path="/admin/enter"/>
            <Route element={<SignUpPage />} path="/signup"/>
            <Route element={<LoginPage />} path="/login"/>
        </Routes>
      </>
  );
}

export default App;
