import React, { useState } from "react";
import "./PasswordPrompt.css"; // Import the CSS file

const PASSWORD = "1234@4321"; // Password you want to use

const PasswordPrompt = ({ onAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      onAuthenticated();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="background-container">
      <div className="form-container">
        <h2 className="title">Enter Password</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
