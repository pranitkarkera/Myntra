import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder, selectSortOrder } from "../../reducer/productSlice";

const PriceFilterComponent = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);


  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  return (
    <div>
      <h5 className="fw-bolder">Sort by Price</h5>
      <label>
        <input
          type="radio"
          value="lowToHigh"
          checked={sortOrder === "lowToHigh"}
          onChange={handleSortChange}
        />{" "}
        Price: Low to High
      </label>
      <br/>
      <label>
        <input
          type="radio"
          value="highToLow"
          checked={sortOrder === "highToLow"}
          onChange={handleSortChange}
        />{" "}
        Price: High to Low
      </label>
    </div>
  );
};

export default PriceFilterComponent;
