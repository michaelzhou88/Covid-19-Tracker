import React from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        {/* Header */}
        {/* Title */}
        <h1>COVID-19 TRACKER</h1>
        {/* Dropdown selection */}
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value="abc"
            >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">Option 4</MenuItem>

            </Select>
          </FormControl>
      </div>
      

      {/* Infoboxes */}
      {/* Infoboxes */}
      {/* Infoboxes */}

      {/* Table */}
      {/* Graph  */}

      {/* Map  */}
    </div>
  );
}

export default App;
