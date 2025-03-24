import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isFixedFooter = [
    location.pathname === "/",
    location.pathname === "/checkout",
    location.pathname === "/wishlist-page",
    location.pathname === "/login",
    location.pathname.startsWith("/profile-page"),
    location.pathname.startsWith("/edit-profile"),
    location.pathname.startsWith("/products"),
  ].some((condition) => condition);

  return (
    <footer
      style={{
        backgroundColor: "#F5F5F6",
        width: "100%",
        position: isFixedFooter ? "fixed" : "relative",
        bottom: isFixedFooter ? "0" : "auto",
      }}
    >
      <div className="container-fluid text-center py-4">
        <div className="row">
          <div className="col">
            <p>
              In case of any concern,{" "}
              <span className="text-primary">Contact Us</span>
            </p>
          </div>
          <div className="col">
            <p>&copy; 2025 www.myntra.com. All rights reserved.</p>
          </div>
          <div className="col">
            <p>A Flipkart company</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
