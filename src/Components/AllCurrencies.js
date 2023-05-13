import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/AllCurrencies.css';

import logo from '../assets/logoForWhite.png';
import rightArrow from '../assets/rightArrow.png';

const AllCurrencies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (e) => {
    setSearchQuery(e.target.value.trim().toUpperCase());
  };

  const usd = useSelector((store) => (store.currencyArray));

  const { isLoadingCurrencyArray } = useSelector((store) => (store));

  const searchedArray = usd.filter((ifSearched) => ifSearched.symbol.includes(searchQuery));

  const date = new Date();
  const yesterdayCalc = date - 1000 * 60 * 60 * 24 * 1;
  const yesterday = new Date(yesterdayCalc);
  const yesterdayMonth = `0${yesterday.getMonth() + 1}`.slice(-2);
  const yesterdayDate = `0${yesterday.getDate() + 1}`.slice(-2);
  const yesterdayWholeDate = `${yesterday.getFullYear()}-${yesterdayMonth}-${yesterdayDate}`;
  const numberOfDays = 10;
  const multipleDaysCalc = date - 1000 * 60 * 60 * 24 * numberOfDays;
  const multipleDays = new Date(multipleDaysCalc);
  const multipleDaysMonth = `0${multipleDays.getMonth() + 1}`.slice(-2);
  const multipleDaysDate = `0${multipleDays.getDate() + 1}`.slice(-2);
  const multipleDaysWholeDate = `${multipleDays.getFullYear()}-${multipleDaysMonth}-${multipleDaysDate}`;
  const prevDate = `&start_date=${multipleDaysWholeDate}&end_date=${yesterdayWholeDate}`;

  if (isLoadingCurrencyArray) {
    return (
      <>
        <div className="AllCurrencies">
          <header className="header">
            <Link to="/" className="logo-image-and-name">
              <img src={logo} alt="logo" className="logo-image" />
              <h1 className="logo-name">ForEx Rates</h1>
            </Link>
          </header>
          <section className="isLoading-state">
            <h3 className="isLoading-message">Loading latest conversion rates...</h3>
          </section>
        </div>
      </>
    );
  }

  if (!searchedArray.length && searchQuery.length) {
    return (
      <>
        <div className="AllCurrencies">
          <header className="header">
            <Link to="/" className="logo-image-and-name">
              <img src={logo} alt="logo" className="logo-image" />
              <h1 className="logo-name">ForEx Rates</h1>
            </Link>
          </header>
          <section className="content-section">
            <div className="search-div">
              <input type="text" placeholder="Search" onChange={searchHandler} className="search-bar" />
            </div>
            <div className="no-items-container">
              <h2 className="no-items">No item matches your search</h2>
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
        </header>
        <section className="content-section">
          <div className="search-div">
            <input type="text" placeholder="Search" onChange={searchHandler} className="search-bar" />
          </div>
          <div className="currency-link-div">
            {searchedArray.map((eachRate) => (
              <Link
                to="/converter"
                key={eachRate.symbol}
                state={{
                  rate: eachRate.rate,
                  symbol: eachRate.symbol,
                  timeSeries: `${prevDate}&symbols=${eachRate.symbol}`,
                  days: numberOfDays,
                }}
                className="currency-link"
              >
                <img src={rightArrow} alt="" className="right-arrow" />
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
