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
import { InputTextarea } from 'primereact/inputtextarea';
import { ListBox } from 'primereact/listbox';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';

import GAS from "../../GAS";

import "./styles.css";

export default class PainelApropriador extends React.Component {
    /**
     * @summary Inicialização de estado mínima para renderização do cpmponente.
     */
    state = {
        painel: undefined,
        metamodeloAvaliativo: undefined,
        filtroTopicosSentimento: -1, //dropdown sentimento
        filtroDimensoes: null, //listbox de dimensões
        filtroTopicosText: null,
        dialogConcordar: true,
        dialogEditarTopico: false,
        editTopico: undefined
    }

    renderTopicosTipos = [
        {
            label: 'TODOS',
            value: -1,
        },
        {
            label: 'FRAGILIDADES',
            value: 'FRAGILIDADE'
        },
        {
            label: 'POTENCIALIDADES',
            value: 'POTENCIALIDADE'
        }
    ]

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
        let modified = {};
        if (props.painel !== state.painel) {
            modified.painel = props.painel;
        }
        if (props.metamodeloAvaliativo !== state.metamodeloAvaliativo) {
            modified.metamodeloAvaliativo = props.metamodeloAvaliativo;
        }
        return (Object.entries(modified).length === 0) ? null : modified;
    }

    componentDidMount() {
    }

    /**
      * @summary 3º na chamada de montagem do componente.
      * @description Elabora o JSX que define o componente.
      * @returns HTML{JSX} - relativo a este componente
      */
    render() {
        let renderDialog, renderDimensoes, renderTopicos;
        if (this.state.dialogConcordar) {
            renderDialog = this.showDialogConcordanciaGerenciar();
        } else if (this.state.dialogEditarTopico) {
            renderDialog = this.showDialogEditarTopico();
        } else {
            // console.log(this.state.etapa)
            let titulo = (
                <div>
                    <i className="pi pi-star" /> {this.state.painel.nivelOrganizacional['CAMPUS']}
                    <br />
                    <i className="pi pi-sitemap" /> {this.state.painel.nivelOrganizacional['CURSO']}
                </div>
            );
            renderDimensoes = (
                <div>
                    <div>
                        <Card className="disponivel"
                            key={this.state.painel.id}
                            title={titulo}
                            subTitle={`DISPONÍVEL ATÉ ${new Date(this.state.painel.terminoAplicacao).toLocaleString()}`} />
                    </div>
                    <div>
                        <Splitter>
                            <SplitterPanel size={27.5}>
                                <ListBox options={this.renderOptionsDimensoes()} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" value={this.state.filtroDimensoes} onChange={(e) => { /*console.log(e.value);*/ this.setState({ filtroDimensoes: e.value }) }} />
                            </SplitterPanel>
                            <SplitterPanel size={80} minSize={50}>
                                {this.renderDimensaoDescricao()}
                                {this.renderFiltrosTopicos()}
                                {this.renderTopicos()}
                            </SplitterPanel>
                        </Splitter>
                    </div>
                </div >
            )
        }

        return (
            <div className="painel-apropriador">
                {renderDialog}
                {renderTopicos}
                {renderDimensoes}
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

    renderDimensaoDescricao() {
        if (this.state.filtroDimensoes !== null)
            return (
                <div className="dimensao-descricao">
                    <b>{this.state.filtroDimensoes.nome}</b>
                    <br />
                    {this.state.filtroDimensoes.descricao}
                </div>
            );
    }

    renderFiltrosTopicos() {
        let buttonAdd, inputFilter;

        if (this.state.filtroDimensoes !== null) {
            inputFilter = (
                <span className="p-float-label">
                    <InputText id="topicosSearch" value={this.state.filtroTopicosText} onChange={(e) => this.setState({ filtroTopicosText: e.target.value })} />
                    <label htmlFor="topicosSearch">buscar tópico</label>
                </span>
            );
            if (this.state.filtroTopicosSentimento !== -1) {
                buttonAdd = (
                    <Button tooltipOptions={{ position: 'left' }} tooltip={`Adiciona um tópico na lista de "${this.state.filtroTopicosSentimento.toUpperCase()}" da dimensão "${this.state.filtroDimensoes.nome.toUpperCase()}"`} className="p-button-secondary" icon="pi pi-plus" onClick={() => {
                        this.setState({ dialogEditarTopico: true });
                    }} />
                );
            }
        }

        return (
            <div className="painel-apropriador-actions">
                {inputFilter}
                <Dropdown value={this.state.filtroTopicosSentimento} options={this.renderTopicosTipos} onChange={(e) => this.setState({ filtroTopicosSentimento: e.value })} />
                {buttonAdd}
            </div>
        );
    }

    filterTopicosByState() {
        let topicos = [];
        if (this.state.filtroDimensoes !== null)
            topicos = this.state.painel.topicos.filter(topico => topico.dimensaoNumero === this.state.filtroDimensoes.numero);;
        if (this.state.filtroTopicosSentimento !== -1)
            topicos = topicos.filter(topico => topico.sentimento === this.state.filtroTopicosSentimento);
        if (this.state.filtroTopicosText !== null && this.state.filtroTopicosText !== '' ) {
            topicos = topicos.filter(topico => { return new RegExp(`${this.state.filtroTopicosText}`, 'gi').test(JSON.stringify(topico)) })
        }
        return topicos;
    }

    renderTopicos() {
        if (this.state.painel === undefined)
            return;
        let topicos = this.filterTopicosByState();
        return (
            <div className="topicos">
                {
                    topicos.map(topico => {
                        let classTipoTopico = `topico-${topico.sentimento.toLowerCase()}`;

                        let abrangencia = (
                            <div>
                                <i className="pi pi-star" /> {topico.contexto.tipoNivelOrganizacional} <i className="pi pi-arrow-right" />  <i className="pi pi-users" /> {topico.contexto.segmentos.join(', ')}
                            </div>
                        );
                        let historico = (
                            <div>
                                <b>CRIAÇÃO</b> {`${new Date(topico.criacao.data).toLocaleString()} (${topico.criacao.usuario})`}
                                <br />
                                <b>REVISÃO</b> {`${new Date(topico.revisao.data).toLocaleString()} (${topico.revisao.usuario})`}
                            </div>
                        );

                        return (
                            <Card /*key={topico.id}*/
                                title={topico.topico}
                                className={classTipoTopico}
                                subTitle={abrangencia}
                                footer={this.renderActionsTopico(topico)}>
                                {historico}
                            </Card>
                        )
                    })
                }
            </div>
        );
    }


    /**
     * Renderização por mapeamento de {questionario.gruposQuestoes} para uso como propriedade do componente {Steps.model} em {this.render()}
     * @returns 
     */
    renderOptionsDimensoes() {
        let metamodeloAvaliativo = this.state.metamodeloAvaliativo;
        return metamodeloAvaliativo.eixos.map(eixo => {
            return {
                label: (<div>{eixo.nome}</div>),
                code: eixo.numero,
                items: eixo.dimensoes.map(dimensao => {
                    let countFragilidades = this.state.painel.topicos.filter(topico => topico.sentimento === "FRAGILIDADE" && topico.dimensaoNumero === dimensao.numero).length;
                    let countPotencialidades = this.state.painel.topicos.filter(topico => topico.sentimento === "POTENCIALIDADE" && topico.dimensaoNumero === dimensao.numero).length;
                    return {
                        label: (
                            <div className="dimensao" /*data-pr-tooltip={dimensao.descricao}*/ >
                                <Badge value={countFragilidades} severity="danger"></Badge>&nbsp;
                                <Badge value={countPotencialidades} severity="info"></Badge>
                                <br />{dimensao.nome}
                                {/* <Tooltip target=".dimensao" /> */}
                            </div>
                        ),
                        value: dimensao,
                    }
                })
            }
        });
    }


    /**
     * 
     * @param {*} questionario 
     * @returns 
     */
    renderActionsTopico(topico) {
        let renderButtonEditar, renderButtonRemover;
        renderButtonEditar = (
            <Button tooltipOptions={{ position: 'top' }} tooltip="Editar tópico" className="p-button-secondary" icon="pi pi-pencil" onClick={() => {
                this.setState({dialogEditarTopico: true, editTopico: topico});
            }} />
        );
        renderButtonRemover = (
            <Button tooltipOptions={{ position: 'top' }} tooltip="Excluir tópico deste painel" className="p-button-secondary" icon="pi pi-trash" onClick={() => {

            }} />
        );
        return (
            <span className="painel-apropriador-actions" >
                {renderButtonEditar}
                {renderButtonRemover}
            </span>
        );

    }


    /**
     * Renderiza modal para aceite das condições e início do questionário.
     * @returns 
     */
    showDialogConcordanciaGerenciar() {
        const dialogName = 'dialogConcordar';
        const footer = (
            <div>
                <Button label="Concordo!" icon="pi pi-check" onClick={() => {
                    this.setState({ [dialogName]: false });
                }} />

                <Route render={(props) => (
                    <Button className="p-button-danger" label="Discordo" icon="pi pi-times" onClick={() => {
                        this.setState({ [dialogName]: false });
                        props.history.goBack();
                    }} />
                )} />
            </div>
        );


        return (
            <Dialog closable={false} header="Você deseja confirmar o gerenciamento deste painel?" footer={footer} visible={this.state[dialogName]} style={{ width: '85vw' }} modal onHide={() => this.onHide(dialogName)} >
                <ol style={{ lineHeight: '1.5rem', listStylePosition: 'inside', display: 'flex', flexDirection: 'column' }}>
                    <li>Este painel poderá ser modificado até <b>{new Date(this.state.painel.terminoAplicacao).toLocaleString()}</b>.<br /></li>
                    <li>Ao prosseguir, você concorda em participar do processo avaliativo.<br /></li>
                    <li>Gerencie cada dimensão avaliativa deste painel, cadastrando tópicos (fragilidades e potencialidades) detectadas.<br /></li>
                    <li>Para cada potencialidade ou fragilidade cadastrada, especialmente sobre fragilidades, cadastre ações de melhorias.</li>
                </ol>
            </Dialog>
        );
    }


    /**
    * Renderiza modal para aceite das condições e início do questionário.
    * @returns 
    */
    showDialogEditarTopico() {
        const topico = this.state.editTopico;
        const dialogName = 'dialogEditarTopico';
        let dialogTitle;
        if (topico === undefined) {
            dialogTitle = 'Adicionar tópico';
        } else {
            dialogTitle = 'Editar tópico';
        }
        const footer = (
            <div>
                <Button label="Salvar" icon="pi pi-check" onClick={() => {
                    this.setState({ [dialogName]: false });
                    //extrai dados, cria um tópico e adiciona em this.state.painel.topicos{array}.
                }} />

                <Button className="p-button-danger" label="Cancelar" icon="pi pi-times" onClick={() => {
                    this.setState({ [dialogName]: false });
                }} />
            </div>
        );


        return (
            <Dialog closable={false} header={dialogTitle} footer={footer} visible={this.state[dialogName]} style={{ width: '85vw' }} modal onHide={() => this.onHide(dialogName)} >
                <Card>
                    <span className="p-label">
                        <InputText id="inputTextTopico" /*value={value} onChange={(e) => setValue(e.target.value)}*/ />
                        <label htmlFor="inputTextTopico">Tópico</label>
                    </span>
                </Card>
            </Dialog>
        );
    }

}