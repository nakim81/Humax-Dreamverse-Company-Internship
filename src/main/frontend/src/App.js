import { Routes, Route } from "react-router-dom";
import CarPage from "./pages/CarPage";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import BookPage from "./pages/BookPage";
import PayPage from "./pages/PayPage";
import ParkinglotPage from "./pages/ParkinglotPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
      <>
        <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<MyPage />} path="/user/:userId/mypage"/>
            <Route element={<BookPage />} path="/user/:userId/book"/>
            <Route element={<CarPage />} path="/user/:userId/car"/>
            <Route element={<PayPage />} path="/user/:userId/pay"/>
            <Route element={<ParkinglotPage />} path="/user/:userId/parkinglot"/>
            <Route element={<SignUpPage />} path="/signup"/>
            <Route element={<LoginPage />} path="/login"/>
        </Routes>
      </>
  );
}

export default App;