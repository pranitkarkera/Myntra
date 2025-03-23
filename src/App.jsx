import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage-view/HomePage";
import ProductListingPage from "./pages/shopping-view/ProductListingPage";
import MenListingPage from "./pages/shopping-view/MenListingPage";
import WomenListingPage from "./pages/shopping-view/WomenListingPage";
import KidsListingPage from "./pages/shopping-view/KidsListingPage";
import ProductViewCardPage from "./pages/shopping-view/ProductViewCardPage";
import WishlistPage from "./pages/wishlist-view/WishlistPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProfilePage from "./pages/profile-view/ProfilePage";
import RegisterProfilePage from "./pages/profile-view/RegisterProfilePage";
import LoginProfilePage from "./pages/profile-view/LoginProfilePage";
import CheckoutPage from "./pages/checkout-view/CheckoutPage";
import EditProfilePage from "./pages/profile-view/EditProfilePage";
import OrderHistoryPage from "./pages/order-view/OrderHistoryPage";
import OrderDetailsPage from "./pages/order-view/OrderDetailsPage";
import RefreshHandler from "./components/RefreshHandler";
import NotFound from "./components/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Header />
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/all-listing-page" element={<ProductListingPage />} />
          <Route
            path="/products/:productId"
            element={<ProductViewCardPage />}
          />
          <Route
            path="/men-listing-page"
            element={<PrivateRoute element={<MenListingPage />} />}
          />
          <Route
            path="/women-listing-page"
            element={<PrivateRoute element={<WomenListingPage />} />}
          />
          <Route
            path="/kids-listing-page"
            element={<PrivateRoute element={<KidsListingPage />} />}
          />
          <Route
            path="/wishlist-page"
            element={<PrivateRoute element={<WishlistPage />} />}
          />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<CheckoutPage />} />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<RegisterProfilePage />} />
          <Route
            path="/login"
            element={
              <LoginProfilePage setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/profile-page/:userId"
            element={<ProfilePage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/edit-profile/:userId"
            element={
              <EditProfilePage setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/order-history/:userId"
            element={<PrivateRoute element={<OrderHistoryPage />} />}
          />
          <Route
            path="/order-details/:userId/details/:orderId"
            element={<PrivateRoute element={<OrderDetailsPage />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
