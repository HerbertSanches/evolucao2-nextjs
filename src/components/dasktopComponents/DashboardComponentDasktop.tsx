import React, {useState, useEffect} from "react";
import MesesComponent from "./MesesComponent";
import MetasDasktop from "./MetasDasktop";
import { darkMode } from "@/services/comum.utils";


const DashboardComponentDasktop = () => {
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState<string | null>('');

  const handleMesSelecionado = (mes:any) => {
    console.log("Mês recebido do filho:", mes);
    setMesSelecionado(mes);
  };

  useEffect(() => {
    setMode(darkMode())
  },[mode])

  return(
    <div>
      <MesesComponent onMesSelecionado={handleMesSelecionado} />
      
      <h1>Teste validação</h1>

      <div className="grid grid-cols-4 gap-6 p-4 max-w-[1300px] mr-5">
        {/* <!-- Primeira linha --> */}
        <div className={`bg-darkClaro rounded-2xl overflow-hidden shadow-global col-span-1 h-44 w-80`}>
          <MetasDasktop  metaMes ={10854}  mes={10} />
        </div>

        <div className="bg-darkClaro rounded-2xl overflow-hidden shadow-global col-span-1 h-44 w-80">
          <MetasDasktop  metaAno ={98273}  ano={'2024'} />
        </div>

        <div className="bg-gray-800 rounded-lg  col-span-1 h-96 w-80 row-span-2"></div>

        <div className="bg-gray-800 rounded-lg  col-span-1 h-96 w-80 row-span-2"></div>

        <div className="bg-gray-800 rounded-lg  col-span-1 h-44 w-80">

        </div>
        
        <div className="bg-gray-800 rounded-lg  col-span-1 h-44 w-80">

        </div>
      </div>


      
    </div>
  )
}

export default DashboardComponentDasktop;