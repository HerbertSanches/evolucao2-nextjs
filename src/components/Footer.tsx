'use client'
import React, {useState, useEffect, useMemo} from "react";
import Image from "next/image";
import Usuario from "/public/assets/images/usuario.png"
import Dinheiro from "../../public/assets/images/dinheiro-branco.png"
import Notificacao from "../../public/assets/images/notificacao.png"
import { useRouter, usePathname } from 'next/navigation';



export const Footer = () => {
  
  const router = useRouter();

  const pathname = usePathname();
  const path = useMemo(() => pathname?.split('/').pop(), [pathname]);
  const [selected, setSelected] = useState(path);
  useEffect(() => {
    setSelected(path)
  },[selected])
  
  const handleNavigation = (path:any) => {
    router.push(path); 
  };

  return (
    <nav className="flex flex-row fixed inset-x-0 space-x-[2vh] bottom-0 items-center justify-center h-[50px] bg-azulEscuro text-white z-50">
      
      <div onClick={() => handleNavigation('/dashboard')} className="flex  flex-col items-center justify-center mt-2">
      <div className={`flex items-center justify-center rounded-lg h-[25px] w-[80px] ${selected === 'dashboard' ? 'bg-azulClaro' : 'bg-transparent'}`}>
          <Image src={Dinheiro} alt="Faturamento" className="h-[30px] w-[35px]" />
        </div>

        <p className={` ${selected === 'Faturamento' ? 'font-bold' : ''}` } >Faturamento</p>
      </div>

      <div onClick={() => handleNavigation('/dashboardvendedor')} className="flex  flex-col items-center justify-center mt-2">
      <div className={`flex items-center justify-center rounded-lg h-[25px] w-[80px] ${selected === 'dashboardvendedor' ? 'bg-azulClaro' : 'bg-transparent'}`}>
          <Image src={Usuario} alt="Vendedor" className="h-[20px] w-[15px]" />
        </div>

        <p className={` ${selected === 'dashboardvendedor' ? 'font-bold' : ''}` } >Vendedor</p>
      </div>

      <div onClick={() => handleNavigation('/avisos')} className="flex  flex-col items-center justify-center mt-2">
        
        <div className={`flex items-center justify-center rounded-lg h-[25px] w-[80px] ${selected === 'avisos' ? 'bg-azulClaro' : 'bg-transparent'}`}>
          <Image src={Notificacao} alt="Avisos" className={`h-[20px] w-[20px] ` } />
        </div>

        <p className={` ${selected === 'avisos' ? 'font-bold' : ''}` } >Avisos</p>
       
      </div>

       <div onClick={() => handleNavigation('/produtosmaisvendidos')} className="flex  flex-col items-center justify-center mt-2"> 
        <div className={`flex items-center justify-center rounded-lg h-[25px] w-[80px] ${selected === 'produtosmaisvendidos' ? 'bg-azulClaro' : 'bg-transparent'}`}>
          <p className="fonte-ev text-3xl">n</p>
        </div>
        <p className={` ${selected === 'produtosmaisvendidos' ? 'font-bold' : ''}` } >Produtos</p>
      </div>
      
    </nav>
  );
};