import { _capitalize } from "chart.js/dist/helpers/helpers.core";
import { useState, useEffect } from "react";
import React from "react";
import { ComboBox, EmpresaOption } from "../ComboBox";


// Defina a estrutura da empresa
// interface Empresa {
//   ep_id: number;
//   ep_nomerazao: string;
//   ep_nomefantasia: string;
// }

interface usuarioGrupo {
  us_id: number;
  us_idempresa: number;
}

const HeaderDasktop = () => {




  
  const [ArrayEmpresas, setArrayEmpresas] = useState<EmpresaOption[]>([]);
  const [usuarioGrupo, setUsuarioGrupo] = useState<usuarioGrupo[]>([]);
  const [urlEmpresa, setUrlEmpresas] = useState('');
  const [mode, setMode] = useState<string | null>('');
  
  const [nomeFuncionario, setNomeFuncionario] = useState('');

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const empresas = localStorage.getItem('empresas');
    const storedUsuarioGrupo = localStorage.getItem('usuarioGrupo');
    const empresaLocalStorage = localStorage.getItem('idEmpresa');
    
    const modeGetLocalStorage = localStorage.getItem('darkMode');

    setMode(modeGetLocalStorage); //pegando o mode aqui
    const url = localStorage.getItem('urlEmpresa');
    const nome = localStorage.getItem('NOMEFUNCIONARIO');

    setNomeFuncionario(nome ?? '');
    setUrlEmpresas(url ? JSON.parse(url) : '');

    setUsuarioGrupo(storedUsuarioGrupo && typeof storedUsuarioGrupo === 'string' && storedUsuarioGrupo !== 'undefined' ? JSON.parse(storedUsuarioGrupo) : []);
    if (empresas) {
      try {
        const parsedData = JSON.parse(empresas);
        const empresaLogada = (parsedData.data.empresa as EmpresaOption[]).filter((empresa: EmpresaOption) =>
          empresa.ep_id === Number(empresaLocalStorage)
        );
        const outrasEmpresas = (parsedData.data.empresa as EmpresaOption[]).filter((empresa: EmpresaOption) =>
          empresa.ep_id !== Number(empresaLocalStorage)
        );

        setArrayEmpresas([...empresaLogada, ...outrasEmpresas]);
      } catch (error) {
        console.error("Erro ao fazer o parse do JSON do empresa: ", error);
      }
    }
  }, []);

  const ChangeEmpresa = (value: number) => {
    // Atualiza o idEmpresa no localStorage
    localStorage.setItem('idEmpresa', String(value));
  
    // Buscar o us_id associado à empresa selecionada
    const empresaSelecionada = ArrayEmpresas.find(empresa => empresa.ep_id === value);
  
    if (empresaSelecionada) {
      // Atualizar o idUsuario com o us_id correspondente
      const usuario = usuarioGrupo.find(ug => ug.us_idempresa === empresaSelecionada.ep_id);
      console.log(usuario);
      if (usuario) {
        localStorage.setItem('idUsuario', String(usuario.us_id));
      }
    }
  
    // Recarregar a página, forçando a carregar com as alterações feitas no localStorage
    window.location.reload();
  };
  
  console.log(ArrayEmpresas)

  return (
    <header className={`h-16 flex  w-full ${mode === 'S' ? 'bg-dark' : 'bg-azulEscuro'}`}>
      <nav className="flex flex-row items-end w-full ml-32 justify-between">
  
        <h1 className="mb-2  text-branco font-medium fonte-inter tablet:text-2xl laptop:text-4xl ">Dashboard Faturamento</h1>
  
        <p className="mb-2 text-branco truncate font-regular fonte-inter tablet:text-base laptop:text-xl ml-6">{capitalizeFirstLetter(nomeFuncionario)}</p>
  
        {/* <select className={`flex  bg-azulEscuro truncate font-regular fonte-inter text-xl text-branco border-none outline-none max-w-80 items-end justify-end ${mode === 'S' ? 'bg-dark' : 'bg-azulEscuro'}`} 
                name="select" onChange={ChangeEmpresa}>
                   
          {ArrayEmpresas.map((empresa) => (
            <option key={empresa.ep_id} value={empresa.ep_id}>
              {empresa.ep_nomerazao}
            </option>
          ))}
        </select> */}

        <ComboBox options={ArrayEmpresas} onChange={ChangeEmpresa} tipoComboBox={'header'} />
  
      </nav>
    </header>
  );
  
  
};

export default HeaderDasktop;