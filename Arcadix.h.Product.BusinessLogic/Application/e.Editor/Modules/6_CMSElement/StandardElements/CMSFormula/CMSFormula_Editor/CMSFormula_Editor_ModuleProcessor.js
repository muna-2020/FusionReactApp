//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name CMSFormula_Editor_ModuleProcessor
 * @summary Contains the formula's editor version module specific methods.
 * */
class CMSFormula_Editor_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
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

    /**
     * @param {any} Action
     * @param {any} objOldState
     * @param {any} objNewState
     * @summary 
     */
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
                case "9":
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

}

export default CMSFormula_Editor_ModuleProcessor;
