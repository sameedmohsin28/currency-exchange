import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './AllCurrencies.css';

import logo from '../assets/logo.jpg';

const AllCurrencies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (e) => {
    setSearchQuery(e.target.value.trim().toUpperCase());
  };

  const usd = useSelector((store) => (store.currencyArray));

  const searchedArray = usd.filter((ifSearched) => ifSearched.symbol.includes(searchQuery));

  if (!searchedArray.length && searchQuery.length) {
    return (
      <>
        <div className="AllCurrencies">
          <header className="header">
            <Link to="/" className="logo-image-and-name">
              <img src={logo} alt="logo" className="logo-image" />
              <h1 className="logo-name">ForEx Rates</h1>
            </Link>
            <div>
              <Link to="/currencyList" className="currency-list">
                CURRENCIES LIST
              </Link>
            </div>
          </header>
          <section className="content-section">
            <div className="search-div">
              <input type="text" placeholder="Search" onChange={searchHandler} className="search-bar" />
            </div>
            <div className="no-items-container">
              <h2 className="no-items">No items match your search</h2>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="AllCurrencies">
        <header className="header">
          <Link to="/" className="logo-image-and-name">
            <img src={logo} alt="logo" className="logo-image" />
            <h1 className="logo-name">ForEx Rates</h1>
          </Link>
          <div>
            <Link to="/currencyList" className="currency-list">
              CURRENCIES LIST
            </Link>
          </div>
        </header>
        <section className="content-section">
          <div className="search-div">
            <input type="text" placeholder="Search" onChange={searchHandler} className="search-bar" />
          </div>
          <div className="currency-link-div">
            {searchedArray.map((eachRate) => (
              <Link to="/converter" key={eachRate.symbol} state={{ rate: eachRate.rate, symbol: eachRate.symbol }} className="currency-link">
                <div className="currency-symbol">
                  {eachRate.symbol}
                </div>
                <div className="currency-rate">
                  {'Exchange Rate: '}
                  {eachRate.rate}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllCurrencies;
