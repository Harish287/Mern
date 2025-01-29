import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice/index';
import shoppingProductSlice from './shop/product-slice/index';
import shopCartSlice from './shop/cart-slice/index';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder:shopOrderSlice
  },
});

export default store;
