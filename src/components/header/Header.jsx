import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "../search-bar/SearchBox";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiHandbag } from "react-icons/pi";
import "./Header.css";
import MyntraLogo from "../../assets/myntra-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../reducer/searchSlice";

const Header = () => {
  const dispatch = useDispatch();

  // Get the counts from the Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const bagItems = useSelector((state) => state.shoppingBag.items);
  const email = useSelector((state) => state.user.email);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    dispatch(setSearchTerm(searchValue));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/homepage">
            <img
              src={MyntraLogo}
              alt="Myntra-Logo"
              width="55"
              height="55"
            />
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap justify-content-center">
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/men-listing-page"
                  >
                    MEN
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/women-listing-page"
                  >
                    WOMEN
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/kids-listing-page"
                  >
                    KIDS
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/product-listing-page"
                  >
                    ALL
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center mt-2 mt-lg-0 flex-wrap">
                <div
                  className="me-2"
                  style={{ flex: "1 1 auto", minWidth: "200px" }}
                >
                  <SearchBox onSearch={handleSearch} />
                </div>
                <ul className="navbar-nav d-flex flex-row align-items-center">
                  <li className="nav-item text-center mx-2">
                    <Link
                      className="nav-link active fw-bolder"
                      to={`/profile-page/${email}`}
                    >
                      <CiUser className="profile-icon" />
                      <p className="mb-0">Profile</p>
                    </Link>
                  </li>
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
