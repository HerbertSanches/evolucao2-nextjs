import React from "react";
import Image from "next/image";
import Usuario from "/public/assets/images/usuario.png"
import Dinheiro from "../../public/assets/images/dinheiro-branco.png"
import Notificacao from "../../public/assets/images/notificacao.png"
import Link from 'next/link';

export const Footer = () => {
    
    return (
        // <div className=" inset-x-0 bottom-0 w-full bg-azulEscuro items-center justify-between absolute mb-0 h-14">
        <nav className="flex flex-row fixed inset-x-0 bottom-0  items-center h-[45px] justify-between  bg-azulEscuro text-white z-50">
            
            <div>
                <Link href="/dashboard"> <Image src={Dinheiro} alt="Faturamento" className='h-[41px] w-[45px] ml-[10vw]' /> </Link>
            </div>

            <div>
                <Link href="/dashboardVendedor"><Image src={Usuario} alt="Faturamento" className='h-[30px] w-[30px]' /></Link>
            </div>

            <div>
                <Link href="/avisos"><Image src={Notificacao} alt="Faturamento" className='h-[30px] w-[30px] mr-[10vw]' /></Link>
            </div>
        </nav>
    )
}
