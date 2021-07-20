import Loading from "./components/Loading";


/**@
* @descripton - Classe SINGLETON para acesso a requisições via window.addEventListener('message') ao iframe de um projeto Google Apps Script.
* @summary
*      1.Projeto deve estar implantado como uma 'App da Web', no Goole Apps Script.
*      2. GAS_DOMAIN(string) - deve corresponder ao dominio da URL da src do iframe do projeto Google Apps Script (verificável via busca na ferramenta de inspeção do navegador pelo termo 'script.googleusercontent.com').
* @example GAS.getTnstance() //devolve objeto GAS.
* @author giuseppe.lima@ifpb.edu.br
* @since 26/06/2021
*/
export default class GAS {
 
    static _instance = null;
    modulo = null;
    GAS_DOMAIN_IFRAME = "https://n-ca4cgm362sqjoxuzuprc7rrzekcxvqqzhi4jwwy-1lu-script.googleusercontent.com";
    GAS_DOMAN_DEV = "https://script.google.com/a/macros/ifpb.edu.br/s/AKfycbwvZi6D-udCXUXzwICweA9uZ3PGWCdPRMz2vWG-79I/dev";
  
    constructor() {
        if (GAS._instance != null)
            throw new Error('Esta classe não pode ser instanciada mais de uma vez');
        // if (GAS._instance === null)
        //     throw new Error('Esta classe é um singleton e somente pode ser instanciada via GAS.getInstance()');
        window.removeEventListener('message', this.handleWindowMessage);
        window.addEventListener('message', this.handleWindowMessage);

        this.responses = {};

        console.debug('[GAS] Listener window(message) instalado no app cliente');
    }
  
    handleWindowMessage(messageWindowEvent) {
        GAS._instance.callback(messageWindowEvent, GAS._instance.modulo);
    }
  
    static getInstance() {
        if (GAS._instance === null) {
            GAS._instance = new GAS();
        }
        return GAS._instance;
    }
  
    /**
     * Faz requisição ao fram pai (Back-End)
     * @param requestObject     const REQUEST
     * @param functionCallbackName
     * @param modulo
     */
    //request = async (requestObject, functionCallbackName, modulo) => {
    request0(requestObject, functionCallbackName, modulo) {
        console.debug("[GAS] Inicializando GAS.request() ao servidor");
        let message = {
            functionRunParams: requestObject, //caso não funcione trocar por JSON.stringify(formObject)
            functionCallbackName: functionCallbackName
        };
        
        this.modulo = modulo;
        if (window.location !== window.parent.location) {
            Loading.loading(true);
            window.parent.postMessage(message, this.GAS_DOMAIN_IFRAME);
        } else {
            console.error(`A app não está carregada dentro de um iframe de projeto GAS com src = "${this.GAS_DOMAIN_IFRAME}" 
            ou não está sendo acessada pela URL de produção e desenvolvimento do mesmo. Tente acessar pela URL de desenvolvimento ${this.GAS_DOMAN_DEV}`);
        }
        
    }

    request = async (service, ...serviceParams) => {        
        if (window.location !== window.parent.location) {
            let responseIndex = Object.entries(this.responses).length;
            console.debug(`[GAS] Inicializando GAS.request(${service}) no servidor com response nº{${responseIndex}}`);
            let message = {
                functionRunParams: {
                    functionName: service,
                    functionParams: serviceParams
                },
                functionCallbackName: responseIndex //caso não funcione trocar por JSON.stringify(formObject)                
            };            
            Loading.loading(true);
            window.parent.postMessage(message, this.GAS_DOMAIN_IFRAME);            
            return await this.response(responseIndex);
        } else {
            let error =`A app não está carregada dentro de um iframe de projeto GAS com src = "${this.GAS_DOMAIN_IFRAME}" 
            ou não está sendo acessada pela URL de produção e desenvolvimento do mesmo. Tente acessar pela URL de desenvolvimento ${this.GAS_DOMAN_DEV}`;
            console.error(error);
            throw new Error(error);
        }            
    }
  
    response(responseIndex) {
        this.responses[responseIndex+''] = {};
        return new Promise((resolve) => {            
            let responseIntervalId = setInterval(() => {
                if (this.responses[responseIndex].done) {
                    clearInterval(this.responses[responseIndex].intervalId);
                    let response = this.responses[responseIndex].response;
                    delete this.responses[responseIndex];
                    //console.debug(this.responses);
                    if (this.hasCPAError(response)) {
                        console.error(response);
                        throw response;
                    }
                    resolve(response);

                    //não possui mais responses em execução ocultar loading
                    let remainResponses = Object.entries(this.responses).filter(entry => !this.responses[entry[0]].done);                 
                    Loading.loading(remainResponses === undefined);        
                }
                //console.debug("processando response index " + responseIndex);
            }, 500);
            this.responses[responseIndex].done = false;
            this.responses[responseIndex].intervalId = responseIntervalId;
        });
    }

    /**
     * Invocada via iframe pai, quando algo é retornado pelo fim de google.script.run lá na cloud
     * @param e   função a ser chamada no iframe filho
     * @param targetObject parâmetros da função chamada no iframe filho
     */
    callback(e, targetObject) {
        if (e.origin !== this.GAS_DOMAIN_IFRAME)
        return;
        
        var functionCallbackName = e.data.functionCallbackName;
        var functionCallbackParams = e.data.functionCallbackParams; //caso não funcione trocar por JSON.parse(functionRunParams)
        
        console.debug(`[GAS] Inicializando GAS.callback() para response nº{${functionCallbackName}}`);
        //console.debug("iframe(" + e.origin + ") solicitou ao iframe(" + window.location.href + "): googleCallbackrun(" + functionCallbackName + ")");
        //targetObject[functionCallbackName](functionCallbackParams);
        // console.log(functionCallbackName);
        // console.log(functionCallbackParams);
        //console.log(this.responses);

        if (this.responses[functionCallbackName] !== undefined) {           
            this.responses[functionCallbackName].response = functionCallbackParams;
            this.responses[functionCallbackName].done = true;     
        }
    }
  
    hasCPAError(responseObj) {
        return (responseObj instanceof Error && responseObj.message.includes('CPAError'));
    }
  
 }
