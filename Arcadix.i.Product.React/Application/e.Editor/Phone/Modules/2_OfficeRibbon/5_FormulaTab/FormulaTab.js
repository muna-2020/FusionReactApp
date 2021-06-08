//React related imports.
import React, { useLayoutEffect, useEffect, useReducer } from "react";

//Base classes/hooks.
import * as FormulaTab_Hook from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab_Hook";

//Module related fies.
import FormulaTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab_ModuleProcessor";
import * as FormulaTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab_MetaData"

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component used.
import FormulaPopup from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/5_FormulaTab/FormulaPopup/FormulaPopup";

//Application state Classes/methods.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name StartTab
 * @summary this tab is Responsible for Start tab in office ribbon.
 * @param {any} props 
 */
const FormulaTab = props => {

    /**
    * @name [state, dispatch]
    * @summary Gets the state and dispatch for the component. Initializes the UndoRedo for the component.
    * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FormulaTab_Hook.GetInitialState(props));

    const objImageMeta = FormulaTab_MetaData.GetImageMeta();
    const arrFormulaTab = [{ 
        GroupName: "Layout",
        FormulaCount: 15,
        DisplayName: "Layout",
        DisplayImage: objImageMeta.LayoutTemplatesImage
    }, {
        GroupName: "Accent",
        FormulaCount: 12,
        DisplayName: "Accent",
        DisplayImage: objImageMeta.AccentTemplatesImage
    }, {
        GroupName: "Fence",
        FormulaCount: 8,
        DisplayName: "Fence",
        DisplayImage: objImageMeta.FenceTemplatesImage
    }, {
        GroupName: "Trigonometry",
        FormulaCount: 12,
        DisplayName: "Trigonometry",
        DisplayImage: objImageMeta.TrigonometryTemplatesImage
    }, {
        GroupName: "Calculus",
        FormulaCount: 18,
        DisplayName: "Calculus",
        DisplayImage: objImageMeta.CalculusTemplatesImage
    }, {
        GroupName: "Matrix",
        FormulaCount: 4,
        DisplayName: "Matrix",
        DisplayImage: objImageMeta.MatrixTemplatesImage
    }, {
        GroupName: "ArrowIcons",
        FormulaCount: 18,
        DisplayName: "Arrow icons",
        DisplayImage: objImageMeta.ArrowSymbolsImage
    }, {
        GroupName: "OperatorIcons",
        FormulaCount: 12,
        DisplayName: "Operator icons",
        DisplayImage: objImageMeta.OperatorSymbolsImage
    }, {
        GroupName: "RelationalSymbols",
        FormulaCount: 20,
        DisplayName: "Relational symbols",
        DisplayImage: objImageMeta.RelationalSymbolsImage
    }, {
        GroupName: "SetTheorySymbols",
        FormulaCount: 16,
        DisplayName: "SetTheory symbols",
        DisplayImage: objImageMeta.SetTheorySymbolsImage
    }, {
        GroupName: "LogicalSymbols",
        FormulaCount: 6,
        DisplayName: "Logical symbols",
        DisplayImage: objImageMeta.LogicalSymbolsImage
    }, {
        GroupName: "GreekSymbols1",
        FormulaCount: 24,
        DisplayName: "Greek symbols 1",
        DisplayImage: objImageMeta.GreekCharactersLowerCaseImage
    }, {
        GroupName: "GreekSymbols2",
        FormulaCount: 12,
        DisplayName: "Greek Symbols 2",
        DisplayImage: objImageMeta.GreekCharactersUpperCaseImage
    }];
    /**
    * @name objContext
    * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
    * */
    let objContext = { state, dispatch, props, ["FormulaTab_ModuleProcessor"]: new FormulaTab_ModuleProcessor() }; // objContext

    /**
     * @name useEffect
     * @summary this add events to the document to close any opened popup on click.
     * */
    useEffect(() => {
        const ClosePopups = (objEvt) => {
            objContext.dispatch({
                type: "SET_STATE",
                payload: { activePopup: "" }
            })
        };
        document.addEventListener('click', ClosePopups, true);
        return () => {
            document.removeEventListener('click', ClosePopups, true);
        }
    }, []);

    /**
     * @param {*} strGroup 
     * @param {*} strFormulaType 
     * @summary 
     */
    const AddFormula = (strGroup, strFormulaType) => {
        objContext.FormulaTab_ModuleProcessor.AddFormula(objContext, strGroup, strFormulaType)
    }

    /**
     * @name ShowFormulaPopup
     * @param {any} strForumulaGroup
     */
    const ShowFormulaPopup = (strForumulaGroup) => {
        objContext.FormulaTab_ModuleProcessor.ShowFormulaPopup(objContext, strForumulaGroup);
    }

    /**
     * @summary zoom-in selected formula
     * */
    const ZoomInFormula = () => {
        let fnZoomInFormula = EditorState.GetProperty("ZoomInFormula");
        if (fnZoomInFormula) {
            fnZoomInFormula();
        }
    }

    /**
     * 
     * */
    const ZoomOutFormula = () => {
        let fnZoomOutFormula = EditorState.GetProperty("ZoomOutFormula");
        if (fnZoomOutFormula) {
            fnZoomOutFormula();
        }
    }

    /**
     * 
     * */
    const PartialZoomIn = () => {
        let fnPartialZoomIn = EditorState.GetProperty("PartialZoomInFormula");
        if (fnPartialZoomIn) {
            fnPartialZoomIn();
        }
    }

    /**
     * 
     * */
    const PartialZoomOut = () => {
        let fnPartialZoomOut = EditorState.GetProperty("PartialZoomOutFormula");
        if (fnPartialZoomOut) {
            fnPartialZoomOut();
        }
    }

    /**
     * 
     * */
    const DeleteFormula = () => {
        let fnDeleteFormula = EditorState.GetProperty("DeleteFormula");
        if (fnDeleteFormula) {
            fnDeleteFormula();
        }
    }

    /**
     * @param {object} objEvt drage event.
     * @param {string} strType element type.
     * @summary set dataTranser value with key ActiveDragElement and type of element being dragged.
     */
    const OnElementDragStart = (objEvt, strType) => {
        objEvt.dataTransfer.setData("ActiveDragElement", strType);
    }

    /**
    * @name GetContent
    * @summary Calls the render body function of the common.
    * @returns {JSX} JSX of the Component.
    */
    const GetContent = () => {
        return (<div className="office-ribbon formaula editor-office-ribbon" id="EditorOfficeRibbon" >
            <div className="ribbon-slider" id="EditorSliderDiv">
                <div className="rows-and-columns">
                    <div className="rows-and-columns-flex">
                        <div className="items" draggable={true} onDragStart={objEvt => OnElementDragStart(objEvt, 'inputformula_scientific')}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.FormulaImage
                                }}
                                ParentProps={props}
                            />
                            <span>Scientific</span>
                        </div>
                        <div className="items" draggable={true} onDragStart={objEvt => OnElementDragStart(objEvt, 'inputformula_simple')}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.Student_FormulaImage
                                }}
                                ParentProps={props}
                            />
                            <span>Simple</span>
                        </div>
                    </div>
                    <div className="bottom-text">
                        Input Calculator
                       </div>
                </div>
                <div className="rows-and-columns">
                    <div className="rows-and-columns-flex">
                        {
                            arrFormulaTab.map((objFormuaGroup, intIndex) => {
                                return (
                                    <FormulaPopup
                                        key={intIndex}
                                        ActivePopup={state.activePopup}
                                        JConfiguration={props.JConfiguration}
                                        FormulaGroup={objFormuaGroup.GroupName}
                                        DisplayName={objFormuaGroup.DisplayName}
                                        DisplayImage={objFormuaGroup.DisplayImage}
                                        FormulaCount={objFormuaGroup.FormulaCount}
                                        AddFormula={AddFormula}
                                        ShowFormulaPopup={ShowFormulaPopup} />
                                )
                            })
                        }
                    </div>
                </div>

                <div className="rows-and-columns" onClick={objEvt => DeleteFormula()}>
                    <div className="rows-and-columns-flex">
                        <div className="items">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.FormulaDeleteImage
                                }}
                                ParentProps={props}
                            />
                            <span>Delete Formula</span>
                        </div>
                    </div>
                </div>
                <div className="rows-and-columns">
                    <div className="rows-and-columns-flex">
                        <div className="items" onClick={objEvt => ZoomInFormula(objEvt)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.ZoomInImage
                                }}
                                ParentProps={props}
                            />
                            <span>Zoom In</span>
                        </div>
                        <div className="items" onClick={objEvt => ZoomOutFormula(objEvt)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.ZoomOutImage
                                }}
                                ParentProps={props}
                            />
                            <span>Zoom Out</span>
                        </div>
                        <div className="items" onClick={objEvt => PartialZoomIn(objEvt)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.PartialZoomInImage
                                }}
                                ParentProps={props}
                            />
                            <span>Formula Area Zoom In</span>
                        </div>
                        <div className="items" onClick={objEvt => PartialZoomOut(objEvt)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.PartialZoomOutImage
                                }}
                                ParentProps={props}
                            />
                            <span>Formula Area Zoom Out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent()
}

export default FormulaTab;