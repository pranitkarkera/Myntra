import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromBag,
  updateItemQuantityInBag,
  fetchCart
} from "../../reducer/shoppingBagSlice"; // Import async thunks
import { fetchWishlist } from "../../reducer/wishlistSlice";
import { addItemToWishlist } from "../../reducer/wishlistSlice";
import { toast } from "react-toastify";

const AddToBagComponent = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.shoppingBag.items || []); // Ensure fallback to empty array
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;


  const handleRemoveFromBag = async (product) => {
    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to manage your bag.");
      return;
    }

    try {
      await dispatch(
        removeItemFromBag({ userId, productId: product.productId })
      ).unwrap();
      toast.success("Item moved to wishlist");
      dispatch(fetchCart(userId));
    } catch (err) {
      toast.error(err.message || "Failed to move item");
    }
  };

  const handleQuantityChange = async (id, event) => {
    const newQuantity = parseInt(event.target.value);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      if (!userId) {
        console.error("User ID is undefined.");
        toast.error("Please log in to update quantity.");
        return;
      }

      try {
        await dispatch(
          updateItemQuantityInBag({
            userId,
            productId: id,
            quantity: newQuantity,
          })
        ).unwrap();
        toast.success("Quantity updated");
        dispatch(fetchCart(userId));
      } catch (err) {
        toast.error(err.message || "Failed to update quantity");
      }
    }
  };

  const moveToWishlist = async (product) => {
    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to move items to wishlist.");
      return;
    }

    try {
      await dispatch(
        removeItemFromBag({ userId, productId: product.productId })
      ).unwrap();
      await dispatch(
        addItemToWishlist({
          userId,
          productId: product.productId,
          productName: product.productName,
          brandName: product.brandName,
          price: product.price,
          originalPrice: product.originalPrice,
          discountPercent: product.discountPercent,
          images: product.images,
        })
      ).unwrap();
      toast.success("Item moved to wishlist");
      dispatch(fetchCart(userId));
      dispatch(fetchWishlist(userId));
    } catch (err) {
      toast.error(err.message || "Failed to move item");
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="fw-bold">Your Shopping Bag</h5>

      {/* List of Bag Items */}
      {Array.isArray(bagItems) && bagItems.length > 0 ? (
        <div
          className="row overflow-y-auto" // Enable vertical scrolling
          style={{ maxHeight: "70vh" }} // Set a max height for the scrollable container
        >
          {bagItems.map((product) => (
            <div
              key={product.productId}
              className="col-12 mb-4" // Full width for each card
            >
              <div className="card h-100">
                <div className="row g-0 h-100">
                  {/* Image Column */}
                  <div className="col-12 col-md-4">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/150"
                      } // Fallback image
                      className="img-fluid rounded-start h-100 w-100" // Ensure image fills the container
                      alt={product.productName || "Product image"}
                      style={{ objectFit: "cover" }} // Maintain aspect ratio
                    />
                  </div>

                  {/* Content Column */}
                  <div className="col-12 col-md-8">
                    <div className="card-body d-flex flex-column h-100">
                      <h5 className="card-title">{product.brandName}</h5>
                      <p className="card-text">{product.productName}</p>

                      {/* Quantity Selector */}
                      <div className="mt-auto">
                        <select
                          className="form-select w-50 mb-3"
                          value={product.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.productId, e)
                          }
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              Qty: {qty}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Footer with Price and Buttons */}
                      <div className="card-footer bg-transparent border-0 p-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="fw-bold fs-5 mb-0">
                            ₹
                            {(
                              product.originalPrice * (product.quantity || 1)
                            ).toFixed(2)}
                          </p>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveFromBag(product)}
                            >
                              Remove
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => moveToWishlist(product)}
                            >
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in your bag.</p>
      )}
    </div>
  );
};

export default AddToBagComponent;
