import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddToBagComponent from "../../components/addtobag/AddtobagComponent";
import AddressComponent from "../../components/address/AddressComponent"; // Import AddressComponent
import { Link } from "react-router-dom";
import { clearBag } from "../../reducer/shoppingBagSlice";
import { placeOrder } from "../../reducer/orderSlice";
import { fetchCart } from "../../reducer/shoppingBagSlice";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.shoppingBag.items || []);
  const orderLoading = useSelector((state) => state.order.loading);
  const { user } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("bag"); // 'bag', 'address', 'success'
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded._id);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem("jwtToken");
        toast.error("Invalid session. Please log in again.");
        setUserId(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleContinue = () => {
    if (bagItems.length === 0) {
      toast.error("Your bag is empty. Add items to proceed.");
      return;
    }
    setCheckoutStep("address");
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (!userId) {
      toast.error("User ID not available. Please log in again.");
      return;
    }

    const orderData = {
      userId: userId,
      addressId: selectedAddressId,
      products: bagItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        brandName: item.brandName,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercent: item.discountPercent,
        quantity: item.quantity,
      })),
      totalAmount: calculateTotalAmount(),
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearBag());
      toast.success("Order placed successfully!");
      setOrderPlaced(true);
      setCheckoutStep("success");
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error(err.message || "Failed to place order.");
    }
  };

  const totalMRP = Array.isArray(bagItems)
    ? bagItems.reduce(
        (acc, item) => acc + item.originalPrice * (item.quantity || 1),
        0
      )
    : 0;

  const discount = Array.isArray(bagItems)
    ? bagItems.reduce(
        (acc, item) =>
          acc +
          (item.discountPercent / 100) *
            item.originalPrice *
            (item.quantity || 1),
        0
      )
    : 0;

  const subtotal = totalMRP - discount;
  const shippingFee = 20;
  const totalAmount = subtotal + shippingFee;

  const calculateTotalAmount = () => totalAmount;

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
      {checkoutStep === "bag" && (
        <>
          {Array.isArray(bagItems) && bagItems.length === 0 ? (
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
              <h2>
                Your Shopping Bag ({bagItems.length} Item
                {bagItems.length !== 1 ? "s" : ""})
              </h2>
              <div className="col-md-6">
                <AddToBagComponent />
              </div>
              <div className="col-md-6">
                <div className="card p-3">
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
            </div>
          )}
        </>
      )}

      {checkoutStep === "address" && (
        <div className="row">
          <div className="col-md-6">
            <AddressComponent
              onAddressAdded={() => setCheckoutStep("address")}
              onAddressSelected={(addressId) => setSelectedAddressId(addressId)}
            />
          </div>
          <div className="col-md-6">
            <div className="card p-3">
              <h4 className="fw-bold mb-3">Delivery Estimates</h4>
              <div className="d-flex justify-content-between mb-3 text-danger">
                <span>Estimated delivery in:</span>{" "}
                <span>{getEstimatedDeliveryDate()}</span>
              </div>
              <h4 className="fw-bold mb-3">Order Summary</h4>
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
                onClick={handlePlaceOrder}
                disabled={!selectedAddressId || orderLoading}
              >
                {orderLoading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {checkoutStep === "success" && (
        <div className="text-center py-5">
          <h2 className="fw-bold text-success">Order Successful!</h2>
          <p className="text-muted fs-5">
            Your order has been placed successfully. You will receive a
            confirmation email shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
