import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartOptions,
  ChartEvent,
} from 'chart.js';
import { ChartDataset } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartDataLabels
);

import { Chart } from 'chart.js';

const GraficoAnual = () => {
  const chartRef = useRef<Chart<'bar'> | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  const data: any = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
    datasets: [
      {
        label: 'Meta',
        data: [120, 80, 50, 150, 120, 130, 110, 152],
        backgroundColor: '#003473',
        datalabels: {
          display: false,
        },
      } as ChartDataset<'bar', number[]>,
      {
        type: 'bar' as const,
        label: 'Real',
        data: [145, 120, 38, 180, 101, 98, 90, 139],
        backgroundColor: '#0066FF',
        stack: 'Stack 0',
        datalabels: {
          display: false,
        },
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        text: 'Stacked Bar and Line Chart',
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: true,
        color: 'white',
        anchor: 'end',
        align: 'start',
        formatter: (value: any) => value.toFixed(0),
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    onClick: (event: ChartEvent) => {
      const chart = chartRef.current;

      if (chart) {
        const points = chart.getElementsAtEventForMode(event as any, 'nearest', { intersect: true }, true);

        if (points.length && chart.data.labels) {
          const firstPoint = points[0];
          const label = chart.data.labels[firstPoint.index] as string;
          setSelectedMonth(label); // Atualiza o estado com o mês clicado
        }
      }
    },
  };
  console.log(selectedMonth)

  return (
    <div 
    //animate-slide-up
    className="min-w-[250px] max-w-full max-h-[500px] bg-branco rounded-b-lg mr-4 ml-4 mt-0 ">
      <Bar ref={chartRef} data={data} options={options} />
      {/* <div >
        Selected Month: <strong>{selectedMonth}</strong>
      </div> */}
    </div>
  );
};

export default GraficoAnual;