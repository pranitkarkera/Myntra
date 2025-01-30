import React from "react";
import "./SearchBox.css"
import { FaSearch } from "react-icons/fa";

const SearchBox = ({onSearch}) => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        id="searchBox"
        className="search-input"
        placeholder="Search for products, brands and more"
        onChange={onSearch}
      />
    </div>
  );
};
export default SearchBox