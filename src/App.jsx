import { useEffect, useState } from "react";
import { InputBox, MySvg, useCurrencyInfo,BACKGROUNDIMAGE } from "./components";



function App() {
  // currency & currency Amount To be Converted
  const [from, setFrom] = useState("usd");
  const [fromAmount, setFromAmount] = useState(0);


    // Required currency & currency Amount after conversion
  const [to, setTo] = useState("inr");
  const [toAmount, setToAmount] = useState(0);

  //Getting currency conversions data
  const currencyInfo = useCurrencyInfo(from);

  //Getting Currency keys e.g. "usd", "inr",
  const options = Object.keys(currencyInfo);


  // Swapping Currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setToAmount(fromAmount);
    setFromAmount(toAmount);
  };

  //currency Conversion
  const convert = () => {
    setToAmount((fromAmount * currencyInfo[to]).toFixed(2));
  };

  // Side Effect that will automatically convert currencies when we
  // either swap, changeAmount or change Currency Type
  useEffect(() => {
    const convertedAmount = fromAmount * currencyInfo[to];
    if (isFinite(convertedAmount)) {
      convert();
    }
  }, [fromAmount, swap, toAmount, from, to]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BACKGROUNDIMAGE})` }}
    >
      <h1 className="font-Abril-Fatface mt-20 max-w-sm:mt-52 text-blue-600 p-2 rounded-lg wide bg-opacity-70 bg-white max-md:text-xl text-4xl ">
        Currency Converter
      </h1>
      <div className="w-full max-sm:mb-40">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={fromAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setFromAmount(Number(amount))}
              />
            </div>
            <div className="relative w-full h-0.5 ">
              <img
                onClick={swap}
                src={MySvg}
                alt="Swap"
                className="cursor-pointer absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md text-white bg-blue-600 px-2 py-0.5"
              />
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={toAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
