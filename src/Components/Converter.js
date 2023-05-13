import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Converter.css';
import logo from '../assets/logoForWhite.png';
import { fetchPreviousRates } from '../redux/api';

const Converter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { rate } = location.state;
  const { symbol } = location.state;
  const { timeSeries } = location.state;

  const { isLoadingTimeSeriesArray } = useSelector((store) => (store));
  const { timeSeriesArray } = useSelector((store) => (store));
  const reversedTimeSeriesArray = [...timeSeriesArray].reverse();

  useEffect(() => {
    dispatch(fetchPreviousRates(timeSeries, symbol));
  }, [dispatch, timeSeries, symbol]);

  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState();

  const calculateAnswer = (e) => {
    setAnswer(e.target.value * rate);
    if (!e.target.value) {
      setAnswer('');
    }
  };

  const calculateQuestion = (e) => {
    setQuestion(e.target.value / rate);
    if (!e.target.value) {
      setQuestion('');
    }
  };

  if (isLoadingTimeSeriesArray) {
    return (
      <>
        <div className="Converter">
          <header className="header">
            <Link to="/" className="logo-image-and-name">
              <img src={logo} alt="logo" className="logo-image" />
              <h1 className="logo-name">ForEx Rates</h1>
            </Link>
            <div>
              <Link to="/" className="back-button">
                Back
              </Link>
            </div>
          </header>
          <section className="details-section">
            <div className="converter-div">
              <div className="exchange-rate">
                <h2 className="exchange-rate-text">
                  {'1 USD = '}
                  {rate}
                  {' '}
                  {symbol}
                </h2>
              </div>
              <div className="base-to-specific">
                <h3 className="base-to-specific-heading">
                  {'USD to '}
                  {symbol}
                </h3>
                <input type="number" placeholder="Enter Amount in USD" onChange={calculateAnswer} className="amount" />
                <input type="number" placeholder={`Converted Amount in ${symbol}`} value={answer} className="converted" />
              </div>
              <div className="specific-to-base">
                <h3 className="specific-to-base-heading">
                  {symbol}
                  {' to USD'}
                </h3>
                <input type="number" placeholder={`Enter Amount in ${symbol}`} onChange={calculateQuestion} className="amount" />
                <input type="number" placeholder="Converted Amount in USD" value={question} className="converted" />
              </div>
            </div>
            <div className="isLoading-state">
              <h3 className="isLoading-message">Fetching rates from past 10 days...</h3>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="Converter">
        <header className="header">
          <Link to="/" className="logo-image-and-name">
            <img src={logo} alt="logo" className="logo-image" />
            <h1 className="logo-name">ForEx Rates</h1>
          </Link>
          <div>
            <Link to="/" className="back-button">
              Back
            </Link>
          </div>
        </header>
        <section className="details-section">
          <div className="converter-div">
            <div className="exchange-rate">
              <h2 className="exchange-rate-text">
                {'1 USD = '}
                {rate}
                {' '}
                {symbol}
              </h2>
            </div>
            <div className="base-to-specific">
              <h3 className="base-to-specific-heading">
                {'USD to '}
                {symbol}
              </h3>
              <input type="number" placeholder="Enter Amount in USD" onChange={calculateAnswer} className="amount" />
              <input type="number" placeholder={`Converted Amount in ${symbol}`} value={answer} className="converted" />
            </div>
            <div className="specific-to-base">
              <h3 className="specific-to-base-heading">
                {symbol}
                {' to USD'}
              </h3>
              <input type="number" placeholder={`Enter Amount in ${symbol}`} onChange={calculateQuestion} className="amount" />
              <input type="number" placeholder="Converted Amount in USD" value={question} className="converted" />
            </div>
          </div>
          <div className="past-data-mesaage-div">
            <h4 className="past-data-message">Conversion rates from past 10 days</h4>
          </div>
          <div className="past-data-div">
            {reversedTimeSeriesArray.map((pastRate) => (
              <div key={pastRate.date} className="each-past-data">
                <p className="pastRate-date">{pastRate.date}</p>
                <p className="pastRate-rate">{pastRate.rateAmount}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Converter;
