import React, { useState, Component } from "react";

import { Route } from 'react-router-dom'

import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Steps } from 'primereact/steps';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { InputTextarea } from 'primereact/inputtextarea';

import GAS from "../../GAS";

import "./styles.css";

export default class Questionario extends React.Component {
    /**
     * @summary Inicialização de estado mínima para renderização do cpmponente.
     */
    state = {
        activeIndex: 0, //accordion
        etapaGrupoQuestaoSelecionado: 0, //steps
        questionario: undefined,
        startResponder: true,
        etapa: 'I', //{'I', INÍCIO}, {'Q', QUESTIONARIO}, {'F', FINAL}
        respostas: {}
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
        if (props.questionario !== state.questionario) {
            return {
                questionario: props.questionario
            };
        }
        return null;
    }
    
    
    showMessage(type, summary, detail) {
        this.toast.show({ severity: type, summary: summary, detail: detail, life: 8000, closable: false });
    }
    
    
    
    /**
     * @summary 3º na chamada de montagem do componente.
     * @description Elabora o JSX que define o componente.
     * @returns HTML{JSX} - relativo a este componente
     */
    render() {
        let renderDialog, renderQuestionario, renderPreposEtapa;
        if (this.state.startResponder) {
            renderDialog = this.showDialogConcordanciaParticipar();
        } else {
            if (this.state.etapa === 'I') {
                // console.log(this.state.etapa)
                renderPreposEtapa = this.renderPrePosEtapa(this.state.questionario.textoInicial, this.state.etapa);
            } else if (this.state.etapa === 'F') {
                // console.log(this.state.etapa)
                renderPreposEtapa = this.renderPrePosEtapa(this.state.questionario.textoFinal, this.state.etapa);
            } else if (this.state.etapa === 'Q') {
                // console.log(this.state.questionario)
                // console.log(this.state.etapa)
                renderQuestionario = (
                    <div>
                        <div className="questionario-etapas">
                            <div>{this.state.questionario.gruposQuestoes[this.state.etapaGrupoQuestaoSelecionado].descricao}</div>
                            <Steps model={this.etapas()} activeIndex={this.state.etapaGrupoQuestaoSelecionado} onSelect={(e) => this.setState({ etapaGrupoQuestaoSelecionado: e.index })} /*readOnly={false}*/ />
                        </div>

                        <Panel>
                            {this.renderActions()}
                            {this.renderQuestoes(this.state.etapaGrupoQuestaoSelecionado)}
                            {this.renderActions()}
                        </Panel>
                    </div>
                )
            }
        }
        
        return (
            <div className="questionario">
                <Toast ref={(el) => this.toast = el} position="top-left" />
                {renderDialog}
                {renderPreposEtapa}
                {renderQuestionario}
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
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.etapaGrupoQuestaoSelecionado !== this.state.etapaGrupoQuestaoSelecionado ||
            prevState.etapa !== this.state.etapa) {
            window.scrollTo(0, 0);
        }
    }
    
    /**
     * Renderização por mapeamento de {questionario.gruposQuestoes} para uso como propriedade do componente {Steps.model} em {this.render()}
     * @returns 
     */
    etapas = () => {
        if (this.props.questionario !== undefined && this.state.questionario !== undefined && this.state.questionario.gruposQuestoes !== undefined) {
            return this.state.questionario.gruposQuestoes.map(grupoQuestao => {
                return {
                    label: grupoQuestao.titulo,
                }
            })
        }
    }


    /**
     * Modifica a etapa de apresentação do questionário, via {this.setState(etapa: valorEtapa)}.
     * @description Não faz nada se já estiver na primeira etapa ou na última do questionário.
     * @param etapaIndex{number} - Avança para a próxima etapa de resposta do questionário se valor > 0 e retrocede, se < 0.
     * 
     */
    handleSetEtapaQuestionario(etapaIndex) {
        let ordemEtapas = ['I', 'Q', 'F']; //ordem de etapas do questionário, respectivamente: I-nício, Q-uestionário, F-im.

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
        // console.log(proximaEtapa);
    }

