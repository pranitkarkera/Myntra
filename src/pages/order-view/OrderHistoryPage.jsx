import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../reducer/orderSlice";
import { Link } from "react-router-dom";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  console.log("Orders History:",orders)
  // Fetch order history on component mount
  useEffect(() => {
    dispatch(fetchOrderHistory("user@example.com")); // Replace with actual user email
  }, [dispatch]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Render empty state
  if (orders.length === 0) {
    return <div className="text-center">No orders found.</div>;
  }

  // Render order history
  return (
    <div className="container mt-5">
      <h2 className="text-center">Order History</h2>
      <hr />
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-md-4 mb-4">
            <div className="card border-0 shadow p-3">
              <div className="card-body">
                <h5 className="card-title">Order ID: {order._id}</h5>
                <p className="card-text">Order Date: {order.orderDate}</p>
                <p className="card-text">Total Amount: ₹{order.totalAmount}</p>
                <p className="card-text">Status: {order.status}</p>
                <Link
                  to={`/order-details/${order.userId}/details/${order._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
