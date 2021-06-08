// React related impoprts.
import { useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @param {object} props Initial state
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        objUserFileData: props.Data.ElementJson ? props.Data.ElementJson : { "vElementJson": {} },
        strActionType: props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
        blnShowError: false,
        objFileData: null,
        blnEdited: false,
        status: null,
        blnShowUploadControl: typeof props.Data.ShowUploadControl !== "undefined" ? props.Data.ShowUploadControl : true
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, ColorFillAddEdit_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.Ref, () => ({
        UploadFile: async () => {
            // Handles file upload
            // Check made for edit mode. 
            //if user don't make any changes, then upload will be canceled
            if (!objContext.state.blnEdited && objContext.state.strActionType === "edit") {
                editorPopup.ClosePopup(objContext.props.Id);
                return;
            }
            let objResponse = await objContext.ColorFillAddEdit_ModuleProcessor.HandleUploadFile(objContext);
            if (objResponse) {
                editorPopup.ClosePopup(objContext.props.Id);
                return objResponse;
            }
        },
        GetUpdatedElementDetails: () => {
            return objContext.state.objUserFileData;
        }
    }), [objContext.state]);
}
