import React, { useState } from "react";

import Logo from "../../assets/styles/imgs/ifpb.png";
import Avin from "../../assets/styles/imgs/avin.png";

import {PrimeReactCSS} from "primereact/resources/themes/fluent-light/theme.css";
import {PrimeReactMinCsss} from "primereact/resources/primereact.min.css";
import {Icons} from "primeicons/primeicons.css";

import {StylesHeader} from "../Header/styles.css";

import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";

import GAS from "../../GAS";

function Header() {
    const [participante, setParticipante] = useState(0);
    const [email, setEmail] = useState(0);

    /*useEffect(() => {
        loadParticipante();
    });*/

    const loadParticipante = () => {    
        console.log("Instanciando new GAS()");
        let gasObj = GAS.getInstance();
        let requestObj = {
          functionName: 'MCPAParticipante.instance.SERVICE.GETParticipante'
        };
        gasObj.request(requestObj, 'instalarParticipante', this);
    }

    // Não precisa ser chamada aq
    const instalarParticipante = (response) => {
        if(GAS.getInstance().hasCPAError(response)) {
            // Cuspir erro na console
            //response.message
        } else { 
            // Aq deu certo
            setParticipante(response.response);
            setEmail(participante.key);
        }
    }
    
    const leftContents = (
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
    
    const rightContents = (
        <div id = "icone_email">
            <span id="usuario">
                
                {email}
                
            </span>

            <img id="logo" src={Logo} width="40" height="40"></img>
            <img id="avin" src={Avin} width="90" height="40"></img>
        </div>
    );

    return (
        <div id = "header" onLoad={loadParticipante()}>
            <Toolbar id = "Toolbar" left={leftContents} right={rightContents} style={StylesHeader}></Toolbar>
        </div>
        );
}

export default Header;



