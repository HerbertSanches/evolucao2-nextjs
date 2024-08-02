'use client'
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import usuarioIcon from '../../public/assets/images/usuario.png';
import cadeadoIcon from '../../public/assets/images/cadeado.png';
import logo from '../../public/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface LoginTelaProps {
  idEmpresa: string;
}

const LoginTela: React.FC<LoginTelaProps> = (props) => {
  console.log(props.idEmpresa)
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { signIn, token } = useAuth();
  const masterKey = '#-6!HY]sK!AHDqg1';

  //obter a chave de criptografia
  const getKey = async (masterKey:string) => {
    let result = Array.from({ length: 256 }, (_, i) => i);
    let k = new Array(256).fill(0);

    for (let i = 0; i < k.length; i++) {
      k[i] =
        masterKey.charCodeAt((i * 2) % masterKey.length) +
        masterKey.charCodeAt(((i * 2) + 1) % masterKey.length);
    }

    let x = 0;
    for (let i = 0; i < result.length; i++) {
      x = (x + result[i] + k[i]) % result.length;
      [result[i], result[x]] = [result[x], result[i]]; // Swap elements
    }

    return result;
  };

  //converter número em hexadecimal com dois dígitos
  const intToHex = async (num:number, length:number) => {
    let hex = num.toString(16);
    return hex.padStart(length, '0').toUpperCase();
  };

  //codificação
  const encode = async (pValue:string, masterKey:string) => {
    let result = '';
    let i = 0;
    let x = 0;
    let aux = await getKey(masterKey);

    for (let secao = 0; secao < pValue.length; secao++) {
      let secaoTxt = pValue.charCodeAt(secao);
      i = (i + 1) % aux.length;
      x = (x + aux[i]) % aux.length;
      [aux[i], aux[x]] = [aux[x], aux[i]]; // Swap elements
      let t = (aux[i] + aux[x]) % aux.length;
      result += await intToHex(secaoTxt ^ aux[t], 2);
    }

    return result;
  };

  const handleEncode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = await encode(password, masterKey)

    await signIn({ username, password: encoded });
    
   // router.push("/dashboard?message=Hello%20from%20login")
  }, [username, password, signIn, token.token]);
    
  return (
    <div className='flex items-center justify-center min-h-screen bg-azulEscuro md:bg-azulClaro'>
      <div id="login_container" className="flex flex-col h-[80vh] w-[100vh]  items-center justify-center bg-azulEscuro text-white p-10 rounded-[20px] sm:shadow-global">
        <div id="evo_icon" className="mb-8 mt-2.5">
          <Image src={logo} alt="Logo" className='h-[30vh] w-[30vh]' />
        </div>
        <form id="login" className="flex flex-col items-center gap-4 p-10" onSubmit={handleEncode}>
          <div className="userEpassword flex items-center border-b-3 border-white  2xl:mt-2.5 xl:mt-1">
            <p>{props.idEmpresa}</p>
            <Image src={usuarioIcon} alt="Usuário" className='h-[30px] w-[30px] mb-1.5' />
            <input 
              type="text" 
              name="user_name" 
              className="user_name bg-transparent items-center mb-1 border-none justify-center placeholder-center text-white focus:outline-none "
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="userEpassword flex items-center border-b-3 border-white 2xl:mt-2.5 xl:mt-1">
            <Image src={cadeadoIcon} alt="Senha" className='h-[30px] w-[30px] mb-1.5' />
            <input 
              type="password" 
              name="user_password" 
              className="user_password bg-transparent items-center mb-1 border-none justify-center placeholder-center text-white focus:outline-none "
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <div className="login_erro text-red-500">Usuário e/ou senha inválidos</div>}
          <button type="submit" className="btn-entrar flex items-center justify-center w-45 h-[38px] bg-white text-blue-900 font-bold py-2 px-4 rounded-[10px] 2xl:mt-10 xl:mt-4 hover:bg-gray-200 transition-transform">
            Entrar {token.token}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginTela;
