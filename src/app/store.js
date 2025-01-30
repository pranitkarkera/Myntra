import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productSlice";
import categoriesReducer from "../reducer/categoriesSlice";
import searchReducer from "../reducer/searchSlice";
import ratingReducer from "../reducer/ratingSlice";
import productByIdReducer from "../reducer/fetchProductById";
import wishlistReducer from "../reducer/wishlistSlice";
import shoppingBagReducer from "../reducer/shoppingBagSlice";

const store = configureStore({
  reducer: {
    shoppingProducts: productReducer,
    categories: categoriesReducer,
    search: searchReducer,
    rating: ratingReducer,
    productById: productByIdReducer,
    wishlist: wishlistReducer,
    shoppingBag: shoppingBagReducer,
  },
});

export default store;
