import React, { useState, Component } from "react";
import { Route } from 'react-router-dom'
import Modal from "react-modal";
import { Dialog } from 'primereact/dialog';

import Ifpb from "../../assets/styles/imgs/ifpb.svg";
import Avin from "../../assets/styles/imgs/avin.svg";

import { StylesHeader } from "../Header/styles.css";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
        //this.state.modalIsOpen = false;

        // const [displayBasic] = React.useState(false);
    }

    state = {
        usuario: undefined,
        modalIsOpen: false,
        displayBasic: false
    }
    openModal = () => {
        this.state.modalIsOpen = true;
        console.log(this.state.modalIsOpen);
    }
    closeModal = () => {
        this.state.modalIsOpen = false;
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

       /* if (position) {
            state = {
                ...state,
                position
            }
        }*/

        this.setState();
        // console.log(this.state.displayBasic);
    }
    
    onHide(name) {
        this.setState({
            [`${name}`]: false
        });

        // console.log(this.state.displayBasic);
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
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
        // this.setState({ usuario: this.props.usuario });
    }

    leftContents = (
        <div id="header-leftContents">
            {/* <Button>
                <i className="pi pi-bars p-toolbar-separator p-mr-2" />
            </Button> */}

            <Button onClick={()=>{
                this.setState({displayBasic:true})
            }} >
                <i className="pi pi pi-question-circle" />
            </Button>
            
            <div className="dialog-demo">
                <Button label="Show" onClick={() => this.onClick('displayBasic')} />
                
                <Dialog 
                    header="Header" 
                    visible={this.state.displayBasic}
                    footer={this.renderFooter('displayBasic')} 
                    onHide={() => this.onHide('displayBasic')}
                    modal
                >
                    <h1>Teste</h1>
                    <p>vsdnvosdnv oadnvdvdsvsdvsndvsjdn</p> 
                 </Dialog>
            </div>

            {/* <Route render={(props) => (
                    <Button onClick={() => {
                            
                        }}>
                        <i className="pi pi-sign-out" />                    
                    </Button>
             )} /> */}
        </div>
    );
    modal = () => {
        console.log("wfu9uwfbujw")
        return (
            <Modal
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
            </Modal>
        )
    }

    rightContents = () => {
        let renderEmail = '';
        if (this.state.usuario !== undefined) {
            renderEmail = (<span id="usuario">{this.state.usuario.email}</span>);
        } else {
            renderEmail = (<span id="usuario" className="is-loading"></span>);
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




