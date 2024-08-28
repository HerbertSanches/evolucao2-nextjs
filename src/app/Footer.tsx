import React from "react";
import Image from "next/image";
import Usuario from "/public/assets/images/usuario.png"
import usuarioIcon from '../../public/assets/images/usuario.png';
import Dinheiro from "../../public/assets/images/dinheiro-branco.png"
import Notificacao from "../../public/assets/images/notificacao.png"

export const Footer = () => {
    
    return (
        // <div className=" inset-x-0 bottom-0 w-full bg-azulEscuro items-center justify-between absolute mb-0 h-14">
        <div className="flex flex-row fixed inset-x-0 bottom-0  items-center h-[55px] justify-between  bg-azulEscuro text-white z-50">
            
            <div>
                <Image src={Dinheiro} alt="Faturamento" className='h-[51px] w-[55px] ml-[10vw]' />
            </div>

            <div>
                <Image src={Usuario} alt="Faturamento" className='h-[40px] w-[40px]' />
            </div>

            <div>
            <Image src={Notificacao} alt="Faturamento" className='h-[40px] w-[40px] mr-[10vw]' />
            </div>
        </div>
    )
}
