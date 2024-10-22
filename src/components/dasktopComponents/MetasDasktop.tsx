import React, { useState, useEffect, useCallback, useContext } from 'react';
import graficoMeta from '../../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

export interface metaMesAno{
  metaMes: number,
  mes:number;
  metaAno: number,
  ano: string,
}

const MetasDasktop: React.FC<metaMesAno> = ({ metaMes, mes, metaAno, ano }) => {
  console.log(metaAno)
  console.log(metaMes)

  const [metaMesFormatado, setMetaMesFormatado] = useState('');
  const [metaAnoFormatado, setMetaAnoFormatado] = useState('');

  useEffect(() => {
    setMetaMesFormatado(metaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setMetaAnoFormatado(metaAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  },[metaMes, metaAno])

  const mesParaChave: { [key: number]: string }  = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
  };
  const chaveMetaMes:string = mesParaChave[mes];


  return (
    <div className='h-full w-full items-left justify-start rounded-[8px] '> 
        <div id='containerMeta' className='flex flex-row h-full w-full smallphone:gap-2 justify-start items-center smallphone:g-3 '>

            <div id='metaMes' className='flex h-full w-full rounded-[8px]  ml-1 items-center justify-start shadow-global mt-1'>

            <div className="flex flex-col h-full w-full space-x-1 ml-5 justify-start">
                
                <div className='flex flex-row'>
                    <div>
                        <Image src={graficoMeta} alt="Grafico meta" />
                    </div>

                    <h2 className=" text-branco font-regular text-xl mt-[1.4rem] mb-0 ml-3 h-auto ">Meta {chaveMetaMes}</h2>
                </div>
                <p className="text-branco font-semibold text-4xl ml-0">R$ {metaMesFormatado}</p>
                
            </div>
            
            </div>

        </div>
    </div>
  )
};

export default MetasDasktop;