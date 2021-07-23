import React from "react";

import Routes from "./routes";

import Loading from "./components/Loading";

import {AppProvider} from "./AppProvider";

import {PrimeReactCSS} from "primereact/resources/themes/saga-green/theme.css";
import {PrimeReactMinCsss} from "primereact/resources/primereact.min.css";
import {Icons} from "primeicons/primeicons.css";


import "./assets/styles/global.css";

/**
 * @summary Componente que representa  o aplicativo principal de mais alto nível.
 */
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }  
  
  render = () => {
    return (
      <div>
        {/* necessário para inicializar o componente provedor de contexto {AppProvider} nos subcomponentes de {App} */}
        <AppProvider>
          <Routes />
          <Loading />
        </AppProvider>
      </div>
    )  
  }
}

