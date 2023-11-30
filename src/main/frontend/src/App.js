import { Routes, Route } from "react-router-dom";
import CarPage from "./pages/CarPage";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import BookPage from "./pages/BookPage";
import ParkinglotPage from "./pages/ParkinglotPage";
import AdminPage from "./pages/AdminPage";
import AdminParkingDetailPage from "./pages/AdminParkingDetailPage";
import AdminParkingAddPage from "./pages/AdminParkingAddPage";
import AdminParkingUpdatePage from "./pages/AdminParkingUpdatePage";

function App() {

  return (
      <>
        <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<UserPage />} path="/user/:userId"/>
            <Route element={<BookPage />} path="/user/:userId/book"/>
            <Route element={<CarPage />} path="/user/:userId/car"/>
            <Route element={<BookPage />} path="/user/:userId/pay"/>
            <Route element={<ParkinglotPage />} path="/user/:userId/parkinglot"/>
            <Route element={<AdminPage />} path="/admin" />
            <Route element={<AdminParkingDetailPage />} path="/admin/parking/:parkingId" />
            <Route element={<AdminParkingAddPage />} path="/admin/parking/add" />
            <Route element={<AdminParkingUpdatePage />} path="/admin/parking/update/:parkingId" />
        </Routes>
      </>
  );
}

export default App;