import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts, setSortOrder } from "../../reducer/productSlice";
import { fetchAllCategories } from "../../reducer/categoriesSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  fetchWishlist, // Import fetchWishlist
} from "../../reducer/wishlistSlice";
import {
  addItemToBag, // Import addItemToBag
} from "../../reducer/shoppingBagSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductListingPage.css";
import CategoryFilterComponent from "../../components/filter/CategoryFilterComponent";
import RatingFilterComponent from "../../components/filter/RatingFilterComponent";
import PriceFilterComponent from "../../components/filter/PriceFilterComponent";
import PriceSliderComponent from "../../components/filter/PriceSliderComponent";
import { setPriceRange } from "../../reducer/productSlice";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const WomenListingPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items || []); // Ensure fallback to empty array
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
  // Decode JWT token to get userId
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded._id); // Assuming _id is the field for userId in your JWT payload
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem("jwtToken");
        toast.error("Invalid session. Please log in again.");
        setUserId(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

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

    const isWomenProduct = product.gender === "FEMALE";

    return (
      matchesSearchTerm && matchesCategory && matchesRating && matchesPriceRange && isWomenProduct
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
    dispatch(setSortOrder("lowToHigh"));
    dispatch(setPriceRange({ min: 100, max: 10000 }));
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false);
    }
  }, [resetFilters]);

  const handleToggleWishlist = async (event, product) => {
    event.stopPropagation();

    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to manage your wishlist.");
      return;
    }

    const existingItem = wishlistItems.find(
      (item) => item.productId === product.productId
    );

    try {
      if (existingItem) {
        await dispatch(
          removeItemFromWishlist({ userId, productId: product.productId })
        ).unwrap();
        toast.error("Item removed from wishlist");
      } else {
        await dispatch(
          addItemToWishlist({
            userId,
            productId: product._id, // Ensure this matches ObjectId format
            productName: product.productName,
            brandName: product.brandName,
            price: product.price,
            originalPrice: product.originalPrice,
            discountPercent: product.discountPercent,
          })
        ).unwrap();
        toast.success("Item added to wishlist");
      }
      // After adding or removing, refresh the wishlist
      dispatch(fetchWishlist(userId));
    } catch (err) {
      toast.error(err.message || "Failed to update wishlist");
    }
  };
  const handleAddToBag = async (product) => {
    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to manage your bag.");
      return;
    }

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
          // Add other necessary fields here
        })
      ).unwrap();
      toast.success("Item added to bag");
    } catch (err) {
      toast.error(err.message || "Failed to add item to bag");
    }
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
          <RatingFilterComponent
            onRatingChange={handleRatingChange}
            reset={resetFilters}
          />
          <hr />
          <PriceFilterComponent />
          <hr />
          <PriceSliderComponent />
          <button className="btn btn-secondary mt-3" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        <div className="col-md-9">
          {loading && <p>Loading products...</p>}
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
            {Array.isArray(sortedProducts) && sortedProducts.length > 0
              ? sortedProducts.map((product) => (
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
                                (item) => item?.productId === product.productId // Ensure item exists
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
              : !loading &&
                !error && (
                  <p>No products available. Try adjusting your filters.</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenListingPage;
