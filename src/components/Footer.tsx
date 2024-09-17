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
    <nav className="flex flex-row fixed inset-x-0  bottom-0 items-center justify-between h-[40px] bg-azulEscuro text-white z-50">
      
      <div onClick={() => handleNavigation('/dashboard')} className="ml-[10vh]">
        <div className={`flex items-center justify-center h-[35px] w-[35px] rounded-full ${selected === 'dashboard' ? 'bg-green-400' : 'bg-transparent'}`}>
          <Image src={Dinheiro} alt="Faturamento" className="h-[20px] w-[25px]" />
        </div>
      </div>

      <div onClick={() => handleNavigation('/dashboardVendedor')}>
        <div className={`flex items-center justify-center h-[35px] w-[35px] rounded-full ${selected === 'dashboardVendedor' ? 'bg-green-400' : 'bg-transparent'}`}>
          <Image src={Usuario} alt="Vendedor" className="h-[20px] w-[15px]" />
        </div>
      </div>

      <div onClick={() => handleNavigation('/avisos')} className="mr-[10vh]">
        <div className={`flex items-center justify-center h-[35px] w-[35px] rounded-full ${selected === 'avisos' ? 'bg-green-400' : 'bg-transparent'}`}>
          <Image src={Notificacao} alt="Avisos" className="h-[20px] w-[20px]" />
        </div>
      </div>
      
    </nav>
  );
};