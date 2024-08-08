import React from "react";
import { assets } from "../../assets/assets";
import "./Sidebaar.css";
import { NavLink } from "react-router-dom";

const Sidebaar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/card-details" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Card Details</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebaar;
