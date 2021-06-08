// React related imports.
import React, { useReducer, useEffect, useImperativeHandle, useRef } from 'react';

//Base classes.
//import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

// Calculator display components.
import EquationDisplay from "@root/Framework/Controls/calculator/EquationDisplay/EquationDisplay";
import ResultDisplay from "@root/Framework/Controls/Calculator/ResultDisplay/ResultDisplay";

//Module realted fies.
import Calculator_ModuleProcessor from "@shared/Framework/Controls/Calculator/Calculator_ModuleProcessor";
import * as Calculator_Hook from "@shared/Framework/Controls/Calculator/Calculator_Hook";

/**
 * @name Standard
 * @param {object} props props
 * @summary Standard calculator layout.
 * @returns {object} component JSX.
 */
const Standard = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, Calculator_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    const objContext = {
        state, props, dispatch,
        ["ModuleName"]: props.Id,
        ["Calculator_ModuleProcessor"]: new Calculator_ModuleProcessor(),
        ["DataRef"]: { ...state }, // used for updating state changes.
        ["DisplayValues"]: {
            ["Plus"]: "+",
            ["Minus"]: "-", //"–",
            ["Multiplication"]: "×",
            ["Division"]: "÷",
            ["MemorySave"]: "MS",
            ["MemoryRecall"]: "MR",
            ["MemoryClear"]: "MC",
            ["MemoryAdd"]: "M+",
            ["MemorySubtract"]: "M-",
            ["Period"]: ".",
            ["Clear"]: "C",
            ["SquareRoot"]: "<span>&radic;</span>",
            ["Percentage"]: "%",
            ["Exponent"]: "^",
            ["Equals"]: "=",
            ["OpenParentheses"]: "(",
            ["CloseParetheses"]: ")",
            ["BackSpace"]: "←",
            ["0"]: "0",
            ["1"]: "1",
            ["2"]: "2",
            ["3"]: "3",
            ["4"]: "4",
            ["5"]: "5",
            ["6"]: "6",
            ["7"]: "7",
            ["8"]: "8",
            ["9"]: "9"
        }
    };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Calculator_ModuleProcessor.Initialize(objContext, objContext.Calculator_ModuleProcessor);


    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Calculator_ModuleProcessor.Initialize(objContext, objContext.Calculator_ModuleProcessor);

    /**
     * @name useEffect  
     * @summary To load styles.
     */
    useEffect(() => {

        //Mouse actions 
        var objSvgPlaceHolder = document.getElementById("Calculator_SVG_Standard");

        objSvgPlaceHolder.addEventListener('mousedown', function (e) {
            if (e.target.parentNode.getAttribute("name") === "JcalculatorOperation") {
                e.target.parentNode.style.opacity = "0.75";
            }
        });

        objSvgPlaceHolder.addEventListener('mouseup', function (e) {
            if (e.target.parentNode.getAttribute("name") === "JcalculatorOperation") {
                e.target.parentNode.style.opacity = "1";
            }
        });

        return () => {

            objSvgPlaceHolder.removeEventListener('mousedown', function (e) {
                if (e.target.parentNode.getAttribute("name") === "JcalculatorOperation") {
                    e.target.parentNode.style.opacity = "0.75";
                }
            });

            objSvgPlaceHolder.removeEventListener('mouseup', function (e) {
                if (e.target.parentNode.getAttribute("name") === "JcalculatorOperation") {
                    e.target.parentNode.style.opacity = "1";
                }
            });
        }
    }, []);

    return (
        <React.Fragment>
            <div className="standard-layout-wrapper">
                <div className="standard-popup-header">
                    <span>Taschenrechner</span>
                    {/*<div className="close" onClick={() => { editorPopup.ClosePopup(props.Id); }}>
                        <img
                            src="https://intranet.lernpassplus.ch/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/Popup/Common/Icon_Close.png"
                            alt=""
                            className="close"
                        />
                    </div>*/}
                </div>
                <div className="standard-equation-display-wrapper">
                    <EquationDisplay equation={objContext.state.strJcalculatorEquation} />
                </div>
                <div className="result-display-wrapper">
                    <ResultDisplay result={objContext.state.strJcalculatorResult} />
                </div>
                <div className="standard-keypad-wrapper">
                    <svg id="Calculator_SVG_Standard" type="ContentSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="256px" height="329px" viewBox="0 0 256 329" style={{ "enableBackground": "new 0 0 256 329" }} xmlSpace="preserve">
                        <rect className="st0" width="256" height="329" />
                        <g id="JcalculatorDivide" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Division"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorDivide") }}>
                            <circle className="st1" cx="224.5" cy="100.5" r="21.5" />
                            <text transform="matrix(1 0 0 1 217.3779 108.0719)" className="st2 st3 st4">{objContext.DisplayValues["Division"]}</text>
                        </g>
                        <g id="JcalculatorMultiply" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Multiplication"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMultiply") }}>
                            <circle className="st1" cx="224.5" cy="150.5" r="21.5" />
                            <text transform="matrix(1 0 0 1 217.3779 158.0723)" className="st2 st3 st4">{objContext.DisplayValues["Multiplication"]}</text>
                        </g>
                        <g id="JcalculatorMinus" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Minus"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMinus") }}>
                            <circle className="st1" cx="224.5" cy="200.5" r="21.5" />
                            <text transform="matrix(1 0 0 1 220 208.0716)" className="st2 st3 st4">{objContext.DisplayValues["Minus"]}</text>
                        </g>
                        <g id="JcalculatorPlus" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Plus"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorPlus") }}>
                            <circle className="st1" cx="224.5" cy="250.5" r="21.5" />
                            <text transform="matrix(1 0 0 1 217.3779 258.0719)" className="st2 st3 st4">{objContext.DisplayValues["Plus"]}</text>
                        </g>
                        <g id="JcalculatorEqual" style={{ "cursor": "pointer" }} name="JcalculatorOperation"
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.Evaluate(objContext) }}>
                            <circle className="st1" cx="224.5" cy="300.5" r="21.5" />
                            <text transform="matrix(1 0 0 1 217.3779 308.0723)" className="st2 st3 st4">{objContext.DisplayValues["Equals"]}</text>
                        </g>
                        <g id="Jcalculator0" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["0"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator0") }}>
                            <circle className="st1" cx="35" cy="283" r="24" />
                            <text transform="matrix(1 0 0 1 26.7496 291.4526)" className="st2 st3 st5">{objContext.DisplayValues["0"]}</text>
                        </g>
                        <g id="Jcalculator1" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["1"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator1") }}>
                            <circle className="st1" cx="35" cy="227" r="24" />
                            <text transform="matrix(1 0 0 1 29.5997 235.4526)" className="st2 st3 st5">{objContext.DisplayValues["1"]}</text>
                        </g>
                        <g id="Jcalculator2" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["2"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator2") }}>
                            <circle className="st1" cx="91" cy="227" r="24" />
                            <text transform="matrix(1 0 0 1 84.0396 235.4526)" className="st2 st3 st5">{objContext.DisplayValues["2"]}</text>
                        </g>
                        <g id="Jcalculator3" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["3"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator3") }}>
                            <circle className="st1" cx="147" cy="227" r="24" />
                            <text transform="matrix(1 0 0 1 140.4897 236.4526)" className="st2 st3 st5">{objContext.DisplayValues["3"]}</text>
                        </g>
                        <g id="Jcalculator4" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["4"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator4") }}>
                            <circle className="st1" cx="35" cy="171" r="24" />
                            <text transform="matrix(1 0 0 1 27.4908 179.4526)" className="st2 st3 st5">{objContext.DisplayValues["4"]}</text>
                        </g>
                        <g id="Jcalculator5" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["5"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator5") }}>
                            <circle className="st1" cx="91" cy="171" r="24" />
                            <text transform="matrix(1 0 0 1 83.8004 179.4526)" className="st2 st3 st5">{objContext.DisplayValues["5"]}</text>
                        </g>
                        <g id="Jcalculator6" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["6"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator6") }}>
                            <circle className="st1" cx="147" cy="171" r="24" />
                            <text transform="matrix(1 0 0 1 139.1107 179.4526)" className="st2 st3 st5">{objContext.DisplayValues["6"]}</text>
                        </g>
                        <g id="Jcalculator7" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["7"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator7") }}>
                            <circle className="st1" cx="35" cy="115" r="24" />
                            <text transform="matrix(1 0 0 1 28.4902 123.4526)" className="st2 st3 st5">{objContext.DisplayValues["7"]}</text>
                        </g>
                        <g id="Jcalculator8" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["8"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator8") }}>
                            <circle className="st1" cx="91" cy="115" r="24" />
                            <text transform="matrix(1 0 0 1 83.7402 123.4526)" className="st2 st3 st5">{objContext.DisplayValues["8"]}</text>
                        </g>
                        <g id="Jcalculator9" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["9"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "Jcalculator9") }}>
                            <circle className="st1" cx="147" cy="115" r="24" />
                            <text transform="matrix(1 0 0 1 139.1854 123.4526)" className="st2 st3 st5">{objContext.DisplayValues["9"]}</text>
                        </g>
                        <g id="JcalculatorPeriod" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Period"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorPeriod") }}>
                            <circle className="st1" cx="91" cy="283" r="24" />
                            <text transform="matrix(1 0 0 1 87.6095 292.4526)" className="st2 st3 st5">{objContext.DisplayValues["Period"]}</text>
                        </g>
                        <g id="JcalculatorClear" style={{ "cursor": "pointer" }} name="JcalculatorOperation"
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleClearPress(objContext, "JcalculatorClear") }}>
                            <circle className="st1" cx="147" cy="283" r="24" />
                            <text transform="matrix(1 0 0 1 138.2553 291.4526)" className="st2 st3 st5">{objContext.DisplayValues["Clear"]}</text>
                        </g>
                        <g id="JcalculatorMemoryClear" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["MemoryClear"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMemoryClear") }}>
                            <rect x="10.5" y="10.5" className="st6" width="43" height="24" />
                            <text transform="matrix(0.9773 0 0 1 21.7388 27.0078)" className="st2 st3 st7">{objContext.DisplayValues["MemoryClear"]}</text>
                        </g>
                        <g id="JcalculatorMemoryRecall" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["MemoryRecall"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMemoryRecall") }}>
                            <rect x="58.5" y="10.5" className="st6" width="43" height="24" />
                            <text transform="matrix(0.9773 0 0 1 69.7388 27.0078)" className="st2 st3 st7">{objContext.DisplayValues["MemoryRecall"]}</text>
                        </g>
                        <g id="JcalculatorMemoryStore" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["MemorySave"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMemoryStore") }}>
                            <rect x="106.5" y="10.5" className="st6" width="43" height="24" />
                            <text transform="matrix(0.9773 0 0 1 117.751 27.0078)" className="st2 st3 st7">{objContext.DisplayValues["MemorySave"]}</text>
                        </g>
                        <g id="JcalculatorMemoryMinus" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["MemorySubtract"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMemoryMinus") }}>
                            <rect x="154.5" y="10.5" className="st6" width="43" height="24" />
                            <text transform="matrix(0.9773 0 0 1 166.7899 27.0078)" className="st2 st3 st7">{objContext.DisplayValues["MemorySubtract"]}</text>
                        </g>
                        <g id="JcalculatorOpenBracket" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["OpenParentheses"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorOpenBracket") }}>
                            <rect x="90.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 106.9205 61.2881)" className="st2 st3 st7">{objContext.DisplayValues["OpenParentheses"]}</text>
                        </g>
                        <g id="JcalculatorCloseBracket" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["CloseParetheses"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorCloseBracket") }}>
                            <rect x="130.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 146.6249 61.2881)" className="st2 st3 st7">{objContext.DisplayValues["CloseParetheses"]}</text>
                        </g>
                        <g id="JcalculatorPower" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Exponent"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorPower") }}>
                            <rect x="170.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 185.4568 60.3296)" className="st2 st3 st7">y</text>
                            <text transform="matrix(0.8538 0 0 1 192.0018 55.5381)" className="st2 st3 st8">x</text>
                        </g>
                        <g id="JcalculatorBack" style={{ "cursor": "pointer" }} name="JcalculatorOperation"
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorBack") }}>
                            <rect x="210.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 221.8913 61.2881)" className="st2 st9 st10">{objContext.DisplayValues["BackSpace"]}</text>
                        </g>
                        <g id="JcalculatorMemoryPlus" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["MemoryAdd"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorMemoryPlus") }}>
                            <rect x="203.5" y="10.5" className="st6" width="43" height="24" />
                            <text transform="matrix(0.9773 0 0 1 214.5237 27.0078)" className="st2 st3 st7">{objContext.DisplayValues["MemoryAdd"]}</text>
                        </g>
                        <g id="JcalculatorSqureRoot" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["SquareRoot"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorSqureRoot") }}>
                            <rect x="10.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 25.165 61.5)" className="st2 st3 st7">√</text>
                        </g>
                        <g id="JcalculatorPercentage" style={{ "cursor": "pointer" }} name="JcalculatorOperation" value={objContext.DisplayValues["Percentage"]}
                            onClick={(e) => { objContext.Calculator_ModuleProcessor.HandleKeypadPress(objContext, "JcalculatorPercentage") }}>
                            <rect x="50.5" y="45.5" className="st6" width="36" height="23" />
                            <text transform="matrix(0.8538 0 0 1 63.3159 61.3198)" className="st2 st3 st7">{objContext.DisplayValues["Percentage"]}</text>
                        </g>
                        <g id="JcalculatorMemoryDisplay" className="st11"></g>
                    </svg>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Standard;