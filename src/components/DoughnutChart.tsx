import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'chart.js/dist';

interface porcentagem{
  porcentagem: number,
  tipoCard?: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartWithCenterText = ({ porcentagem, tipoCard }: porcentagem) => {
  console.log(porcentagem)
  const validPorcentagem = isNaN(porcentagem) ? 0 : Number(porcentagem);
  
  const adjustedPorcentagem = validPorcentagem > 100 ? 100 : validPorcentagem;
  const remaining = 100 - adjustedPorcentagem;

  const data = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [adjustedPorcentagem, remaining],
        backgroundColor: ['#0066FF', '#E7E0E0'],
        hoverBackgroundColor: ['#36A2EB', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%', // Ajusta o tamanho do círculo interno
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
      // Plugin customizado para adicionar texto no centro
      beforeDraw: (chart: Chart) => {
        const { ctx, width, height } = chart;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';

        const text = `${porcentagem}%`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  };

  return (
    <div className="relative  flex items-center justify-center">
      <Doughnut  className='h-16 w-16' data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center ">
        <span className={`text-azulClaro ${tipoCard === 'grande' ? 'text-4xl': 'text-lg'} font-bold `}>{validPorcentagem}%</span>
      </div>
    </div>
  );
};

export default DoughnutChartWithCenterText;
