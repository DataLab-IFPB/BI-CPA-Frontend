import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import TelaQuestionarios from "./pages/TelaQuestionarios";
import TelaQuestionario from "./pages/TelaQuestionario";
import QuestionarioFinalizado from "./pages/QuestionarioFinalizado";
import QuestionarioGrupoQuestao from "./pages/QuestionarioGrupoQuestao";

function Routes(){
    return (
        <BrowserRouter>
            <Route exact path="/" component={TelaQuestionarios} />
           
            <Route path="/questionario/:id" component={TelaQuestionario} />
            {/* <Route path="/questionario_finalizado" component={QuestionarioFinalizado} />
            <Route path="/questionario_grupo_questao" component={QuestionarioGrupoQuestao} /> */}
          
        </BrowserRouter>
    );
}
export default Routes;