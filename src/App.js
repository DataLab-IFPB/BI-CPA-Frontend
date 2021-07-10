import React from "react";

import "./assets/styles/global.css";

import Routes from "./routes";

import GAS from "./GAS";

// Para manipular o participante
// Ex.: extrair dados dele como o email que vai no header
const mostrarResultado = (responseObj) => {
  if (GAS.getInstance().hasCPAError(responseObj))
    console.error(responseObj);
  else
    console.debug(JSON.stringify(responseObj, null, 2));
}

const loadEixos = () => {    
  console.log("Instanciando new GAS()");
  let gasObj = GAS.getInstance();
  let requestObj = {
    functionName: 'MCPAParticipante.instance.SERVICE.GETParticipante'
  };
  gasObj.request(requestObj, 'mostrarResultado', this);
}

function App() {
  return <Routes />;
}

export default App;
