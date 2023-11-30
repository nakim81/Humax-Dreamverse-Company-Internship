import { Routes, Route } from "react-router-dom";
import CarPage from "./pages/CarPage";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import BookPage from "./pages/BookPage";
import BookListPage from "./pages/BookListPage";
import ParkinglotPage from "./pages/ParkinglotPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
      <>
        <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<MyPage />} path="/user/:userId/mypage"/>
            <Route element={<BookPage />} path="/user/:userId/book/:parkingId"/>
            <Route element={<BookListPage />} path="/user/:userId/booklist"/>
            <Route element={<CarPage />} path="/user/:userId/car"/>
            <Route element={<BookPage />} path="/user/:userId/pay"/>
            <Route element={<ParkinglotPage />} path="/user/:userId/parkinglot"/>
            <Route element={<SignUpPage />} path="/signup"/>
            <Route element={<LoginPage />} path="/login"/>
        </Routes>
      </>
  );
}

export default App;