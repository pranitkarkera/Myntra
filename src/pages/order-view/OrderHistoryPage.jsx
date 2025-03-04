import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../reducer/orderSlice";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal
import "bootstrap/dist/css/bootstrap.min.css";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  useEffect(() => {
    dispatch(fetchOrderHistory("user@example.com")); // Replace with actual user email
  }, [dispatch]);

  // Handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Order History</h2>
      <hr />
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.orderId} className="col-md-4 mb-4">
              <div
                className="card border-0 shadow p-3"
                onClick={() => handleOrderClick(order)} // Open modal on click
                style={{ cursor: "pointer" }} // Add pointer cursor
              >
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.orderId}</h5>
                  <p className="card-text">Order Date: {order.orderDate}</p>
                  <p className="card-text">
                    Total Amount: ₹{order.totalAmount}
                  </p>
                  <p className="card-text">Status: {order.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bootstrap Modal for Order Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {selectedOrder.orderDate}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <h6>Products:</h6>
              <ul>
                {selectedOrder.products.map((product) => (
                  <li key={product.productId}>
                    {product.productName} x {product.quantity}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderHistoryPage;
