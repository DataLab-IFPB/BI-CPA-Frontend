import React, { useState, Component } from "react";

import { Route, Switch } from 'react-router-dom'

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

import "./styles.css";

/**
 * @summary Componente de listagem de questionários
 * @description Dispõem questionários como {Card}, agrupados em disponíveis para responder e respondidos, em um {AccordionTab} distinto.
 * @param props{*}{props.disponiveis}(boolean), renderiza questionários reconhecidos como ainda não respondidos.
 * @param props{*}{props.respondidos}(boolean), renderiza questionários reconhecidos como respondidos.
 * 
 */
export default class PaineisApropriadores extends React.Component {
    /**
     * @summary Inicialização de estado mínima para renderização do cpmponente.
     */
    state = {
        activeIndex: 0,
        paineis: undefined
    }

    /**
     * @summary 1º na chamada de montagem do componente
     * @param {*} props 
     */
    constructor(props) {
        super(props);

    }

    /**
     * @summary 2º na chamada de montagem do componente
     * @param {*} props 
     * @param {*} state 
     * @returns {*} - Null caso o repasse de valores props não afete o estado do componente. Caso afete o estado, retorna o objeto de parâmetro de entrada de this.setState()
     */
    static getDerivedStateFromProps(props, state) {
        if (props.paineis !== state.paineis) {
            return {
                paineis: props.paineis
            };
        }
        return null;
    }

    /**
     * @summary 3º na chamada de montagem do componente.
     * @description Elabora o JSX que define o componente.
     * @returns HTML{JSX} - relativo a este componente
     */
    render() {
        return (
            <div className="paineis-apropriadores">
                <Accordion activeIndex={this.state.activeIndex}>
                    {/* {this.renderFiltros()} */}
                    {this.renderDisponiveis()}
                </Accordion>
            </div>
        )
    }

    /**
    * @summary 4º na chamada de montagem do componente.
    * @description Funções/ações cuja lógica exija que o JSX do componente já esteja inserido na árvore DOM do navegador somente deve ser chamadas aqui.
    * @example 
    * 1. É invocado imediatamente após um componente ser montado (inserido na árvore). 
    * 2. Inicializações que exijam nós do DOM devem vir aqui. Se precisar carregar data de um endpoint remoto, este é um bom lugar para instanciar sua requisição.
    * 3. Este método é um bom lugar para colocar qualquer subscrição. Se fizer isto, não esqueça de desinscrever no componentWillUnmount().
    */
    componentDidMount() {

    }


    /**
     * Renderiza botões com ação de responder, considerando o questionário passado como parâmetro.
     * @param {*} painel 
     * @returns 
     */
    renderActions = (painel) => {
        return (
            <span className="questionario-actions">
                {/* REACT RUTER v4.0 -> SNIPPET: https://qastack.com.br/programming/31079081/programmatically-navigate-using-react-router */}
                <Route render={(props) => (
                    <Button label="GERENCIAR PAINEL" icon="pi pi-arrow-right" onClick={() => {
                        //console.log(props.history)
                        props.history.push({
                            pathname: `/painelapropriador/id/${painel.id}`,
                            state: { painel: painel }
                        });
                    }} />
                )} />
            </span>
        )
    };

    /**
     * Renderiza um {AccordionTab} contendo diversos {Card} de listagem de questionários, mas somente daqueles já respondidos.
     * @returns 
     */
    renderDisponiveis = () => {
        let renderSemPaineisDisponiveis;
        if (this.state.paineis === undefined)
            renderSemPaineisDisponiveis = this.renderSemPaineisDisponiveis;
        if (this.state.paineis !== undefined) {
            return (
                <AccordionTab header="Painéis apropriadores disponíveis">
                    {
                        this.state.paineis.map(painel => {
                            let titulo = (
                                <div>
                                   <i className="pi pi-star" /> {painel.nivelOrganizacional['CAMPUS']}
                                   <br />
                                   <i className="pi pi-sitemap" /> {painel.nivelOrganizacional['CURSO']}  
                                </div>
                            );
                            return (
                                <Card className="disponivel"
                                    key={painel.id}
                                    title={titulo}
                                    subTitle={`PAINEL APROPRIADOR DISPONÍVEL ATÉ ${new Date(painel.terminoAplicacao).toLocaleString()}`}
                                    footer={this.renderActions(painel)}>
                                    
                                   
                                </Card>
                            )
                        })
                    }

                    {renderSemPaineisDisponiveis}
                </AccordionTab>
            );
        }
    }

    /**
     * Renderização reutilizável de ícone exclamação + mensagem p/ questionários a responder ou respondidos.
     * @description Usado em {this.renderRespondidos()} e {this.renderDisponiveis()}
     */
    renderSemPaineisDisponiveis = (
        <p style={{ 'textAlign': "center" }}>
            <i className="pi pi-exclamation-triangle" style={{ 'fontSize': '2em' }}></i>
            <br />Não há painéis apropriadores disponíveis para você gerenciar.
        </p>
    )

    /**
     * Interpretador utilitário
     * @param {*} questionario 
     * @returns (boolean) - true, se questionário é reconhecido como disponível para responder.
     */
    isQuestionarioDisponivel(questionario) {
        return !questionario.respostas;
    }
}