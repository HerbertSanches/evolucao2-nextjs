import React, { useState, useEffect, useCallback, useContext } from 'react';
import graficoMeta from '../../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

export interface metaMesAno{
  metaMes?: number,
  mes?:number;
  metaAno?: number,
  ano?: string,
}

const MetasDasktop: React.FC<metaMesAno> = ({ metaMes, mes, metaAno, ano }) => {
  console.log(metaAno)
  console.log(metaMes)

  const [metaMesFormatado, setMetaMesFormatado] = useState('');
  const [metaAnoFormatado, setMetaAnoFormatado] = useState('');
 
  useEffect(() => {
    if (metaMes) {setMetaMesFormatado(metaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))};
    
    if(metaAno) {setMetaAnoFormatado(metaAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))};
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

  let chaveMetaMes: string | undefined;
  if (mes !== undefined) {
    chaveMetaMes = mesParaChave[mes];
  }
  
console.log(metaAno)
console.log(metaAnoFormatado)
  return (
    <div className='h-full w-full items-left justify-start overflow-hidden'> 
        <div id='containerMeta' className=' ml-5 mt-5 flex flex-row h-full w-full justify-start items-center '>

            

            <div className="flex flex-col h-full w-full space-x-1 justify-start">
                
                <div className='flex flex-row ml-1'>
                    <div>
                        <Image src={graficoMeta} alt="Grafico meta" />
                    </div>
                    
                    {metaMesFormatado && chaveMetaMes ? <h2 className=" text-branco font-regular text-xl mt-[1.4rem] mb-0 ml-3 h-auto ">Meta {chaveMetaMes}</h2> : ''}
                    {ano ?<h2 className="text-branco font-regular text-xl mt-[1.4rem] mb-0 ml-3 h-auto ">Meta {ano} </h2> : ''}
                </div>
                {metaMesFormatado ? <p className="text-branco font-semibold text-4xl ml-0 mt-4">R$ {metaMesFormatado}</p> : ''}
                {metaAnoFormatado ? <p className="text-branco font-semibold text-4xl ml-0 mt-4">R$ {metaAnoFormatado}</p> : ''}
            </div>
            
          

        </div>
    </div>
  )
};

export default MetasDasktop;