import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import dinheiro from '../../public/assets/images/dinheiro.png';
import Image from 'next/image';
import DoughnutChartWithCenterText from '../components/DoughnutChart';


interface porcentagem {
  porcentagem: number,
  valor: number,
  tipoFaturamento: string
}
const Faturamento = ({ tipoFaturamento, porcentagem, valor }: porcentagem) => {
  const [valorFormatado, setValorFormatado] = useState('');

  useEffect(() => {
    if (valor > 0){
      setValorFormatado(valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
   
  },[valor]);

  return (
    <div className="bg-branco rounded-lg p-2 flex items-center 
                    justify-between shadow-global ml-4 mr-4 mt-3" >

      <div className="flex items-center">
        <Image src={dinheiro} alt='' className="h-12 w-12 object-contain" />
        <div className="ml-4">
          <p className="text-blue-800 font-bold text-[15px] truncate">Faturamento: {tipoFaturamento}</p>
          <p className="text-blue-800 text-lg text-[18px]">R$: {valorFormatado}</p>
        </div>
      </div>

      <div className="flex items-center justify-center relative " style={{ width: '64px', height: '64px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <DoughnutChartWithCenterText porcentagem={porcentagem}/>
        </div>
      </div>

    </div>
  );
};

export default Faturamento;