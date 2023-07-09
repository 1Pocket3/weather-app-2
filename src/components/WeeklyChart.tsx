'use client'
import React, { useEffect, useRef } from 'react';
import { Chart, ChartOptions, ChartData, registerables } from 'chart.js';
import { WeatherData } from "../api/data/data";

Chart.register(...registerables)

const WeeklyChart: React.FC<{ selectedData: WeatherData }> = ({ selectedData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartData: ChartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Max Temperature',
            data: selectedData?.data.daily.temperature_2m_max, // Используем выбранные данные для максимальной температуры
            backgroundColor: '#FF8300',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Min Temperature',
            data: selectedData?.data.daily.temperature_2m_min, // Используем выбранные данные для минимальной температуры
            backgroundColor: '#0074FF',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const chartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 45,
          },
        },
      };

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions,
        });
      }
    }
  }, [selectedData]);

  return (
    <div style={{ height: "350px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeeklyChart;
