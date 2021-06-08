//React Imports
import React from 'react';

/**
 * @name UpdateElementTextHtml
 * @param {object} objContext {props, state, dispatch}
 * @param {event} objContentEvent event from TextEditor
 * @summary Updates the html when there is a onContentChange of text editor is fired.
 */
export const UpdateElementTextHtml = (objContext, objContentEvent) => {
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
export const AddSubElement = (objContext, objSubElement) => {
    let objElementJson = {
        ...objContext.state.ElementJson,
        ["SubElements"]: [
            ...objContext.state.ElementJson["SubElements"],
            {
                ...objSubElement,
                ["ElementJson"]: {
                    ...objSubElement.ElementJson,
                    ["Ref"]: React.createRef()
                }
            }
        ]
    };
    if (objContext.props.UpdateElementJson) {
        objContext.props.UpdateElementJson(objElementJson);
    }
    else {
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }
};

/**
 * @name UpdateSubElement
 * @param {object} objContext {props, state, dispatch}
 * @param {object} objSubElementJson element json of updated sub element
 * @summary Updates the SubElement for the passed Value.
 */
export const UpdateSubElement = (objContext, objSubElementJson) => {
    let objElementJson = {
        ...objContext.state.ElementJson,
        ["SubElements"]: [...objContext.state.ElementJson["SubElements"].map(objTempSubElement => {
            if (objTempSubElement.ElementJson["iElementId"] === objSubElementJson["iElementId"]) {
                return {
                    ...objTempSubElement,
                    ["ElementJson"]: { ...objSubElementJson }
                };
            }
            else {
                return { ...objTempSubElement };
            }
        })]
    };
    if (objContext.props.UpdateElementJson) {
        objContext.props.UpdateElementJson(objElementJson);
    }
    else {
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }
};

/**
 * @name RemoveSubElement
 * @param {object} objContext {props, state, dispatch}
 * @param {array} arrRemovedSubElements array of removed sub elements
 * @summary Removed the passed SubElement from the passed Value.
 */
export const RemoveSubElement = (objContext, arrRemovedSubElements) => {
    let arrNewSubElements = objContext.state.ElementJson["SubElements"];
    arrRemovedSubElements.map(objRemovedSubElement => {
        arrNewSubElements = arrNewSubElements.filter(objTempSubElement => objTempSubElement.ElementJson["iElementId"] !== objRemovedSubElement.ElementJson["iElementId"]);
    });
    let objElementJson = {
        ...objContext.state.ElementJson,
        ["SubElements"]: arrNewSubElements
    };
    if (objContext.props.UpdateElementJson) {
        objContext.props.UpdateElementJson(objElementJson);
    }
    else {
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }
};
