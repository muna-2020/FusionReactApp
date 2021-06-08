//React imports
import React from 'react';

//Component used.
import Formula from '@root/Application/e.Editor/PC/Modules/9_Formula/Formula';

/**
 * @name CMSInputFormula_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSInputFormula
 * @returns {any} returns the cms checkbox's JSX
 */
const CMSInputFormula_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;
  
    /**
     * @name GetContent_Scientific
     * */
    const GetContent_Scientific = () => {
        return (<div className="scientific-calc" onContextMenu={(event) => { Events.OpenContextMenu ? Events.OpenContextMenu(event, {}) : Events.OpenContextMenu; }}>
            <div className="formula-icons-container">
                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('plus')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Plus.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('minus')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Minus.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('multiply')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Multiply.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('devide')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Divided.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('fraction')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Fraction.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('super')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Super.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('squreroot')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/SqureRoot.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('root')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Root.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('summation')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Summation.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('smallbracket')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/SmallBrcket.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('squarebracket')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/SqureBracket.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('flowerbracket')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/FlowerBracket.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('sine')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Sine.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('cos')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Cos.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('tan')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Tan.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('sec')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Sec.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('csc')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Csc.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('cot')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/Cot.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('sini')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/SinI.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('cosi')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/CosI.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.AddSubFormula('tani')}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/TanI.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.RemoveMathMl()}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/backspace1.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.ResetFormula()}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/delete.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.MoveCursorLeft()}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/moveLeft.png"} />
                </div>

                <div className="formula-icon" onClick={objEvt => Events.MoveCursorRight()}>
                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/moveRight.png"} />
                </div>
            </div>
            <div className="formula-editor">
                <span ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtype={Context.state.ElementJson["vElementTypeName"]}
                    contentEditable={false}
                    unselectable="on"
                    className="formula-main"
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    ref={Context.objInputFormulaRef}
                    ciscmsinputformularoot="Y"
                    cisscientific="Y"
                    className="formula-input">
                    <Formula
                        ElementJson={Context.state.ElementJson}
                        UpdateNewMathMl={Callbacks.UpdateNewMathMl}
                        PageId={Context.state.PageId}
                        ComponentKey={Context.state.ComponentKey}
                        JConfiguration={Context.props.JConfiguration}
                        ref={Context.state.FormulaRef}
                        FormulaRef={Context.state.FormulaRef} />
                </span>
            </div>
        </div>);
    };

    /**
     * @name GetContent_Simple
     * @summary 
     * */
    const GetContent_Simple = () => {
        return (<div className="simple-calculator" onContextMenu={(event) => { Events.OpenContextMenu ? Events.OpenContextMenu(event, {}) : Events.OpenContextMenu; }}>
            <div className="output-box" contenteditable="true">
                <span ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtype={Context.state.ElementJson["vElementTypeName"]}
                    contentEditable={false}
                    unselectable="on"
                    ciscmsinputformularoot="Y"
                    cissimple="Y"
                    className="formula-main"
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    ref={Context.objInputFormulaRef}
                    className="formula-input">
                    <Formula
                        ElementJson={Context.state.ElementJson}
                        UpdateNewMathMl={Callbacks.UpdateNewMathMl}
                        PageId={Context.state.PageId}
                        ref={Context.state.FormulaRef}
                        ComponentKey={Context.state.ComponentKey}
                        JConfiguration={Context.props.JConfiguration}
                        FormulaRef={Context.state.FormulaRef} />
                </span>
            </div>
            <div className="buttons-flex">
                <div className="left-box">
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(7)}>
                        7
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(8)}>
                        8
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(9)}>
                        9
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("a")}>
                        a
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("b")}>
                        b
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("c")}>
                        c
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(4)}>
                        4
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(5)}>
                        5
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(6)}>
                        6
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("d")}>
                        d
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("e")}>
                        e
                          </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("f")}>
                        f
                           </div>

                    <div className="keys" onClick={objEvt => Events.AddSubFormula(1)}>
                        1
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(2)}>
                        2
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(3)}>
                        3
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("x")}>
                        x
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("y")}>
                        y
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("z")}>
                        z
                            </div>

                    <div className="keys" onClick={objEvt => Events.AddSubFormula(0)}>
                        0
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(".")}>
                        ·
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("π")}>
                        π
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("r")}>
                        r
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("(")}>
                        (
                            </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(")")}>
                        )
                            </div>

                    <div className="keys w64" onClick={objEvt => Events.ResetFormula()}>
                        <img /> Alles löschen Del
                    </div>
                    <div className="keys px69" onClick={objEvt => Events.RemoveMathMl()}>
                        <img src= {Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/FromulaInputArrow.png"} /> Zurück
                    </div>
                </div>
                <div className="right-box">
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("+")}>
                        +
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("-")}>
                        -
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula("×")}>
                        ×
                    </div>
                    <div className="keys w64" onClick={objEvt => Events.AddSubFormula("hoch")}>
                        hoch ^
                    </div>
                    <div className="keys" onClick={objEvt => Events.AddSubFormula(":")}>
                        :
                    </div>
                    <div className="keys w100" onClick={objEvt => Events.AddSubFormula("bruchstrich")}>
                        Bruchstrich /
                    </div>
                    <div className="keys w100" onClick={objEvt => Events.AddSubFormula("root_w")}>
                        Wurzel w
                    </div>
                    <div className="keys flex50" onClick={objEvt => Events.MoveCursorLeft()}>
                        <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/ArrowLeft.png"} />
                    </div>
                    <div className="keys flex50" onClick={objEvt => Events.MoveCursorRight()}>
                        <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Application/ReactJs/PC/6_CMSElement/StandardElements/CMSInputFormula/ArrowRight.png"} />
                    </div>
                </div>
            </div>
        </div>)
    };

    /**
     * @name GetContent
     * @summary  
     * */
    const GetContent = () => {
        if (Context.props && Context.props.ElementJson.vElementJson.vFormulaType === "scientific") {
            return GetContent_Scientific();
        } else if (Context.props && Context.props.ElementJson.vElementJson.vFormulaType === "simple") {
            return GetContent_Simple();
        } else {
            return "";
        }
    };

    return GetContent();
};

export default CMSInputFormula_Common;
