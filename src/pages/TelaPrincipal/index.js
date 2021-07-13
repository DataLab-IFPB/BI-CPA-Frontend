import React from "react";

import Header from "../../components/Header";

import CardApresentation from "../../components/Card Apresentation";

import CardTitle from "../../components/Card Title";

import Loading from "../../components/Loading";

import Styles from "./styles.css";



function TelePrincipal() {
    return (
        <div>
            <Header />
            <CardApresentation title="Questionarios Disponiveis">
                <ul className="lista-questionarios">
                    <li className="item-questionario">
                        <CardTitle temBotao={true} />
                    </li>
                    <li className="item-questionario">
                        <CardTitle temBotao={true} />
                    </li>
                    <li className="item-questionario">
                        <CardTitle temBotao={true} />
                    </li>
                    <li className="item-questionario">
                        <CardTitle temBotao={true} />
                    </li>
                </ul>
            </CardApresentation>
            <Loading />
        </div>
    );
}

export default TelePrincipal;