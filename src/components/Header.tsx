import { _capitalize } from "chart.js/dist/helpers/helpers.core";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";



// Defina a estrutura da empresa
interface Empresa {
    ep_id: number;
    ep_nomerazao: string;
    ep_nomefantasia: string;
  }

const Header = () => {
  // Inicializa o estado como um array vazio
  const [dadosEmpresas, setDadosEmpresas] = useState<Empresa[]>([]);

  const [empresaSelecionada, setEmpresaSelecionada] = useState(0);

  const [ArrayEmpresas, setArrayEmpresas] = useState<Empresa[]>([]);

  const [urlEmpresa, setUrlEmpresas] = useState('');
  
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  
  let nome;

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  
 
  useEffect(() => {
    // Carrega as empresas do localStorage
    const empresas = localStorage.getItem('empresas');
    let empresaLocalStorage = localStorage.getItem('idEmpresa');
    let url = localStorage.getItem('urlEmpresa');
    nome = localStorage.getItem('NOMEFUNCIONARIO');
    setNomeFuncionario(nome ?? '');
    setUrlEmpresas(url ? JSON.parse(url) : null);
    setEmpresaSelecionada(empresaLocalStorage ? JSON.parse(empresaLocalStorage) : null);
    
    
  
    
    
    if (empresas) {
      try {
        
        const parsedData = JSON.parse(empresas);
       
        
        // Define o estado diretamente se `data.empresa` for válido

        const empresaLogada = (parsedData.data.empresa as Empresa[]).filter((empresa: Empresa) => 
        empresa.ep_id == Number(empresaLocalStorage)
        );
  

        const outrasEmpresas = (parsedData.data.empresa as Empresa[]).filter((empresa: Empresa) => 
        empresa.ep_id !== Number(empresaLocalStorage)
        );
  

        setArrayEmpresas([...empresaLogada, ...outrasEmpresas]);
       
        setDadosEmpresas(parsedData?.data?.empresa || []);

      } catch (error) {
        console.error("Erro ao fazer o parse do JSON do empresa: ", error);
      }
    }

  }, []);


  const Logout = () => {
    
    const router = useRouter();
    
    const handleLogout = () => {

      localStorage.removeItem('token');
      localStorage.removeItem('idEmpresa');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('empresas');

      router.push(`/login/${urlEmpresa}`);
      
    };

    return(handleLogout);

  }

  console.log("empresas filtradas:",ArrayEmpresas)
  

  const ChangeEmpresa = (event: React.ChangeEvent<HTMLSelectElement>) => 
  {


    const empSelecionada = parseInt((event.target as HTMLSelectElement).value, 10);
  
    localStorage.setItem('idEmpresa', String(empSelecionada));
  

    const handleChangeEmpresa = (event: React.ChangeEvent<HTMLSelectElement>) => {

      // const router = useRouter();
      // router.push(`/dashboard`);
  
    }

    
    return(handleChangeEmpresa)

  }
  


  return (
    <header className="bg-azulEscuro h-12 flex flex-1 items-center justify-between w-full">
      <nav className="p-4 flex flex-row items-center justify-between w-full">
        <img className="h-9" src="/assets/images/logo.png" alt="Logo" />
        <p className="text-branco font-bold">{capitalizeFirstLetter(nomeFuncionario)}</p>

        <select className="bg-azulEscuro text-branco border-none w-28 outline-none" name="select" onChange={ChangeEmpresa} id="">
          {ArrayEmpresas.map((empresa) => (
            <option key={empresa.ep_id} value={empresa.ep_id}>
              {empresa.ep_nomerazao}
            </option>
          ))}
        </select>

        
        <img onClick={Logout()} className="h-6 cursor-pointer" src="/assets/images/logout.png " alt="Logout" />

      </nav>
    </header>
  );
};

export default Header;
