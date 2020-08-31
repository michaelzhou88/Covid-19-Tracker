import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from "./Table";
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";


function App() {
  
  const [countries, setCountries] = useState([]); // Grabbing list of countries from API
  const [country, setCountry] = useState('worldwide');  // User selected country
  const [countryInfo, setCountryInfo] = useState([]); // Data of each individual country
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  // Load map
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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

      setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
      setMapZoom(4);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* Title */}
          <h1>COVID-19 TRACKER</h1>
          {/* Dropdown selection */}
            <FormControl className="app__dropdown">
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
          <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={numeral(countryInfo.cases).format("0.0a")}/>
          <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recoveries" cases={prettyPrintStat(countryInfo.todayRecovered)} total={numeral(countryInfo.recovered).format("0.0a")}/>
          <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0.0a")}/>
        </div>

        {/* Map  */}
        <Map 
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          {/* Graph  */}
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
      
  );
}

export default App;
