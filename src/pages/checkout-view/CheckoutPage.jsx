import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressComponent from "../../components/address/AddressComponent";
import AddToBagComponent from "../../components/addtobag/AddtobagComponent";
import { Link } from "react-router-dom";
import { clearBag } from "../../reducer/shoppingBagSlice";
import {toast} from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.shoppingBag.items);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
  };

  const handleContinue = () => {
    console.log("Address Added State:", addressAdded);
    if (!addressAdded) {
      toast.error("Please add an address before continuing.");
      return;
    }
    setIsPlacingOrder(false);
    setOrderPlaced(true);
    setTimeout(() => {
      dispatch(clearBag());
      toast.success("Order placed successfully!");
    }, 10000);
  };

  const totalMRP = bagItems.reduce(
    (acc, item) => acc + item.originalPrice * (item.quantity || 1),
    0
  );
  const discount = bagItems.reduce(
    (acc, item) =>
      acc +
      (item.discountPercent / 100) * item.originalPrice * (item.quantity || 1),
    0
  );
  const subtotal = totalMRP - discount;
  const shippingFee = 20;
  const totalAmount = subtotal + shippingFee;

  const getEstimatedDeliveryDate = () => {
    const currentDate = new Date();
    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 10);
    return estimatedDeliveryDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      {bagItems.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png"
            height="200px"
            width="200px"
            alt="Empty Bag"
          />
          <h2 className="fw-bolder pb-3">Hey, it feels so light!</h2>
          <p className="text-muted fs-5 pb-4">
            There is nothing in your bag. Let's add some items.
          </p>
          <Link
            to="/wishlist-page"
            className="btn btn-outline-danger fw-semibold py-3 fs-5"
          >
            Add items from wishlist
          </Link>
        </div>
      ) : (
        <div className="row">
          {orderPlaced ? (
            <div className="text-center py-5">
              <h2 className="fw-bold text-success">Order Successful!</h2>
              <p className="text-muted fs-5">
                Your order has been placed successfully. You will receive a
                confirmation email shortly.
              </p>
            </div>
          ) : isPlacingOrder ? (
            <>
              <h2>
                Your Shopping Bag ({bagItems.length} Item
                {bagItems.length !== 1 ? "s" : ""})
              </h2>
              <div className="col-md-6">
                <AddressComponent
                  onAddressAdded={() => {
                  console.log("Address added callback received in CheckoutPage!");    
                  setAddressAdded(true)}}
                />
              </div>
              <div className="col-md-6">
                <div className="card p-3">
                  <h4 className="fw-bold mb-3">Delivery Estimates</h4>
                  <div className="d-flex justify-content-between">
                    <span>Estimated delivery in:</span>{" "}
                    <span>{getEstimatedDeliveryDate()}</span>
                  </div>
                  <h4 className="fw-bold mb-3 mt-3">Order Summary</h4>
                  <div className="d-flex justify-content-between">
                    <span>Total MRP:</span> <span>₹{totalMRP.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount:</span> <span>-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping Fee:</span> <span>₹{shippingFee}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total Amount:</span>{" "}
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <button
                    className="btn btn-danger mt-4 w-100"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <AddToBagComponent />
              <div className="col-md-4">
                <div className="card p-3">
                  <h4 className="fw-bold mb-3">Price Details</h4>
                  <div className="d-flex justify-content-between">
                    <span>Total MRP:</span> <span>₹{totalMRP.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount:</span> <span>-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping Fee :</span> <span>₹{shippingFee}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total Amount:</span>{" "}
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <button
                    className="btn btn-danger mt-4 w-100"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
