import { _capitalize } from "chart.js/dist/helpers/helpers.core";
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";
import React from "react";



// Defina a estrutura da empresa
interface Empresa {
  ep_id: number;
  ep_nomerazao: string;
  ep_nomefantasia: string;
}

interface usuarioGrupo {
  us_id: number;
  us_idempresa: number;
}

const Header = () => {
  const [ArrayEmpresas, setArrayEmpresas] = useState<Empresa[]>([]);
  const [usuarioGrupo, setUsuarioGrupo] = useState<usuarioGrupo[]>([]);
  const [urlEmpresa, setUrlEmpresas] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [isDarkMode, setIsDarkMode] = useState('');

  let nome;

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const empresas = localStorage.getItem('empresas');
    const storedUsuarioGrupo = localStorage.getItem('usuarioGrupo');
    const empresaLocalStorage = localStorage.getItem('idEmpresa');
    const url = localStorage.getItem('urlEmpresa');
    const nome = localStorage.getItem('NOMEFUNCIONARIO');
    const darkMode = localStorage.getItem('DarkMode');


    setIsDarkMode(darkMode ?? '');
    setNomeFuncionario(nome ?? '');
    setUrlEmpresas(url ? JSON.parse(url) : '');
    // setUsuarioGrupo(storedUsuarioGrupo ? JSON.parse(storedUsuarioGrupo) : []);

    // setUsuarioGrupo(storedUsuarioGrupo && typeof storedUsuarioGrupo === 'string' ? JSON.parse(storedUsuarioGrupo) : []);

    setUsuarioGrupo(storedUsuarioGrupo && typeof storedUsuarioGrupo === 'string' && storedUsuarioGrupo !== 'undefined' ? JSON.parse(storedUsuarioGrupo) : []);
    if (empresas) {
      try {
        const parsedData = JSON.parse(empresas);
        const empresaLogada = (parsedData.data.empresa as Empresa[]).filter((empresa: Empresa) =>
          empresa.ep_id === Number(empresaLocalStorage)
        );
        const outrasEmpresas = (parsedData.data.empresa as Empresa[]).filter((empresa: Empresa) =>
          empresa.ep_id !== Number(empresaLocalStorage)
        );

        setArrayEmpresas([...empresaLogada, ...outrasEmpresas]);
      } catch (error) {
        console.error("Erro ao fazer o parse do JSON do empresa: ", error);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (ArrayEmpresas.length > 0 && usuarioGrupo.length > 0) {
  //     const resultado = ArrayEmpresas.map(empresa => {
  //       const usuario = usuarioGrupo.find(ug => ug.us_idempresa === empresa.ep_id);
  //       return usuario 
  //         ? { ...empresa, us_id: usuario.us_id, us_idempresa: usuario.us_idempresa } 
  //         : empresa;
  //     });
  
  //     console.log(resultado);
  //     setEmpresaDefinitivo(resultado as empresaDefinitivo[]); // Assegure-se de fazer o cast para o tipo correto
  //   }
  // }, [usuarioGrupo, ArrayEmpresas]);

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


  const ChangeEmpresa = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const empSelecionada = parseInt((event.target as HTMLSelectElement).value, 10);
    
    //Atualiza o idEmpresa no localStorage
    localStorage.setItem('idEmpresa', String(empSelecionada));
  
    //Buscar o us_id associado à empresa selecionada
    const empresaSelecionada = ArrayEmpresas.find(empresa => empresa.ep_id === empSelecionada);
    
    if (empresaSelecionada) {
      //Atualizar o idUsuario com o us_id correspondente
      const usuario = usuarioGrupo.find(ug => ug.us_idempresa === empresaSelecionada.ep_id);
      console.log(usuario)
      if (usuario) {
        localStorage.setItem('idUsuario', String(usuario.us_id));
      }
    }
  
    // Recarregar a página, forçando a carregar com as alterações feitas no localStorage
    window.location.reload();
  }

    console.log("%c É dark mode? :", "color: yellow; background-color:black;padding:1rem", isDarkMode);

  return (
    <header className={`${isDarkMode === 'true'
      ? 'bg-slate-900'
      : 'bg-slate-500'
    } h-12 flex flex-1 items-center justify-between w-full`}>
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
