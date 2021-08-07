 
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
       metamodeloAvaliativo: undefined,
       questionarios: undefined
   }
 
   /**
    * @summary Carrega o usuário logado, por solicitação ao back-end via {GAS.request()};
    */
   loadParticipante = (usuarioEmail) => {
       let gasObj = GAS.getInstance();
       gasObj.request('MCPAParticipante.instance.SERVICE.GETParticipante',usuarioEmail)
           .then(RESPONSE => {
               this.setState({
                   usuario: RESPONSE.response
               });
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
           })
           .catch((e) => { });
   }
 
   loadMetamodeloAvaliativo() {
       let gasObj = GAS.getInstance();
       gasObj.request('MCPAMetamodelo.instance.SERVICE.GETMetamodelo')
           .then(RESPONSE => {
               let metamodeloAvaliativo = RESPONSE.response;
               //console.log(questionarios);
 
               this.setState({
                   metamodeloAvaliativo: metamodeloAvaliativo
               });
           })
           .catch((e) => { });
   }
 
   /**
    * Chamado quando o componente terminar de executar this.render()
    */
   componentDidMount() {
       let gasObj = GAS.getInstance();
       gasObj.request('MCPAParticipante.instance.SERVICE.GETUsuario')
           .then(RESPONSE => {
             //  let usuarioEmail = RESPONSE.response;
                 let usuarioEmail ="nycolas.ramon@academico.ifpb.edu.br"
               //console.log(questionarios);
               this.loadParticipante(usuarioEmail);
               this.loadMetamodeloAvaliativo();
               this.loadQuestionarios(usuarioEmail);
           })
           .catch((e) => { });
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
                   setQuestionarios: (value) => this.setState({ questionarios: value }),
                   setMetamodeloAvaliativo: (value) => this.setState({ metamodeloAvaliativo: value })
               }
           }>
 
               {/* {this.props.dataFromParent} */}
               {/* this indicates that all the child tags with MyProvider as Parent can access the global store. */}
               {this.props.children}
           </AppProvider.Context.Provider>
       )
   }
}
 
