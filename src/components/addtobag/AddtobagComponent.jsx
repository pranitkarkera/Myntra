import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBag,
  updateQuantity,
  updateSize,
} from "../../reducer/shoppingBagSlice";
import { addToWishlist } from "../../reducer/wishlistSlice";

const AddToBagComponent = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.shoppingBag.items);

  const handleRemoveFromBag = (product) => {
    dispatch(removeFromBag(product));
  };

  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleSizeChange = (id, size) => {
    dispatch(updateSize({ id, size }));
  };

  const moveToWishlist = (product) => {
    dispatch(removeFromBag(product));
    dispatch(addToWishlist(product));
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

  return (
    <div className="col-md-8">
      {bagItems.map((product) => {
        const quantity = product.quantity || 1;
        return (
          <div key={product.productId} className="card mb-3 p-3">
            <div className="row g-0">
              <div className="col-md-2">
                <img
                  src={product.images[0]}
                  className="img-fluid rounded"
                  alt={product.productName}
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">{product.brandName}</h5>
                  <p className="card-text">{product.productName}</p>
                  <span>Size:</span>{" "}
                  <select
                    className="form-select w-50 mt-2"
                    value={product.selectedSize || product.size[0]}
                    onChange={(e) =>
                      handleSizeChange(product.productId, e.target.value)
                    }
                  >
                    {product.size.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select w-50 mt-2"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product.productId, e)}
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        Qty: {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <p className="fw-bold fs-5">
                  ₹{(product.originalPrice * quantity).toFixed(2)}
                </p>
                <p className="text-muted text-decoration-line-through">
                  ₹{(product.originalPrice * product.quantity).toFixed(2)}
                </p>
                <button
                  className="btn btn-outline-danger mt-2 me-2"
                  onClick={() => handleRemoveFromBag(product)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => moveToWishlist(product)}
                >
                  Move to Wishlist
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddToBagComponent;
