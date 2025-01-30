// src/pages/AddToBagPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromBag } from "../../reducer/shoppingBagSlice"; // Import the action
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdClose } from "react-icons/io";

const AddToBagPage = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.shoppingBag.items);

  const handleRemoveFromBag = (product) => {
    dispatch(removeFromBag(product));
  };

  return (
    <div className="container">
      {bagItems.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png"
            height="200px"
            width="200px"
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
          {bagItems.map((product) => (
            <div className="col-md-3 mb-4" key={product.productId}>
              <div className="card position-relative">
                <Link
                  to={`/products/${product.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.productName || "Product image"}
                  />
                </Link>
                <button
                  className="remove-overlay btn btn-light position-absolute top-0 end-0"
                  onClick={() => handleRemoveFromBag(product)}
                  aria-label="Remove from bag"
                >
                  <IoMdClose />
                </button>
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text text-muted mb-2">
                    {product.brandName}
                  </p>
                  <p className="card-text fw-bold">Rs. {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToBagPage;
