// src/pages/ProductListingPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../reducer/productSlice";
import { fetchAllCategories } from "../../reducer/categoriesSlice";
import { addToWishlist, removeFromWishlist } from "../../reducer/wishlistSlice"; // Import the actions
import { addToBag } from "../../reducer/shoppingBagSlice"; // Import the addToBag action
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductListingPage.css";
import CategoryFilterComponent from "../../components/filter/CategoryFilterComponent";
import RatingFilterComponent from "../../components/filter/RatingFilterComponent";
import { FaHeart } from "react-icons/fa";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const {
    productsList = [],
    loading,
    error,
  } = useSelector((state) => state.shoppingProducts);
  const categories = useSelector((state) => state.categories.categories);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [resetFilters, setResetFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const filteredProducts = productsList.filter((product) => {
    const matchesSearchTerm =
      product.productName.toLowerCase().includes(searchTerm) ||
      product.brandName.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryId);

    const matchesRating =
      selectedRating === null || product.rating >= selectedRating;

    return matchesSearchTerm && matchesCategory && matchesRating;
  });

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
    setResetFilters(true);
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false);
    }
  }, [resetFilters]);

  const handleToggleWishlist = (event, product) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the Link
    const existingItem = wishlistItems.find(
      (item) => item.productId === product.productId
    );
    if (existingItem) {
      dispatch(removeFromWishlist(product)); // Remove from wishlist if it exists
    } else {
      dispatch(addToWishlist(product)); // Add to wishlist if it doesn't exist
    }
  };

  const handleAddToBag = (product) => {
    dispatch(addToBag(product)); // Dispatch the action to add to bag
  };

  return (
    <div className="container-fluid">
      <h3>Filter</h3>
      <hr />
      <div className="row">
        <div className="col">
          <CategoryFilterComponent
            categories={categories}
            onCategoryChange={handleCategoryChange}
            reset={resetFilters}
          />
          <hr />
          <RatingFilterComponent
            onRatingChange={handleRatingChange}
            reset={resetFilters}
          />
          <button className="btn btn-secondary mt-3" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        <div className="col-md-9">
          {loading && (
            <div className="text-center">
              <span className="visually-hidden">Loading products...</span>
            </div>
          )}
          {error && <p className="text-danger">Error: {error}</p>}
          <div className="row">
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-md-3 mb-4" key={product.productId}>
                  <div className="card hover-effect position-relative">
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
                    <div className="rating-overlay">
                      {product.rating.toFixed(1)}
                    </div>
                    <button
                      className="wishlist-overlay"
                      onClick={(event) => handleToggleWishlist(event, product)}
                      style={{
                        background: "lightgrey",
                        cursor: "pointer",
                      }}
                    >
                      <FaHeart
                        color={
                          wishlistItems.find(
                            (item) => item.productId === product.productId
                          )
                            ? "#FF3E6C"
                            : "grey"
                        }
                      />
                    </button>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {product.brandName}
                      </h5>
                      <p className="card-text">{product.productName}</p>
                      <p className="card-text fw-bold pt-2">
                        Rs. {product.price}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToBag(product)} // Add to bag button
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
