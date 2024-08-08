import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import ExploreMenu from "./Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "./Components/FoodDisplay/FoodDisplay";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Payment from "./Pages/Payment/Payment";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [category, setCategory] = useState("All");

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} setCategory={setCategory} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route
            path="/explore"
            element={
              <>
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
