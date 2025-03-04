import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../search-bar/SearchBox";
import { CiUser, CiHeart } from "react-icons/ci";
import { PiHandbag } from "react-icons/pi";
import "./Header.css";
import MyntraLogo from "../../assets/myntra-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../reducer/searchSlice";
import { fetchWishlist } from "../../reducer/wishlistSlice";

const Header = () => {
  const dispatch = useDispatch();

  // Redux selectors with fallback values
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const bagItems = useSelector((state) => state.shoppingBag.items || []);
  console.log(bagItems)
  const user = useSelector((state) => state.user.user);
  const userId = user?._id || null;

  // Fetch wishlist when userId is available
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  // Handle search input change
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    dispatch(setSearchTerm(searchValue));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <div className="container-fluid">
          {/* Myntra Logo */}
          <Link className="navbar-brand" to="/homepage">
            <img src={MyntraLogo} alt="Myntra-Logo" width="55" height="55" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
              {/* Category Links */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap justify-content-center">
                {["MEN", "WOMEN", "KIDS", "ALL"].map((category, index) => (
                  <li className="nav-item mx-2" key={index}>
                    <Link
                      className="nav-link active fw-bolder"
                      to={`/${category.toLowerCase()}-listing-page`}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Search Box and Icons */}
              <div className="d-flex align-items-center mt-2 mt-lg-0 flex-wrap">
                {/* Search Box */}
                <div
                  className="me-2"
                  style={{ flex: "1 1 auto", minWidth: "200px" }}
                >
                  <SearchBox onSearch={handleSearch} />
                </div>

                {/* User, Wishlist, and Bag Icons */}
                <ul className="navbar-nav d-flex flex-row align-items-center">
                  {/* Profile Icon */}
                  <li className="nav-item text-center mx-2">
                    <Link
                      className="nav-link active fw-bolder"
                      to="/profile-page/:userId"
                    >
                      <CiUser className="profile-icon" />
                      <p className="mb-0">Profile</p>
                    </Link>
                  </li>

                  {/* Wishlist Icon */}
                  <li className="nav-item text-center mx-2">
                    <Link
                      className="nav-link active fw-bolder"
                      to="/wishlist-page"
                    >
                      <CiHeart className="wishlist-icon" />
                      {wishlistItems.length > 0 && (
                        <span className="badge bg-danger ms-1">
                          {wishlistItems.length}
                        </span>
                      )}
                      <p className="mb-0">Wishlist</p>
                    </Link>
                  </li>

                  {/* Bag Icon */}
                  <li className="nav-item text-center mx-2">
                    <Link className="nav-link active fw-bolder" to="/checkout">
                      <PiHandbag className="bag-icon" />
                      {bagItems.length > 0 && (
                        <span className="badge bg-danger ms-1">
                          {bagItems.length}
                        </span>
                      )}
                      <p className="mb-0">Bag</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
