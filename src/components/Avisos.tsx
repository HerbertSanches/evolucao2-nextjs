'use client'
import React, { use, useEffect, useState } from "react";
import api from "@/services/api";
import DashboardAvisosLoading from "../components/DashboardAvisosLoading"
import ModalAvisos from "./ModalAvisos";
import { darkMode } from "@/services/comum.utils";

const AvisosComponent = () => {
  const [dataAvisos, setDataAvisos] = useState('');
  const [notasPendentes, setNotasPendentes] = useState(0);
  const [qntMinimoDoRecomendado, setQntMinimoDoRecomendado] = useState(0);
  const [qntMinima, setQntMinima] = useState(0);
  const [produtoValidadeVencido, setProdutoValidadeVencido] = useState(0);
  const [produtoValidadeVencendo, setProdutoValidadeVencendo] = useState(0);

  const [contasAReceberHoje, setContasAReceberHoje] = useState(0);
  const [contasAReceberSemana, setContasAReceberSemana] = useState(0);
  const [contasAReceberVencido, setContasAReceberVencido] = useState(0);

  const [contasAPagarHoje, setContasAPagarHoje] = useState(0);
  const [contasAPagarSemana, setContasAPagarSemana] = useState(0);
  const [contasAPagarVencido, setContasAPagarVencido] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avisoSelecionado, setAvisoSelecionado] = useState<string | null>(null);
  const [mode, setMode] = useState<string | any>('');
  const anoAtual = new Date().getFullYear();
  
  const [responsePagarData, setResponsePagarData] = useState<any>(null);
  const [responseReceberData, setResponseReceberData] = useState<any>(null);
  const [responseAvisos, setResponseAvisosData] = useState<any>(null);
  // const [responseContasPagar, setResponseContasPagar] = useState<any>(null);

  useEffect(() => {
    const idEmpresa = localStorage.getItem('idEmpresa');
    const tokenHeader = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario')
    setMode(darkMode());
  
    const fetchDataGenerinaPagarReceber = async () => {
      
      // const responseCriptografiaContasReceber = await fetch('/api/criptografia', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     type: 'encode', 
      //     input: `{"sql": "select * from vw_financeirocontacontagem where fc_idempresa = ${idEmpresa} and fc_tiporegistro = 1"}` 
      //   })
      // });

        const responseCriptografiaContasReceber = await fetch('/api/criptografia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'sqlQuantidadePagarReceber', 
          idEmpresa: idEmpresa,
          inputPagarReceber: 1, 
        })
      });

      if (responseCriptografiaContasReceber.ok) {
        const responseContasReceber = await responseCriptografiaContasReceber.json();
        setResponsePagarData(responseContasReceber);
        // console.log(responseContasReceber.data.buscar[0].fc_hoje)
        if (responseContasReceber?.data?.buscar?.length > 0) {
          const contasReceber = responseContasReceber.data.buscar[0];
      
          // Verifique se as propriedades existem antes de acessá-las
          if (contasReceber.fc_hoje !== undefined) {
            setContasAReceberHoje(contasReceber.fc_hoje);
          }
          if (contasReceber.fc_semana !== undefined) {
            setContasAReceberSemana(contasReceber.fc_semana);
          }
          if (contasReceber.fc_vencido !== undefined) {
            setContasAReceberVencido(contasReceber.fc_vencido);
          }
        }
      }

      const responseCriptografiaContasPagar = await fetch('/api/criptografia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'sqlQuantidadePagarReceber',
          idEmpresa: idEmpresa,
          inputPagarReceber: 2, 
        })
      });

      if (responseCriptografiaContasPagar.ok) {
        const responseContasPagar = await responseCriptografiaContasPagar.json();

        if (responseContasPagar?.data?.buscar?.length > 0) {
          setResponseReceberData(responseContasPagar)
        
          setContasAPagarHoje(responseContasPagar.data.buscar[0].fc_hoje);
        
          setContasAPagarSemana(responseContasPagar.data.buscar[0].fc_semana);
          setContasAPagarVencido(responseContasPagar.data.buscar[0].fc_vencido);
        }
      }

    }
    fetchDataGenerinaPagarReceber();

    //------------------------

    try {
      const fetchDataAvisos = async () => {

        
        const responseAvisos = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${anoAtual}`,{});
        console.log('Avisos: ', responseAvisos);
        console.log('Avisos: ', idUsuario);
        setDataAvisos(responseAvisos.data);
        if (responseAvisos.data.notificacao[0].notapedente.nf_quantidade) {
          setNotasPendentes(responseAvisos.data.notificacao[0].notapedente.nf_quantidade);
        }
        
        if (responseAvisos.data.notificacao[1].qntminima.nf_minimo) {
          setQntMinimoDoRecomendado(responseAvisos.data.notificacao[1].qntminima.nf_minimo);
        }
        
        if (responseAvisos.data.notificacao[1].qntminima.nf_abaixo) {
          setQntMinima(responseAvisos.data.notificacao[1].qntminima.nf_abaixo);
        }
        
        if(responseAvisos.data.notificacao[2].produtovalidade.nf_vencido) {
          setProdutoValidadeVencido(responseAvisos.data.notificacao[2].produtovalidade.nf_vencido);
        }
        
        if (responseAvisos.data.notificacao[2].produtovalidade.nf_vencendo) {
          setProdutoValidadeVencendo(responseAvisos.data.notificacao[2].produtovalidade.nf_vencendo)
        }
        
      }
  
      fetchDataAvisos();
      setResponseAvisosData(responseAvisos);
    } catch (error) {
      console.error("Erro ao chamar avisos")
    }
    
  }, []);

  const CorBordaPendente = () => {
    if(notasPendentes === 0){
      return 'bg-green-500';
    }if(notasPendentes > 0){
      return 'bg-red-600';
    } 
  }

  const CorBordaQntMinima = () => {
    if(qntMinimoDoRecomendado > 0 && qntMinima <= 0){ //retorna amarelo
      return 'bg-yellow-500';
    }
    if(qntMinima > 0){
      return 'bg-red-600';
    }
    if(qntMinima === 0 && qntMinimoDoRecomendado === 0){
      return 'bg-green-500'
    }
  }

  const CorVencer = () => {
    if(produtoValidadeVencido === 0 && produtoValidadeVencendo === 0){
      return 'bg-green-500'
    }
    if(produtoValidadeVencendo > 0 && produtoValidadeVencido <= 0){
      return 'bg-yellow-500'
    }
    if(produtoValidadeVencido > 0){
      return 'bg-red-600'
    }
  }


  const CorReceber = () => {
    if(contasAReceberHoje === 0 && contasAReceberSemana === 0 && contasAReceberVencido === 0 ){
      return 'bg-green-500'
    }
    if(contasAReceberVencido > 0){
      return 'bg-red-600'
    }
    if(contasAReceberSemana > 0 || contasAReceberHoje > 0 && contasAPagarVencido <= 0){
      return 'bg-yellow-500'
    }
  }


  const CorPagar = () => {
    if(contasAPagarHoje === 0 && contasAPagarSemana === 0 && contasAPagarVencido === 0 ){
      return 'bg-green-500'
    }
    if(contasAPagarVencido> 0){
      return 'bg-red-600'
    }
    if(contasAPagarSemana > 0 || contasAPagarHoje > 0 && contasAPagarVencido <= 0){
      return 'bg-yellow-500'
    }
  }

  // setResponsePagarData, setResponseReceberData, setResponseAvisosData


  console.log(produtoValidadeVencendo)

  const handleOpenModal = (buttonValue: string) => {
    setAvisoSelecionado(buttonValue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAvisoSelecionado(null); // Resetar o valor do aviso ao fechar o modal
  };

  if (!responsePagarData && !responseReceberData && !responseAvisos) {
    return <DashboardAvisosLoading/>;
  } 
  
  return (

    <div className={`${mode === 'true' ? 'bg-dark ' : 'bg-white'} h-screen`}>


        <h1 className={`flex ${mode === 'true' ? 'text-white bg-darkClaro border-t border-white' : 'text-azulEscuro bg-white'} items-center justify-center font-bold text-xl p-3`}>
          Dashboard Avisos
        </h1>

        <div className={`flex flex-col ml-3 mr-3 mt-3 mb-4 pt-[1px] pb-[13px] ${mode === 'true' ? 'bg-dark ' : 'bg-slate-300 bg-opacity-50'} rounded-[8px] h-auto`}>

          <div className={`flex h-28 items-center ${mode === 'true' ? 'bg-darkClaro' : 'bg-white'} bg-branco ml-4 mr-4 mt-3 rounded-lg relative `}>
            <div className={`h-full w-2 rounded-l-md ${CorBordaPendente()}`}></div>
            <h1 className={`fonte-ev filter ${mode === 'true' ? 'brightness-0 invert' : ''}  text-8xl h-auto mt-3`}>Â</h1>

            {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
            <div className="flex flex-col justify-center ml-2 ">
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} font-bold text-lg`}>Notas Pendentes</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>Você tem:</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{notasPendentes} notas pendentes.</p> {/* Ajuste de número de notas */}
            </div>

            {/* Ícone de três pontos (kebab menu) */}
            <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('notasPendentes')}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>


          <div className={`flex h-28 items-center ${mode === 'true' ? 'bg-darkClaro' : 'bg-white'} bg-branco ml-4 mr-4 mt-3 rounded-lg relative `}>
            <div className={`h-full w-2 rounded-l-md ${CorBordaQntMinima()}`}></div>
            <h1 className={`fonte-ev filter ${mode === 'true' ? 'brightness-0 invert' : ''}  text-8xl h-auto mt-3`}>n</h1>

            {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
            <div className="flex flex-col justify-center ml-2">
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} font-bold text-lg`}>Qnt Mínima</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>Você tem:</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{qntMinimoDoRecomendado} mínimo do recomendado.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{qntMinima} abaixo do mínimo.</p> {/* Ajuste de número de notas */}
            </div>

            {/* Ícone de três pontos (kebab menu) */}
            <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('qntMinima')}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          <div className={`flex h-28 items-center ${mode === 'true' ? 'bg-darkClaro' : 'bg-white'} bg-branco ml-4 mr-4 mt-3 rounded-lg relative `}>
            <div className={`h-full w-2 rounded-l-md ${CorReceber()}`}></div>
            <h1 className={`fonte-ev filter ${mode === 'true' ? 'brightness-0 invert' : ''}  text-8xl h-auto mt-3`}>d</h1>

            {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
            <div className="flex flex-col justify-center ml-2  ">
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} font-bold text-lg`}>Produtos a Vencer</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>Você tem:</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{produtoValidadeVencendo || produtoValidadeVencendo === 0 ? produtoValidadeVencendo : ''} vencendo.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{produtoValidadeVencido} vencidos.</p> {/* Ajuste de número de notas */}
            </div>

            {/* Ícone de três pontos (kebab menu) */}
            <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('produtosVencer')}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          <div className={`flex h-32 items-center ${mode === 'true' ? 'bg-darkClaro' : 'bg-white'} bg-branco ml-4 mr-4 mt-3 rounded-lg relative `}>
            <div className={`h-full w-2 rounded-l-md ${CorVencer()}`}></div>
            <h1 className={`fonte-ev filter ${mode === 'true' ? 'brightness-0 invert' : ''}  text-8xl h-auto mt-3`}>$</h1>

            {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
            <div className="flex flex-col justify-center ml-2 ">
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} font-bold text-lg`}>Contas a Receber</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>Você tem:</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAReceberVencido} títulos vencidos.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAReceberHoje} títulos para hoje.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAReceberSemana} títulos essa semana.</p>
            </div>

            {/* Ícone de três pontos (kebab menu) */}
            <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('contasReceber')}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          <div className={`flex h-32 items-center ${mode === 'true' ? 'bg-darkClaro' : 'bg-white'} bg-branco ml-4 mr-4 mt-3 rounded-lg relative `}>
            <div className={`h-full w-2 rounded-l-md ${CorPagar()}`}></div>
            <h1 className={`fonte-ev filter ${mode === 'true' ? 'brightness-0 invert' : ''}  text-8xl h-auto mt-3`}>$</h1>

            {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
            <div className="flex flex-col justify-center ml-2 ">
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} font-bold text-lg`}>Contas a Pagar</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>Você tem:</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAPagarVencido} títulos vencidos.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAPagarHoje} títulos para hoje.</p>
              <p className={`${mode === 'true' ? 'text-white' : 'text-azulEscuro'} text-base`}>{contasAPagarSemana} títulos essa semana.</p>
            </div>

            {/* Ícone de três pontos (kebab menu) */}
            <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('contasPagar')}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {avisoSelecionado !== null && (
          <ModalAvisos
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            tipoAviso={avisoSelecionado}
          />
        )}
      </div>

  );
}

export default AvisosComponent;