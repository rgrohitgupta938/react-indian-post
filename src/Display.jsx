import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style/display.css";
import logo from "./img/Vector.svg";

const Display = () => {
  const [filter, setFilter] = useState("");
  const pin = useSelector((state) => state.data.currPincode);
  const pincodes = useSelector((state) => state.data.pincodes);
  console.log(pin, pincodes);
  const { Message, Status, PostOffice } = pincodes;
  console.log(Message, PostOffice);

  const filteredPostOffices = PostOffice.filter((p) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      p.Name.toLowerCase().includes(lowerCaseFilter) ||
      p.District.toLowerCase().includes(lowerCaseFilter) ||
      p.BranchType.toLowerCase().includes(lowerCaseFilter) ||
      p.Division.toLowerCase().includes(lowerCaseFilter) ||
      p.DeliveryStatus.toLowerCase() === lowerCaseFilter
    );
  });

  return (
    <div className="display">
      <p className="pin">Pincode: {pin}</p>
      <p className="pin">
        Message : <span className="mess">{Message}</span>
      </p>
      <div className="filter">
        <img className="logo" src={logo} alt="Search Icon" />
        <input
          type="text"
          name="filter"
          value={filter}
          id="filter"
          placeholder="Filter"
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="post-offices">
        {filteredPostOffices.length > 0 ? (
          filteredPostOffices.map((p, inx) => {
            const { Name, DeliveryStatus, BranchType, District, Division } = p;
            return (
              <div key={inx} className="card">
                <p>Name: {Name}</p>
                <p>Branch Type: {BranchType}</p>
                <p>Delivery Status: {DeliveryStatus}</p>
                <p>District: {District}</p>
                <p>Division: {Division}</p>
              </div>
            );
          })
        ) : (
          <p className="error-message">Couldn’t find the postal data you’re looking for…</p>
        )}
      </div>
    </div>
  );
};

export default Display;
