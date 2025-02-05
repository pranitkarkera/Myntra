import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const GenderBasedSlider = () => {
  return (
    <div className="container-fluid py-4 text-center">
      <Carousel>
        <Carousel.Item>
          <Link to="/men-listing-page">
            <img
              src="https://res.cloudinary.com/dzkwltgyd/image/upload/v1738051054/glif-run-outputs/xaywngrqt95lgutluiar.jpg"
              alt="Men's Collection"
              className="img-fluid" // Use Bootstrap's img-fluid class for responsiveness
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/women-listing-page">
            <img
              src="https://res.cloudinary.com/dzkwltgyd/image/upload/v1738051026/glif-run-outputs/ljzjnnjpomvhlq2fi6zb.jpg"
              alt="Women's Collection"
              className="img-fluid" // Use Bootstrap's img-fluid class for responsiveness
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/kids-listing-page">
            <img
              src="https://res.cloudinary.com/dzkwltgyd/image/upload/v1738051501/glif-run-outputs/zvxdyebqdmkugp4ad6vh.jpg"
              alt="Kid's Collection"
              className="img-fluid" // Use Bootstrap's img-fluid class for responsiveness
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default GenderBasedSlider;
