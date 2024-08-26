'use client'

import React from 'react';
import { useAuth } from '@/context/AuthContext';
// import { useRouter, useSearchParams } from 'next/navigation';
import Metas  from '../components/Metas'
import DoughnutChartWithCenterText from '../components/DoughnutChart'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'

const DashboardComponent: React.FC = () => {
  const { token } = useAuth();
  console.log(token)
  // const searchParams = useSearchParams();
  // const message = searchParams.get('message')

  return (
    <div className='bg-red'>
     
     
      <p>{token.token}</p>
     
      <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>

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

