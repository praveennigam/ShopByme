import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

function PlaceOrder() {
  const { getTotalCartAmount, food_list, cartItem, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showCoupons, setShowCoupons] = useState(false);
  const [loading, setLoading] = useState(false);

  const coupons = [
    { code: "VISA50C", discount: 0.5 },
    { code: "MAST2C", discount: 0.2 },
    { code: "FABSALE", discount: 0.1 },
  ];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePromoCodeSubmit = () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code.");
      return;
    }
    const coupon = coupons.find((c) => c.code === promoCode.toUpperCase());
    if (coupon) {
      setDiscountApplied(true);
      setDiscountAmount(getTotalCartAmount() * coupon.discount);
    } else {
      alert("Invalid promo code");
    }
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code === code);
    if (coupon) {
      setPromoCode(code);
      setDiscountApplied(true);
      setDiscountAmount(getTotalCartAmount() * coupon.discount);
      setShowCoupons(false); // Close coupon list after selection
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (food_list.length === 0 || Object.keys(cartItem).length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    let orderItems = food_list
      .filter((item) => cartItem[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItem[item._id] }));

    let orderData = {
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country,
        phone: data.phone,
      },
      items: orderItems,
      amount: getTotalCartAmount() + 30 - discountAmount,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData);

      if (response.data.success) {
        navigate("/payment", {
          state: {
            totalAmount: (getTotalCartAmount() + 30 - discountAmount).toFixed(
              2
            ),
          },
        });
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />
        <div className="place-order-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="place-order-promocode-input">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onClick={() => setShowCoupons(!showCoupons)}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="button" onClick={handlePromoCodeSubmit}>
              Submit
            </button>
          </div>
          {showCoupons && (
            <div className="place-order-coupons">
              <button
                type="button"
                className="close-coupons"
                onClick={() => setShowCoupons(false)}
              >
                X
              </button>
              <h3 className="hcoupon">Available Coupons</h3>
              <ul>
                {coupons.map((coupon, index) => (
                  <li
                    key={index}
                    onClick={() => applyCoupon(coupon.code)}
                    className="coupon-item"
                  >
                    {coupon.code} - {coupon.discount * 100}% off
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            {discountApplied && (
              <div className="cart-total-details">
                <p>Discount ({promoCode.toUpperCase()})</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{(getTotalCartAmount() + 30 - discountAmount).toFixed(2)}</b>
            </div>
          </div>
          <button type="submit" className="place-order-button" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>

        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
