import { IoBagHandleSharp } from "react-icons/io5";
import React, { useContext, useState } from "react";
import "./Navbar.css";  // Assuming styles are still in a CSS file
import { assets } from "../../assets/assets";
import {
  FaShoppingBasket,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaShoppingBag,
  FaBars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin, setCategory }) {
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}  // Show dropdown on hover
          onMouseLeave={() => setDropdownOpen(false)} // Hide dropdown when not hovering
        >
          <button className="dropdown-toggle">

          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/"
                onClick={() => {
                  setMenu("home");
                  setDropdownOpen(false);
                }}
                className={menu === "home" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={() => {
                  setMenu("explore");
                  setCategory("All");
                  setDropdownOpen(false);
                }}
                className={menu === "explore" ? "active" : ""}
              >
                Explore
              </Link>
              <Link
                to="/footer"
                onClick={() => {
                  setMenu("help");
                  setDropdownOpen(false);
                }}
                className={menu === "help" ? "active" : ""}
              >
                Help
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="logo-container">
        <Link
          to="/"
          onClick={() => setShowCategory && setShowCategory(!showCategory)}
        >
          <img src={assets.logo1} alt="Logo" className="logo" />
        </Link>
        <div className="navbar-dropdown-container">
          <ul className="navbar-menu">
            <li>
              <Link
                to="/explore"
                onClick={() => {
                  setMenu("men");
                  setCategory("Men");
                }}
                className={menu === "men" ? "active" : ""}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                onClick={() => {
                  setMenu("women");
                  setCategory("Women");
                }}
                className={menu === "women" ? "active" : ""}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                onClick={() => {
                  setMenu("kids");
                  setCategory("Kids");
                }}
                className={menu === "kids" ? "active" : ""}
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                onClick={() => {
                  setMenu("homestop");
                  setCategory("Homestop");
                }}
                className={menu === "homestop" ? "active" : ""}
              >
                Homestop
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-cart">
          <Link to="/cart">
            <IoBagHandleSharp size={25} />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            <FaUser size={25} />
          </button>
        ) : (
          <div className="navbar-profile">
            <FaUser size={25} />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <FaShoppingBag size={20} />
              </li>
              <hr />
              <li onClick={logout}>
                <FaSignOutAlt size={20} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
