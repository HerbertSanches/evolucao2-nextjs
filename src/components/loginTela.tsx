'use client'
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import usuarioIcon from '../../public/assets/images/usuario.png';
import cadeadoIcon from '../../public/assets/images/cadeado.png';
import logo from '../../public/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
//import CryptoJS from 'crypto-js';



const loginTela: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Garantir que o código só é executado no lado do cliente
  }, []);
  
  const [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const { signIn, token } = useAuth();

  async function sha256(message:string) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  async function main(input:string) {
    const hash1 = await sha256(input);
    const p1 = hash1.slice(0, 64);
    const p2 = await sha256(p1);
    const result = p2 + await sha256(input);
    return result;
  }

  async function encryptPassword(input:string) {
    let encryptedPassword:string;
    return encryptedPassword = await main(input);
  }

  async function chamarCryptografia() { 
    //let input = {password};
    setPassword(password = await encryptPassword(password));
    console.log(password)
  }  

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username)
    console.log(password)
    await chamarCryptografia();
    //password = encryptedPassword;
    //await signIn({ username, password })
    console.log(password)

    console.log("After signIn call, token:", token.token); 
    
    //router.push("/dashboard?message=Hello%20from%20login")
   
    console.log("Current token:", token.token);
  }, [username, password, signIn, token.token]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-azulEscuro md:bg-azulClaro'>
      <div id="login_container" className="flex flex-col h-[80vh] w-[100vh]  items-center justify-center bg-azulEscuro text-white p-10 rounded-[20px] sm:shadow-global">
        <div id="evo_icon" className="mb-8 mt-2.5">
          <Image src={logo} alt="Logo" className='h-[30vh] w-[30vh]' />
        </div>
        <form id="login" className="flex flex-col items-center gap-4 p-10" onSubmit={handleLogin}>
          <div className="userEpassword flex items-center border-b-3 border-white  2xl:mt-2.5 xl:mt-1">
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

export default loginTela;
