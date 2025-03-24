import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../reducer/orderSlice";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure this is included
import "./OrderDetailsPage.css"; // Create this file for custom styles

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const { userId, orderId } = useParams();

  useEffect(() => {
    console.log("Fetching order details for:", { userId, orderId });
    if (userId && orderId) {
      dispatch(fetchOrderDetails({ userId, orderId }))
        .unwrap()
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    }
  }, [dispatch, userId, orderId]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error!</strong> {error.message || error}
        </div>
      </div>
    );
  }

  if (!orderDetails || Object.keys(orderDetails).length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          No order details found.
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy - hh:mm a");
    } catch (e) {
      console.error("Error formatting date", e);
      return "Invalid Date";
    }
  };

  return (
    <div className="order-details-container container mt-5">
      <h2 className="order-details-title text-center mb-4">Order Details</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Order Information</h5>
          <hr className="my-4" />
          <div className="mb-3">
            <strong>Order ID:</strong>
            <span className="order-details-value">{orderDetails._id}</span>
          </div>
          <div className="mb-3">
            <strong>Order Date:</strong>
            <span className="order-details-value">
              {formatDate(orderDetails.orderDate)}
            </span>
          </div>
          <div className="mb-3">
            <strong>Total Amount:</strong>
            <span className="order-details-value">
              ₹{orderDetails.totalAmount}
            </span>
          </div>
          <div className="mb-3">
            <strong>Status:</strong>
            <span
              className={`order-details-status order-details-value status-${orderDetails.status.toLowerCase()}`}
            >
              {orderDetails.status}
            </span>
          </div>

          <h5 className="mt-4">Products:</h5>
          <hr className="my-4" />
          <ul className="list-group">
            {orderDetails.products &&
              orderDetails.products.map((product) => (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">{product.productName}</h6>
                    <small className="text-muted">{product.brandName}</small>
                  </div>
                  <div className="text-end">
                    <p className="mb-1">Price: ₹{product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
