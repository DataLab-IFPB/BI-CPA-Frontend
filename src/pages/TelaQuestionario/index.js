import React from "react";

import Header from "../../components/Header";

import Questionario from "../../components/Questionario";

import { AppProvider } from "../../AppProvider";

import { useLocation, useParams } from "react-router-dom";

import "./styles.css"


// function getQuestionario(questionarios, id) {
//   return questionarios.find(questionario => questionario.id === questionarioId);
// }

function TelaQuestionario(props) {
    const {state, location} = useLocation();
    let questionario = state.questionario;
    // props.match.params.id = questionario.id; 
    // console.log(useParams());
    return (
        <AppProvider.Context.Consumer>
        {(context) => (
          <div>
            <Header usuario={context.state.usuario} />
            <Questionario usuario={context.state.usuario} questionario={questionario} />
          </div>
        )}
      </AppProvider.Context.Consumer>
    )
}

export default TelaQuestionario;