import React, { useState } from "react";
import "./style/search.css";
import axios from "axios";
import { setCurrPincode, setData } from "./store/dataSlice";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pin.length !== 6) {
      setError("The postal code must be 6 digits long.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = res.data;

      if (data[0].Status !== "Success") {
        setError(data[0].Message);
        setLoading(false);
        return;
      }

      dispatch(setData({ data: data[0] }));
      dispatch(setCurrPincode({ pin }));
      navigate("/display");
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      {!loading && (
        <>
          <h1>Enter Pincode</h1>
          <form id="search-form" onSubmit={handleSubmit}>
            <input
              type="number"
              name="pin"
              onChange={(e) => setPin(e.target.value)}
              id="pin"
              value={pin}
              placeholder="Enter Pincode"
            />
            <button type="submit" disabled={loading}>
              Look Up
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </>
      )}
      {loading && (
        <div className="loader center">
          <TailSpin
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
