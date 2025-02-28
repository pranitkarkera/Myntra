import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productSlice";
import categoriesReducer from "../reducer/categoriesSlice";
import searchReducer from "../reducer/searchSlice";
import ratingReducer from "../reducer/ratingSlice";
import productByIdReducer from "../reducer/fetchProductById";
import wishlistReducer from "../reducer/wishlistSlice";
import shoppingBagReducer from "../reducer/shoppingBagSlice";
import userReducer from "../reducer/userSlice";
import addressReducer from "../reducer/addressSlice";
import sizeReducer from "../reducer/sizeSlice";

const store = configureStore({
  reducer: {
    shoppingProducts: productReducer,
    categories: categoriesReducer,
    search: searchReducer,
    rating: ratingReducer,
    productById: productByIdReducer,
    wishlist: wishlistReducer,
    shoppingBag: shoppingBagReducer,
    user: userReducer,
    address: addressReducer,
    size: sizeReducer,
  },
});

export default store;
