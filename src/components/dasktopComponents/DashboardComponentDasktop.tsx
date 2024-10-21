import React, {useState, useEffect} from "react";
import MesesComponent from "./MesesComponent";

const DashboardComponentDasktop = () => {
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);

  const handleMesSelecionado = (mes:any) => {
    console.log("Mês recebido do filho:", mes);
    setMesSelecionado(mes);
  };

  return(
    <div>
      <MesesComponent onMesSelecionado={handleMesSelecionado} />
      
      <h1>Teste validação</h1>
      
    </div>
  )
}

export default DashboardComponentDasktop;