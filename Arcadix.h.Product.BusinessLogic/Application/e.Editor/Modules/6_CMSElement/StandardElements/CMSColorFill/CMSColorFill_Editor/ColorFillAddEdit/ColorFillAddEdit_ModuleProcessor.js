//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
//import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
//import Editor_TaskContent_CMSColorFillAddEdit_Module from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFillAddEdit/CMSColorFillAddEdit_Module';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

import * as CMSColorFill_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFill_Editor_MetaData";
import Object_Editor_TaskContent_CMSColorFill from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSColorFill/CMSColorFill";

// ArcadixFetchData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name ColorFillAddEdit_ModuleProcessor
* @summary Class for ColorFillAddEdit popup display.
*/
class CMSColorFillAddEdit_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name HandleOnChange
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objParams textbox value and id
     */
    HandleOnChange(objContext, objParams) {
        const { id, value } = objParams;
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: { ...objContext.state.objUserFileData["vElementJson"], [id]: value }
                }, "blnEdited": true
            }
        });
    };

    /**
     * @name OnUploadComplete
     * @param {any} objFileData Uploaded file object
     * @summary passed to FileUpload component
     */
    OnUploadComplete(objContext, objFileData) {
        console.log("Uploaded File", objFileData);
        if (objFileData) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "objFileData": objFileData, "objUserFileData": {
                        ...objContext.state.objUserFileData,
                        ["vElementJson"]: {
                            ...objContext.state.objUserFileData["vElementJson"],
                            "vColorFillName": objFileData["OriginalFileName"].split(".")[0]
                        }
                    }, "blnShowError": false, "status": null, "blnEdited": true
                }
            });
        }
        else {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "objUserFileData": {
                        ["vElementJson"]: {
                            ["vColorFillName"]: "",
                            ["vElementColorFillDescription"]: ""
                        }
                    }
                }
            });
        }
    }

    /**
     * @name HandleUploadFile
     * @param {object} objContext {props, state, dispatch}
     * @summary handles file upload
     * @returns {Promise} return's promise on successful file upload 
     */
    HandleUploadFile(objContext) {
        // Gets file upload details
        let arrFileDetails = JSON.parse(objContext.FileUploadRef.current.GetUploadedFileDetails());
        console.log("File", arrFileDetails);
        let objNewColorFill;
        // Save if file is uploaded with no errors. Status check is made to avoid re-uploading( Removed )
        if ((arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) || objContext.state.strActionType === "edit") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            // If Action type is ADD form new ColorFill object 
            if (objContext.state.strActionType !== "edit") {
                objNewColorFill = CMSColorFill_Editor_MetaData.GetDefaultElementJson();
                objNewColorFill = {
                    ...objNewColorFill, // Default ColorFill object
                    ["vElementJson"]: {
                        ...objNewColorFill["vElementJson"],
                        ...objContext.state.objUserFileData["vElementJson"]
                    }, // User entered and selected checkbox values(FileName, FileDescrition, Title, cShowTitle, cShowDescription  etc...)
                    ["ColorFillDetails"]: { ...arrFileDetails[0] }, // Uploaded file details
                    ["iFolderID"]: objContext.props.Data.NodeData ? objContext.props.Data.NodeData["Id"] : objNewColorFill["iFolderID"]
                };
                if (objContext.props.Data.NodeData &&
                    objContext.props.Data.NodeData["NP"]["DataNodeType"].toLowerCase().indexOf("folder") !== -1 &&
                    objContext.props.Data.NodeData["NP"]["cIsRootNode"] === "Y") {
                    objNewColorFill = { ...objNewColorFill, ["iFolderID"]: 0 };
                }
                return new Promise((resolve, reject) => {
                    //API call for AddData
                    Object_Editor_TaskContent_CMSColorFill.AddData(objNewColorFill, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("COLORFILL_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }, true);
                });
            }
            else {
                // If action type is EDIT 
                objNewColorFill = { ...objContext.state.objUserFileData };
                // If user uploads new ColorFill in EDIT mode, cIsFileChanged is set to Y. On the server side If cIsFileChanged is Y file version is incremented by 1.
                if (arrFileDetails.length > 0) {
                    objNewColorFill = {
                        ...objNewColorFill,
                        ["ColorFillDetails"]: { ...arrFileDetails[0] },
                        ["vElementJson"]: {
                            ...objNewColorFill["vElementJson"],
                            ["cIsFileChanged"]: "Y"
                        }
                    };
                }

                return new Promise((resolve, reject) => {
                    //API call for EditData
                    Object_Editor_TaskContent_CMSColorFill.EditData(objNewColorFill, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("COLORFILL_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }, true);
                }); 
            }
        }
        else {
            // checks for handling error and file upload status
            let objPayload = objContext.state.status === null ? { "blnShowError": true } : arrFileDetails.length > 0 ? { "status": false } : { "blnShowError": true, "status": null };
            objContext.dispatch({ "type": "SET_STATE", "payload": objPayload });
        }
    };
}

export default CMSColorFillAddEdit_ModuleProcessor;