import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../reducer/fetchProductById";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdStar } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Carousel } from "react-bootstrap";
import { addToBag } from "../../reducer/shoppingBagSlice";
import { addToWishlist, removeFromWishlist } from "../../reducer/wishlistSlice";
import { toast } from "react-toastify";
import { setSize } from "../../reducer/sizeSlice";

const ProductViewCardPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productById.product);
  const loading = useSelector((state) => state.productById.loading);
  const error = useSelector((state) => state.productById.error);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const selectedSize = useSelector((state) => state.size.selectedSize);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(setSize(null)); // Reset selected size when visiting a new product
  }, [product, dispatch]);

  const handleSizeSelect = (size) => {
    dispatch(setSize(size));
  };

  const handleToggleWishlist = (event) => {
    event.stopPropagation();
    const existingItem = wishlistItems.find(
      (item) => item.productId === product.productId
    );
    if (existingItem) {
      dispatch(removeFromWishlist(product));
      toast.error("Item removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Item added to wishlist");
    }
  };

  const handleAddToBag = () => {
    const sizeToAdd = selectedSize || "S";
    dispatch(addToBag({ ...product, selectedSize: sizeToAdd }));
    toast.success("Item added to bag");
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
