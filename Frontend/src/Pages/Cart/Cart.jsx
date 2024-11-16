import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/order");
  };

  const getFinalTotalAmount = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 30;
    return (subtotal + deliveryFee).toFixed(2);
  };

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Size</p>

          <p>Remove</p>
        </div>
        <br />
        <br />
        <hr />
        {food_list.map((item) => {
          const quantity = cartItem[item._id]?.quantity || 0;
          const selectedSize = cartItem[item._id]?.size;

          if (quantity > 0) {
            return (
              <div key={item._id}>
                <div className="cart-item-title cart-item-items">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>₹{(item.price * quantity).toFixed(2)}</p>
                  {selectedSize && <p>Size: {selectedSize}</p>}{" "}
                  {/* Display size */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="cart-bottom">
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
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getFinalTotalAmount()}</b>
            </div>
          </div>
          <button className="btn" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
