import axios from 'axios';
const API_URL = "https://api.open-meteo.com/v1/forecast";

export async function getDataByParams(params: any) {
  const resp = await axios.get(API_URL, { params });
  return resp.data;
};

export async function processData() {
  const params = [
    { latitude: 50.4547, longitude: 30.5238, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 30.5238, longitude: 35.0407, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 48.4666, longitude: 35.0407, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 51.5085, longitude: -0.1257, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 60.1695, longitude: 24.9354, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 45.4371, longitude: 12.3326, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 49.75, longitude: 6.1667, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
    { latitude: 52.374, longitude: 4.8897, hourlyL: 'temperature_2m', daily: 'temperature_2m_max,temperature_2m_min,winddirection_10m_dominant', windspeed_unit: "ms", timezone: 'auto' },
  ];

  const results = [];
  for (let i = 0; i < params.length; i++) {
    const result = await getDataByParams(params[i]);
    results.push({ data: result });
  }

  return results;
};
