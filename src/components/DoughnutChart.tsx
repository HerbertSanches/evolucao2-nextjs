import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartWithCenterText = ({ percentage }) => {
  const data = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#0066FF', '#E7E0E0'],
        hoverBackgroundColor: ['#36A2EB', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%', // Ajusta o tamanho do círculo interno
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      // Plugin customizado para adicionar texto no centro
      beforeDraw: (chart) => {
        const { ctx, width, height } = chart;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';

        const text = `${percentage}%`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  };

  return (
    <div className="relative w-[50px] h-[50px] flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-blue-800 text-lg font-bold text-16">{percentage}%</span>
      </div>
    </div>
  );
};

export default DoughnutChartWithCenterText;