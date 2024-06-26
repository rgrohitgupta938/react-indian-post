import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import Display from "./Display";
import "./style/App.css";

const App = () => {
  const pin = useSelector((state) => state.data.currPincode);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pin) {
      navigate("/");
    }
  }, [pin, navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Search />} />
        {pin && <Route path="/display" element={<Display />} />}
      </Routes>
    </div>
  );
};

export default App;
