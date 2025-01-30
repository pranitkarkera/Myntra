import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import HomePage from "./pages/homepage-view/HomePage";
import ProductListingPage from "./pages/shopping-view/ProductListingPage";
import MenListingPage from "./pages/shopping-view/MenListingPage"
import WomenListingPage from "./pages/shopping-view/WomenListingPage";
import KidsListingPage from "./pages/shopping-view/KidsListingPage";
import ProductViewCardPage from "./pages/shopping-view/ProductViewCardPage";
import WishlistPage from "./pages/order-view/WishListPage";
import AddToBagPage from "./pages/order-view/AddToBagPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/addtobag-page" element={<AddToBagPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
