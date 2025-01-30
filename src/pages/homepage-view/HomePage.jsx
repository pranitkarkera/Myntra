import React from "react";
import GenderBasedSlider from "../../components/carousel/GenderBasedSlider";
import BrandBasedSlider from "../../components/carousel/BrandBasedSlider";
import OfferBasedSlider from "../../components/carousel/OfferBasedSlider";

const HomePage = () => {
  return (
    <div className="bg-light">
      <div className="container-fluid">
        <div>
          <section>
            <GenderBasedSlider />
          </section>

          <hr />
          <BrandBasedSlider />
          <hr />
          <OfferBasedSlider />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
