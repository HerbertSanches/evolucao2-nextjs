'use client'
import React, { use, useEffect, useState } from "react";
import api from "@/services/api";
import ModalAvisos from "./ModalAvisos";

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
  
  
  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    const idEmpresa = localStorage.getItem('idEmpresa');
    const tokenHeader = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario')
  
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
          type: 'sqlReceber', 
        })
      });

      if (responseCriptografiaContasReceber.ok) {
        const responseContasReceber = await responseCriptografiaContasReceber.json();

        setContasAReceberHoje(responseContasReceber.data.buscar[0].fc_hoje);
        setContasAReceberSemana(responseContasReceber.data.buscar[0].fc_semana);
        setContasAReceberVencido(responseContasReceber.data.buscar[0].fc_vencido);
      }

      const responseCriptografiaContasPagar = await fetch('/api/criptografia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'sqlPagar', 
        })
      });

      if (responseCriptografiaContasPagar.ok) {
        const responseContasPagar = await responseCriptografiaContasPagar.json();
        setContasAPagarHoje(responseContasPagar.data.buscar[0].fc_hoje);
        setContasAPagarSemana(responseContasPagar.data.buscar[0].fc_semana);
        setContasAPagarVencido(responseContasPagar.data.buscar[0].fc_vencido);
      }

    }
    fetchDataGenerinaPagarReceber();

    //------------------------

    try {
      const fetchDataAvisos = async () => {

        
        const responseAvisos = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${anoAtual}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
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
    } catch (error) {
      console.error("Erro ao chamar avisos")
    }
  }, []);
  

  console.log(dataAvisos)
  console.log(notasPendentes)

  const handleContasPagar = async () => {
    try {
      const response = await fetch('/api/criptografia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'sqlDataPagar', 
        })
      });

      if (response.ok) {
        const responseDataContasPagar = await response.json();
        console.log("CHAMOOOU")
        console.log("chamou", responseDataContasPagar.data)
        console.log(responseDataContasPagar)
      }
    } catch (error) {
      console.error("Erro ao chamar Data Pagar")
    }
  };

  console.log(produtoValidadeVencendo)

  const handleOpenModal = (buttonValue: string) => {
    setAvisoSelecionado(buttonValue);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAvisoSelecionado(null); // Resetar o valor do aviso ao fechar o modal
  };

  return (
    <>
      <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
        Dashboard Avisos
      </h1>
      
      <div className='flex flex-col ml-3 mr-3 mt-3 mb-4 pt-[1px] pb-[13px] bg-cinza rounded-[8px] h-auto'> 
        
        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev text-8xl h-auto mt-3">Â</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2 ">
            <p className="text-azulEscuro font-bold text-lg">Notas Pendentes</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">{notasPendentes} notas pendentes.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>


        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-8xl h-auto ">n</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2">
            <p className="text-azulEscuro font-bold text-lg">Qnt Mínima</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">{qntMinimoDoRecomendado} mínimo do recomendado.</p>
            <p className="text-azulEscuro text-base">{qntMinima} abaixo do mínimo.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('qntMinima')}>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-8xl h-auto ">d</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2  ">
            <p className="text-azulEscuro font-bold text-lg">Produtos a Vencer</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">{produtoValidadeVencendo || produtoValidadeVencendo === 0 ? produtoValidadeVencendo : ''} vencendo.</p> 
            <p className="text-azulEscuro text-base">{produtoValidadeVencido} vencidos.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3" onClick={() => handleOpenModal('produtosVencer')}>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-32 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-8xl h-auto ">$</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2 ">
            <p className="text-azulEscuro font-bold text-lg">Contas a Receber</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">{contasAReceberVencido} títulos vencidos.</p> 
            <p className="text-azulEscuro text-base">{contasAReceberHoje} títulos para hoje.</p>
            <p className="text-azulEscuro text-base">{contasAReceberSemana} títulos essa semana.</p>
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-32 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-8xl h-auto ">$</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2 ">
            <p className="text-azulEscuro font-bold text-lg">Contas a Pagar</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">{contasAPagarVencido} títulos vencidos.</p> 
            <p className="text-azulEscuro text-base">{contasAPagarHoje} títulos para hoje.</p>
            <p className="text-azulEscuro text-base">{contasAPagarSemana} títulos essa semana.</p>
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div onClick={handleContasPagar} className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
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
    </>
  );
}

export default AvisosComponent;