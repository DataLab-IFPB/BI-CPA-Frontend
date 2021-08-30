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
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';

import "./styles.css";

export default class PainelApropriador extends React.Component {
    /**
     * @summary Inicialização de estado mínima para renderização do cpmponente.
     */
    state = {
        painel: undefined,
        metamodeloAvaliativo: undefined,
        filtroTopicosSentimento: null, //dropdown sentimento
        filtroDimensoes: null, //listbox de dimensões
        filtroTopicosText: null,
        dialogConcordar: true,
        dialogEditarTopico: false,
        editTopico: undefined,
    }

    itemsTopicosTipos = [
        {
            label: 'TODOS',
            value: null,
        },
        {
            label: 'FRAGILIDADE',
            value: 'FRAGILIDADE'
        },
        {
            label: 'POTENCIALIDADE',
            value: 'POTENCIALIDADE'
        }
    ]

    /**
     * @summary 1º na chamada de montagem do componente
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.renderActionsTopico = this.renderActionsTopico.bind(this);
        this.onChangeSentimento = this.onChangeSentimento.bind(this);
        this.onInputTopico = this.onInputTopico.bind(this);

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
                            subTitle={`PAINEL APROPRIADOR DISPONÍVEL ATÉ ${new Date(this.state.painel.terminoAplicacao).toLocaleString()}`} />
                    </div>
                    <div>
                        <Splitter>
                            <SplitterPanel size={27.5}>
                                <ListBox options={this.renderOptionsDimensoes()} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" value={this.state.filtroDimensoes} onChange={(e) => { /*console.log(e.value);*/ this.setState({ filtroDimensoes: e.value }) }} />
                            </SplitterPanel>
                            <SplitterPanel size={80} minSize={50}>
                                {/* {this.renderDimensaoDescricao()} */}
                                {/* {this.renderFiltrosTopicos()} */}
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

    filterTopicosByState() {
        let topicos = [];
        if (this.state.filtroDimensoes !== null)
            topicos = this.state.painel.topicos.filter(topico => topico.dimensaoNumero === this.state.filtroDimensoes.numero);;
        // if (this.state.filtroTopicosSentimento !== -1)
        //     topicos = topicos.filter(topico => topico.sentimento === this.state.filtroTopicosSentimento);
        // if (this.state.filtroTopicosText !== null && this.state.filtroTopicosText !== '') {
        //     topicos = topicos.filter(topico => { return new RegExp(`${this.state.filtroTopicosText}`, 'gi').test(JSON.stringify(topico)) })
        // }
        return topicos;
    }

    onChangeSentimento(e) {
        this.dt.filter(e.value, 'sentimento', 'equals');
        this.setState({ filtroTopicosSentimento: e.value })
    }

    onInputTopico(e) {
        this.dt.filter(e.target.value, 'topico', 'contains');
        this.setState({ filtroTopicosText: e.value });
    }

    renderTopicos() {
        if (this.state.painel === undefined || this.state.filtroDimensoes === null || this.state.filtroDimensoes === null)
            return;

        let topicos = this.filterTopicosByState();

        const header = (
            <div className="bar-flex between">
                <Button type="button" icon="pi pi-caret-down" label="DICA" onClick={(e) => this.op.toggle(e)} aria-haspopup aria-controls="overlay_panel" />
                <OverlayPanel ref={(el) => this.op = el} id="overlay_panel" style={{ width: '50%' }}>
                    <b><u>DIMENSÃO {this.state.filtroDimensoes.nome.toUpperCase()}</u></b>
                    <br />
                    {this.state.filtroDimensoes.descricao}
                    <br /><br />
                    <b><u>DICAS PARA APROPRIAÇÃO DE RESULTADOS</u></b>
                    <br />
                    <ol style={{ lineHeight: '1.5rem', listStylePosition: 'inside', display: 'flex', flexDirection: 'column' }}>
                        <li>Detecte fragilidades ou potencialidades (de seu CURSO, CAMPUS ou INSTITUCIONALMENTE) e os adicione como tópicos avaliativos.</li>
                        <li>Entenda que cada tópico adicionado será uma informação de destaque ou apropriadora: interprete fatos/resultados disponíveis em relatórios de avaliações internas, externas ou reivindicações da comunidade acadêmica.</li>
                        <li>Atenção com tópicos destacados como FRAGILIDADE: disponha uma ou mais ações de melhorias sobre eles, a serem monitoradas para superá-los.</li>
                        <li>Atenção com tópicos destacados como POTENCIALIDADES: opcinalmente, disponha uma ou mais ações para compartilhá-los ou divulgá-los com a comunidade interna ou externa.</li>
                    </ol>
                </OverlayPanel>
                <Button tooltipOptions={{ position: 'bottom' }} label="TÓPICO" tooltip={`Adiciona um tópico na lista de "${this.state.filtroDimensoes.nome.toUpperCase()}" da dimensão "${this.state.filtroDimensoes.nome.toUpperCase()}"`} icon="pi pi-plus" onClick={() => {
                    this.setState({ dialogEditarTopico: true, editTopico: {}});
                }} />
            </div>
        );

        const filterTopico = (
            <div className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText style={{ width: "100%" }} type="search" value={this.state.filtroTopicosText} onInput={this.onInputTopico} placeholder="buscar..." />
            </div>
        );

        const filterSentimento = (<Dropdown showClear value={this.state.filtroTopicosSentimento} options={this.itemsTopicosTipos} onChange={this.onChangeSentimento} />);

        let renderAbrangencia = (topico) => {
            return (
                <div>
                    <i className="pi pi-star" /> {topico.contexto.tipoNivelOrganizacional}
                    <br />
                    <i className="pi pi-users" /> {topico.contexto.segmentos.join(', ')}
                </div>
            );
        };

        let renderCriacaoAtualizacao = (topico) => {
            return (
                <div>
                    <i className="pi pi-arrow-circle-right" /> {new Date(topico.criacao.data).toLocaleString()} <b><i>{topico.criacao.usuario}</i></b>
                    <br />
                    <br />
                    <i className="pi pi-arrow-circle-down" /> {new Date(topico.revisao.data).toLocaleString()} <b><i>{topico.criacao.usuario}</i></b>
                </div>
            );
        };

        let renderSentimento = (topico) => {
            return (
                <span className={`badge-topico ${topico.sentimento.toLowerCase()}`}>{topico.sentimento}</span>
            );
        }

        return (
            <div className="topicos" >
                <DataTable
                    showGridlines
                    ref={(el) => this.dt = el}
                    value={topicos}
                    columnResizeMode="fit"
                    rows={10}
                    header={header}
                    emptyMessage="sem tópicos cadastrados!"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" >
                    <Column style={{ width: '25%' }} header="Topico" field="topico" filter filterElement={filterTopico} />
                    <Column style={{ width: '17.5%' }} header="Sentimento" field="sentimento" body={renderSentimento} filter filterElement={filterSentimento} />
                    <Column style={{ width: '17.5%' }} header="Abrangência" body={renderAbrangencia} />
                    <Column style={{ width: '25%' }} header="Histórico" body={renderCriacaoAtualizacao} />
                    <Column style={{ width: '15%' }} header="Ações" body={this.renderActionsTopico}></Column>
                </DataTable>
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
                this.setState({ dialogEditarTopico: true, editTopico: topico });
            }} />
        );
        renderButtonRemover = (
            <Button tooltipOptions={{ position: 'top' }} tooltip="Excluir tópico deste painel" className="p-button-secondary" icon="pi pi-trash" onClick={() => {

            }} />
        );
        return (
            <span className="bar-flex center" >
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
        if (topico === {}) {
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
        
        const dropDownOrigemOptions = [
            {label: 'REIVINDICAÇÃO COMUNIDADE ACADÊMICA', value: 'REIVINDICAÇÃO'},
            {label: 'RESULTADO AVALIAÇÃO INTERNA', value: 'AVALIAÇÃO INTERNA'},
            {label: 'RESULTADO AVALIAÇÃO EXTERNA', value: 'AVALIAÇÃO EXTERNA'}
        ];

        return (
            <Dialog closable={false} header={dialogTitle} footer={footer} visible={this.state[dialogName]} style={{ width: '85vw' }} modal onHide={() => this.onHide(dialogName)} >
                <Card>
                    <div className="p-field">
                        <label htmlFor="inputTextTopico" className="p-d-block">Tópico</label>
                        <InputTextarea id="inputTextTopico" aria-describedby="inputTextTopico-help" className="p-invalid p-d-block" autoResize style={{width: '100%'}}/>
                        <small id="inputTextTopico-help"  className="p-error p-d-block">Descreva-o como um destaque, considerando fatos ou resultados.</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="dropDownOrigem" className="p-d-block">Origem</label>
                        <Dropdown id="dropDownOrigem" value={this.state.editTopico.origem} options={dropDownOrigemOptions} aria-describedby="dropDownOrigem-help" className="p-invalid p-d-block"/>
                        <small id="dropDownOrigem-help"  className="p-error p-d-block">Indique a fonte de onde este tópico avaliativo.</small>
                    </div>
                </Card>
            </Dialog>
        );
    }

}