import { createSlice } from '@reduxjs/toolkit';
import { fetchExchangeRates, fetchPreviousRates } from '../api';

const initialCurrencyState = {
  currencyArray: [],
  timeSeriesArray: [],
  isLoadingCurrencyArray: false,
  isLoadingTimeSeriesArray: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: initialCurrencyState,
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.pending, (state) => ({
        ...state,
        isLoadingCurrencyArray: true,
      }))
      .addCase(fetchExchangeRates.fulfilled, (state, action) => ({
        ...state,
        isLoadingCurrencyArray: false,
        currencyArray: action.payload,
      }))

      .addCase(fetchPreviousRates.pending, (state) => ({
        ...state,
        isLoadingTimeSeriesArray: true,
      }))
      .addCase(fetchPreviousRates.fulfilled, (state, action) => ({
        ...state,
        isLoadingTimeSeriesArray: false,
        timeSeriesArray: action.payload,
      }));
  },
});

export default currencySlice;
