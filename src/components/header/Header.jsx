import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../search-bar/SearchBox";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiHandbag } from "react-icons/pi";
import "./Header.css";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../reducer/searchSlice";

const Header = () => {
    const dispatch = useDispatch();
    
    const handleSearch = (e) => {
      const searchValue = e.target.value.toLowerCase();
      dispatch(setSearchTerm(searchValue))
    }

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top bs-light">
        <div className="container-fluid ms-2">
          <Link className="navbar-brand" to="/">
            <img
              src="https://constant.myntassets.com/web/assets/img/icon.5d108c858a0db793700f0be5d3ad1e120a01a500_2021.png"
              alt="Myntra-Logo"
              width="70"
              height="70"
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
            <div className="d-flex justify-content-between align-items-center w-100">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/men-listing-page"
                  >
                    MEN
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/women-listing-page"
                  >
                    WOMEN
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/kids-listing-page"
                  >
                    KIDS
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link active fw-bolder"
                    to="/product-listing-page"
                  >
                    All
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <SearchBox onSearch={handleSearch} />
                <ul className="navbar-nav d-flex flex-row mt-2 px-3">
                  <li className="nav-item text-center mx-2">
                    <CiUser className="profile-icon" />
                    <Link className="nav-link active fw-bolder" to="#">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item text-center mx-2">
                    <CiHeart className="wishlist-icon" />
                    <Link className=" nav-link active fw-bolder" to="/wishlist-page">
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item text-center mx-2">
                    <PiHandbag className="bag-icon" />
                    <Link className="nav-link active fw-bolder" to="/addtobag-page">
                      Bag
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
