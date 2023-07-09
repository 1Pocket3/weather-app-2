import { processData } from '../getData';

export interface WeatherData {
  city: string;
  country: string;
  minTemp: number;
  maxTemp: number;
  randomWindDirection: number;
  data: any;
}

interface CitiesData {
  city: string;
  country: string;
}

const cities: CitiesData[] = [
  { city: 'Kyiv', country: 'Ukraine' },
  { city: 'Dnipro', country: 'Ukraine' },
  { city: 'Odessa', country: 'Ukraine' },
  { city: 'London', country: 'Great Britain' },
  { city: 'Helsinki', country: 'Finland' },
  { city: 'Venice', country: 'Italy' },
  { city: 'Luxembourg', country: 'Luxembourg' },
  { city: 'Amsterdam', country: 'Netherlands' },
];

export async function getDataForTable() {
  try {
    const tableData: WeatherData[] = [];

    const results = await processData() || [];
    if (Array.isArray(results)) {
      results.map((item: any, index: number) => {
        const maxTemp = Math.max(...item.data.daily.temperature_2m_max);
        const minTemp = Math.min(...item.data.daily.temperature_2m_min);
        const randomWindDirection =
          item.data.daily.winddirection_10m_dominant[
          Math.floor(Math.random() * item.data.daily.winddirection_10m_dominant.length)
          ];

        const updatedItem: WeatherData = {
          ...item,
          city: cities[index].city,
          country: cities[index].country,
          maxTemp,
          minTemp,
          randomWindDirection,
        };

        tableData.push(updatedItem); // Add the updated item to the 'tableData' array
      });
      return tableData;
    } else {
      console.log('data is not an array');
    }
  } catch (error) {
    console.log('error', error);
  }
};

