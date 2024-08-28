import React from "react";
import Image from "next/image";
import Usuario from "../../public/assets/images/usuario.png"
import Dinheiro from "../../public/assets/images/dinheiro.png"
import Notificacao from "../../public/assets/images/notificacao.png"

export const Footer = () => {
    
    return (
        <div className="w-full">
            <div>
                <Image src={Dinheiro} alt="Faturamento" className='h-[30px] w-[30px] mb-1.5' />
            </div>

            <div>
                <Image src={Usuario} alt="Vendedor" className='h-[30px] w-[30px] mb-1.5' />
            </div>

            <div>
                <Image src={Notificacao} alt="Notificações" className='h-[30px] w-[30px] mb-1.5' />
            </div>
        </div>
    )
}
