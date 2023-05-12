import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currencyCode = 'USD';

const fetchExchangeRates = createAsyncThunk('currency/fetchExchangeRates', async (code = currencyCode) => {
  const API_URL = `https://v6.exchangerate-api.com/v6/62265867183a1d6b9d189c99/latest/${code}`;
  const response = await axios.get(API_URL);
  const abc = response.data.conversion_rates;
  const usdRates = Object.keys(abc).map((eachRate) => (
    {
      symbol: eachRate,
      rate: abc[eachRate],
    }
  ));
  return usdRates;
});

export default fetchExchangeRates;
