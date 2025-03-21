import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../reducer/orderSlice";
import { useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const { userId, orderId } = useParams();

  // console.log("Extracted Params: ", userId, orderId);
  // console.log("Order details:", orderDetails);
  // console.log(totalAmount, _id)
  // console.log(products.productId)

  useEffect(() => {
    if (userId && orderId) {
      console.log("Fetching details with userId:", userId, "orderId:", orderId);
      dispatch(fetchOrderDetails({ userId, orderId }));
    } else {
      console.error("Missing userId or orderId");
    }
  }, [dispatch, userId, orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  if (!orderDetails || Object.keys(orderDetails).length === 0) {
    return <div className="text-center">No order details found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Order Details</h2>
      <hr />
      <div>
        <p>
          <strong>Order ID:</strong> {orderDetails._id}
        </p>
        <p>
          <strong>Order Date:</strong> {orderDetails.orderDate}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{orderDetails.totalAmount}
        </p>
        <p>
          <strong>Status:</strong> {orderDetails.status}
        </p>
        <h6>Products:</h6>
        <ul>
          {orderDetails.products &&
            orderDetails.products.map((product) => (
              <li key={product.productId}>
                <strong>Product Name:</strong>{" "}
                {product.productDetails?.productName}
                <br />
                <strong>Brand:</strong> {product.productDetails?.brandName}
                <br />
                <strong>Price:</strong> ₹{product.price}
                <br />
                <strong>Quantity:</strong> {product.quantity}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
