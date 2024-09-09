import { useState, useEffect } from "react";
import React from "react";


// Defina a estrutura da empresa
interface Empresa {
    ep_id: number;
    ep_nomerazao: string;
  }

const Header = () => {
  // Inicializa o estado como um array vazio
  const [dadosEmpresas, setDadosEmpresas] = useState<Empresa[]>([]);

 
  useEffect(() => {
    // Carrega as empresas do localStorage
    const empresas = localStorage.getItem('empresas');
    
    if (empresas) {
      try {
        const parsedData = JSON.parse(empresas);
        // Define o estado diretamente se `data.empresa` for válido
        setDadosEmpresas(parsedData?.data?.empresa || []);
      } catch (error) {
        console.error("Erro ao fazer o parse do JSON do empresa: ", error);
      }
    }
  }, []);
  return (
    <header className="bg-azulEscuro h-12 flex flex-1 items-center justify-between w-full">
      <nav className="p-4 flex flex-row items-center justify-between w-full">
        <img className="h-9" src="/assets/images/logo.png" alt="Logo" />
        <p className="text-branco font-bold">Riobaldo</p>

        <select className="bg-azulEscuro text-branco border-none w-28 outline-none" name="select" id="">
          <option value="">Selecione uma empresa</option>
          {dadosEmpresas.map((empresa) => (
            <option key={empresa.ep_id} value={empresa.ep_id}>
              {empresa.ep_nomerazao}
            </option>
          ))}
        </select>


        <img className="h-6" src="/assets/images/logout.png" alt="Logout" />
      </nav>
    </header>
  );
};

export default Header;
