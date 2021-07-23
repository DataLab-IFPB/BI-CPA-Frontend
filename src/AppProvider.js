
import React from "react";

import GAS from "./GAS";

//snippet: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components
// export const 

/**
 * @summary Componente para armazenamento de estado no contexto da app.
 * @description Declarar {AppProvider} como componente pai no componente principal da aplicação {App}
 * @example Acesso pode ser por meio da decaração abaixo no rendering de qualquer outro componente dentro de {App}
 *  <AppProvider.Context.Consumer>> {(context) => ( coontext.state... )}> </  <AppProvider.Context.Consumer>>
 *
 */
export class AppProvider extends React.Component {

    static Context = React.createContext();

    state = {
        usuario: undefined,
        questionarios: undefined
    }

    /**
     * @summary Carrega o usuário logado, por solicitação ao back-end via {GAS.request()};
     */
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

    /**
     * @summary Carrega os questionários disponíveis e respondidos, por solicitação ao back-end via {GAS.request()};  
     * @param email{string} - Usuário associado.
     */
    loadQuestionarios(email) {
        let gasObj = GAS.getInstance();
        gasObj.request('MCPAQuestionario.instance.SERVICE.GETListarQuestionariosParticipante', email)
            .then(RESPONSE => {
                let questionarios = RESPONSE.response;
                //console.log(questionarios);

                this.setState({
                    questionarios: questionarios
                });

                console.log(RESPONSE.response);
            })
            .catch((e) => { });
    }

    /**
     * Chamado quando o componente terminar de executar this.render()
     */
    componentDidMount() {
        this.loadUsuario();        
    }

    /**
     * @returns HTML{JSX} - relativo a este componente
     */
    render() {
        return (
            <AppProvider.Context.Provider value={
                {
                    state: this.state,
                    setUsuario: (value) => this.setState({ usuario: value }),
                    setQuestionarios: (value) => this.setState({ questionarios: value })
                }
            }>

                {/* {this.props.dataFromParent} */}
                {/* this indicates that all the child tags with MyProvider as Parent can access the global store. */}
                {this.props.children}
            </AppProvider.Context.Provider>
        )
    }
}