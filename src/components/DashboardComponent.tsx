import React, { useEffect, useState, useReducer } from 'react';
import Metas  from '../components/Metas'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'
import api from '@/services/api';
import LoadingPadrao from '@/app/loading';


const DashboardComponent: React.FC = () => {
  const [metaMes, setMetaMes] = useState(0);
  const [metaAno, setMetaAno] = useState(0);
  
  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataFaturamento, setDataFaturamento] = useState<any>(null);
  const [dataGraficoAnual, setDataGraficoAnual] = useState<any>(null);
  const [metaMesSelecionado, setMetaMesSelecionado] = useState(0);

  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth()+1;
  const anoAtualString = anoAtual.toString();
  const [mesSelecionado, setMesSelecionado] = useState(mesAtual);
  const [anoSelecionado, setAnoSelecionado] = useState<string>(anoAtualString); 
  
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
  
  const chaveMetaMes:string = mesParaChave[mesAtual-1];

  //----------------------------Meta------------------------------------------------
  useEffect(() => { 
    try {
      const fetchDataMetaMesAno = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        const ftInteger = 3; 
        const coIGUAL = 1; 
        const json = {
          meta: [
              {
              campo: 'mt_anovigente',
              valor: Number(anoSelecionado),
              condicao: coIGUAL,
              tipo: ftInteger
              },
              {
              campo: 'mt_idempresa',
              valor: Number(idEmpresa),
              condicao: coIGUAL,
              tipo: ftInteger
              }
          ]
        };
      
        const responseMetaMesAno =  await api.post('meta/localizar', json,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
        console.log('Meta: ', responseMetaMesAno)

        setDataMeta(responseMetaMesAno.data.meta)
        if (responseMetaMesAno.data.meta && responseMetaMesAno.data.meta[0] && responseMetaMesAno.data.meta[0].mt_vlrjan){
          setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
          console.log(responseMetaMesAno)
          setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
        }
        
      }

      fetchDataMetaMesAno();
    } catch (error) {
      console.error("Erro ao chamar metas")
    }
  }, [mesSelecionado, anoSelecionado]);
  console.log(metaMes)
