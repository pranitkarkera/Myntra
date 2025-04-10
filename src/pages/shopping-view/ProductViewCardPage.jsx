import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../reducer/fetchProductById";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdStar } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Carousel } from "react-bootstrap";
import { addItemToBag, fetchCart } from "../../reducer/shoppingBagSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  fetchWishlist,
} from "../../reducer/wishlistSlice";
import { toast } from "react-toastify";

const ProductViewCardPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productById.product);
  const loading = useSelector((state) => state.productById.loading);
  const error = useSelector((state) => state.productById.error);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Get userId from Redux or decode from token
  const user = useSelector((state) => state.user.user);
  let userId = user ? user._id : null;

  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, productId, userId]);

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
            images: product.images,
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
    try {
      await dispatch(
        addItemToBag({
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
      toast.success("Item added to bag!");
      dispatch(fetchCart(userId));
    } catch (error) {
      console.error("Error adding to bag:", error);
      toast.error(error.message || "Failed to add item to bag");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
    description,
  } = product;

  return (
    <div className="mid-section container">
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
