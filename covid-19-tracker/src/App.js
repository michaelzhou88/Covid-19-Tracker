import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';

function App() {
  
  const [countries, setCountries] = useState([]); // Grabbing country data from API
  const [country, setCountry] = useState('worldwide');  // User selected country

  useEffect(() => {
    const requestURL = "https://disease.sh/v3/covid-19/countries";
    const getCountriesData = async () => {
      await fetch (requestURL)
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country,  // United Kingdom, United States, France etc
            value: country.countryInfo.iso2, // UK, US, FR etc
          }));

          setCountries(countries);
      });
    };

    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        {/* Header */}
        {/* Title */}
        <h1>COVID-19 TRACKER</h1>
        {/* Dropdown selection */}
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop through all the countries (including worldwide) and show dropdown list of options */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            </Select>
          </FormControl>
      </div>
      
      <div className="app__stats">
        <InfoBox title="Coronavirus cases" cases={123} total={2000}/>
        <InfoBox title="Recoveries" cases={1234} total={3000}/>
        <InfoBox title="Deaths" cases={12345} total={4000}/>
      </div>

      {/* Table */}

      {/* Graph  */}

      {/* Map  */}
    </div>
  );
}

export default App;
