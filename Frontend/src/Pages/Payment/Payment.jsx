import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { FaCcVisa, FaCcMastercard, FaCcDiscover } from "react-icons/fa";

function Payment() {
  const { getTotalCartAmount, url, discountAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount =
    Number(location.state?.totalAmount) ||
    getTotalCartAmount() + 30 - discountAmount;

  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
    otp: "",
  });

  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    const paymentDetails = {
      ...paymentData,
      amount: totalAmount,
    };

    try {
      const response = await axios.post(
        `${url}/api/payment/pay`,
        paymentDetails
      );
      setLoading(false);

      if (response.data.success) {
        setOtpRequested(true);
        showNotification("OTP sent successfully!", "success");
      } else {
        showNotification(
          response.data.message || "Error requesting OTP",
          "error"
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error requesting OTP:", error);
      showNotification("Error requesting OTP", "error");
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (otpRequested) {
      showNotification(
        "Please request OTP before submitting the payment.",
        "error"
      );
      setLoading(false);
      return;
    }

    const paymentDetails = {
      ...paymentData,
      amount: totalAmount,
    };

    try {
      const response = await axios.post(
        `${url}/api/payment/pay`,
        paymentDetails
      );

      setTimeout(() => {
        setLoading(false);

        if (response.data.success) {
          showNotification("Payment Successful", "success");
          setTimeout(() => {
            navigate("/payment");
          }, 1000);
        } else {
          showNotification(response.data.message || "Payment Error", "error");
        }
      }, 60000);
    } catch (error) {
      setLoading(false);
      console.error("Error processing payment:", error);
      showNotification("Error processing payment", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleCodClick = () => {
    showNotification("Cash on Delivery is not available.", "error");
  };

  return (
    <div className="payment-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handlePayment} className="payment-form">
        <h2>Checkout</h2>

        <h3>Select Payment Method</h3>
        <div className="payment-methods">
          <button type="button" className="payment-button paypal-button">
            <span>Pay with PayPal</span>
          </button>
          <button
            type="button"
            className="payment-button cod-button"
            onClick={handleCodClick}
          >
            <span>Cash on Delivery</span>
          </button>
        </div>

        <div className="card-icons">
          <FaCcVisa className="card-icon" />
          <FaCcMastercard className="card-icon" />
          <FaCcDiscover className="card-icon" />
        </div>

        <div className="card-details">
          <input
            type="text"
            name="name"
            value={paymentData.name}
            onChange={onChangeHandler}
            placeholder="Name on Card"
            required
          />
          <div className="card-number-container">
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={onChangeHandler}
              placeholder="Card Number"
              required
              className="card-number-input"
            />
          </div>
          <div className="mmo">
            <input
              type="text"
              name="expiry"
              value={paymentData.expiry}
              onChange={onChangeHandler}
              placeholder="MM/YY"
              required
            />
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={onChangeHandler}
              placeholder="CVV"
              required
            />
          </div>
        </div>

        <div className="otp-container">
          <button
            type="button"
            onClick={handleRequestOtp}
            className="get-otp-button"
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Request OTP"}
          </button>

          <input
            type="text"
            name="otp"
            value={paymentData.otp}
            onChange={onChangeHandler}
            placeholder="Enter OTP"
            className="otp-input"
            required
          />
        </div>

        <div className="total-amount-container">
          <input
            type="text"
            value={`Total: ₹${totalAmount.toFixed(2)}`}
            readOnly
            className="total-amount-input"
          />
        </div>

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Payment;
