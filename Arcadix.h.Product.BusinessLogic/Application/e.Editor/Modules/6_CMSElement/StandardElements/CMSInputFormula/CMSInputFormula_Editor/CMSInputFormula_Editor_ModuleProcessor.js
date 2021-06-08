//Base classes/hooks.
import * as CMSInputFormula_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor_MetaData';
import CMSInputFormula_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor_ContextMenu'

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name CMSFormula_Editor_ModuleProcessor
 * @summary Contains the formula's editor version module specific methods.
 * */
class CMSFormula_Editor_ModuleProcessor extends CMSInputFormula_Editor_ContextMenu {

    /**
     * @param {any} strFormulaType
     * @summary 
     */
    AddSubFormula(strFormulaType, objContext) {
        if (EditorState.GetProperty("AddSubFormula")) {
            let fnAddSubFormula = EditorState.GetProperty("AddSubFormula");
            if (objContext.state.ElementJson.vElementJson && objContext.state.ElementJson.vElementJson.vFormulaType && objContext.state.ElementJson.vElementJson.vFormulaType == "scientific") {
                fnAddSubFormula("cmsinputformula", objContext.props.ElementJson, CMSInputFormula_Editor_MetaData.GetScientificMathMl(strFormulaType));
            } else {
                fnAddSubFormula("cmsinputformula", objContext.props.ElementJson, CMSInputFormula_Editor_MetaData.GetSimpleMathMl(strFormulaType));
            }
        }
    };

    /**
     * 
     * @param {objContext} objContext { state, props, dispatch, objInputFormulaRef, CMSInputFormula_Editor_ModuleProcessor }.
     * @param {string} strNewMathMl mathMl string.
     * @summary  
     */
    UpdateNewMathMl(objContext, strNewMathMl) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
            objContext.dispatch({
                type: "SET_UNDOREDO",
                payload: {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            ["Values"]: [
                                ...objContext.state.ElementJson.vElementJson.Values.map(objValue => {
                                    return {
                                        ...objValue,
                                        ["vNewMathMl"]: strNewMathMl
                                    }
                                })
                            ]
                        }
                    }
                }
            })
    };


    UndoRedoActionCallback(Action, objOldState, objNewState) {
        if (objNewState.ElementJson && objNewState.ElementJson.iElementTypeId) {
            let intElementTypeId = objNewState.ElementJson.iElementTypeId;
            if (intElementTypeId == 52) {
                EditorState.SetProperty("Cursor", {
                    FormulaEditorPlaceholderId: "",
                    FormulaSelectedNodeId: "",
                    FormulaEditorCursorPosition: "",
                    FormulaSelectedDomNode: ""
                });
                if (EditorState.GetProperty("AddSubFormula")) {
                    EditorState.RemoveProperty("AddSubFormula");
                }
            }
            switch (intElementTypeId) {
                case "52":
                    return {
                        ...objNewState,
                        ["ElementJson"]: {
                            ...objNewState.ElementJson,
                            ["vElementJson"]: {
                                ...objNewState.ElementJson.vElementJson,
                                ["vNewFormula"]: "Y",
                                ['Values']: [...objNewState.ElementJson.vElementJson.Values.map(objItem => {
                                    return { ...objItem, ["mathMl"]: objItem["vNewMathMl"] ? objItem["vNewMathMl"] : objItem["mathMl"] }
                                })]
                            }
                        }
                    }
                default:
                    return objNewState;
            }
        }
    };

    /**
     * @name GetDynamicStyles
     * @param {any} props
     * @summary this returns the dynamic styles for the components.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSInputFormula/CMSInputFormula_Scientific.css",
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSInputFormula/CMSInputFormula_Simple.css"];
    }
};



export default CMSFormula_Editor_ModuleProcessor;
