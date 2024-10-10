'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import usuarioIcon from '../../public/assets/images/usuario.png';
import cadeadoIcon from '../../public/assets/images/cadeado.png';
import logo from '../../public/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ComboBox } from './ComboBox'
import { apiCompany } from '../services/api';

const LoginTela: React.FC = () => {
  const pathname = usePathname();
  const company = useMemo(() => pathname?.split('/').pop(), [pathname]);
  console.log('empresa: ', company)

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(0);
  const [empresas, setEmpresas] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const { signIn, token } = useAuth();


  const handleEncode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("chamou handleEncode")
    try {
      const response = await fetch('/api/criptografia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'encode', 
          input: password 
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao criptografar a senha');
      }
  
      const { result: encodedPassword } = await response.json();
      
      await signIn({ username, password: encodedPassword, selectedCompanyId });

      localStorage.setItem('NOMEFUNCIONARIO', username);
      // router.push('/dashboard');

    } catch (error) {
      console.error("Erro ao fazer o request do login: ", error);
    }
  };

  useEffect(() => {
    console.log('Componente montado ou pathname alterado:', company);
    setIsClient(true);

    const chamarEmpresa = async () => {
      try {
        const response = await apiCompany.get(`autenticacao/validacao-dashboard/${company}`);

        const data = response;
        localStorage.setItem("urlEmpresa", JSON.stringify(company));
        localStorage.setItem("empresas", JSON.stringify(data));
        setEmpresas(data.data.empresa);
      } catch (error) {
        console.error('Erro ao chamar a empresa:', error);
        setLoginError(true);
      }
    };
  
    chamarEmpresa();
  
    return () => {
      console.log('Componente desmontado');
    };
  }, [company]);
   
  return (
    <div className='flex items-center justify-center min-h-screen bg-azulEscuro md:bg-azulClaro w-full'>
      <div id="login_container" className="flex flex-col h-[80vh] w-full md:max-w-[100vh] items-center justify-center bg-azulEscuro text-white p-10 rounded-[20px] sm:shadow-global">
        <div id="evo_icon" className="desktop:mb-[2.8vh] mt-3">
          <Image src={logo} alt="Logo" className='smartphone:w-[40vw] smartphone:mb-14 tablet:w-[25vw] tablet:mb-7 tablet2:w-[20vw] laptop:w-[15vw] laptop:mb-5 desktop:w-[13vw] desktop:mb-0 2xl:mb-1.2 2xl:w-[17vh]' />
        </div>

        <form id="login" className="flex flex-col items-center gap-4 p-10" onSubmit={handleEncode}>

          <div>
            {isClient && <ComboBox options={empresas} onChange={setSelectedCompanyId} />}
          </div>

          <br />

          <div className="userEpassword flex items-center border-b-3 border-white 2xl:mt-2.5 xl:mt-1">
            {/* <p>{props.idEmpresa}</p> */}
            
            <Image src={usuarioIcon} alt="Usuário" className='h-[30px] w-[25px] mb-1.5' />
            
            <input 
              type="text" 
              name="user_name" 
              className="user_name bg-transparent items-center mb-1 border-none text-lg justify-center placeholder-center text-white focus:outline-none "
              placeholder="Usuário"
              value={username}
              onChange={(e) =>setUsername(e.target.value)}
              required
            />
          </div>

          <div className="userEpassword flex items-center border-b-3 border-white 2xl:mt-2.5 xl:mt-1">
            <Image src={cadeadoIcon} alt="Senha" className='h-[30px] w-[30px] mb-1.5' />
            <input 
              type="password" 
              name="user_password" 
              className="user_password bg-transparent items-center mb-1 border-none text-lg justify-center placeholder-center text-white focus:outline-none "
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && <div className="login_erro text-red-500">Erro ao conectar com o servidor</div>}
          <button type="submit" className="btn-entrar flex items-center justify-center w-full h-[38px] bg-white text-lg text-blue-900 font-bold py-2 px-4 rounded-[10px] 2xl:mt-10 xl:mt-4 hover:bg-gray-200 transition-transform">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginTela;