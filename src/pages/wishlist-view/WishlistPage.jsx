import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../reducer/wishlistSlice"; // Import the action
import { addToBag } from "../../reducer/shoppingBagSlice"; // Import the action
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdClose } from "react-icons/io";
import "./WishlistPage.css";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const handleMoveToBag = (product) => {
    dispatch(addToBag(product)); // Add the product to the bag
    handleRemoveFromWishlist(product); // Remove the product from the wishlist
  };

  return (
    <div className="container">

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5 my-5">
          <img
            src="https://img.icons8.com/?size=100&id=6AT50ANS7K0O&format=png&color=000000"
            className="mb-4"
          />
          <h2 className="fw-bolder pb-3">YOUR WISHLIST IS EMPTY</h2>
          <p className="text-muted fs-5 pb-4">
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </p>
          <Link
            className="btn btn-outline-primary fw-semibold py-3 fs-5"
            to="/product-listing-page"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <h2>My Wishlist {wishlistItems.length} Item</h2>
          {wishlistItems.map((product) => (
            <div className="col-md-3 mb-4" key={product.productId}>
              <div className="card">
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
                  className="remove-overlay btn btn-light border-radius-30px position-absolute top-0 end-0"
                  onClick={() => handleRemoveFromWishlist(product)}
                  aria-label="Remove from wishlist"
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
                <button
                  className="btn btn-light text-danger fw-bolder py-3"
                  onClick={() => handleMoveToBag(product)} // Call the new function
                >
                  MOVE TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
