import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  removeItemFromWishlist,
} from "../../reducer/wishlistSlice";
import { addItemToBag } from "../../reducer/shoppingBagSlice";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "./WishlistPage.css";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // State for userId
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const wishlistError = useSelector((state) => state.wishlist.error);

  // Decode JWT token to get userId
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Check the actual field names
        setUserId(decoded._id || decoded.id); // Try both _id and id
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem("jwtToken"); // Remove invalid token
        toast.error("Invalid session. Please log in again.");
        setUserId(null);
        navigate("/login"); // Redirect to login page if necessary
      }
    }
  }, [navigate]);

  // Fetch wishlist items
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    } else {
      console.error("User ID is undefined");
    }
  }, [dispatch, userId]);

  // Handle errors related to wishlist fetching
  useEffect(() => {
    if (
      wishlistError === "Unauthorized, no JWT token found" ||
      wishlistError === "Unauthorized, JWT token wrong or expired"
    ) {
      toast.error("Session expired. Please log in again.");
      navigate("/login"); // Redirect to login page
    }
  }, [wishlistError, navigate]);

  if (!userId) {
    return (
      <div className="text-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  // Remove item from wishlist
  const handleRemoveFromWishlist = (product) => {
    dispatch(removeItemFromWishlist({ userId, productId: product.productId }))
      .unwrap()
      .then(() => {
        toast.error("Item removed from wishlist");
        dispatch(fetchWishlist(userId)); // Refresh the wishlist after removal
      })
      .catch((err) => {
        toast.error(err.message || "Failed to remove item");
      });
  };

  // Move item to bag and remove from wishlist
  const handleMoveToBag = (product) => {
    dispatch(addItemToBag(product));
    handleRemoveFromWishlist(product);
    toast.success("Item moved to bag");
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
                    src={
                      product.images?.[0] ||
                      "/path/to/local/placeholder/image.png"
                    }
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
                  onClick={() => handleMoveToBag(product)}
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
