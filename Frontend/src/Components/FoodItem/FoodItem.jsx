import React, { useContext, useState, useEffect } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify"; // Import toast

const FoodItem = ({ id, name, price, description, image, sizes }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [increasedPrice, setIncreasedPrice] = useState(price);
  const [rating, setRating] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [hasShownSizeWarning, setHasShownSizeWarning] = useState(false);

  useEffect(() => {
    const randomIncrease = Math.random() * 0.15;
    setIncreasedPrice(price * (1 + randomIncrease));

    const randomRating = 3 + Math.random() * 2;
    setRating(randomRating.toFixed(1));
  }, [price]);

  const toggleSizes = (e) => {
    e.stopPropagation();
    setShowSizes(!showSizes);
  };

  const handleSizeSelect = (size, e) => {
    e.stopPropagation();
    if (!selectedSize) {
      setSelectedSize(size);
      addToCart(id, size); // Add to cart with the selected size
      setShowSizes(false);
    }
  };

  const handleSizeRemove = (e) => {
    e.stopPropagation();
    setSelectedSize(null);
    removeFromCart(id); // Remove item from cart
  };

  const handleCloseDetails = (e) => {
    e.stopPropagation();
    setShowDetails(false);
  };

  const handleCloseFullImage = (e) => {
    e.stopPropagation();
    setShowFullImage(false);
  };

  const toggleDescription = (e) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (sizes && sizes.length > 0) {
      if (!selectedSize) {
        if (!hasShownSizeWarning) {
          toast.error("Please select a size before adding to the cart!");
          setHasShownSizeWarning(true);
        }
        setShowSizes(true);
      } else {
        addToCart(id, selectedSize); // Add more of the selected size
      }
    } else {
      addToCart(id, selectedSize);
    }
  };
  console.log(image);
  const handleItemClick = () => {
    setShowFullImage(true);
    setShowDetails(true);
  };

  const truncatedDescription = description.split(" ").slice(0, 12).join(" ");
  const showMoreText = description.split(" ").length > 12;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          className="food-item-image"
          alt={name}
          onClick={handleItemClick}
        />
        {!cartItem[id] ? (
          <img
            className="add"
            onClick={handleAddToCartClick}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItem[id].quantity}</p>
            <img
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id, selectedSize);
              }}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="rating">
            <p>{rating}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
        </div>
        <p className="food-item-desc">
          {isDescriptionExpanded ? description : truncatedDescription}
          {showMoreText && (
            <span onClick={toggleDescription} className="show-more">
              {isDescriptionExpanded ? " Show less" : " ...Show more"}
            </span>
          )}
        </p>
        <div className="food-item-prices">
          <p className="food-item-old-price">₹ {price.toFixed(2)}</p>
          <p className="food-item-new-price">₹ {increasedPrice.toFixed(2)}</p>
        </div>
        <div className="food-item-sizes">
          <p onClick={toggleSizes} className="toggle-sizes">
            <strong>Available Sizes:</strong>
            <span className="arrow">{showSizes ? "▲" : "▼"}</span>
          </p>
          {selectedSize ? (
            <div className="selected-size">
              <p>Selected Size: {selectedSize}</p>
              <button onClick={handleSizeRemove} className="remove-size">
                X
              </button>
            </div>
          ) : (
            showSizes && (
              <ul>
                {sizes && sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <li key={index} onClick={(e) => handleSizeSelect(size, e)}>
                      {size}
                    </li>
                  ))
                ) : (
                  <li>Not available</li>
                )}
              </ul>
            )
          )}
        </div>
      </div>

      {showDetails && (
        <div className="details-modal" onClick={(e) => e.stopPropagation()}>
          <div className="details-content">
            <div className="mainnn">
              <div className="destit">
                {" "}
                <h2 className="namet">{name}</h2>
                <p>{description}</p>
                <p>Price: ₹{increasedPrice.toFixed(2)}</p>
              </div>
              <img
                src={url + "/images/" + image}
                alt={name}
                className="full-image"
              />
            </div>
            <div className="food-item-sizes">
              <p onClick={toggleSizes} className="toggle-sizes">
                <strong>Available Sizes:</strong>
                <span className="arrow">{showSizes ? "▲" : "▼"}</span>
              </p>
              {selectedSize ? (
                <div className="selected-size">
                  <p>Selected Size: {selectedSize}</p>
                  <button onClick={handleSizeRemove} className="remove-size">
                    X
                  </button>
                </div>
              ) : (
                showSizes && (
                  <ul>
                    {sizes && sizes.length > 0 ? (
                      sizes.map((size, index) => (
                        <li
                          key={index}
                          onClick={(e) => handleSizeSelect(size, e)}
                        >
                          {size}
                        </li>
                      ))
                    ) : (
                      <li>Not available</li>
                    )}
                  </ul>
                )
              )}
            </div>
            <p>15 days return policy available</p>

            <button onClick={handleCloseDetails}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