    /**
     * Modifica a etapa de apresentação do grupo de questões de {this.state.questionario}.
     * @description Não faz nada se já estiver no primeiro grupo de questões ou na último.
     * @param etapaIndex{number} - Avança para o próximo grupo de questões de {this.state.questionarios} se valor > 0 e retrocede, se < 0.
     * @returns 
     */
    handleAvancarEtapaGrupoQuestao(etapaIndex) {
        if (etapaIndex > 0) {
            if (!this.updateValidarRespostas()) {
                this.showMessage('error', 'ATENÇÃO!', (<div>É necessário avaliar as questões ou indicadores em <b>VERMELHO</b> antes de <i className="pi pi-arrow-right" / ><b>AVANÇAR</b>.</div>));
                window.scrollTo(0, 0);
                return;
            }
        }

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
        // console.log(proximaEtapaGrupoQuestao);
    }

    /**
     * Envia um objeto {this.state.questionario} para o serviço GAS 'MCPAQuestionario.instance.SERVICE.POSTRespostasQuestionario'.
     * @param history{*} 
     * @param questionario{*}
     */
    handleEnviarRespostas(props) {
        let gasObj = GAS.getInstance();
        let questionario = this.state.questionario;

        //Iterando Sobre Grupo Questão 
        questionario.gruposQuestoes.forEach((grupoQuestao) => {

            //Iterando Sobre Cada Questão
            grupoQuestao.questoes.forEach((questao) => {
                if (this.isQuestaoDimensionalizadaFechada(questao)) {
                    //Iterando Sobre cada indicador 
                    questao.indicadores.forEach((indicador) => {
                        let resposta = this.state[indicador.id];
                        indicador.resposta = resposta;
                    });
                }
                else if (this.isQuestaoAberta(questao)) {
                    let resposta = this.state[questao.id];
                    questao.resposta = resposta;
                }
            });
        });
        questionario.respondidoEm = new Date().toISOString();

        // 4. Se bem sucedido, adicionar a propriedade respondido = true ao questionário e retornar a tela de listagem de quesitionários
        // 5. Se mal sucedido, mostrar que não foi possível enviar as respostas, devendo entrar em contato avaliacao@ifpb.edu.br.


        gasObj.request('MCPAQuestionario.instance.SERVICE.POSTRespostasQuestionario', questionario, this.props.usuario.email)
            .then((RESPONSE) => {
                questionario.respostas = true;
                this.showMessage('success', 'SUCESSO!', 'Sua avaliação foi registrada com sucesso.');
                this.setState({etapa: undefined});
                setTimeout(() => {
                    props.history.push({ pathname: `/` });
                }, 5000)
            }).catch((e) => {
                this.showMessage('error', 'ERRO!', 'Não foi possível registrar a sua avaliação. Tente novamente e se o problema persistir contate avaliacao@ifpb.edu.br');
            });

    }


    /**
     * Modifica o DOM de questões do questionário, aplicando-lhes a classe 'resposta-invalida' ou 'resposta-valida', a depender do tipo de questão.
     * @returns 
     */
    updateValidarRespostas() {
        let questionario = this.state.questionario;
        let grupoAtual = questionario.gruposQuestoes[this.state.etapaGrupoQuestaoSelecionado];
        let countInvalidades = 0;
        let getIndicadorElement = (questaoId, indicadorIndex) => {
            return document.querySelector(`div[id="${questaoId}"] .p-datatable-wrapper table tbody tr:nth-child(${indicadorIndex + 1})`);
        }
        grupoAtual.questoes.forEach(questao => {
            if (questao.indicadores !== undefined) {
                questao.indicadores.forEach((indicador, index) => {
                    let element = getIndicadorElement(questao.id, index);
                    if (this.state[indicador.id] === undefined) {
                        element.classList.remove('resposta-valida');
                        element.classList.add('resposta-invalida');
                        countInvalidades++;
                        return;
                    }
                    element.classList.remove('resposta-invalida');
                    element.classList.add('resposta-valida');
                });
            }
        });

        return countInvalidades === 0;
        //varre todas as questões do tipo DIMENSIONALIZADA_FECHADA (indicador !== undefined) e para cada um analisa se há resposta.
    }

