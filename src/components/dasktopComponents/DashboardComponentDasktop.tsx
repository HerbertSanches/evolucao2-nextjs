import React, {useState, useEffect} from "react";
import MesesComponent from "./MesesComponent";
import MetasDasktop from "./MetasDasktop";
import { darkMode } from "@/services/comum.utils";
import FaturamentoDasktop from "./FaturamentoDasktop";
import api from "@/services/api";

const DashboardComponentDasktop = () => {
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState<string | null>('');

  const handleMesSelecionado = (mes:any) => {
    console.log("Mês recebido do filho:", mes);
    setMesSelecionado(mes);
    setMetaMesSelecionado(meses[mes-1].meta)
  };

  useEffect(() => {
    setMode(darkMode())
  },[mode])

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [metaMes, setMetaMes] = useState(0);
  const [metaAno, setMetaAno] = useState(0);
  
  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataFaturamento, setDataFaturamento] = useState<any>(null);
  const [dataGraficoAnual, setDataGraficoAnual] = useState<any>(null);
  const [metaMesSelecionado, setMetaMesSelecionado] = useState(0);

  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth()+1;
  const anoAtualString = anoAtual.toString();

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
      
        const responseMetaMesAno =  await api.post('meta/localizar', json,{});
        console.log('Meta: ', responseMetaMesAno)

        setDataMeta(responseMetaMesAno.data.meta)
        if (responseMetaMesAno.data.meta && responseMetaMesAno.data.meta[0] && responseMetaMesAno.data.meta[0].mt_vlrjan){
          setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
          console.log(responseMetaMesAno)
          setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
          setIsDataLoaded(true);
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
        console.log(idEmpresa)

        const mes:number = Number(mesSelecionado)

        console.log("ID EMPRESA: " , idEmpresa);
        const responseFaturamento =  await api.get(`/venda/faturamento/${idEmpresa}/${anoSelecionado}/${mes}`,{});
        console.log('Faturamento: ', responseFaturamento)
        setDataFaturamento(responseFaturamento);
        setFaturamentoAno(responseFaturamento.data.buscar[0].total_ano);
        setFaturamentoMes(responseFaturamento.data.buscar[0].total_mes);
        setFaturamentoSemana(responseFaturamento.data.buscar[0].total_semana);
        setFaturamentoDia(responseFaturamento.data.buscar[0].total_dia);
        setIsDataLoaded(true);
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
        const idUsuario = localStorage.getItem('idUsuario')
        
        const responseGraficoAnual = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${anoSelecionado}`,{});
        console.log('Grafico anual: ', responseGraficoAnual)
        setDataGraficoAnual(responseGraficoAnual.data.notificacao[3].vendasmes)

        console.log(idEmpresa);
        console.log(idUsuario);
      }

      fetchDataGraficoAnual();
    } catch (error) {
      console.error("Erro ao chamar gráfico anual")
    }
  }, [anoSelecionado]);

//---------------------------------------------------------------------------

  

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

  //--Porcentagens-- 
  // const faturamentoMesFormatado = faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const anoPorcentagem = ((faturamentoAno / metaAno) * 100).toFixed(0);
  const mesPorcentagem = ((faturamentoMes / metaMes) * 100).toFixed(0);
  const semanaPorcentagem = ((faturamentoSemana / metaMes) * 100).toFixed(0);
  const diaPorcentagem = ((faturamentoDia / metaMes) * 100).toFixed(0);
  const mesPorcentagemSelecionado = ((faturamentoMes / metaMesSelecionado) * 100).toFixed(0);
  
  
  
  
  //--------------------------------------------------------------------------------------


  const meses = [
    { mes: 0, nome: 'Jan', meta: 0, real: 0 },
    { mes: 1, nome: 'Fev', meta: 0, real: 0 },
    { mes: 2, nome: 'Mar', meta: 0, real: 0 },
    { mes: 3, nome: 'Abr', meta: 0, real: 0 },
    { mes: 4, nome: 'Mai', meta: 0, real: 0 },
    { mes: 5, nome: 'Jun', meta: 0, real: 0 },
    { mes: 6, nome: 'Jul', meta: 0, real: 0 },
    { mes: 7, nome: 'Ago', meta: 0, real: 0 },
    { mes: 8, nome: 'Set', meta: 0, real: 0 },
    { mes: 9, nome: 'Out', meta: 0, real: 0 },
    { mes: 10, nome: 'Nov', meta: 0, real: 0 },
    { mes: 11, nome: 'Dez', meta: 0, real: 0 },
  ];

  if (dataMeta && dataMeta[0] && dataMeta[0].mt_vlrjan) {
    for (let i = 0; i < meses.length; i++) {
      const mes = meses[i].mes;

      switch (mes) {
          case 0:
              meses[i].meta = dataMeta[0].mt_vlrjan || 0;
              break;
          case 1:
              meses[i].meta = dataMeta[0].mt_vlrfev || 0;
              break;
          case 2:
              meses[i].meta = dataMeta[0].mt_vlrmar || 0;
              break;
          case 3:
            meses[i].meta = dataMeta[0].mt_vlrabr || 0;
            break;
          case 4:
            meses[i].meta = dataMeta[0].mt_vlrmai|| 0;
            break;
          case 5:
              meses[i].meta = dataMeta[0].mt_vlrjun || 0;
              break;
          case 6:
            meses[i].meta = dataMeta[0].mt_vlrjul || 0;
              break;
          case 7:
            meses[i].meta = dataMeta[0].mt_vlrago || 0;
              break;
          case 8:
            meses[i].meta = dataMeta[0].mt_vlrset || 0;
              break;
          case 9:
            meses[i].meta = dataMeta[0].mt_vlrout || 0;
              break;
          case 10:
            meses[i].meta = dataMeta[0].mt_vlrnov || 0;
              break;
          case 11:
            meses[i].meta = dataMeta[0].mt_vlrdez || 0;
              break;
      }
    }
  }





  return(
    <div className={`${mode ==='S' ? 'bg-dark' : null}  h-[calc(100dvh-4rem)]`}>
      
      <MesesComponent onMesSelecionado={handleMesSelecionado} />
    
      <div className="grid grid-cols-4 gap-4 p-1 max-w-[1300px] mr-5">
      
        <div className={`bg-darkClaro rounded-2xl overflow-hidden shadow-global col-span-1 h-44 max-w-80`}>
          { mesAtual  !== mesSelecionado && mesAtual !== 0 ? ( 
            <MetasDasktop metaMes={metaMesSelecionado} mes={mesSelecionado-1} />
          ) : <MetasDasktop metaMes={metaMes} mes={mesSelecionado-1} />}
        </div>

        <div className="bg-darkClaro rounded-2xl overflow-hidden shadow-global col-span-1 h-44 max-w-80">
          
          { mesAtual  !== mesSelecionado && mesAtual !== 0 ? ( 
            <MetasDasktop metaAno={metaAno} ano={anoSelecionado} />
          ) : <MetasDasktop metaAno={metaAno} ano={anoSelecionado} />}

        </div>

        <div className="bg-darkClaro rounded-2xl overflow-hidden col-span-1 h-[350px] max-w-80 row-span-2">
        
          { mesAtual  !== mesSelecionado || mesAtual !== 0  && !isDataLoaded ? (
            <FaturamentoDasktop tipoFaturamento={'Mês'} valor={faturamentoMes} porcentagem={Number(mesPorcentagemSelecionado) } dasktopCardGrande={2}/> /*verificar se da pra tirar um*/ 
          ) : <FaturamentoDasktop tipoFaturamento={'Mês'} valor={faturamentoMes} porcentagem={Number(mesPorcentagem)} dasktopCardGrande={2}/>}
        
        </div>

        <div className="bg-darkClaro rounded-2xl overflow-hidden  col-span-1 h-96 max-w-80 row-span-2">
          <FaturamentoDasktop tipoFaturamento={'Ano'} valor={faturamentoAno} porcentagem={Number(anoPorcentagem)} dasktopCardGrande={2}/>
        </div>

        <div className="bg-darkClaro rounded-2xl overflow-hidden col-span-1 h-44 max-w-80">
          
          { mesAtual === mesSelecionado && anoAtual === Number(anoSelecionado)  ? (
            <FaturamentoDasktop tipoFaturamento={'Dia'} valor={faturamentoDia} porcentagem={Number(diaPorcentagem)} />
          ) :  <FaturamentoDasktop tipoFaturamento={'Dia'} valor={0} porcentagem={Number(0)} />}
          
        </div>
        
        <div className="bg-darkClaro rounded-2xl overflow-hidden col-span-1 h-44 max-w-80">
          
          { mesAtual === mesSelecionado && anoAtual === Number(anoSelecionado)  ? (
            <FaturamentoDasktop tipoFaturamento={'Semana'} valor={faturamentoSemana} porcentagem={Number(semanaPorcentagem)} />
          ) :  <FaturamentoDasktop tipoFaturamento={'Semana'} valor={0} porcentagem={Number(0)} />}
          
        </div>
      </div>


      
    </div>
  )
}

export default DashboardComponentDasktop;