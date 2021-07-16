import React from "react";
import StylesQuestion from "./styles.css";


function QuestionComponent(props){
    return(
 
                        <div className="questions-container">
                            <span className="indicador-titulo">
                                {props.text}
                            </span>
                            <span className="indicador-respostas" style={{"background":props.color}}>
                                <span className="radio">
                                        <input type="radio" name={props.group}></input>
                                            <span className="classificacao">
                                            NÃO SE APLICA OU É DESCONHECIDO
                                            </span>
                                </span>
                                <span className="radio">
                                            <input type="radio" name={props.group}></input>
                                            <span className="classificacao">
                                            BASTANTE INSATISFATÓRIO
                                            </span>
                                </span>
                                <span className="radio">
                                            <input type="radio" name={props.group}></input>
                                            <span className="classificacao">
                                            INSATISFATÓRIO
                                            </span>
                                </span>
                                <span className="radio">
                                            <input type="radio" name={props.group}></input>
                                            <span className="classificacao">
                                            SATISFATÓRIO
                                            </span>
                                </span>
                                <span className="radio">
                                            <input type="radio" name={props.group}></input>
                                            <span className="classificacao">
                                            BOM
                                            </span>
                                </span>
                           
                            </span>
                        </div>   
    );
}
export default QuestionComponent;