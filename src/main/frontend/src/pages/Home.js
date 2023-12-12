// import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroImage from "../assets/home-bg.jpg";

const Home = () => {
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   }
  // }, []);

  return (
    <>
      <img src={HeroImage} alt="first page" style={{width: "100%"}}/>
    </>
  );
};

export default Home;
