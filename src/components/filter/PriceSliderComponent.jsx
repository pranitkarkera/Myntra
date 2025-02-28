import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { setPriceRange, selectPriceRange } from "../../reducer/productSlice";

const PriceSliderComponent = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector(selectPriceRange);

  const handleChange = (event, newValue) => {
    dispatch(setPriceRange({ min: newValue[0], max: newValue[1] }));
  };

  console.log("Price Range:", priceRange);

  return (
    <div>
      <h5 className="fw-bolder">Price Range</h5>
      <Slider
        value={[priceRange.min, priceRange.max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={100}
        max={10000}
        style={{ color: "#ff4081" }}
      />
      <p>
        ₹{priceRange.min} - ₹{priceRange.max}+
      </p>
    </div>
  );
};

export default PriceSliderComponent;
