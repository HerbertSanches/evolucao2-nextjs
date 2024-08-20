// import React from "react";

// export const Faturamento: React.FC = () => {

//     return(
//         <div id='faturamentoContainer' className="w-[80%]">
//             <label>Faturamento: Dia</label>
//             <label>R$ 17.850,77</label>

//         </div>
//     );
// }

import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import dinheiro from '../../public/assets/images/dinheiro.png';
import Image from 'next/image';
import DoughnutChartWithCenterText from '../components/DoughnutChart'

// Chart.register(ArcElement, Tooltip, Legend, DoughnutController);
interface percentage {
    percentage: string
}
const Faturamento = ({ percentage }: percentage) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');

//     const data = {
//       datasets: [
//         {
//           data: [percentage, 100 - percentage],
//           backgroundColor: ['#0066FF', '#E7E0E0'], // Azul e cinza claro
//           borderWidth: 0,
//         },
//       ],
//     };

      
//     const options = {
//       cutout: '80%',
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         tooltip: { enabled: false },
//       },
//     };

//     const myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options,
//     });

//     return () => {
//       myChart.destroy();
//     };
//   }, [percentage]);

  return (
    <div className="bg-branco rounded-lg p-4 flex items-center justify-between shadow-md ml-4 mr-4">
      <div className="flex items-center">
        {/* Substitua a string '/path/to/your/image.png' pelo caminho da sua imagem */}
        <Image src={dinheiro} alt='' className="h-12 w-12 object-contain" />
        <div className="ml-4">
          <p className="text-blue-800 font-bold">Faturamento: Dia</p>
          <p className="text-blue-800 text-lg font-semibold">R$: 17.850,77</p>
        </div>
      </div>
      <div className="flex items-center justify-center relative" style={{ width: '64px', height: '64px' }}>
        {/* <canvas ref={chartRef}></canvas> */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <span className="text-blue-800 font-semibold">{percentage}%</span> */}
          <DoughnutChartWithCenterText percentage={40}/>
        </div>
        
      </div>
    </div>

    
  );
};

export default Faturamento;


