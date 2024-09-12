'use client'
import React from "react";

const AvisosComponent = () => {
  console.log('teste')

  
  return (
    <>
      <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
        Dashboard Avisos
      </h1>
      
      <div className='flex flex-col ml-3 mr-3 mt-3 mb-4 pt-[1px] pb-[13px] bg-cinza rounded-[8px] h-auto'> 
        
        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-9xl h-auto mt-4">Â</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center absolute ml-32 top-2 space-y-2">
            <p className="text-azulEscuro font-bold text-lg">Notas Pendentes</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">1 notas pendentes.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>


        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-9xl h-auto ">n</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center absolute ml-32 top-2 space-y-2">
            <p className="text-azulEscuro font-bold text-lg">Qnt Mínima</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">3 abaixo do padrão.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-9xl h-auto ">d</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center absolute ml-32 top-2 space-y-2">
            <p className="text-azulEscuro font-bold text-lg">Contas a Pagar</p>
            <p className="text-azulEscuro text-base">Você tem:</p>
            <p className="text-azulEscuro text-base">2 notas a pagar.</p> {/* Ajuste de número de notas */}
          </div>

          {/* Ícone de três pontos (kebab menu) */}
          <div className="flex flex-col items-center justify-center space-y-1 absolute right-3 p-1 top-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex h-28 items-center bg-branco ml-4 mr-4 mt-3 rounded-lg relative ">
         <h1 className="fonte-ev left-0 text-9xl h-auto ">$</h1>
          
          {/* Texto de Notas Pendentes - agora centralizado verticalmente */}
          <div className="flex flex-col justify-center absolute ml-32 top-2 ">
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