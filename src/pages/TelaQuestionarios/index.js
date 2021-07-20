import React from "react";

import Header from "../../components/Header";

import Questionarios from "../../components/Questionarios";

import Styles from "./styles.css";

import GAS from "../../GAS";

import { AppContext } from "../../AppProvider";

export default class TelaQuestionarios extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   usuario: undefined
    // }
  };

  // loadUsuario = () => { 
  //   let gasObj = GAS.getInstance();
  //   gasObj.request('MCPAParticipante.instance.SERVICE.GETParticipante', 'acauan.gomes@academico.ifpb.edu.br')
  //   .then(RESPONSE => {
  //       this.setState({
  //         usuario: RESPONSE.response
  //       });
  //   })
  //   .catch((e) => {});
  // }

  // loadQuestionarios() {
  //     let gasObj = GAS.getInstance();
  //     gasObj.request('MCPAQuestionario.instance.SERVICE.GETListarQuestionariosParticipante')
  //     .then(RESPONSE => {
  //         let questionarios  = RESPONSE.response;
  //         //console.log(questionarios);

  //         this.setState({
  //             questionarios: questionarios
  //         });
  //     })
  //     .catch((e) => {});
  // }


  // componentDidMount() {
  //   this.loadUsuario();
  //   this.loadQuestionarios();
  // }

  render() {
    // let header;
    // if(this.state.usuario !== undefined)
    //    header = (<Header usuario={this.state.usuario} />)
    // else
    //    header = (<Header />)

    // return (
    //     <div>
    //         <Header usuario={this.state.usuario} />         
    //         <Questionarios disponiveis="true" respondidos="true" questionarios={this.state.questionarios} />
    //     </div>
    // );

    return (
      <AppContext.Consumer>
        {(context) => (
          <div>
            <Header usuario={context.state.usuario} />
            <Questionarios disponiveis="true" respondidos="true" questionarios={context.state.questionarios} />
          </div>
        )}
      </AppContext.Consumer>
    );
  }

}