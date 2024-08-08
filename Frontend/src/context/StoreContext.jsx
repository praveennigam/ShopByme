import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const url = "https://shopping-ofij.onrender.com";

  const addToCart = async (itemId, size = null) => {
    const newCart = { ...cartItem };
    if (!newCart[itemId]) {
      newCart[itemId] = { quantity: 1, size };
    } else {
      newCart[itemId].quantity += 1;
      if (size) {
        newCart[itemId].size = size;
      }
    }
    setCartItem(newCart);

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cartItem };
    if (newCart[itemId].quantity > 1) {
      newCart[itemId].quantity -= 1;
    } else {
      delete newCart[itemId];
    }
    setCartItem(newCart);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item].quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item].quantity;
      }
    }
    return totalAmount;
  };

  const getFinalTotalAmount = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 30;
    const discount = discountApplied ? discountAmount : 0;
    return (subtotal + deliveryFee - discount).toFixed(2);
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data); // Ensure data includes size and return_policy
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

  const applyDiscount = (code) => {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (coupon) {
      setDiscountApplied(true);
      setDiscountAmount(getTotalCartAmount() * coupon.discount);
    } else {
      alert("Invalid promo code");
    }
  };

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getFinalTotalAmount,
    url,
    token,
    setToken,
    applyDiscount,
    promoCode,
    setPromoCode,
    discountApplied,
    discountAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
