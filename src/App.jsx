import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import HomePage from "./pages/homepage-view/HomePage";
import ProductListingPage from "./pages/shopping-view/ProductListingPage";
import MenListingPage from "./pages/shopping-view/MenListingPage"
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

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route
            path="/product-listing-page"
            element={<ProductListingPage />}
          />
          <Route
            path="/products/:productId"
            element={<ProductViewCardPage />}
          />
          <Route path="/men-listing-page" element={<MenListingPage />} />
          <Route path="/women-listing-page" element={<WomenListingPage />} />
          <Route path="/kids-listing-page" element={<KidsListingPage />} />
          <Route path="/wishlist-page" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/" element={<RegisterProfilePage />} />
          <Route path="/login" element={<LoginProfilePage />} />
          <Route path="/profile-page/:email" element={<ProfilePage />} />
          <Route path="/edit-profile/:email" element={<EditProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
