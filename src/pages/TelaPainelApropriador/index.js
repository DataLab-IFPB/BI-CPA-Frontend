import React from "react";

import Header from "../../components/Header";

import PainelApropriador from "../../components/PainelApropriador";

import { AppProvider } from "../../AppProvider";

import { useLocation, useParams } from "react-router-dom";

import "./styles.css"


// function getQuestionario(questionarios, id) {
//   return questionarios.find(questionario => questionario.id === questionarioId);
// }

function TelaPainelApropriador(props) {
    const {state, location} = useLocation();
    let painel = state.painel;

    // props.match.params.id = questionario.id; 
    // console.log(useParams());
    return (
        <AppProvider.Context.Consumer>
        {(context) => (
          <div>
            <Header usuario={context.state.usuario} />
            <PainelApropriador metamodeloAvaliativo={context.state.metamodeloAvaliativo} painel={painel} />
          </div>
        )}
      </AppProvider.Context.Consumer>
    )
}

export default TelaPainelApropriador;