    /**
     * Renderização de botões com ação de RETROCEDER, AVANÇAR e FINALIZAR, considerando {this.state.etapa} deste componente.
     * @param {*} questionario 
     * @returns 
     */
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

            renderButtonAvancar = (
                <Route render={(props) => (
                    <Button label="FINALIZAR" icon="pi pi-arrow-right" onClick={() => { this.handleEnviarRespostas(props) }} />
                )} />
            );
        }

        return (
            <span className="questionario-actions">
                {renderButtonRetroceder}
                {renderButtonAvancar}
            </span>
        );
    }

    /**
     * Renderização padronizadamente um campo qualquer do questionário em texto (podendo conter HTML), considerando uma {etapa}.
     * @param {*} campoQuestionarioTexto 
     * @param {*} etapa - {'I'} se para renderizar o campo na etapa inicial e {'F'} se etapa final do componente de questionário.
     * @returns 
     */
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
                <Panel className="prepos-etapa" header={tituloEtapa}>
                    {content}
                    {this.renderActions()}
                </Panel>
            )
        }
    }

    /**
     * Renderização de indicadores de uma questao como um {DataTable}, somente se a mesma possuir {questao.indicadores !== undefined}
     * @param {*} questao - Com os indicadores a ser renderizados como a primera {Column} da {DataTable}
     * @param {*} escalaAvaliativa - Do respectivo questionário, acessível via {questionario.escala}, a ser renderizado como segunda {Column} da {DataTable}
     * @returns 
     */
    renderRespostasQuestaoDimensionalizadaFechada(questao, escalaAvaliativa) {
        if (this.isQuestaoDimensionalizadaFechada(questao)) {
            // console.log(questao.id);
            return (
                <DataTable id={questao.id} autoLayout={true} className="indicadores" value={questao.indicadores} stripedRows>
                    <Column field="indicador" header="Indicador" body={(rowData, index) => {
                        return (<div dangerouslySetInnerHTML={{ __html: rowData.indicador }} />)
                    }} />
                    <Column id="id" field="id" header="Escala Avaliativa" body={(rowData, props) => {
                        return escalaAvaliativa.map((itemEscalaAvaliativa, indexItemEscalaAvaliativa) => {
                            let indicadorId = rowData.id;
                            let indicadorOptionId = indicadorId + indexItemEscalaAvaliativa;
                            // console.log(indicadorId);
                            return (
                                <div key={indicadorOptionId} className="p-field-radiobutton">
                                    <RadioButton
                                        inputId={indicadorOptionId} //referenciação da <label> abaixo, seguindo primereact
                                        tooltipOptions={{ 'position': 'left' }} //coloca tootip à direita
                                        tooltip={itemEscalaAvaliativa.descricao} //valor da tooltip
                                        value={indexItemEscalaAvaliativa} //índice do item rendenrizado na escala avaliativa, usado como valor de seleção armazenável no estado deste radio
                                        name={indicadorId} //id do indicador para armazenamento de sua seleção, ex.:  this.state[indicadorID]
                                        checked={this.state[indicadorId] === indexItemEscalaAvaliativa} //analisa se o componente deve se apresentar como marcado ou não em tela
                                        onChange={(e) => { //função que seta o estado do grupo de radios de mesmo name, com o respectivo valor.
                                            this.setState({ [indicadorId]: e.value });
                                            if (this.state.etapa === 'Q') //necessário quando clicar remover classe de inválido (não preenchido/marcado) para o grupo de radios, caso necessário.
                                                document.getElementById(questao.id).querySelector(`.p-datatable-wrapper table tbody`).children[props.rowIndex].classList.remove('resposta-invalida');
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


    /**
     * Renderização de respota aberta de uma questao como um {DataTable}, somente se a mesma possuir {questao.tipo === DIMENSIONALIZADA_ABERTA || ABERTA}
     * @param {*} questao - Com os indicadores a ser renderizados como a primera {Column} da {DataTable}
     * @param {*} escalaAvaliativa - Do respectivo questionário, acessível via {questionario.escala}, a ser renderizado como segunda {Column} da {DataTable}
     * @returns 
     */
    renderRespostaQuestaoAberta(questao) {
        if (this.isQuestaoAberta(questao)) {
            return (
                <InputTextarea autoResize rows={5} cols={30} value={this.state[questao.id]}
                    onChange={(e) => {
                        this.setState({ [questao.id]: e.target.value });
                    }} />
            );
        }
    }

    /**
     * Renderização de questões como {Card} cada uma, de um respectivo grupo de questões de {this.state.questionário} 
     * @param {*} grupoQuestaoIndex - A partir de 0, sendo o índice do grupo de questões a se renderizado.
     * @returns 
     */
    renderQuestoes(grupoQuestaoIndex) {
        if (this.props.questionario && this.state.questionario !== undefined) {
            // console.log(this.state.questionario)
            let escalaAvaliativa = this.state.questionario.escala;
            return this.state.questionario.gruposQuestoes[grupoQuestaoIndex].questoes.map(questao => {
                // console.log(questao)
                let titulo = (<div dangerouslySetInnerHTML={{ __html: questao.titulo }} />);
                let descricao = (<div dangerouslySetInnerHTML={{ __html: questao.descricao }} />);
                return (
                    <Card
                        key={questao.id}
                        title={titulo}
                        subTitle={descricao}>

                        {this.renderRespostasQuestaoDimensionalizadaFechada(questao, escalaAvaliativa)}
                        {this.renderRespostaQuestaoAberta(questao)}
                    </Card>
                )
            })
        }
    }

    /**
     * Renderiza modal para aceite das condições e início do questionário.
     * @returns 
     */
    showDialogConcordanciaParticipar() {
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
                <ol style={{ lineHeight: '1.5rem', listStylePosition: 'inside', display: 'flex', flexDirection: 'column' }}>
                    <li>As respostas são armazenadas sem indentificá-lo, preservando o seu anonimato.<br /></li>
                    <li>Ao prosseguir com este questionário você concorda em participar do processo avaliativo.<br /></li>
                    <li>O questionário não poderá mais ser mais modificado depois de enviado.<br /></li>
                    <li>Passe por cada etapa do questionário usando os botões no início e no final da tela para
                        <span style={{ 'color': 'var(--green-500)' }}>  AVANÇAR (verde)</span>
                        ou <span style={{ 'color': 'var(--pink-500)' }}>RETROCEDER (vermelho)</span> etapas do questionário.</li>
                </ol>
            </Dialog>
        );
    }

    /**
     * Interpretador utilitário
     * @param {*} questionario 
     * @returns (boolean) - true, se questão é reconhecida como respondível por meio de seus indicadores, com atribuição de um valor da escala avaliativa do questionário para cada um.
     */
    isQuestaoDimensionalizadaFechada(questao) {
        return questao.tipo === 'DIMENSIONALIZADA_FECHADA' && questao.indicadores !== undefined;
    }

    /**
    * Interpretador utilitário
    * @param {*} questionario 
    * @returns (boolean) - true, se questão é reconhecida como respondível com campo de texto aberto.
    */
    isQuestaoAberta(questao) {
        return questao.tipo === 'ABERTA' || questao.tipo === 'DIMENSIONALIZADA_ABERTA';
    }

    /**
     * Interpretador utilitário
     * @param {*} questionario 
     * @returns (boolean) - true, se questão é reconhecida responível com opções de respostas.
     */
    isQuestaoFechada(questao) {
        return questao.tipo === 'FECHADA' && questao.opcoes !== undefined;
    }

}