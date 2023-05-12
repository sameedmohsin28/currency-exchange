import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currency/currencySlice';

const store = configureStore({
  reducer: currencySlice.reducer,
});

export default store;
