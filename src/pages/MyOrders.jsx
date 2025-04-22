import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const guestOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
    setOrders(guestOrders);
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <div>
          {orders?.map((order, index) => (
            <div key={index} className="order-card">
              <h3>Order #{index + 1}</h3>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total: ৳{order.total_price}</p>
              {/* Display more order details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;
