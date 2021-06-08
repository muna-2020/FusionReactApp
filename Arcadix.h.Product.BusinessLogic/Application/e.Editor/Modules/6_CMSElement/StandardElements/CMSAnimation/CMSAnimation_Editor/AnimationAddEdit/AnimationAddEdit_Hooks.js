//React Imports
import { useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "objUserFileData": props.Data.ElementJson ? props.Data.ElementJson : {
            "vElementJson": {
                "vAnimationName": "",
                "cIsLogic": "N",
                "iHeight": 0,
                "iWidth": 0,
                "cIsAnimateCC": "N",
                "cIsCustom": "N",
                "vAnimationDescription": ""
            }
        },
        "strActionType": props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
        "IsError": false,
        "ErrorField": "",
        "ErrorMessage": "",
        "MainFile": [],
        "BackupFile": [],
        "blnEdited": false,
        "blnIsMainFileChanged": false,
        "blnIsBackupFileChanged": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    ImperativeMethods(objContext);
}

/**
 * @name ImperativeMethods
 * @summary Imperative methods
 */
function ImperativeMethods(objContext) {
    useImperativeHandle(objContext.AnimationAddEditComponentRef, () => ({
        "UploadFile": async () => {
            if (!objContext.state.blnEdited) {
                editorPopup.ClosePopup(objContext.props.Id);
                return;
            }
            let objValidationResult = objContext.AnimationAddEdit_ModuleProcessor.ValidateInputs(objContext);
            if (objValidationResult["ValidationResult"]) {
                let objResponse;
                if (objContext.state.strActionType === "add" || (objContext.state.strActionType === "edit" && objContext.state.blnIsMainFileChanged)) {
                    let { AdditionalInformation, ...objMainFile } = objValidationResult["Data"]["MainFileData"][0];
                    objResponse = await objContext.AnimationAddEdit_ModuleProcessor.HandleUploadFile(objContext, objMainFile);
                }
                else {
                    objResponse = await objContext.AnimationAddEdit_ModuleProcessor.HandleUploadFile(objContext, null);
                }
                if (objResponse && objResponse !== null) {
                    return {
                        ...objResponse["ElementJson"],
                        ["WrapperContents"]: {
                            ...objResponse["WrapperContents"]
                        },
                        ["SidebarContents"]: {
                            ...objResponse["SidebarContents"]
                        },
                        ["PageIds"]: objResponse["PageIds"]
                    };
                }
            }
            else {
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        ["IsError"]: true,
                        ["ErrorField"]: objValidationResult["ErrorField"],
                        ["ErrorMessage"]: objValidationResult["ErrorMessage"]
                    }
                });
            }
        }
    }), [objContext.state]);
}
