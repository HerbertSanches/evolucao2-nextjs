import { redirect } from "next/dist/server/api-utils";
import React from "react";


const Header = () => {

    function LimpaCache() {
        localStorage.clear();
        redirect(`/login/${}`)
    }

    return(
            <header className="bg-azulEscuro h-14 flex flex-1 items-center justify-between">
                <nav className="p-4 flex flex-row items-center justify-between w-full">
                    <img className="h-11 " src="/assets/images/logo.png" alt="" />
                    <p className="text-branco font-bold">Riobaldo</p>
                    <select className="bg-azulEscuro text-branco border-none outline-none" name="select" id="">
                        <option value="">Teste</option>
                        <option value="">Banana</option>
                    </select>
                    <img onClick={LimpaCache} className="h-9" src="/assets/images/logout.png" alt="" />
                </nav>
            </header>
     
    )
}


export default Header