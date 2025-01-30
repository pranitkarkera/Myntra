import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../reducer/fetchProductById"; // Adjust the import based on your structure
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdStar } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";

const ProductViewCardPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productById.product); // Adjust based on your state structure
  const loading = useSelector((state) => state.productById.loading);
  const error = useSelector((state) => state.productById.error);

  useEffect(() => {
    dispatch(fetchProductById(productId)); // Fetch product details by ID
  }, [dispatch, productId]);

  const handleAddToBag = () => {
    // Implement add to cart functionality here
    console.log("Product added to bag:", product);
  };

  const handleAddToWishlist = () => {
    // Implement add to cart functionality here
    console.log("Product added to Wishlist:", product);
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
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]} // Assuming product has an images array
              className="img-fluid"
              alt={product.productName}
            />
          ) : (
            <div className="alert alert-warning">No image available</div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="fw-bolder">{product.brandName}</h2>
          <h3 className="text-muted">{product.productName}</h3>
          <button type="button" class="btn border text-muted fw-bolder">
            {product.rating ? product.rating.toFixed(1) : "N/A"}{" "}
            <IoMdStar className="mb-1 text-success fs-5" />
          </button>
          <hr />
          <h3 className="fw-bolder">
            <FaRupeeSign className="fs-4 mb-1" />
            {product.price}{" "}
            <span className="fw-normal text-muted fs-4">MRP</span>
          </h3>
          <p className="text-success fw-semibold fs-6">
            inclusive of all taxes
          </p>
          <p>{product.description}</p>
          <button
            className="btn btn-danger"
            style={{ flex: "50%" }}
            onClick={handleAddToBag}
          >
            Add to Bag
          </button>{" "}
          <button
            className="btn border"
            style={{ flex: "50%" }}
            onClick={handleAddToWishlist}
          >
            Add to Bag
          </button>
          <br />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductViewCardPage;
