import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts, setSortOrder } from "../../reducer/productSlice";
import { fetchAllCategories } from "../../reducer/categoriesSlice";
import { addToWishlist, removeFromWishlist } from "../../reducer/wishlistSlice";
import { addToBag } from "../../reducer/shoppingBagSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductListingPage.css";
import CategoryFilterComponent from "../../components/filter/CategoryFilterComponent";
import RatingFilterComponent from "../../components/filter/RatingFilterComponent";
import PriceFilterComponent from "../../components/filter/PriceFilterComponent";
import PriceSliderComponent from "../../components/filter/PriceSliderComponent";
import { setPriceRange } from "../../reducer/productSlice";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const MenListingPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const {
    productsList = [],
    loading,
    error,
  } = useSelector((state) => state.shoppingProducts);
  const categories = useSelector((state) => state.categories.categories);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const sortOrder = useSelector((state) => state.shoppingProducts.sortOrder);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
    const [resetFilters, setResetFilters] = useState(false);
  const priceRange = useSelector((state) => state.shoppingProducts.priceRange);

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

    const matchesPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;

    const isMenProduct = product.gender === "MALE"

    return (
      matchesSearchTerm && matchesCategory && matchesRating && matchesPriceRange && isMenProduct
    );
  });

  console.log("Filtered Products:", filteredProducts);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price;
  });

  const handleCategoryChange = useCallback((categories) => {
    setSelectedCategories(categories);
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setSelectedRating(rating);
  }, []);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
    setResetFilters(true);
    dispatch(setSortOrder("lowToHigh"))
    dispatch(setPriceRange({ min: 100, max: 10000 }));
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false);
    }
  }, [resetFilters]);

  const handleToggleWishlist = (event, product) => {
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

  const handleAddToBag = (product) => {
    dispatch(addToBag(product));
    toast.success("Item added  to wishlist");
  };

  return (
    <div className="container-fluid">
      <h3>Filter</h3>
      <hr />
      <div className="row">
        <div className=" col">
          <CategoryFilterComponent
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
          <hr />
          <RatingFilterComponent onRatingChange={handleRatingChange} />
          <hr />
          <PriceFilterComponent />
          <hr />
          <PriceSliderComponent />
          <button className="btn btn-secondary mt-3" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        <div className="col-md-9">
          {loading}
          {error && (
            <div>
              <p className="text-danger">Error: {error}</p>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(fetchAllProducts())}
              >
                Retry
              </button>
            </div>
          )}
          <div className="row">
            {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div className="col-md-3 mb-4" key={product.productId}>
                  <div className="card hover-effect position-relative">
                    <div className="position-relative">
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
                        onClick={(event) =>
                          handleToggleWishlist(event, product)
                        }
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
                    </div>
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
                        onClick={() => handleAddToBag(product)}
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

export default MenListingPage;
