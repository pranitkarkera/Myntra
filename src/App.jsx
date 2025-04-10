import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "./reducer/userSlice";
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
// import RefreshHandler from "./components/RefreshHandler";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user from Redux store

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      if (userId) {
        dispatch(fetchUserById(userId)); // Fetch user data from backend
      }
    }
  }, [dispatch]);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header />
      <div>
        {/* <RefreshHandler setIsAuthenticated={setIsAuthenticated} /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/all-listing-page" element={<ProductListingPage />} />
          <Route
            path="/products/:productId"
            element={<ProductViewCardPage />}
          />
          <Route path="/signup" element={<RegisterProfilePage />} />
          <Route
            path="/login"
            element={
              <LoginProfilePage/>
            }
          />

          <Route element={<PrivateRoute />}>
            <Route path="/men-listing-page" element={<MenListingPage />} />
            <Route path="/women-listing-page" element={<WomenListingPage />} />
            <Route path="/kids-listing-page" element={<KidsListingPage />} />
            <Route path="/wishlist-page" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/profile-page/:userId"
              element={<ProfilePage />}
            />
            <Route
              path="/edit-profile/:userId"
              element={
                <EditProfilePage />
              }
            />
            <Route
              path="/order-history/:userId"
              element={<OrderHistoryPage />}
            />
            <Route
              path="/order-details/:userId/details/:orderId"
              element={<OrderDetailsPage />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
