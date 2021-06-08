//React Imports
import React,{ useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction, UndoRedoUpdate } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized initial state
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        ...props,
        ["TextState"]: {
            ["status"]: "",
            ["TextEditorId"]: "texteditor_" + "edit" + "_" + props.TextEditorId
        },
        ["TextJson"]: GetTextJsonForComponent(props)
    }, props);
};

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    /**
     * @name useEffect
     * @summary Preserves the ElementState.
     */
    useEffect(() => {
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveText_EditorState) {
            objContext.props.ParentRef.current.PreserveText_EditorState(objContext.state.TextJson["iElementId"], { ...objContext.state, SubElementState: objContext.Element_UndoRedoDataRef.current });
        }
    }, [objContext.state.StateHistory]);
};

/**
 * @name GetTextJsonForComponent
 * @param {object} props text props
 * @summary this method prepare the text_editor TextJson and return it
 * @returns {object} textjson.
 */
const GetTextJsonForComponent = (props) => {
    console.log("text_editor props", props);
    if (props.TextJson["vElementJson"]["SubElements"] && props.TextJson["vElementJson"]["SubElements"] != null) {
        return {
            ...props.TextJson,
            ["vElementJson"]: {
                ...props.TextJson["vElementJson"],
                ["SubElements"]: [
                    ...props.TextJson["vElementJson"]["SubElements"].map(objTempSubElement => {
                        return {
                            ...objTempSubElement,
                            ["Ref"]: React.createRef()
                        };
                    })
                ]
            }
        };
    } else {
        return {
            ...props.TextJson,
            ["vElementJson"]: {
                ...props.TextJson["vElementJson"],
                ["SubElements"] : []
            }
        };
    }
};