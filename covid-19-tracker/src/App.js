import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  
  const [countries, setCountries] = useState([]); // Grabbing list of countries from API
  const [country, setCountry] = useState('worldwide');  // User selected country
  const [countryInfo, setCountryInfo] = useState([]); // Data of each individual country
  const baseURL = "https://disease.sh/v3/covid-19/countries";
  const worldwideURL = "https://disease.sh/v3/covid-19/all/";

  useEffect(() => {
    fetch (worldwideURL)
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    
    const getCountriesData = async () => {
      await fetch (baseURL)
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

    const url = countryCode === 'worldwide' ? worldwideURL : baseURL + `${countryCode}` 

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
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
          {/* Infoboxes */}
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recoveries" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/* Map  */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          
          <h3>Worldwide new cases</h3>
          {/* Graph  */}
        </CardContent>
      </Card>
    </div>
      
  );
}

export default App;
