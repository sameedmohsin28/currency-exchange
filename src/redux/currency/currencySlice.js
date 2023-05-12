import { createSlice } from '@reduxjs/toolkit';
import fetchExchangeRates from '../api';

const initialCurrencyState = {
  currencyArray: [],
  currencyDeatils: [],
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: initialCurrencyState,
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        currencyArray: action.payload,
      }));
  },
});

export default currencySlice;
