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
import AdminUserPage from "./pages/AdminUserPage";
import FavoritesPage from "./pages/FavoritesPage";
import ParkingDetailPage from "./pages/ParkingDetailPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<MyPage />} path="/user/mypage" />
        <Route element={<BookPage />} path="/user/book/:parkingId" />
        <Route element={<BookListPage />} path="/user/booklist" />
        <Route element={<CarPage />} path="/user/car" />
        <Route element={<PayPage />} path="/user/pay" />
        <Route element={<ParkinglotPage />} path="/user/parkinglot" />
        <Route element={<AdminPage />} path="/admin" />
        <Route
          element={<AdminParkingDetailPage />}
          path="/admin/parking/:parkingId"
        />
        <Route element={<AdminParkingAddPage />} path="/admin/parking/add" />
        <Route
          element={<AdminParkingUpdatePage />}
          path="/admin/parking/update/:parkingId"
        />
        <Route element={<AdminEnterPage />} path="/admin/enter" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<AdminUserPage />} path="/admin/user" />
        <Route element={<FavoritesPage />} path="/user/favorites" />
        <Route
          element={<ParkingDetailPage />}
          path="/user/parkinglot/:parkingId"
        />
      </Routes>
    </>
  );
}

export default App;
