
import React from "react";

import GAS from "./GAS";

//snippet: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components
export const AppContext = React.createContext();

export class AppProvider extends React.Component {

    state = {
        usuario: undefined,
        questionarios: undefined
    }

    loadUsuario = () => {
        let gasObj = GAS.getInstance();
        gasObj.request('MCPAParticipante.instance.SERVICE.GETParticipante')
            .then(RESPONSE => {
                this.setState({
                    usuario: RESPONSE.response
                });
                this.loadQuestionarios(RESPONSE.response.email);
            })
            .catch((e) => { });
    }

    loadQuestionarios(email) {
        let gasObj = GAS.getInstance();
        gasObj.request('MCPAQuestionario.instance.SERVICE.GETListarQuestionariosParticipante', email)
            .then(RESPONSE => {
                let questionarios = RESPONSE.response;
                //console.log(questionarios);

                this.setState({
                    questionarios: questionarios
                });
            })
            .catch((e) => { });
    }

    componentDidMount() {
        this.loadUsuario();        
    }

    render() {
        return (
            <AppContext.Provider value={
                {
                    state: this.state,
                    setUsuario: (value) => this.setState({ usuario: value }),
                    setQuestionarios: (value) => this.setState({ questionarios: value })
                }
            }>

                {/* {this.props.dataFromParent} */}
                {/* this indicates that all the child tags with MyProvider as Parent can access the global store. */}
                {this.props.children}
            </AppContext.Provider>
        )
    }
}