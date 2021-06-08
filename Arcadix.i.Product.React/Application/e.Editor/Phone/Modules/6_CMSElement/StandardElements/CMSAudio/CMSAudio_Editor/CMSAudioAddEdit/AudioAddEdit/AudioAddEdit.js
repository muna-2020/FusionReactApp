// React related import
import React, { useReducer, useRef, forwardRef, useImperativeHandle } from 'react';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

import * as CMSAudio_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData"
import Object_Editor_TaskContent_CMSAudio from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAudio/CMSAudio";

const AudioAddEdit = forwardRef((props, ref) => {

    const FileUploadRef = useRef();

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, {
        status: null,
        objUserFileData: props.Data.ElementJson ? props.Data.ElementJson : { "vElementJson": {} },
        strActionType: props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
        blnShowError: false,
        objFileData: null,
        blnEdited: false,
        blnUploading: false
    });

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    const objTextResource = objContext.props.TextResource;

    useImperativeHandle(ref, () => ({
        UploadFile: async () => {
            // Handles file upload
            // Check made for edit mode. 
            //if user don't make any changes, then upload will be canceled
            if (!objContext.state.blnEdited && objContext.state.strActionType === "edit") {
                editorPopup.ClosePopup(props.Id);
                return;
            }
            let objResponse = await HandleUploadFile(objContext);
            if (objResponse) {
                editorPopup.ClosePopup(props.Id);
                return objResponse;
            }
        }
    }), [objContext.state]);

    const HandleOnChange = (objContext, e) => {
        //let objData = e.target.type.toLowerCase() !== "checkbox" ? { [e.target.id]: e.target.value } : { [e.target.id]: e.target.checked ? "Y" : "N" };
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objUserFileData":
                {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: { ...objContext.state.objUserFileData["vElementJson"], [e.target.id]: e.target.value }
                }, "blnEdited": true
            }
        });
    };

    /**
     * @name OnUploadComplete
     * @param {any} objFileData Uploaded file object
     * @summary passed to FileUpload component
     */
    const OnUploadComplete = (objFileData) => {
        console.log("Uploaded File", objFileData);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: { ...objContext.state.objUserFileData["vElementJson"], "vAudioName": objFileData["OriginalFileName"].split(".")[0] }
                }, "blnShowError": false, "status": null, "blnEdited": true
            }
        });
    };


    /**
     * @name HandleUploadFile
     * @param {object} objContext {props, state, dispatch}
     * @summary handles file upload
     * @returns {Promise} return's promise on successful file upload 
     */
    const HandleUploadFile = (objContext) => {

        // objContext.dispatch({ "type": "SET_STATE", "payload": { "blnUploading": true } });
        // Gets file upload details
        let arrFileDetails = JSON.parse(FileUploadRef.current.GetUploadedFileDetails());
        console.log("File", arrFileDetails);
        let objNewAudio;
        // Save if file is uploaded with no errors. Status check is made to avoid re-uploading( Removed )
        if ((arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) || objContext.state.strActionType === "edit") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            // If Action type is ADD form new Audio object
            if (objContext.state.strActionType !== "edit") {
                objNewAudio = CMSAudio_Editor_MetaData.GetDefaultElementJson();
                objNewAudio = {
                    ...objNewAudio, // Default Audio object
                    ["vElementJson"]: { ...objNewAudio["vElementJson"], ...objContext.state.objUserFileData["vElementJson"] }, // User entered and selected checkbox values(FileName, FileDescrition, Title, cShowTitle, cShowDescription  etc...)
                    ["AudioDetails"]: { ...arrFileDetails[0], ["FileSrc"]: objContext.state.FileSrc }, // Uploaded file details
                    ["iFolderID"]: props.Data.NodeData ? props.Data.NodeData["Id"] : objNewAudio["iFolderID"]
                };
                if (props.Data.NodeData &&
                    props.Data.NodeData["NP"]["DataNodeType"].toLowerCase().indexOf("folder") !== -1 &&
                    props.Data.NodeData["NP"]["cIsRootNode"] === "Y") {
                    objNewAudio = { ...objNewAudio, ["iFolderID"]: 0 };
                }
                return new Promise((resolve, reject) => {
                    //API call for AddData
                    Object_Editor_TaskContent_CMSAudio.AddData(objNewAudio, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });                          
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("AUDIO_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }, true);
                });
            }
            else {
                // If action type is EDIT 
                objNewAudio = { ...objContext.state.objUserFileData };
                // If user uploads new Audio in EDIT mode, cIsFileChanged is set to Y. On the server side If cIsFileChanged is Y file version is incremented by 1.
                if (arrFileDetails.length > 0) {
                    objNewAudio = {
                        ...objNewAudio,
                        ["AudioDetails"]: { ...arrFileDetails[0], ["FileSrc"]: objContext.state.FileSrc },
                        ["vElementJson"]: {
                            ...objNewAudio["vElementJson"],
                            ["cIsFileChanged"]: "Y"
                        }
                    };
                }
                // need to be removed
                if (!objNewAudio["vElementTypeName"]) {
                    objNewAudio = { ...objNewAudio, ["vElementTypeName"]: "Audio" };
                }
                return new Promise((resolve, reject) => {
                    //API call for EditData
                    Object_Editor_TaskContent_CMSAudio.EditData(objNewAudio, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });                          
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("AUDIO_UPLOAD_ERROR"); //CHECK
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

    return (
        <div className="image-addedit-upload audio-addedit">
            <div className="ai-title"> {objTextResource["Audio_Properties"]} </div>

            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["Name"]}</span>
                    <input id="vAudioName" type="text" value={objContext.state.objUserFileData.vElementJson.vAudioName} onChange={(e) => { HandleOnChange(objContext, e) }} />
                </div>
            </div>

            <div className="ai-title">{objTextResource["Description"]}</div>
            <div className="ta-padd">
                <textarea name="" id="vAudioDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vElementJson.vAudioDescription} onChange={(e) => { HandleOnChange(objContext, e); }} />
            </div>

            <div className="ai-title"> {objTextResource["Upload_Audio"]} </div>

            <div className="fl-padd">
                <FileUpload {...objContext.props}
                    ref={FileUploadRef}
                    Id="AudioUploadFile"
                    Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                    Resource={{ "Text": { "UploadButtonText": objTextResource["Choose_Audio"] }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                    CallBacks={{ "OnUploadComplete": OnUploadComplete }}
                />
            </div>
            <div>
                {objContext.state.blnShowError && <span style={{ "color": "red", "marginLeft": "8px" }}>{objTextResource["No_File_Selected_Status"]}</span>}
            </div>
        </div>
    );
});

export default React.memo(AudioAddEdit);