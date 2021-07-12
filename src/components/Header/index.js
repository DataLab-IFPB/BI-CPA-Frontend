import React, { useState, Component } from "react";

import Logo from "../../assets/styles/imgs/ifpb.png";
import Avin from "../../assets/styles/imgs/avin.png";

import {PrimeReactCSS} from "primereact/resources/themes/fluent-light/theme.css";
import {PrimeReactMinCsss} from "primereact/resources/primereact.min.css";
import {Icons} from "primeicons/primeicons.css";

import {StylesHeader} from "../Header/styles.css";

import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";

import GAS from "../../GAS";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            participante: undefined,
            email: ""
        };

    }
    

    /*useEffect(() => {
        loadParticipante();
    });*/

    loadParticipante = () => {    
        console.log("Instanciando new GAS()");
        let gasObj = GAS.getInstance();
        let requestObj = {
          functionName: 'MCPAParticipante.instance.SERVICE.GETParticipante'
        };
        gasObj.request(requestObj, 'instalarParticipante', this);
    }

    // Não precisa ser chamada aq
    instalarParticipante = (RESPONSE) => {

        if(GAS.getInstance().hasCPAError(RESPONSE)) {
            // Cuspir erro na console
            //response.message
        } else { 
            // Aq deu certo
            this.setState({
                participante: RESPONSE.response,
                email: RESPONSE.response.key
            });

            /*setParticipante(response.response);
            setEmail(participante.key);*/
        }
    }
    
    leftContents = (
        <div>
            <Button id="separador">
            <i className="pi pi-bars p-toolbar-separator p-mr-2" style={{"fontSize":"2em"}}/>
            </Button>

            <Button id="ajuda">
            <i id="ajuda" className="pi pi pi-question-circle" style={{"fontSize":"2em"}}/>
            </Button>
            
            <Button id="sign-out">
            <i className="pi pi-sign-out" style={{"fontSize":"2em"}}/>
            </Button>
            
            
        </div>
    );
    
    rightContents = () => {
        return (
            <div id = "icone_email">
                <span id="usuario">
                    
                    {this.state.email}
                    
                </span>

                <img id="logo" src={Logo} width="40" height="40"></img>
                <img id="avin" src={Avin} width="90" height="40"></img>
            </div>
        );
    };

    componentDidMount() {
        this.loadParticipante();
      }

    render(){
        return (
          <div id = "header" /*onLoad ={this.loadParticipante()} */ >
              <Toolbar id = "Toolbar" left={this.leftContents} right={this.rightContents()} style={StylesHeader}></Toolbar>
          </div>
        );
    }
}




