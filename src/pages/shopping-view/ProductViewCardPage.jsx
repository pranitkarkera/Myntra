import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../reducer/fetchProductById";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdStar } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Carousel } from "react-bootstrap";
import {
  addItemToBag, // Import addItemToBag
} from "../../reducer/shoppingBagSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  fetchWishlist,
} from "../../reducer/wishlistSlice";
import { toast } from "react-toastify";
import { setSize } from "../../reducer/sizeSlice";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const ProductViewCardPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productById.product);
  const loading = useSelector((state) => state.productById.loading);
  const error = useSelector((state) => state.productById.error);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const selectedSize = useSelector((state) => state.size.selectedSize);

  // Get userId from Redux or decode from token
  const user = useSelector((state) => state.user.user);
  let userId = user ? user._id : null;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded._id; // Assuming _id is the field for userId in your JWT payload
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        // Handle token decoding error (e.g., token is invalid)
        localStorage.removeItem("jwtToken"); // Remove invalid token
        toast.error("Invalid session. Please log in again.");
        userId = null;
        // Redirect to login page if necessary
      }
    }
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(setSize(null)); // Reset selected size when visiting a new product
  }, [product, dispatch]);

  const handleSizeSelect = (size) => {
    dispatch(setSize(size));
  };

  const handleToggleWishlist = async (event) => {
    event.stopPropagation();
    if (!userId) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    const existingItem = wishlistItems.find(
      (item) => item.productId === product.productId
    );
    try {
      if (existingItem) {
        await dispatch(
          removeItemFromWishlist({
            userId,
            productId: product.productId,
          })
        ).unwrap();
        toast.error("Item removed from wishlist");
      } else {
        await dispatch(
          addItemToWishlist({
            userId,
            productId: product.productId,
            productName: product.productName,
            brandName: product.brandName,
            price: product.price,
            originalPrice: product.originalPrice,
            discountPercent: product.discountPercent,
          })
        ).unwrap();
        toast.success("Item added to wishlist");
      }
      dispatch(fetchWishlist(userId));
    } catch (err) {
      toast.error(err.message || "Failed to update wishlist");
    }
  };

  const handleAddToBag = async () => {
    if (!userId) {
      toast.error("Please log in to add items to your bag.");
      return;
    }
    const sizeToAdd = selectedSize || "S";
    try {
      await dispatch(
        addItemToBag({
          userId: userId,
          productId: product.productId,
          productName: product.productName,
          brandName: product.brandName,
          price: product.price,
          originalPrice: product.originalPrice,
          discountPercent: product.discountPercent,
          selectedSize: sizeToAdd, // Include selectedSize
        })
      ).unwrap();
      toast.success("Item added to bag!");
    } catch (error) {
      console.error("Error adding to bag:", error);
      toast.error(error.message || "Failed to add item to bag");
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger text-center">
        <p>Error: {error}</p>
        <p>Please check the product ID or try again later.</p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(fetchProductById(productId))}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product || !product.images) {
    return (
      <div className="text-danger text-center">
        <p>No product data available.</p>
      </div>
    );
  }

  const {
    images,
    brandName,
    productName,
    rating,
    price,
    originalPrice,
    discountPercent,
    size,
    description,
  } = product;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {images.length > 0 ? (
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block img-fluid"
                    style={{ height: "450px", width: "400px" }}
                    src={image}
                    alt={productName}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="alert alert-warning">No image available</div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="fw-bolder">{brandName}</h2>
          <h3 className="text-muted">{productName}</h3>
          <button type="button" className="btn border text-muted fw-bolder">
            {rating ? rating.toFixed(1) : "N/A"}{" "}
            <IoMdStar className="mb-1 text-success fs-5" />
          </button>
          <hr />
          <h3 className="fw-bolder">
            <FaRupeeSign className="fs-4 mb-1" />
            {price} <span className="fw-normal text-muted fs-4">MRP</span>
            <span className="fw-normal text-muted text-decoration-line-through fs-4">
              {" "}
              Rs. {originalPrice}{" "}
            </span>
            <span className="fw-normal text-warning fs-4">
              {" "}
              ({discountPercent}%) OFF{" "}
            </span>
          </h3>
          <p className="text-success fw-semibold fs-6">
            inclusive of all taxes
          </p>
          <p className="fw-bold">SELECT SIZE</p>
          {size.map((e) => (
            <button
              className={`rounded-pill ${
                selectedSize === e
                  ? "bg-white text-danger border border-danger"
                  : "bg-white border"
              }`}
              style={{ width: "40px", height: "40px", margin: "5px" }}
              key={e}
              onClick={() => handleSizeSelect(e)}
            >
              {e}
            </button>
          ))}
          <p>{description}</p>
          <button
            className="btn btn-danger"
            style={{ flex: "50%" }}
            onClick={handleAddToBag}
          >
            Add to Bag
          </button>
          <button
            className="btn border"
            style={{ flex: "50%" }}
            onClick={handleToggleWishlist}
          >
            Wishlist
          </button>
          <br />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductViewCardPage;
