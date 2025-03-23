import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../reducer/orderSlice";
import { Link, useParams } from "react-router-dom";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { userId } = useParams(); // Get userId from URL parameters

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrderHistory({ userId })); // Dispatch fetchOrderHistory with userId
    } else {
      console.error("Missing userId");
    }
  }, [dispatch, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!orders.length)
    return <div className="text-center">No orders found.</div>;

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
                <p>
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>Total Amount: ₹{order.totalAmount}</p>
                <p>Status: {order.status}</p>
                <Link
                  to={`/order-details/details/${userId}/${order._id}`} // Include userId in the link
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
