import React, { useState, Component } from "react";

import { Route } from 'react-router-dom'

import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { RadioButton } from 'primereact/radiobutton';

import { Steps } from 'primereact/steps';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';

import { StylesHeader } from "../Questionario/styles.css";

export default class Questionario extends React.Component {
    constructor(props) {
        super(props);

    }


    state = {
        activeIndex: 0, //accordion
        etapaGrupoQuestaoSelecionado: 0, //steps
        questionario: undefined,
        startResponder: true,
        etapa: 'I' //{'I', INÍCIO}, {'Q', QUESTIONARIO}, {'F', FINAL}
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.questionario !== state.questionario) {
            return {
                questionario: props.questionario
            };
        }
        return null;
    }


    etapas = () => {
        if (this.props.questionario !== undefined && this.state.questionario !== undefined && this.state.questionario.gruposQuestoes !== undefined) {
            return this.state.questionario.gruposQuestoes.map(grupoQuestao => {
                return {
                    label: grupoQuestao.titulo,
                    // command: (event) => {
                    //     //toast.current.show({severity:'info', summary:'First Step', detail: event.item.label});
                    // }
                }
            })
        }
    }


    renderIndicadores(questao, escalaAvaliativa) {

        if (questao.indicadores !== undefined) {
            // console.log(questao);
            return (
                <DataTable autoLayout={true} className="indicadores" value={questao.indicadores} stripedRows>
                    <Column field="indicador" header="Indicador"></Column>
                    <Column field="id" header="Escala Avaliativa" body={(rowData) => {
                        return escalaAvaliativa.map((itemEscalaAvaliativa, indexItemEscalaAvaliativa) => {
                            let indicadorId = questao.id + rowData.id;
                            let indicadorOptionId = indicadorId + indexItemEscalaAvaliativa;
                            // console.log(indicadorId);
                            return (
                                <div key={indicadorOptionId} className="p-field-radiobutton">
                                    <RadioButton inputId={indicadorOptionId}
                                        tooltipOptions={{ 'position': 'left' }}
                                        tooltip={itemEscalaAvaliativa.descricao}
                                        value={indexItemEscalaAvaliativa}
                                        name={indicadorId}
                                        checked={this.state[indicadorId] === indexItemEscalaAvaliativa}
                                        onChange={(e) => {
                                            this.setState({ [indicadorId]: e.value })
                                            // console.log(e.value); --> valor do índice na escala escolhido
                                        }} />
                                    <label htmlFor={indicadorOptionId}>{itemEscalaAvaliativa.valorQualitativo}</label>
                                </div>
                            )
                        })
                    }} />
                </DataTable>
            );
        }
    }

    handleSetEtapaQuestionario(etapaIndex) {
        let ordemEtapas = ['I', 'Q', 'F'];

        let etapaAtual = this.state.etapa;
        etapaAtual = ordemEtapas.indexOf(etapaAtual);

        let proximaEtapa = etapaAtual + etapaIndex;
        if (proximaEtapa < 0) {
            proximaEtapa = 0;
        } else if (proximaEtapa > ordemEtapas.length - 1) {
            proximaEtapa = ordemEtapas.length - 1;
        }

        proximaEtapa = ordemEtapas[proximaEtapa];

        this.setState({ etapa: proximaEtapa });
        console.log(proximaEtapa)
    }

    handleAvancarEtapaGrupoQuestao(etapaIndex) {
        let qtdGruposQuestoes = this.state.questionario.gruposQuestoes.length;
        let etapaGrupoQuestaoAtual = this.state.etapaGrupoQuestaoSelecionado;
        let proximaEtapaGrupoQuestao = etapaGrupoQuestaoAtual + etapaIndex;
        if (proximaEtapaGrupoQuestao < 0) {
            proximaEtapaGrupoQuestao = 0;
            this.handleSetEtapaQuestionario(etapaIndex);
        } else if (proximaEtapaGrupoQuestao > qtdGruposQuestoes - 1) {
            proximaEtapaGrupoQuestao = qtdGruposQuestoes - 1;
            this.handleSetEtapaQuestionario(etapaIndex);
        }

        this.setState({ etapaGrupoQuestaoSelecionado: proximaEtapaGrupoQuestao });
        console.log(proximaEtapaGrupoQuestao)
    }

    handleEnviarRespostas(history, questionario) {



    }

    renderActions() {
        let renderButtonAvancar = '';
        let renderButtonRetroceder = '';
        if (this.state.etapa === 'I') {
            renderButtonRetroceder = (
                <Route render={(props) => (
                    <Button className="p-button-danger" label="RETROCEDER" icon="pi pi-arrow-left" onClick={() => {
                        props.history.goBack();
                    }} />
                )} />
            );
            renderButtonAvancar = (<Button label="AVANÇAR" icon="pi pi-arrow-right" onClick={() => { this.handleSetEtapaQuestionario(+1) }} />);
        }
        else if (this.state.etapa === 'Q') {
            renderButtonRetroceder = (<Button className="p-button-danger" label="RETROCEDER" icon="pi pi-arrow-left" onClick={() => { this.handleAvancarEtapaGrupoQuestao(-1) }} />);
            renderButtonAvancar = (<Button label="AVANÇAR" icon="pi pi-arrow-right" onClick={() => { this.handleAvancarEtapaGrupoQuestao(+1) }} />);
        } else if (this.state.etapa === 'F') {
            renderButtonRetroceder = (<Button className="p-button-danger" label="RETROCEDER" icon="pi pi-arrow-left" onClick={() => { this.handleSetEtapaQuestionario(-1) }} />);
            renderButtonAvancar = (<Button label="FINALIZAR" icon="pi pi-arrow-right" onClick={() => { this.handleEnviarRespostas() }} />);
        }

        return (
            <span className="questionario-actions">
                {renderButtonRetroceder}
                {renderButtonAvancar}
            </span>
        );
    }

    renderPrePosEtapa(campoQuestionarioTexto, etapa) {
        let tituloEtapa;

        if (etapa === 'I') {
            tituloEtapa = 'Início do Questionário';
        }
        else if (etapa === 'F') {
            tituloEtapa = 'Término do Questionário';
        }

        if (this.props.questionario && this.state.questionario !== undefined) {
            let content = (<div dangerouslySetInnerHTML={{ __html: campoQuestionarioTexto }} />);
            return (
                <div>
                    <Panel className="prepos-etapa" header={tituloEtapa}>
                        {content}
                    </Panel>
                    {this.renderActions()}
                </div>
            )
        }
    }

    renderQuestoes(grupoQuestaoIndex) {
        if (this.props.questionario && this.state.questionario !== undefined) {
            let escalaAvaliativa = this.state.questionario.escala;
            return this.state.questionario.gruposQuestoes[grupoQuestaoIndex].questoes.map(questao => {
                let titulo = (<div dangerouslySetInnerHTML={{ __html: questao.titulo }} />);
                return (
                    <Card
                        key={questao.id}
                        title={titulo}
                        subTitle={questao.descricao}>

                        {this.renderIndicadores(questao, escalaAvaliativa)}
                    </Card>
                )
            })
        }
    }

    showDialog() {
        const dialogName = 'startResponder';
        const footer = (
            <div>
                <Button label="Concordo em participar!" icon="pi pi-check" onClick={() => {
                    this.setState({ [dialogName]: false });
                }} />

                <Route render={(props) => (
                    <Button className="p-button-danger" label="Discordo em participar" icon="pi pi-times" onClick={() => {
                        this.setState({ [dialogName]: false });
                        this.setState({ etapa: 'I' });
                        props.history.goBack();
                    }} />
                )} />
            </div>
        );


        return (
            <Dialog closable={false} header="Você deseja confirmar a sua participação?" footer={footer} visible={this.state[dialogName]} style={{ width: '85vw' }} modal onHide={() => this.onHide(dialogName)} >
                1. As respostas são armazenadas sem indentificá-lo, preservando o seu anonimato.<br />
                2. Ao prosseguir com este questionário você concorda em participar do processo avaliativo.<br />
                3. O questionário não poderá mais ser mais modificado depois de enviado.<br />
                4. Passe por cada etapa do questionário usando os botões no início e no final da tela para
                <span style={{ 'color': 'var(--green-500)' }}>  AVANÇAR (verde)</span> 
                ou <span style={{ 'color': 'var(--pink-500)' }}>RETROCEDER (vermelho)</span> etapas do questionário.
            </Dialog>
        );
        // confirmDialog({
        //     message:
        //     header: 'Atenção!',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {

        //     },
        //     reject: () => {

        //     }
        // });
    }

    render() {
        let renderDialog, renderQuestionario, renderPreposEtapa;
        if (this.state.startResponder) {
            renderDialog = this.showDialog();
        } else {
            if (this.state.etapa === 'I') {
                // console.log(this.state.etapa)
                renderPreposEtapa = this.renderPrePosEtapa(this.state.questionario.textoInicial, this.state.etapa);
            } if (this.state.etapa === 'F') {
                // console.log(this.state.etapa)
                renderPreposEtapa = this.renderPrePosEtapa(this.state.questionario.textoFinal, this.state.etapa);
            } else if (this.state.etapa === 'Q') {
                // console.log(this.state.etapa)
                renderQuestionario = (
                    <div>
                        <Steps model={this.etapas()} activeIndex={this.state.etapaGrupoQuestaoSelecionado} onSelect={(e) => this.setState({ etapaGrupoQuestaoSelecionado: e.index })} /*readOnly={false}*/ />
                        <div>{this.renderActions()}</div>
                        <div>{this.renderQuestoes(this.state.etapaGrupoQuestaoSelecionado)}</div>
                        <div>{this.renderActions()}</div>
                    </div>
                )
            }
        }

        return (
            <div className="questionario">
                {renderDialog}
                {renderPreposEtapa}
                {renderQuestionario}
            </div>
        )
    }
}