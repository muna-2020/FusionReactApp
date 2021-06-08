//React related imports
import React from 'react';

/**
 * @name TextEditor_ModuleProcessor
 * @summary Contains the checkbox's editor version module specific methods.
 * */
class TextEditor_ModuleProcessor {

    /**
     * @name UpdateElementTextHtml
     * @param {object} objContext {props, state, dispatch}
     * @param {any} objContentEvent event from TextEditor
     * @summary Updates the html when there is a onContentChange of text editor is fired.
     */
    UpdateElementTextHtml(objContext, objContentEvent) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vText"]: objContentEvent["contentInnerHtml"]
        };
        if (objContext.props.UpdateElementJson) {
            objContext.props.UpdateElementJson(objElementJson);
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
        }
    };

    /**
     * @name AddSubElement
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objSubElement newly added sub element
     * @summary Adds the passed SubElement for the passed Value.
     */
    AddSubElement(objContext, objSubElement) {
        let arrSubElements = objContext.TextEditor_ModuleProcessor.RemoveSubElement(objContext, [objSubElement], true);
        let objElementJson = {
            ...objContext.state.TextJson,
            ["SubElements"]: [
                ...arrSubElements,
                {
                    ...objSubElement
                }
            ]
        };
        objContext.dispatch({ type: "SET_TEXTJSON_STATE", payload: { "TextJson": objElementJson } });
    }

    /**
     * @name UpdateSubElement
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objSubElementJson element json of updated sub element
     * @summary Updates the SubElement for the passed Value.
     */
    UpdateSubElement(objContext, objSubElementJson) {
        let objElementJson = {
            ...objContext.state.TextJson,
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
        };
        objContext.dispatch({ type: "SET_TEXTJSON_STATE", payload: { "TextJson": objElementJson } });
    }

    /**
     * @name RemoveSubElement
     * @param {object} objContext {props, state, dispatch}
     * @param {any} arrRemovedSubElements array of removed sub elements
     * @param {boolean} blnReturnNewElementJson true/false. Should return the element json removed or not.
     * @summary Removed the passed SubElement from the passed Value.
     * @returns {any} Sub elements remained or nothing depending on 'blnReturnNewElementJson'.
     */
    RemoveSubElement(objContext, arrRemovedSubElements, blnReturnNewElementJson ) {
        if (arrRemovedSubElements && arrRemovedSubElements.length > 0) {
            let arrNewSubElements = objContext.state.TextJson["SubElements"];
            arrRemovedSubElements.map(objRemovedSubElement => {
                arrNewSubElements = arrNewSubElements.filter(objTempSubElement => objTempSubElement["iElementId"] !== objRemovedSubElement["iElementId"]);
            });
            if (blnReturnNewElementJson) {
                return arrNewSubElements;
            }
            else {
                let objElementJson = {
                    ...objContext.state.TextJson,
                    ["SubElements"]: arrNewSubElements
                };
                objContext.dispatch({ type: "SET_TEXTJSON_STATE", payload: { "TextJson": objElementJson } });
            }
        }
    }
}

export default TextEditor_ModuleProcessor;