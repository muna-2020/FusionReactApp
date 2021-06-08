//Module realted fies.
import AnimationAddEdit_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationAddEdit/AnimationAddEdit_ContextMenu";

//Module related imports
import * as CMSAnimation_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/CMSAnimation_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Module Object
import Object_TaskContent_CMSElement_CMSAnimation from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAnimation";

/**
 * @name AnimationAddEdit_ModuleProcessor
 * @summary Contains the AnimationAddEdit's business logic methods.
 * */
class AnimationAddEdit_ModuleProcessor extends AnimationAddEdit_ContextMenu {

    /**
     * @name IsNumericOrDoubleValue
     * @param {string} strValue value to be checked
     * @param {string} strOperationType TYPING/ADD
     * @summary Checks if a value is numerical or decimal point value.
     * @returns {boolean} true/false
     */
    IsNumericOrDoubleValue(strValue, strOperationType) {
        let regex;
        switch (strOperationType.toUpperCase()) {
            case "TYPING":
                regex = /^[0-9]+$/;
                break;
            case "ADD":
                regex = /^[0-9]+$/;
                break;
        }
        if (regex.test(strValue)) {
            return true;
        }
        return false;
    }

    /**
     * @name ValidateInputs
     * @param {object} objContext {props, state, dispatch}
     * @summary Checks id all the necessary fields have the required value.
     * @returns {object} Validation object
     */
    ValidateInputs(objContext) {
        let objValidationResult = {
            ["ValidationResult"]: true,
            ["ErrorField"]: "",
            ["ErrorMessage"]: "",
            ["Data"]: {
                ["MainFileData"]: null
            }
        };
        if (objContext.state.objUserFileData.vElementJson["vAnimationName"]) {
            if (objContext.state.objUserFileData.vElementJson["iHeight"] > 0) {
                if (objContext.state.objUserFileData.vElementJson["iWidth"] > 0) {
                    if (objContext.state.objUserFileData["vElementJson"]["cIsAnimateCC"] !== "N" || objContext.state.objUserFileData["vElementJson"]["cIsCustom"] !== "N") {
                        if (objContext.state.strActionType === "add" || (objContext.state.strActionType === "edit" && objContext.state.blnIsMainFileChanged)) {
                            let arrMainFile = JSON.parse(objContext.MainFileUploadRef.current.GetUploadedFileDetails());
                            if (arrMainFile.length > 0) {
                                objValidationResult = {
                                    ...objValidationResult,
                                    ["Data"]: {
                                        ["MainFileData"]: arrMainFile
                                    }
                                };
                            }
                            else {
                                objValidationResult = {
                                    ...objValidationResult,
                                    ["ValidationResult"]: false,
                                    ["ErrorField"]: "MainFileUpload",
                                    ["ErrorMessage"]: "File Not Selected"
                                };
                            }
                        }
                    }
                    else {
                        objValidationResult = {
                            ...objValidationResult,
                            ["ValidationResult"]: false,
                            ["ErrorField"]: "AnimationType",
                            ["ErrorMessage"]: "Field cannot be empty"
                        };
                    }
                }
                else {
                    objValidationResult = {
                        ...objValidationResult,
                        ["ValidationResult"]: false,
                        ["ErrorField"]: "iWidth",
                        ["ErrorMessage"]: "Field cannot be empty"
                    };
                }
            }
            else {
                objValidationResult = {
                    ...objValidationResult,
                    ["ValidationResult"]: false,
                    ["ErrorField"]: "iHeight",
                    ["ErrorMessage"]: "Field cannot be empty"
                };
            }
        }
        else {
            objValidationResult = {
                ...objValidationResult,
                ["ValidationResult"]: false,
                ["ErrorField"]: "vAnimationName",
                ["ErrorMessage"]: "Field cannot be empty"
            };
        }
        return objValidationResult;
    }

