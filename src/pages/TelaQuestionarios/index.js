import React from "react";

import Header from "../../components/Header";

import Questionarios from "../../components/Questionarios";

import "./styles.css";

import { AppProvider } from "../../AppProvider";

function TelaQuestionarios() {
  return (
    <AppProvider.Context.Consumer>
      {(context) => (
        <div>
          <Header usuario={context.state.usuario} />
          <Questionarios disponiveis="true" respondidos="true" questionarios={context.state.questionarios} />
        </div>
      )}
    </AppProvider.Context.Consumer>
  );
}
export default TelaQuestionarios;