import React, { useState, Component } from "react";

import { Route, Switch } from 'react-router-dom'

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

import { StylesHeader } from "../Questionarios/styles.css";

export default class Questionarios extends React.Component {
    constructor(props) {
        super(props);

    }

    state = {
        activeIndex: 0,
        questionarios: undefined
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.questionarios !== state.questionarios) {
            return {
                questionarios: props.questionarios
            };
        }
        return null;
    }

    renderActions = (questionario) => {
        return (
            <span className="questionario-actions">
            {/* REACT RUTER v4.0 -> SNIPPET: https://qastack.com.br/programming/31079081/programmatically-navigate-using-react-router */}
            <Route render={(props) => (
                 <Button label="RESPONDER" icon="pi pi-arrow-right" onClick={() => {                                         
                    //console.log(props.history)
                    props.history.push({
                            pathname: `/questionario/id/${questionario.id}`,                           
                            state: {questionario: questionario}
                    });
                }} />            
            )} />       
             </span>
        )
    };


    renderDisponiveis = () => {
        if (this.props.disponiveis  !== undefined && this.state.questionarios !== undefined) {
            let questionariosDisponiveis = this.state.questionarios.filter(questionario => !questionario.respostas);

            let renderSemQuestionarios = '';
            if (questionariosDisponiveis.length === 0)
                renderSemQuestionarios = this.renderSemQuestionarios;

            return (
                <AccordionTab header="Questionários disponíveis">
                    {
                        questionariosDisponiveis.map(questionario => {
                            return (
                                <Card key={questionario.id}
                                    title={`DISPONÍVEL ATÉ ${new Date(questionario.terminoAplicacao).toLocaleString()}`}
                                    subTitle={questionario.titulo}
                                    footer={this.renderActions(questionario)}>
                                    {questionario.periodoLetivo}
                                </Card>
                            )
                        })
                    }

                    {renderSemQuestionarios}
                </AccordionTab>
            );
        }
    }

    renderSemQuestionarios = (
        <p style={{ 'textAlign': "center" }}>
            <i className="pi pi-exclamation-triangle" style={{ 'fontSize': '2em' }}></i>
            <p><span>Não há questionários para você nesta situação</span></p>
        </p>
    )

    renderRespondidos = () => {
        if (this.props.respondidos  !== undefined && this.state.questionarios !== undefined) {
            let questionariosRespondidos = this.state.questionarios.filter(questionario => questionario.respostas);
            let renderSemQuestionarios = '';
            if (questionariosRespondidos.length === 0)
                renderSemQuestionarios = this.renderSemQuestionarios;

            return (
                <AccordionTab header="Questionários respondidos">
                    {
                        this.state.questionarios.filter(questionario => questionario.respostas).map(questionario => {
                            return (
                                <Card className="respondido"
                                    key={questionario.id}
                                    title={`RESPONDIDO EM ${new Date(questionario.terminoAplicacao).toLocaleString()}`}
                                    subTitle={questionario.titulo}>
                                    {questionario.periodoLetivo}
                                </Card>
                            )
                        })
                    }

                    {renderSemQuestionarios}
                </AccordionTab>
            );
        }
    }

    render() {
        return (
            <div className="questionarios">
                <Accordion activeIndex={this.state.activeIndex}>
                    {this.renderDisponiveis()}
                    {this.renderRespondidos()}
                </Accordion>
            </div>
        )
    }
}