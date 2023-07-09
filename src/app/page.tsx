'use client'
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useStyles, FilterRow, FilterInput, TableCellStyled } from '../styles/WeatherTable.styles';
import { InfinitySpin } from 'react-loader-spinner';
import { WeatherData, getDataForTable } from "../api/data/data";
import LocationForm, { LocationData } from '@/components/LocationForm';

import WeeklyChart from '../components/WeeklyChart';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const WeatherTable = () => {
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);
  const [minFilter, setMinFilter] = useState<number | null>(null);
  const [maxFilter, setMaxFilter] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      const tableData: any = await getDataForTable();
      setFilteredData(tableData);
      setLoading(false);
    };

    fetchData();
    if (maxFilter !== 0) {
      setFilteredData(filteredData.filter((item) => maxFilter === null || item.maxTemp <= maxFilter));
    }
    if (minFilter !== 0) {
      setFilteredData(filteredData.filter((item) => minFilter === null || item.minTemp >= minFilter));
    }
  }, [maxFilter, minFilter]);

  const handleCountryChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedCountry(value || '');
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddLocation = (location: LocationData) => {
    setLocations((prevLocations: LocationData[]) => [...prevLocations, location]);
  };


  const [selectedRow, setSelectedRow] = useState(0);

  const classes = useStyles();
  console.log('filteredData', filteredData)

  const options = filteredData && filteredData
    .filter((item) => (maxFilter === null || item.maxTemp <= maxFilter) && (minFilter === null || item.minTemp >= minFilter))
    .reduce((uniqueOptions: any[], item: any) => {
      if (!uniqueOptions.includes(item.country)) {
        uniqueOptions.push(item.country);
      }
      return uniqueOptions;
    }, []);

  return (
    <div>
      {loading ? ( // Render loading spinner or placeholder while loading is true
        <div style={{ textAlign: "center", height: "auto" }} className="loading-spinner">
          <InfinitySpin
            width='200'
            color="#4fa94d"
          />
        </div>
      ) : (
        <div>
          <FilterRow>
            <Autocomplete
              style={{ marginRight: '10px', width: '205px' }}
              options={options}
              value={selectedCountry}
              onChange={(event, value) => handleCountryChange(event, value)}
              renderInput={(params) => (
                <FilterInput
                  {...params}
                  label="Country"
                  value={selectedCountry}
                />
              )}
            />
            <FilterInput
              label="Min"
              type="number"
              value={minFilter || ''}
              onChange={(e: any) => setMinFilter(parseInt(e.target.value) || null)}
            />
            <FilterInput
              label="Max"
              type="number"
              value={maxFilter || ''}
              onChange={(e: any) => setMaxFilter(parseInt(e.target.value) || null)}
            />

            <Button
              color='inherit'
              onClick={() => handleOpenPopup()}
            >Add location</Button>
          </FilterRow>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellStyled>City</TableCellStyled>
                  <TableCellStyled>Temperature Max °C</TableCellStyled>
                  <TableCellStyled>Temperature Min °C</TableCellStyled>
                  <TableCellStyled>Wind Direction</TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData && filteredData
                  .filter((item) =>
                    (maxFilter === null || item.maxTemp <= maxFilter) &&
                    (minFilter === null || item.minTemp >= minFilter) &&
                    (selectedCountry === '' || item.country === selectedCountry)
                  )
                  .map((item: any, index: any) => (
                    <TableRow
                      key={index}
                      selected={index === selectedRow}
                      onClick={() => setSelectedRow(index)}
                    >
                      <TableCellStyled>{item.city}</TableCellStyled>
                      <TableCellStyled>{item.maxTemp}°C</TableCellStyled>
                      <TableCellStyled>{item.minTemp}°C</TableCellStyled>
                      <TableCellStyled>{item.randomWindDirection}</TableCellStyled>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {showPopup && (
            <LocationForm
              handleClosePopup={handleClosePopup}
              handleAddLocation={handleAddLocation}
            />
          )}

          <div style={{ height: "350px", marginTop: "25px" }} className={classes.chartContainer}>
            <WeeklyChart selectedData={filteredData[selectedRow]} />
          </div>
        </div>
      )}
    </div>
  );
};

const WeatherPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="dark-bg">
        <WeatherTable />
      </div>
      <style jsx>{`
        .dark-bg {
          background-color: #333;
          color: #fff;
          padding: 1rem;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default WeatherPage;
