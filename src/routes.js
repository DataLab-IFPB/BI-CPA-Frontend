import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import TelaQuestionarios from "./pages/TelaQuestionarios";
import TelaQuestionario from "./pages/TelaQuestionario";
import TelaPaineisApropriadores from "./pages/TelaPaineisApropriadores";
import TelaPainelApropriador from "./pages/TelaPainelApropriador";

function Routes(){
    return (
        <BrowserRouter>
            {/* {<Route exact path="/" component={TelaQuestionarios} />} */}
            {/* {<Route path="/questionario/:id" component={TelaQuestionario} />} */}

            {/* <Route path="/paineisapropriadores/" component={TelaPaineisApropriadores} /> */}
            <Route exact path="/" component={TelaPaineisApropriadores} />
            <Route path="/painelapropriador/:id" component={TelaPainelApropriador} />
          
        </BrowserRouter>
    );
}
export default Routes;