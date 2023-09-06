import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const currencyCode = 'USD';

export const fetchExchangeRates = createAsyncThunk('currency/fetchExchangeRates', async (code = 'USD') => {
  const API_URL = `https://api.exchangerate.host/latest?base=${code}`;
  const response = await axios.get(API_URL);
  const rateResponse = response.data.rates;
  const usdRates = Object.keys(rateResponse).map((eachRate) => (
    {
      symbol: eachRate,
      rate: rateResponse[eachRate],
    }
  ));
  return usdRates;
});

export const fetchPreviousRates = createAsyncThunk('currency/fetchPreviousRates', async (timeSeriesArgument) => {
  const API_URL_TIME = `https://api.exchangerate.host/timeseries?base=USD${timeSeriesArgument}`;
  const response = await axios.get(API_URL_TIME);
  const timeResponse = response.data.rates;
  const timeSeriesRates = Object.keys(timeResponse).map((eachDate) => (
    {
      date: eachDate,
      rateAmount: Object.keys(timeResponse[eachDate]).map((eachDateVal) => (
        timeResponse[eachDate][eachDateVal]
      ))[0],
    }
  ));
  return timeSeriesRates;
});
