import currencyAcronyms from '../data/acronyms';

const AcronymsPopup = () => {
  const currencyAbbreviations = Object.keys(currencyAcronyms);

  return (
    currencyAbbreviations.map((eachAbb) => (
      <div key={eachAbb}>
        {eachAbb}
        {': '}
        {currencyAcronyms[eachAbb]}
      </div>
    ))
  );
};

export default AcronymsPopup;
