// React related import
import React, { useReducer, useRef, forwardRef, useImperativeHandle } from 'react';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

import * as CMSVideo_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_MetaData";
import Object_Editor_TaskContent_CMSVideo from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSVideo/CMSVideo";

const VideoAddEdit = forwardRef((props, ref) => {

    const FileUploadRef = useRef();

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer,
        {
            status: null,
            objUserFileData: props.Data.ElementJson ? props.Data.ElementJson : { "vElementJson": {} },
            strActionType: props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
            blnShowError: false,
            objFileData: null,
            blnEdited: false,
            blnUploading: false
        }
    );

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
                "objUserFileData": {
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
                    ["vElementJson"]: { ...objContext.state.objUserFileData["vElementJson"], "vVideoName": objFileData["OriginalFileName"].split(".")[0] }
                },
                "FileSrc": objFileData["FileSrc"],
                "blnShowError": false, "status": null, "blnEdited": true
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
        let objNewVideo;
        // Save if file is uploaded with no errors. Status check is made to avoid re-uploading( Removed )
        if ((arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) || objContext.state.strActionType === "edit") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            // If Action type is ADD form new Video object 
            if (objContext.state.strActionType !== "edit") {
                objNewVideo = CMSVideo_Editor_MetaData.GetDefaultElementJson();
                objNewVideo = {
                    ...objNewVideo, // Default Video object
                    ["vElementJson"]: { ...objNewVideo["vElementJson"], ...objContext.state.objUserFileData["vElementJson"] }, // User entered and selected checkbox values(FileName, FileDescrition, Title, cShowTitle, cShowDescription  etc...)
                    ["VideoDetails"]: { ...arrFileDetails[0], ["FileSrc"]: objContext.state.FileSrc }, // Uploaded file details
                    ["iFolderID"]: props.Data.NodeData ? props.Data.NodeData["Id"] : objNewVideo["iFolderID"]
                };
                if (props.Data.NodeData &&
                    props.Data.NodeData["NP"]["DataNodeType"].toLowerCase().indexOf("folder") !== -1 &&
                    props.Data.NodeData["NP"]["cIsRootNode"] === "Y") {
                    objNewVideo = { ...objNewVideo, ["iFolderID"]: 0 };
                }
                return new Promise((resolve, reject) => {
                    //API call for AddData
                    Object_Editor_TaskContent_CMSVideo.AddData(objNewVideo, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("VIDEO_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }, true);
                });
            }
            else {
                // If action type is EDIT 
                objNewVideo = { ...objContext.state.objUserFileData };
                // If user uploads new Video in EDIT mode, cIsFileChanged is set to Y. On the server side If cIsFileChanged is Y file version is incremented by 1.
                if (arrFileDetails.length > 0) {
                    objNewVideo = {
                        ...objNewVideo,
                        ["VideoDetails"]: { ...arrFileDetails[0], ["FileSrc"]: objContext.state.FileSrc },
                        ["vElementJson"]: {
                            ...objNewVideo["vElementJson"],
                            ["cIsFileChanged"]: "Y"
                        }
                    };
                }

                // need to be removed
                if (!objNewVideo["vElementTypeName"]) {
                    objNewVideo = { ...objNewVideo, ["vElementTypeName"]: "Video" };
                }

                return new Promise((resolve, reject) => {
                    //API call for EditData
                    Object_Editor_TaskContent_CMSVideo.EditData(objNewVideo, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0], "blnUploading": false } });
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("VIDEO_UPLOAD_ERROR"); //CHECK
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
        <div className="image-addedit-upload">
            <div className="ai-title"> {objTextResource["Video_Properties"]} </div>
            {
                objContext.state.blnUploading &&
                < div style={{ "position": "fixed", "top": 0, "left": 0, "bottom": 0, "right": 0, "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <h2> Uploading... </h2>
                </div>
            }
            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["Name"]}</span>
                    <input id="vVideoName" type="text" value={objContext.state.objUserFileData.vElementJson.vVideoName} onChange={(e) => { HandleOnChange(objContext, e) }} />
                </div>
            </div>

            <div className="ai-title">{objTextResource["Description"]}</div>
            <div className="ta-padd">
                <textarea name="" id="vVideoDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vElementJson.vVideoDescription} onChange={(e) => { HandleOnChange(objContext, e) }}></textarea>
            </div>

            <div className="ai-title"> {objTextResource["Upload_Video"]} </div>

            <div className="fl-padd">
                <FileUpload {...objContext.props}
                    ref={FileUploadRef}
                    Id="VideoUploadFile"
                    Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                    Resource={{ "Text": { "UploadButtonText": objTextResource["Choose_Video"] }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                    CallBacks={{ "OnUploadComplete": OnUploadComplete }}
                />
            </div>
            <div>
                {objContext.state.blnShowError && <span style={{ "color": "red", "marginLeft": "8px" }}>{objTextResource["No_File_Selected_Status"]}</span>}
            </div>
        </div>
    );
});

export default React.memo(VideoAddEdit);