import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    setLoading(true); // Show spinner
    setBlur(true); // Blur the page

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          setLoading(false); // Hide spinner
          setBlur(false); // Remove blur effect
          setShowLogin(false);
        }, 2000);
      } else {
        alert(
          response.data.message || "An error occurred during login/signup."
        );
        setLoading(false); // Hide spinner
        setBlur(false); // Remove blur effect
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during login/signup.");
      setLoading(false); // Hide spinner
      setBlur(false); // Remove blur effect
    }
  };

  return (
    <div className={`login-popup ${blur ? "blur" : ""}`}>
      <form action="" onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          )}
          <input
            type="text"
            placeholder="Your Email"
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
