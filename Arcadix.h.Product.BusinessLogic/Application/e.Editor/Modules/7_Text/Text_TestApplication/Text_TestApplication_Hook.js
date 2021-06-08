// React related impoprts.
import React from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    let objstate = {
        ...props,
        ["TextJson"]: {
            ...props.TextJson,
            ["vElementJson"]: {
                ...props.TextJson["vElementJson"],
                ["vText"]: props.TextJson["vElementJson"]["vText"],
                ["SubElements"]: [
                    ...props.TextJson["vElementJson"]["SubElements"].map(objTempSubElement => {
                        return {
                            ...objTempSubElement,
                            ["Ref"]: React.createRef()
                        };
                    })
                ]
            }
        },
        ["TextState"]: {
            "status": "",
            "TextEditorId": "texteditor_" + "test" + "_" + props.TextEditorId
        }
    }
    console.log("text_testapplication state", objstate);
    return objstate;
}