    /**
     * @name HandleOnChange
     * @param {object} objContext {props, state, dispatch}
     * @param {any} strFieldtype ElementJson key
     * @param {any} strValue value of the input
     * @summary Updates the Element Json key with the new value.
     */
    HandleOnChange(objContext, strFieldtype, strValue) {
        let blnUpdateState = false;
        if ((strFieldtype === "iHeight" || strFieldtype === "iWidth") && (strValue === "" || objContext.AnimationAddEdit_ModuleProcessor.IsNumericOrDoubleValue(strValue, "TYPING"))) {
            strValue = strValue ? parseInt(strValue) : 0;
            blnUpdateState = true;
        }
        else if (strFieldtype !== "iHeight" && strFieldtype !== "iWidth") {
            blnUpdateState = true;
        }
        if (blnUpdateState) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ["ErrorField"]: objContext.state.ErrorField === strFieldtype ? "" : objContext.state.ErrorField,
                    ["objUserFileData"]: {
                        ...objContext.state.objUserFileData,
                        ["vElementJson"]: {
                            ...objContext.state.objUserFileData["vElementJson"],
                            [strFieldtype]: strValue
                        }
                    },
                    "blnEdited": true
                }
            });
        }
    }

    /**
     * @name HandleOnChangeLogicCheckbox
     * @param {object} objContext {props, state, dispatch}
     * @summary Update the element json for the logic is present or not.
     */
    HandleOnChangeLogicCheckbox(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: {
                        ...objContext.state.objUserFileData["vElementJson"],
                        ["cIsLogic"]: objContext.state.objUserFileData["vElementJson"]["cIsLogic"] === "Y" ? "N" : "Y"
                    }
                },
                "blnEdited": true
            }
        });
    }

    /**
     * @name HandleOnChangeAnimationTypeRadio
     * @param {object} objContext {props, state, dispatch}
     * @param {any} strFieldtype cIsAnimateCC/cIsCustom
     * @summary Updates the Element json for the type of Animate.
     */
    HandleOnChangeAnimationTypeRadio(objContext, strFieldtype) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: {
                        ...objContext.state.objUserFileData["vElementJson"],
                        ["cIsAnimateCC"]: strFieldtype === "IsAnimateCC" ? "Y" : "N",
                        ["cIsCustom"]: strFieldtype === "IsCustom" ? "Y" : "N"
                    }
                },
                ["ErrorField"]: objContext.state.ErrorField === "AnimationType" ? "" : objContext.state.ErrorField,
                ["blnEdited"]: true
            }
        });
    }

    /**
     * @name OnUploadComplete
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objFileData Details of uploaded files.
     * @param {string} strUploadFieldType AnimationUpload/ZipUplaod.
     * @summary passed to FileUpload component
     */
    OnUploadComplete(objContext, objFileData, strUploadFieldType) {
        let vElementJson, blnIsMainFileChanged = objContext.state.blnIsMainFileChanged;
        if (strUploadFieldType === "MainFile") {
            vElementJson = {
                ...objContext.state.objUserFileData["vElementJson"],
                "vAnimationName": objFileData["OriginalFileName"].split(".")[0],
                ...objFileData["AdditionalInformation"]
            };
            blnIsMainFileChanged = true;
        }
        else {
            vElementJson = {
                ...objContext.state.objUserFileData["vElementJson"]
            };
        }
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: {
                        ...vElementJson
                    }
                },
                "blnIsMainFileChanged": blnIsMainFileChanged,
                "blnEdited": true
            }
        });
    }

    /**
     * @name HandleUploadFile
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objMainFile Main file details
     * @summary handles file upload
     * @returns {any} Element json with animation wapper contents
     */
    async HandleUploadFile(objContext, objMainFile) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let arrBackupFile = JSON.parse(objContext.BackupFileUploadRef.current.GetUploadedFileDetails());
        let objBackupFile;
        if ((objContext.state.strActionType === "add" || (objContext.state.strActionType === "edit" && objContext.state.blnIsBackupFileChanged)) && arrBackupFile.length > 0) {
            objBackupFile = { ...arrBackupFile[0] };
        }
        let objNewAnimation;
        if (objContext.state.strActionType === "edit") {
            let objAnimationDetails = {};
            if (objMainFile && objMainFile !== null) {
                objAnimationDetails["MainFile"] = objMainFile
            }
            if (objBackupFile && objBackupFile !== null) {
                objAnimationDetails["BackupFile"] = objBackupFile
            }
            objNewAnimation = {
                ["ElementJson"]: {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: {
                        ...objContext.state.objUserFileData["vElementJson"]
                    }
                },
                ["cIsEditOperation"]: "Y",
                ["cIsFileChanged"]: objContext.state.blnIsMainFileChanged ? "Y" : "N",
                ["AnimationDetails"]: objAnimationDetails
            };
        }
        else {
            let objAnimationJson = CMSAnimation_Editor_MetaData.GetDefaultAnimationObject();
            objNewAnimation = {
                ["ElementJson"]: {
                    ...objAnimationJson,
                    ["iFolderID"]: objContext.props.Data.NodeData ? objContext.props.Data.NodeData["Id"] : objAnimationJson["iFolderID"],
                    ["vElementJson"]: {
                        ...objAnimationJson["vElementJson"],
                        ...objContext.state.objUserFileData["vElementJson"]
                    }
                },
                ["AnimationDetails"]: {
                    "MainFile": objMainFile,
                    "BackupFile": objBackupFile
                },
                ["iFolderID"]: objContext.props.Data.NodeData ? objContext.props.Data.NodeData["Id"] : objAnimationJson["iFolderID"]
            };
        }
        let objResponse = await Object_TaskContent_CMSElement_CMSAnimation.SaveAnimation(objNewAnimation);
        ApplicationState.SetProperty("blnShowAnimation", false);
        return objResponse;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAnimation/AnimationAddEdit/AnimationAddEditStyles.css"];
    }
}

export default AnimationAddEdit_ModuleProcessor;
