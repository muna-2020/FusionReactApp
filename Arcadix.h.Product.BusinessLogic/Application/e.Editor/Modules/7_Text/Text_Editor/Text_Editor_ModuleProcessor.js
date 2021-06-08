
//Module realted fies.
import CMSText_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/7_Text/Text_Editor/Text_Editor_ContextMenu";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name Text_Editor_ModuleProcessor
 * @summary Contains the text's test application version module specific methods.
 * */
class Text_Editor_ModuleProcessor extends CMSText_Editor_ContextMenu {

    /**
     * @name AddSubElement
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }
     * @param {object} objSubElement newly added sub element
     * @param {string} strvText Text
     * @summary Adds the passed SubElement for the passed Value.
     */
    AddSubElement(objContext, objSubElement, strvText) {
        objContext = objContext.props.TextJson.TextRef.current.GetLatestContext();
        if(!objContext.state.TextJson.vElementJson.SubElements.find(objTempJson => objTempJson.iElementId === objSubElement.iElementId)){
            let arrSubElements = objContext.Text_Editor_ModuleProcessor.RemoveSubElement(objContext, [objSubElement], true);
            let objTextJson = {
                ...objContext.state.TextJson,
                ["vElementJson"]: {
                    ...objContext.state.TextJson["vElementJson"],
                    ["SubElements"]: [
                        ...arrSubElements,
                        {
                            ...objSubElement
                        }
                    ]
                }
            };
            let objState;
            if (strvText) {
                objState = {
                    ...objContext.state,
                    ["TextJson"]: { ...objTextJson },
                    ['UndoRedo_vText']: strvText
                };
            } else {
                objState = {
                    ...objContext.state,
                    ["TextJson"]: { ...objTextJson }
                };
            }
            objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({ type: "SET_STATE", payload: { ...objState} });
        }

    }

    /**
     * @name UpdateSubElement
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     * @param {object} objSubElementJson element json of updated sub element
     * @summary Updates the SubElement for the passed Value.
     */
    UpdateSubElement(objContext, objSubElementJson) {
        let objElementJson = {
            ...objContext.state.TextJson,
            ["vElementJson"]: {
                ...objContext.state.TextJson["vElementJson"],
                ["SubElements"]: [...objContext.state.TextJson["SubElements"].map(objTempSubElement => {
                    if (objTempSubElement["iElementId"] === objSubElementJson["iElementId"]) {
                        return {
                            ...objSubElementJson
                        };
                    }
                    else {
                        return { ...objTempSubElement };
                    }
                })]
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "TextJson": objElementJson } });
    }

    /**
     * @name RemoveSubElement
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     * @param {any} arrRemovedSubElements array of removed sub elements
     * @param {boolean} blnReturnNewElementJson true/false. Should return the element json removed or not.
     * @summary Removed the passed SubElement from the passed Value.
     * @returns {any} Sub elements remained or nothing depending on 'blnReturnNewElementJson'.
     */
    RemoveSubElement(objContext, arrRemovedSubElements, blnReturnNewElementJson) {
        if (arrRemovedSubElements && arrRemovedSubElements.length > 0) {
            let arrNewSubElements = objContext.state.TextJson["vElementJson"]["SubElements"];
            arrRemovedSubElements.map(objRemovedSubElement => {
                arrNewSubElements = arrNewSubElements.filter(objTempSubElement => objTempSubElement["iElementId"] !== objRemovedSubElement["iElementId"]);
            });
            if (blnReturnNewElementJson) {
                return arrNewSubElements;
            }
            else {
                let objElementJson = {
                    ...objContext.state.TextJson,
                    ["vElementJson"]: {
                        ...objContext.state.TextJson["vElementJson"],
                        ["SubElements"]: arrNewSubElements
                    }
                };
                objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { "TextJson": objElementJson } });
            }
        }
    }

    /**
     * @name UndoRedoActionCallback
     * @param {string} Action Action
     * @param {object} objOldState Old State
     * @param {object} objNewState New State
     * @summary this is Undo-Redo callback will be called during UndoRedo Action and the returned state from this method will be sent as props to the component.
     * @returns {object} State
     */
    UndoRedoActionCallback(Action, objOldState, objNewState) {
        let objState;
        if (objNewState.UndoRedo_KeyPress) {
            const { UndoRedo_KeyPress, ...state } = objNewState;
            objState = state;
        } else {
            objState = objNewState;
        }
        return {
            ...objState,
            ["Action"]: Action,
            ["UndoRedo_Hydrate"]: "Y",
            ["TextJson"]: {
                ...objState.TextJson,
                ["vElementJson"]: {
                    ...objState.TextJson.vElementJson,
                    ["vText"]: objNewState["UndoRedo_vText"] ? objNewState["UndoRedo_vText"] : objState.TextJson.vElementJson.vText
                }
            }
        };
    }

    /**
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     * @param {number} iElementId Element Id 
     * @param {object} State sub element state
     * @summary this update the sub-element State.
     */
    PreserveSubElementState(objContext, iElementId, State) {
        objContext = objContext.props.TextJson.TextRef.current.GetLatestContext();
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [iElementId]: { ...State }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current !== null && objContext.props.ParentRef.current.PreserveTextEditorState) {
            objContext.props.ParentRef.current.PreserveTextEditorState(objContext.state.TextJson.iElementId,
                {
                    ...objContext.state,
                    SubElementState: objContext.Element_UndoRedoDataRef.current
                }
            );
        }
    }

    /**
     * @name SpellCheckUpdate
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     * @param {any} strvText Text
     * @summary this update the spell checked vText.
     */
    SpellCheckUpdate(objContext, strvText) {
        objContext = objContext.props.TextJson.TextRef.current.GetLatestContext();
        objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ["UndoRedo_vText"]: objContext.props.TextJson.TextRef.current.GetInnerHtml(),
                ["TextJson"]: {
                    ...objContext.state.TextJson,
                    ["vElementJson"]: {
                        ...objContext.state.TextJson.vElementJson,
                        ["vText"]: strvText
                    }
                },
                ["Key"]: UniqueId.GetUniqueId()  // when there is no change the prevstate DivHtml and spellchecked html still need to update the html.
            }
        });
    }

    /**
     * @name ResetText
     * @param {object} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     * @param {string} strvText Text to be reset to.
     */
    ResetText(objContext, strvText, callback) {
        objContext.Text_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                ["UndoRedo_vText"]: strvText,
                ["TextJson"]: {
                    ...objContext.state.TextJson,
                    ["vElementJson"]: {
                        ["vText"]: strvText,
                        ["SubElements"]: []
                    }
                }
            }
        });
        if (callback) {
          callback()
        }
    }
}

export default Text_Editor_ModuleProcessor;