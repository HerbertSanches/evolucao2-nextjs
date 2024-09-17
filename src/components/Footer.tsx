'use client'
import React, {useState, useEffect, useMemo} from "react";
import Image from "next/image";
import Usuario from "/public/assets/images/usuario.png"
import Dinheiro from "../../public/assets/images/dinheiro-branco.png"
import Notificacao from "../../public/assets/images/notificacao.png"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';



export const Footer = () => {
  
  const router = useRouter();

  const pathname = usePathname();
  const path = useMemo(() => pathname?.split('/').pop(), [pathname]);
  const [selected, setSelected] = useState(path);
  useEffect(() => {
    setSelected(path)
  },[selected])
  // Função para atualizar o estado e navegar
  const handleNavigation = (path:any) => {
    router.push(path); // Usa o roteamento imediato
  };

  return (
      <nav className="flex flex-row fixed inset-x-0  space-x-[15vh] bottom-0 items-center   justify-center h-50px]  bg-azulEscuro text-white z-50">
          
          <div onClick={() => handleNavigation('/dashboard')} className="">
              <div className={`h-auto w-auto p-2 items-center justify-center ml-10vh rounded-full ${selected === 'dashboard' ? 'bg-green-400  ' : '' }`}>
                  <Image src={Dinheiro} alt="Faturamento" className={`h-[30px] w-[35px] `}  />
              </div>
          </div>

          <div onClick={() => handleNavigation('/dashboardVendedor')}>
              <div className={`h-auto w-auto p-2 items-center justify-center ${selected === 'dashboardVendedor' ? 'bg-green-400 rounded-full' : ''}`}>
                  <Image src={Usuario} alt="Vendedor" className='h-[30px] w-[30px]' />
              </div>
          </div>

          <div onClick={() => handleNavigation('/avisos')}>
              <div className={`h-auto w-auto p-2 items-center justify-center w-a ${selected === 'avisos' ? 'bg-green-400 rounded-full' : ''}`}>
                  <Image src={Notificacao} alt="Avisos" className='h-[30px] w-[30px] ' />
              </div>
          </div>
          
      </nav>
  );
};