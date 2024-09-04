import React, { useEffect, useState, useReducer } from 'react';
import Metas  from '../components/Metas'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'
import api from '@/services/api';
import LoadingPadrao from '@/app/loading';

const forceUpdateReducer = (x: number) => x + 1;

const DashboardComponent: React.FC = () => {
 
  const [renderTrigger, forceRender] = useReducer(forceUpdateReducer, 0);

  const [metaMes, setMetaMes] = useState(0);
  const [metaAno, setMetaAno] = useState(0);
  

  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataFaturamento, setDataFaturamento] = useState<any>(null);
  const [dataGraficoAnual, setDataGraficoAnual] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth()+1;
  console.log(mesAtual)
  const anoAtualString = anoAtual.toString();

  const [receivedValue, setReceivedValue] = useState(mesAtual);
  const [selectedOption, setSelectedOption] = useState<string>(anoAtualString); 
  

  const mesParaChave: { [key: number]: string }  = {
    0: 'mt_vlrjan',
    1: 'mt_vlrfev',
    2: 'mt_vlrmar',
    3: 'mt_vlrabr',
    4: 'mt_vlrmai',
    5: 'mt_vlrjun',
    6: 'mt_vlrjul',
    7: 'mt_vlrago',
    8: 'mt_vlrset',
    9: 'mt_vlrout',
    10: 'mt_vlrnov',
    11: 'mt_vlrdez'
  };
  
  const chaveMetaMes:string = mesParaChave[mesAtual];
  console.log(chaveMetaMes)

  //----------------------------Meta------------------------------------------------
  useEffect(() => { 
    try {
      const fetchDataMetaMesAno = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        const responseMetaMesAno =  await api.get(`/meta/0/${idEmpresa}/0`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });

        setDataMeta(responseMetaMesAno.data.meta)
        setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
        setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
      }
      // setIsLoading(false);
      fetchDataMetaMesAno();
    } catch (error) {
      console.error("Erro ao chamar metas")
    }
  }, [receivedValue, selectedOption]);

