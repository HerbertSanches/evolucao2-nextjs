import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
// import { useRouter, useSearchParams } from 'next/navigation';
import Metas  from '../components/Metas'
import DoughnutChartWithCenterText from '../components/DoughnutChart'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'
import LoadingPadrao from '../app/loading';

const DashboardComponent: React.FC = () => {
  const { token } = useAuth();
  // console.log(token)

  //força o loading de 5 segundos
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
  }, []);

  // if (isLoading) {
  //   return <LoadingPadrao />; // Exibe o loading diretamente até que o timer termine
  // }
  //fim do forçado
  return (
    <div className='mt-0'>

      {/* <p className='font-bold text-xl pt-2 text-azulEscuro flex items-center justify-center'>Dashboard Faturamento</p> */}
     
      <div className='ml-3 mr-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>

        <Metas metaMes='35.701,54' metaAno='401.170,50'/>
        <Faturamento tipoFaturamento={'Dia'} valor={'17.850,75'} porcentagem={'50'}/>
        <Faturamento tipoFaturamento={'semana'} valor={'25.654,37'} porcentagem={'90'}/>
        <Faturamento tipoFaturamento={'Mês'} valor={'110.045,98'} porcentagem={'65'}/>
        <Faturamento tipoFaturamento={'Ano'} valor={'575.437,62'} porcentagem={'71'}/>
        <div id='background GraficoAnual'>
          <GraficoAnual />
        </div>

      </div>
      
    </div>)
};

export default DashboardComponent;

