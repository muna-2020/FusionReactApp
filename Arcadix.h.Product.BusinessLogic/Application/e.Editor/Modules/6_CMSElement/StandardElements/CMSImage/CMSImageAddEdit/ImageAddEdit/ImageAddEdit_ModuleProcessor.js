// ArcadixFetchAndCacheData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData"
import Object_TaskContent_CMSElement_CMSImage from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSImage/CMSImage";

/**
 * @name ImageAddEdit_ModuleProcessor
 * @summary Contains the ImageAddEdit popup specific methods.
 * */
class ImageAddEdit_ModuleProcessor {

    /**
     * @name HandleUploadFile
     * @param {object} objContext {props, state, dispatch}
     * @summary handles file upload
     * @returns {Promise} return's promise on successful file upload 
     */
    HandleUploadFile (objContext) {
        // Gets file upload details
        let arrFileDetails = JSON.parse(objContext.FileUploadRef.current.GetUploadedFileDetails());
        console.log("File", arrFileDetails);
        let objNewImage;
        // Save if file is uploaded with no errors. Status check is made to avoid re-uploading( Removed )
        if ((arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) || objContext.state.strActionType === "edit") {
            // If Action type is ADD form new Image object 
            if (objContext.state.strActionType !== "edit") {
                objNewImage = CMSImage_Editor_MetaData.GetDefaultImageObject();
                objNewImage = {
                    ...objNewImage, // Default image object
                    ...objContext.state.objUserFileData, // User entered and selected checkbox values(FileName, FileDescrition, Title, cShowTitle, cShowDescription  etc...)
                    ["ImageDetails"]: { ...arrFileDetails[0] }, // Uploaded file details
                    ["iFolderID"]: objContext.props.Data.NodeData ? objContext.props.Data.NodeData["Id"] : objNewImage["iFolderID"]
                };
                return new Promise((resolve, reject) => {
                    //API call for AddData
                    Object_TaskContent_CMSElement_CMSImage.AddData(objNewImage, (objReturnData) => {
                        console.log(objReturnData);
                        if (objReturnData["SavedImageDetails"]["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": res["SavedImageDetails"] } });
                            resolve(objReturnData[0]);
                        }
                        //CHECK
                        if (objContext.state.blnShowError) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowError": false, "status": null } });
                        }
                    });
                });
            }
            else {
                // If action type is EDIT 
                objNewImage = { ...objContext.state.objUserFileData };
                // If user uploads new Image in EDIT mode, cIsFileChanged is set to Y. On the server side If cIsFileChanged is Y file version is incremented by 1.
                if (arrFileDetails.length > 0) {
                    objNewImage = { ...objNewImage, ["ImageDetails"]: { ...arrFileDetails[0] }, ["cIsFileChanged"]: "Y" };
                }

                //API call for EditData
                Object_TaskContent_CMSElement_CMSImage.EditData(objNewImage, (objReturnData) => {
                    console.log(objReturnData);
                    if (objReturnData["SavedImageDetails"]["iElementId"]) {
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": res["SavedImageDetails"] } });
                    }
                    //CHECK
                    if (objContext.state.blnShowError) {
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowError": false, "status": null } });
                    }
                });
            }
        }
        else {
            // checks for handling error and file upload status
            let objPayload = objContext.state.status === null ? { "blnShowError": true } : arrFileDetails.length > 0 ? { "status": false } : { "blnShowError": true, "status": null };
            objContext.dispatch({ "type": "SET_STATE", "payload": objPayload });
        }
    }

    /**
     * @name HandleOnChange
     * @param {any} objContext {state, props, dispatch}
     * @param {any} e event 
     * @summary updates input and checkbox values to state
     */
    HandleOnChange (objContext, e){
        let objData = e.target.type.toLowerCase() !== "checkbox" ? { [e.target.id]: e.target.value } : { [e.target.id]: e.target.checked ? "Y" : "N" };
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objUserFileData": { ...objContext.state.objUserFileData, ...objData }, "blnEdited": true } });
    }

    /**
     * @name OnUploadComplete
     * @param {object} objContext {state, props, dispatch}
     * @param {any} objFileData Uploaded file object
     * @summary passed to FileUpload component
     */
    OnUploadComplete (objContext, objFileData) {
        console.log("Uploaded File", objFileData);
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objFileData": objFileData, "objUserFileData": { ...objContext.state.objUserFileData, "vElementImageName": objFileData["OriginalFileName"].split(".")[0] }, "blnShowError": false, "status": null, "blnEdited": true } });
    }
}

export default ImageAddEdit_ModuleProcessor;