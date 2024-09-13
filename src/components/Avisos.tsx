'use client'
import React, { use, useEffect, useState } from "react";
import api from "@/services/api";

const AvisosComponent = () => {
  const [dataAvisos, setDataAvisos] = useState('');
  const [notasPendentes, setNotasPendentes] = useState('');
  const [qntMinimoDoRecomendado, setQntMinimoDoRecomendado] = useState('');
  const [qntMinima, setQntMinima] = useState('');
  const [produtoValidadeVencido, setProdutoValidadeVencido] = useState('');
  const [produtoValidadeVencendo, setProdutoValidadeVencendo] = useState('');
  const [constasAReceber, setContasAReceber] = useState('');
  
  const anoAtual = new Date().getFullYear();
  useEffect(() => {
    try {
      const fetchDataAvisos= async () => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario')
  
        
        const responseAvisos = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${anoAtual}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
        console.log('Avisos: ', responseAvisos);

        setDataAvisos(responseAvisos.data);
        setNotasPendentes(responseAvisos.data.notificacao[0].notapedente.nf_quantidade);
        //verificar o minimo depois
        setQntMinimoDoRecomendado(responseAvisos.data.notificacao[1].qntminima.nf_minimo);
        setQntMinima(responseAvisos.data.notificacao[1].qntminima.nf_abaixo);
        setProdutoValidadeVencido(responseAvisos.data.notificacao[2].produtovalidade.nf_vencido);
        setProdutoValidadeVencendo(responseAvisos.data.notificacao[2].produtovalidade.nf_vencendo)
      }
  
      fetchDataAvisos();
    } catch (error) {
      console.error("Erro ao chamar avisos")
    }
  }, []);
  

  console.log(dataAvisos)
  console.log(notasPendentes)
  return (
    <>
      <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
        Dashboard Avisos
      </h1>
      
      <div className='flex flex-col ml-3 mr-3 mt-3 mb-4 pt-[1px] pb-[13px] bg-cinza rounded-[8px] h-auto'> 
        
        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev text-8xl h-auto mt-3">Â</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center  ml-2">
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
            <p className="text-azulEscuro text-base">{qntMinima} abaixo do padrão.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
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
            <p className="text-azulEscuro text-base">{produtoValidadeVencendo} vencendo.</p> 
            <p className="text-azulEscuro text-base">{produtoValidadeVencido} abaixo do padrão.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-8xl h-auto ">$</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center ml-2 ">
            <p className="text-azulEscuro font-bold text-lg">Contas a Receber</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">2 títulos vencidos.</p> {/* Ajuste de número de notas */}
            <p className="text-azulEscuro text-base">0 títulos essa semana.</p>
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

      </div>  
    </>
  );
}

export default AvisosComponent;