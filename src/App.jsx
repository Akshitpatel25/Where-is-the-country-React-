/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./component/Card";

function App() {
  const toggle = () => {
    setModeIcon(!modeIcon);
  };

  const [modeIcon, setModeIcon] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setOriginalCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedCountry = originalCountries.filter(
      (reg) => reg.name === inputValue || reg.alpha3Code === inputValue
    );
    setCountries(matchedCountry.length > 0 ? matchedCountry : countries);
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  const [selectedRegion, setSelectedRegion] = useState("");
  const getselect = (event) => {
    const selectedValue = event.target.value;
    setSelectedRegion(selectedValue);

    if (selectedValue === "Select the region") {
      setCountries(originalCountries);
      return;
    }

    const filteredCountries = originalCountries.filter(
      (reg) => reg.region === selectedValue
    );
    setCountries(filteredCountries);
  };

  return (
    <>
      <div className={`w-screen h-fit flex flex-col gap-y-2 ${modeIcon ? "light-mode" : "dark-mode"}`}>
        <div className="w-full h-16 bg-white flex items-center pl-5 pr-5 justify-between shadow-sm shadow-slate-700">
          <h1 className="text-2xl font-bold">Where is the country</h1>
          <div
            className="borderw-fit flex items-center gap-x-2 cursor-pointer"
            onClick={toggle}
          >
            <div>
              {modeIcon ? (
                <i className="fa-solid fa-moon fa-lg"></i>
              ) : (
                <i className="fa-solid fa-sun fa-lg"></i>
              )}
            </div>
            <div>{modeIcon ? <p>Dark Mode</p> : <p>Light Mode</p>}</div>
          </div>
        </div>

        <div className="w-full h-12 flex items-center pl-5 pr-5 justify-between">
          <form
            className="bg-white flex flex-row items-center gap-x-2 pl-2 shadow-sm shadow-slate-700 rounded-sm"
            onSubmit={handleSubmit}
          >
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div>
              <input
                type="text"
                placeholder="search for a country..."
                className="rounded-l-none rounded-sm pl-2 focus:outline-none  bg-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </form>

          <div>
            <select
              name="region"
              id="region-select"
              onChange={getselect}
              className="rounded-sm shadow-sm shadow-slate-700 focus:outline-none bg-white"
            >
              <option value="Select the region" disabled selected>
                Select the region
              </option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
              <option value="Antarctic">Antarctic</option>
            </select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="w-full h-screen flex flex-col items-center p-5 bg-white shadow-md">
            <button
              onClick={handleBackClick}
              className="mb-5 p-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <h2 className="text-3xl font-bold">{selectedCountry.name}</h2>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.name}
              className="w-60 h-auto mt-5"
            />
            <p className="text-gray-800 mt-5">
              Capital:
              <span className="text-gray-900">{selectedCountry.capital}</span>
            </p>
            <p className="text-gray-800">
              Population:
              <span className="text-gray-900">{selectedCountry.population}</span>
            </p>
            <p className="text-gray-800">
              Region:
              <span className="text-gray-900">{selectedCountry.region}</span>
            </p>
          </div>
        ) : (
          <div className="w-full h-fit min-h-screen flex flex-wrap gap-x-10 gap-y-10 justify-between pl-5 pr-10">
            {countries.map((country, index) => (
              <Card
                key={index}
                country={country}
                onClick={() => handleCardClick(country)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
