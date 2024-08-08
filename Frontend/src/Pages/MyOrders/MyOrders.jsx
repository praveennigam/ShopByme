import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext"; // Import the context
import { assets } from "../../assets/assets";
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext); // Get URL and token from context
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get userId from local storage
      const response = await axios.get(`${url}/api/order/userOrders`, {
        headers: { Authorization: `Bearer ${token}` }, // Add token to headers
      });
      const filteredOrders = response.data.data.filter(
        (order) => order.userId === userId
      ); // Filter orders based on userId
      setData(filteredOrders);
      console.log(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [url, token]); // Add url and token to dependency array

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="Order Icon" />
              <p>
                {order.items.map((item, itemIndex) =>
                  itemIndex === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>Rs.{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
