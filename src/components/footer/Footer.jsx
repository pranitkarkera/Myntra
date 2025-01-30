import React from "react";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#F5F5F6" }}>
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