//----------------------------Faturamento------------------------------------------------
  const [faturamentoAno, setFaturamentoAno] = useState(0);
  const [faturamentoMes, setFaturamentoMes] = useState(0);
  const [faturamentoSemana, setFaturamentoSemana] = useState(0);
  const [faturamentoDia, setFaturamentoDia] = useState(0);

  useEffect(() => { 
    try {
      const fetchDataFaturamento = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        console.log(receivedValue)
        const mes:number = Number(receivedValue)
        console.log(selectedOption)

        const responseFaturamento =  await api.get(`/venda/faturamento/${idEmpresa}/${selectedOption}/${mes}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });

        setDataFaturamento(responseFaturamento);
        console.log(responseFaturamento);
        setFaturamentoAno(responseFaturamento.data.buscar[0].total_ano);
        setFaturamentoMes(responseFaturamento.data.buscar[0].total_mes);
        setFaturamentoSemana(responseFaturamento.data.buscar[0].total_semana);
        setFaturamentoDia(responseFaturamento.data.buscar[0].total_dia);
        console.log(faturamentoAno);
        
      
      }
    
      fetchDataFaturamento();
    } catch (error) {
      console.error("Erro ao chamar faturamento")
    }
  }, [receivedValue, selectedOption]);

  console.log(faturamentoAno)

//-------------api gráfico anual--------------

  useEffect(() => { 
    try {
      const fetchDataGraficoAnual = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario')

        
        const responseGraficoAnual = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${selectedOption}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
        console.log(responseGraficoAnual)
        setDataGraficoAnual(responseGraficoAnual.data.notificacao[3].vendasmes)
        console.log(responseGraficoAnual.data.notificacao[3])
        console.log(responseGraficoAnual.data.notificacao[3].vendasmes)
        
      }

      fetchDataGraficoAnual();
    } catch (error) {
      console.error("Erro ao chamar gráfico anual")
    }
  }, [selectedOption]);



//--faturamentoAno--
  const anoPorcentagem = ((faturamentoAno / metaAno) * 100).toFixed(0);
  const faturamentoAnoFormatado = faturamentoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//---faturamentoMes--
  const mesPorcentagem = ((faturamentoMes / metaMes) * 100).toFixed(0);
  const faturamentoMesFormatado = faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//--faturamentoSemana--
  const semanaPorcentagem = ((faturamentoSemana / metaMes) * 100).toFixed(0);
  const faturamentoSemanaFormatado = faturamentoSemana.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//--faturamentoDia--
  const diaPorcentagem = ((faturamentoDia / metaMes) * 100).toFixed(0);
  const faturamentoDiaFormatado = faturamentoDia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//---------------------------------------------------------------------------

  //comita esse if para subir para a vercel
  if (!dataMeta && !dataFaturamento && !dataGraficoAnual) {
    return <LoadingPadrao />;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceivedValue(mesAtual);
    setSelectedOption(event.target.value); // Atualiza o estado com o valor selecionado
  };


  const handleValueFromChild = (value:any) => {
   
      console.log('passou')
      const mesNumero: { [key: string]: number }  = {
        'jan': 1,
        'fev': 2,
        'mar': 3,
        'abr': 4,
        'mai': 5,
        'jun': 6,
        'jul': 7,
        'ago': 8,
        'set': 9,
        'out': 10,
        'nov': 11,
        'dez': 12
      };
      const mesSelecionadoGrafico: number = mesNumero[value]; 
      forceRender();
      
      console.log(mesSelecionadoGrafico)
      if (mesSelecionadoGrafico !== undefined) {
        setReceivedValue(mesSelecionadoGrafico);
        console.log("chamou")
        console.log(receivedValue)
        console.log(mesAtual)
      }
      
      // Aqui você pode usar o valor recebido no código do pai
      console.log("Valor recebido do filho:", value);
      console.log("Valor recebido do filho:", mesSelecionadoGrafico);
      console.log("valor do receivedValue:", receivedValue);

  };


  console.log(selectedOption) //é string
 
  console.log(dataGraficoAnual)
  console.log("valor do receivedValue:", receivedValue);
  return (
    <div className=''>
     
      <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>
        
        <Metas metaMes={metaMes} metaAno={metaAno} />

        <Faturamento tipoFaturamento={'Dia'} valor={faturamentoDiaFormatado} porcentagem={diaPorcentagem} delay={0}/>
        <Faturamento tipoFaturamento={'semana'} valor={faturamentoSemanaFormatado} porcentagem={semanaPorcentagem} delay={30}/>
        <Faturamento tipoFaturamento={'Mês'} valor={String(faturamentoMesFormatado)} porcentagem={mesPorcentagem} delay={60}/>
        <Faturamento tipoFaturamento={'Ano'} valor={faturamentoAnoFormatado} porcentagem={anoPorcentagem} delay={90}/>

        <div className='flex min-w-[250px] max-w-full items-center rounded-t-lg h-10 bg-branco mr-4 ml-4 mt-4 mb-0 border-b-2'>
          <select value={selectedOption} onChange={handleSelectChange} className='bg-branco ml-1 h-7 cursor-pointer '>
            <option value={anoAtual}>
              Faturamento de {anoAtual}
            </option>
            <option value={anoAtual -1} className=''>Faturamento de {anoAtual -1}</option>
            <option value={anoAtual -2}>Faturamento de {anoAtual -2}</option>
            <option value={anoAtual -3}>Faturamento de {anoAtual -3}</option>
          </select>
        </div>

        <div id='background GraficoAnual'>
         {dataMeta && <GraficoAnual vendas={dataGraficoAnual} metas={dataMeta} sendValueToParent={handleValueFromChild} />} 
        </div>

      </div>
      {/* <Footer /> */}
    </div>
    )
    
};

export default DashboardComponent;