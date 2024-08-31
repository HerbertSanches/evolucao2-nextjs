import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import dinheiro from '../../public/assets/images/dinheiro.png';
import Image from 'next/image';
import DoughnutChartWithCenterText from '../components/DoughnutChart'


interface porcentagem {
    porcentagem: string,
    valor: string,
    tipoFaturamento: string,
    delay: number
}
const Faturamento = ({ tipoFaturamento, porcentagem, valor, delay }: porcentagem) => {

  return (
    //style={{ animation: `slide-in 1s forwards`, animationDelay: `${delay}ms` }}  dentro do className: transform opacity-0 translate-x-[-100%] transition-transform duration-1000 ease-out
    <div className="bg-branco rounded-lg p-4 flex items-center 
                    justify-between shadow-global ml-4 mr-4 mt-3" >
      <div className="flex items-center">
        {/* Substitua a string '/path/to/your/image.png' pelo caminho da sua imagem */}
        <Image src={dinheiro} alt='' className="h-12 w-12 object-contain" />
        <div className="ml-4">
          <p className="text-blue-800 font-bold text-[15px] truncate">Faturamento: {tipoFaturamento}</p>
          <p className="text-blue-800 text-lg text-[18px]">R$: {valor}</p>
        </div>
      </div>
      <div className="flex items-center justify-center relative" style={{ width: '64px', height: '64px' }}>
        {/* <canvas ref={chartRef}></canvas> */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <span className="text-blue-800 font-semibold">{percentage}%</span> */}
          <DoughnutChartWithCenterText porcentagem={Number(porcentagem)}/>
        </div>
        
      </div>
    </div>

    
    
  );
};

export default Faturamento;