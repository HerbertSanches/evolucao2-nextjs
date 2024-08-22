// import React from 'react';
// import { ChartOptions } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// const GraficoAnual = () => {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       },
//       {
//         label: 'Dataset 2',
//         data: [28, 48, 40, 19, 86, 27, 90],
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Stacked Bar Chart',
//       },
//       legend: {
//         position: 'top' as const,  // A propriedade `position` precisa ser um valor específico.
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//       },
//       datalabels: {
//         display: true,
//         color: 'white',
//         anchor: 'end',
//         align: 'top',
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };
//   const optionsFinal: any = { options};
//   return (
//     <div className="min-w-[300px] max-w-full max-h-[500px] mt-4">
//         <Bar data={data} options={optionsFinal} />
//     </div>
//   );
// };

// export default GraficoAnual;

import React from 'react';
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

const GraficoAnual = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'line' as const,
        label: 'Meta',
        data: [120, 80, 50, 150, 120, 130, 110], // Linha constante representando a meta
        borderColor: '#E6A519',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        datalabels: {
          display: false, // Oculta rótulos para a linha de meta
        },
      } as ChartDataset<'line', number[]>,
      {
        type: 'bar' as const,
        label: 'Real',
        data: [145, 120, 38, 180, 101, 98, 90],
        backgroundColor: '#0066FF',
        stack: 'Stack 0',
      }
  // Aqui especificamos o tipo corretamente
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
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
        formatter: (value: any) => value.toFixed(0), // Formatar valores sem decimais
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
  };

  return (
    <div className="min-w-[300px] max-w-full min-h-[300px] max-h-[500px] mt-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoAnual;

