import React, { useState, Component } from "react";
import { Route } from 'react-router-dom'

import Ifpb from "../../assets/styles/imgs/ifpb.svg";
import Avin from "../../assets/styles/imgs/avin.svg";

import { StylesHeader } from "../Header/styles.css";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        usuario: undefined
    }

    // componentWillReceiveProps(props) {
    //     if (props.usuario !== this.state.usuario) {
    //         this.setState({ usuario: props.usuario });
    //     }
    // }

    static getDerivedStateFromProps(props, state) {
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.usuario !== state.usuario) {
            return {
                usuario: props.usuario
                // externalData: null,
                // prevId: props.id,
            };
        }
        // No state update necessary
        return null;
    }

    componentDidMount() {
        this.setState({usuario: this.props.usuario});
    }

    leftContents = (
        <div id="header-leftContents">
            {/* <Button>
                <i className="pi pi-bars p-toolbar-separator p-mr-2" />
            </Button> */}

            <Button>
                <i className="pi pi pi-question-circle" />
            </Button>

            {/* <Route render={(props) => (
                    <Button onClick={() => {
                            
                        }}>
                        <i className="pi pi-sign-out" />                    
                    </Button>
             )} /> */}
        </div>
    );

    rightContents = () => {
        let renderEmail = '';
        if (this.state.usuario !== undefined) {
            renderEmail = (<span id="usuario">{this.state.usuario.email}</span>);
        } 

        return (
            <div id="logo-bar">              
                {renderEmail}          

                <img id="ifpb" src={Ifpb}></img>
                <img id="avin" src={Avin}></img>
            </div>
        );
    };


    render() {
        return (
            <div id="header" /*onLoad ={this.loadParticipante()} */ >
                <Toolbar id="Toolbar" left={this.leftContents} right={this.rightContents()} style={StylesHeader}></Toolbar>
            </div>
        );
    }
}




