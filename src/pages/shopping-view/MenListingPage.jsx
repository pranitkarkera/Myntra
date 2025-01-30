import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../reducer/productSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAllCategories } from "../../reducer/categoriesSlice";
import CategoryFilterComponent from "../../components/filter/CategoryFilterComponent";
import RatingFilterComponent from "../../components/filter/RatingFilterComponent";
import { Link } from "react-router-dom";

const MenListingPage = () => {
  const dispatch = useDispatch();

  const {
    productsList = [],
    loading,
    error,
  } = useSelector((state) => state.shoppingProducts);

  const categories = useSelector((state) => state.categories.categories);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [resetFilters, setResetFilters] = useState(false); // New state for reset

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

    const isMenProduct = product.gender === "MALE";

    return matchesSearchTerm && matchesCategory && matchesRating && isMenProduct
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
    setResetFilters(true); // Set resetFilters to true
  };

  // Reset the resetFilters state after clearing filters
  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false); // Reset the flag
    }
  }, [resetFilters]);

  return (
    <div className="container-fluid">
      <h3>Filter</h3>
      <hr />
      <div className="row">
        <div className="col">
          <CategoryFilterComponent
            categories={categories}
            onCategoryChange={handleCategoryChange}
            reset={resetFilters} // Pass the reset flag
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
                  <Link
                    to={`/products/${product.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card hover-effect position-relative">
                      <img
                        src={product.images[0]}
                        className="card-img-top"
                        alt={product.productName || "Product image"}
                      />
                      <div className="rating-overlay">
                        {product.rating.toFixed(1)}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title fw-bold">
                          {product.brandName}
                        </h5>
                        <p className="card-text">{product.productName}</p>
                        <p className="card-text fw-bold">Rs.{product.price}</p>
                      </div>
                    </div>
                  </Link>
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

export default MenListingPage;
