'use client'
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import usuarioIcon from '../../public/assets/images/usuario.png';
import cadeadoIcon from '../../public/assets/images/cadeado.png';
import logo from '../../public/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';



const Logar: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Garantir que o código só é executado no lado do cliente
  }, []);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const { signIn, token } = useAuth();
  

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username)
    console.log(password)

    await signIn({ username, password })
    console.log("After signIn call, token:", token.token); 
    //router.push("/dashboard?{message=Hello%20from%20login}")
    console.log("Current token:", token.token);
  }, [username, password, signIn, token.token]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-azulEscuro md:bg-green-500'>
      <div id="login_container" className="flex h-[80vh] w-[100vh] flex-col items-center justify-center bg-azulEscuro text-white p-10 rounded-[20px] sm:shadow-global">
        <div id="evo_icon" className="mb-8 mt-2.5">
          <Image src={logo} alt="Logo" className='h-[30vh] w-[30vh]' />
        </div>
        <form id="login" className="flex flex-col items-center gap-4 p-10" onSubmit={handleLogin}>
          <div className="userEpassword flex items-center border-b-3 border-white  mt-2.5">
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
          <div className="userEpassword flex items-center border-b-3 border-white  mt-2.5">
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
          <button type="submit" className="btn-entrar w-45 h-[38px] bg-white text-blue-900 font-bold py-2 px-4 rounded-[10px] mt-10 hover:bg-gray-200 transition-transform">
            Entrar {token.token}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logar;
