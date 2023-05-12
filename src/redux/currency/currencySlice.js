import { createSlice } from '@reduxjs/toolkit';
import fetchExchangeRates from '../api';

const initialCurrencyState = {
  currencyArray: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: initialCurrencyState,
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.pending, (state) => ({
        ...state,
        isLoading: true,
      }))

      .addCase(fetchExchangeRates.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        currencyArray: action.payload,
      }));
  },
});

export default currencySlice;