//----------------------------Faturamento------------------------------------------------
  const [faturamentoAno, setFaturamentoAno] = useState(0);
  const [faturamentoMes, setFaturamentoMes] = useState(0);
  const [faturamentoSemana, setFaturamentoSemana] = useState(0);
  const [faturamentoDia, setFaturamentoDia] = useState(0);
  const [idEmpresaGeral, setIdEmpresaGeral] = useState(0);
  

  useEffect(() => { 
    const idEmpresaConst = localStorage.getItem('idEmpresa')
    setIdEmpresaGeral(Number(idEmpresaConst) ?? 0); 
    console.log(idEmpresaGeral)
    try {
      const fetchDataFaturamento = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')
        console.log(idEmpresa)

        const mes:number = Number(mesSelecionado)

        console.log("ID EMPRESA: " , idEmpresa);
        const responseFaturamento =  await api.get(`/venda/faturamento/${idEmpresa}/${anoSelecionado}/${mes}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
        console.log('Faturamento: ', responseFaturamento)
        setDataFaturamento(responseFaturamento);
        setFaturamentoAno(responseFaturamento.data.buscar[0].total_ano);
        setFaturamentoMes(responseFaturamento.data.buscar[0].total_mes);
        setFaturamentoSemana(responseFaturamento.data.buscar[0].total_semana);
        setFaturamentoDia(responseFaturamento.data.buscar[0].total_dia);
      }
    
      fetchDataFaturamento();
    } catch (error) {
      console.error("Erro ao chamar faturamento")
    }
  }, [mesSelecionado, anoSelecionado, setIdEmpresaGeral]);

//-------------api gráfico anual--------------

  useEffect(() => { 
    try {
      const fetchDataGraficoAnual = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario')

        
        const responseGraficoAnual = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${anoSelecionado}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
        console.log('Grafico anual: ', responseGraficoAnual)
        setDataGraficoAnual(responseGraficoAnual.data.notificacao[3].vendasmes)
      }

      fetchDataGraficoAnual();
    } catch (error) {
      console.error("Erro ao chamar gráfico anual")
    }
  }, [anoSelecionado]);

//--Porcentagens-- 
  const anoPorcentagem = ((faturamentoAno / metaAno) * 100).toFixed(0);
  const mesPorcentagem = ((faturamentoMes / metaMes) * 100).toFixed(0);
  const semanaPorcentagem = ((faturamentoSemana / metaMes) * 100).toFixed(0);
  const diaPorcentagem = ((faturamentoDia / metaMes) * 100).toFixed(0);
  const mesPorcentagemSelecionado = ((faturamentoMes / metaMesSelecionado) * 100).toFixed(0);
//---------------------------------------------------------------------------

  if (!dataMeta && !dataFaturamento && !dataGraficoAnual) {
    return <LoadingPadrao />;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesSelecionado(mesAtual);
    setAnoSelecionado(event.target.value);
  };

  const handMesSelecionado = (value:any) => {
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
    
    if (mesSelecionadoGrafico !== undefined) {
      setMesSelecionado(mesSelecionadoGrafico);
    }
  }; 

  const handleMetaSelecionada = (value:any) => {
    console.log('meta do mes selecionado: ',value)
    setMetaMesSelecionado(value)
  }

  function resetarMesAno() {
    setAnoSelecionado(anoAtual.toString());
    setMesSelecionado(mesAtual)
  }

  console.log(anoSelecionado)
  console.log(mesSelecionado)
  console.log(mesAtual)
  console.log(anoAtual)
  console.log(metaMesSelecionado)
  return (
    
      
     
      <div className=' bg-blue-100 rounded-[8px] h-auto'>
      <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
        Dashboard Faturamento
      </h1>

        { mesAtual  !== mesSelecionado && mesAtual !== 0 ? ( 
          <Metas metaMes={metaMesSelecionado} mes={mesSelecionado-1} metaAno={metaAno} ano={anoSelecionado} />
        ) : <Metas metaMes={metaMes} mes={mesSelecionado-1} metaAno={metaAno} ano={anoSelecionado} />}
        
        { mesAtual === mesSelecionado && anoAtual === Number(anoSelecionado)  ? (
          <>
            <Faturamento tipoFaturamento={'Dia'} valor={faturamentoDia} porcentagem={Number(diaPorcentagem)} />
            <Faturamento tipoFaturamento={'semana'} valor={faturamentoSemana} porcentagem={Number(semanaPorcentagem)} />
          </>
        ) : null}

        { mesAtual  !== mesSelecionado || mesAtual !== 0 ? (
          <Faturamento tipoFaturamento={'Mês'} valor={faturamentoMes} porcentagem={Number(mesPorcentagem)} />
        ) : <Faturamento tipoFaturamento={'Mês'} valor={faturamentoMes} porcentagem={Number(mesPorcentagemSelecionado)} />}
        
        <Faturamento tipoFaturamento={'Ano'} valor={faturamentoAno} porcentagem={Number(anoPorcentagem)} />
       
        <div className='flex min-w-[250px] max-w-full items-center justify-between rounded-t-lg h-10 bg-branco mr-4 ml-4 mt-4 mb-0 border-b-2'>
          <select value={anoSelecionado} onChange={handleSelectChange} className='bg-branco ml-1 h-7 cursor-pointer '>
            <option value={anoAtual}>
              Faturamento de {anoAtual}
            </option>
            <option value={anoAtual - 1}>Faturamento de {anoAtual - 1}</option>
            <option value={anoAtual - 2}>Faturamento de {anoAtual - 2}</option>
            <option value={anoAtual - 3}>Faturamento de {anoAtual - 3}</option>
          </select>

          { mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado)  ? (
          <>
            <button onClick={resetarMesAno} className='text-azulEscuro text-[8px] mr-1 bg-cinza rounded-md p-1 w-max-50px shadow-md'>Filtrado: mês {mesSelecionado} ano {anoSelecionado} X</button>
          </>
          ) : null} 
        </div>

        <div id='background GraficoAnual'>
          {dataMeta && <GraficoAnual vendas={dataGraficoAnual} metas={dataMeta} sendMesSelecionado={handMesSelecionado} sendMetaSelecionada={handleMetaSelecionada} />} 
        </div>

      </div>
  
    )
    
};

export default DashboardComponent;