import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchExchangeRates } from './redux/api';
import AllCurrencies from './Components/AllCurrencies';
import Converter from './Components/Converter';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AllCurrencies />} />
      <Route path="/converter" element={<Converter />} />
    </Routes>
  );
}

export default App;
