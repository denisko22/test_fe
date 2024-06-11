import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import productReducer from './products/productSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    product: productReducer, 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;