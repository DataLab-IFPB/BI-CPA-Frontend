import React from "react";

import Header from "../../components/Header";

import PaineisApropriadores from "../../components/PaineisApropriadores";

import "./styles.css";

import { AppProvider } from "../../AppProvider";

import { paineisApropriadores } from "./modelo";

function TelaPaineisApropriadores() {
  return (
    <AppProvider.Context.Consumer>
      {(context) => (
        <div>
          <Header usuario={context.state.usuario} />
          <PaineisApropriadores paineis={paineisApropriadores} />
        </div>
      )}
    </AppProvider.Context.Consumer>
  );
}
export default TelaPaineisApropriadores;