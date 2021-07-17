import React, { useState, Component } from "react";

import Ifpb from "../../assets/styles/imgs/ifpb.svg";
import Avin from "../../assets/styles/imgs/avin.svg";

import {PrimeReactCSS} from "primereact/resources/themes/fluent-light/theme.css";
import {PrimeReactMinCsss} from "primereact/resources/primereact.min.css";
import {Icons} from "primeicons/primeicons.css";

import {StylesHeader} from "../Header/styles.css";

import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";

import GAS from "../../GAS";
import {Loading} from "../Loading";

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
        let gasObj = GAS.getInstance();
        let requestObj = {
          functionName: 'MCPAParticipante.instance.SERVICE.GETParticipante'
        };
        //gasObj.request(requestObj, 'instalarParticipante', this);

        gasObj.request(requestObj)
        .then(RESPONSE => {
            this.setState({
                participante: RESPONSE.response,
                email: RESPONSE.response.email
            });
        })
        .catch((e) => {});
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

                <img id="ifpb" src={Ifpb}></img>
                <img id="avin" src={Avin}></img>
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




