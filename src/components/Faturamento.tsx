import React, { useEffect, useState } from 'react';
import dinheiro from '../../public/assets/images/dinheiro.png';
import Image from 'next/image';
import DoughnutChartWithCenterText from '../components/DoughnutChart';


interface porcentagem {
  porcentagem: number,
  valor: number,
  tipoFaturamento: string
  modo: string;
}
const Faturamento = ({ tipoFaturamento, porcentagem, valor, modo }: porcentagem) => {
  const [valorFormatado, setValorFormatado] = useState('');
  console.log(porcentagem)
  console.log(valor)
  useEffect(() => {
    valor !== undefined && valor !== null
      ? setValorFormatado(valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      : setValorFormatado('0,00')
  },[valor]); 
  console.log(porcentagem)
  console.log(valor)
  return (
    <div className={` ${modo === 'true' ? 'bg-darkClaro' : 'bg-white' } rounded-lg p-2 flex items-center justify-between shadow-global ml-4 mr-4 mt-3`}>

      <div className="flex items-center">
        <Image src={dinheiro} alt='' className={`h-12 w-12 object-contain ${modo === 'true' ? 'invert brightness-0 contrast-100' : ''}`} />
        <div className="ml-4">
          <p className={`${modo === 'true' ? 'text-white' : 'text-blue-800'} font-bold text-[15px] truncate`}>Faturamento: {tipoFaturamento}</p>
          <p className={ `${modo === 'true' ? 'text-white' : 'text-blue-800'} text-lg text-[18px]`} >R$: {valorFormatado}</p>
        </div>
      </div>

      <div className="flex items-center justify-center relative " style={{ width: '64px', height: '64px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <DoughnutChartWithCenterText modo={modo} porcentagem={porcentagem}/>
        </div>
      </div>

    </div>
  );
};

export default Faturamento;