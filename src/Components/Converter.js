import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Converter.css';
import logo from '../assets/logo.jpg';

const Converter = () => {
  const location = useLocation();
  const { rate } = location.state;
  const { symbol } = location.state;

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

  return (
    <>
      <div className="Converter">
        <header className="header">
          <Link to="/" className="logo-image-and-name">
            <img src={logo} alt="logo" className="logo-image" />
            <h1 className="logo-name">ForEx Rates</h1>
          </Link>
          <div>
            <Link to="/currencyList" className="currency-list">
              CURRENCIES LIST
            </Link>
            <Link to="/" className="back-button">
              Back
            </Link>
          </div>
        </header>
        <section className="converter-section">
          <div className="exchange-rate">
            <h2 className="exchange-rate-text">
              {'1 USD = '}
              {rate}
              {' '}
              {symbol}
            </h2>
          </div>
          <div className="base-to-specific">
            <h2 className="base-to-specific-heading">
              {'USD to '}
              {symbol}
            </h2>
            <input type="number" placeholder="Enter Amount in USD" onChange={calculateAnswer} className="amount" />
            <input type="number" placeholder="Converted amount" value={answer} className="converted" />
          </div>
          <div className="specific-to-base">
            <h2 className="specific-to-base-heading">
              {symbol}
              {' to USD'}
            </h2>
            <input type="number" placeholder="Enter Amount" onChange={calculateQuestion} className="amount" />
            <input type="number" placeholder="Converted in USD" value={question} className="converted" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Converter;
