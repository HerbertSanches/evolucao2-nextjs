import React, { useEffect, useState } from 'react';
import dinheiro from '../../../public/assets/images/dinheiro-branco.png';
import Image from 'next/image';
import DoughnutChartWithCenterText from '../DoughnutChart';


interface porcentagem {
  porcentagem: number,
  valor: number,
  tipoFaturamento: string,
  dasktopCardGrande?: number,
}

const FaturamentoDasktop = ({ tipoFaturamento, porcentagem, valor, dasktopCardGrande }: porcentagem) => {
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

  if (dasktopCardGrande === undefined){

    dasktopCardGrande = 0;
  }
  console.log(dasktopCardGrande)

  return (
    dasktopCardGrande === 0  ? (<div className="rounded-lg flex items-start shadow-global w-full h-full" >
                     
      <div className="flex flex-col w-full h-full p-5">
        <div className='flex flex-row w-full justify-between items-center'>
          
          <Image src={dinheiro} alt='' className="h-14 w-16 object-contain " />

          <div className="flex items-center justify-center relative " style={{ width: '64px', height: '64px' }}>
          
            <div className="absolute inset-0 flex items-center justify-center ">
              <DoughnutChartWithCenterText porcentagem={porcentagem}/>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="text-branco font-regular text-xl truncate">Faturamento: {tipoFaturamento}</p>
          <p className="text-branco mt-2 text-4xl font-semibold">R$: {valorFormatado}</p>
        </div>
      </div>

      {/* <div className="flex items-center justify-center relative " style={{ width: '64px', height: '64px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <DoughnutChartWithCenterText porcentagem={porcentagem}/>
        </div>
      </div> */}

    </div> ): (

    <div className="rounded-lg flex items-start shadow-global w-full h-full" >
                     
      <div className="flex flex-col w-full h-full p-5 i">
        
        <div className="flex flex-col justify-start items-start">
          <div className='flex flex-row w-full justify-between items-end'>
            <p className="text-branco font-regular text-xl truncate">Faturamento: {tipoFaturamento}</p>
            <Image src={dinheiro} alt='' className="h-14 w-16 object-contain " />
          </div>
          <p className="text-branco mt-8 text-4xl font-semibold">R$: {valorFormatado}</p>
        </div>

        <div className='flex items-center justify-center w-full'>
          <div className="flex items-center mt-12 justify-center h-40 w-40 relative">
            <div className="absolute inset-0"> 
              <DoughnutChartWithCenterText porcentagem={porcentagem} tipoCard={'grande'}/>
            </div>
          </div>
        </div>

      </div>
      
          
            
         

    </div>
    )
  );
};

export default FaturamentoDasktop;