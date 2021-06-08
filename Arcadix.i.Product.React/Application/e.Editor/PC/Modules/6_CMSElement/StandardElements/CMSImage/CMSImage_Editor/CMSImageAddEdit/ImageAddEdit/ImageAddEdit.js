// React related import
import React, { useReducer, useRef, forwardRef, useImperativeHandle } from 'react';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData";
import Object_TaskContent_CMSElement_CMSImage from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSImage/CMSImage";

const ImageAddEdit = forwardRef((props, ref) => {

    const FileUploadRef = useRef();

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, {
        status: null,
        objUserFileData: props.Data.ElementJson ? props.Data.ElementJson : {
            "vElementJson": {}
        },
        strActionType: props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
        blnShowError: false,
        objFileData: null,
        blnEdited: false,
        //blnShowButtonControls: props.Data.blnShowButtonControls ? props.Data.blnShowButtonControls : false,
        blnShowUploadControl: typeof props.Data.ShowUploadControl !== "undefined" ? props.Data.ShowUploadControl : true
    });

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    const objTextResource = objContext.props.TextResource ? objContext.props.TextResource : {};

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
        },
        GetUpdatedElementDetails: () => {
            return objContext.state.objUserFileData;
        }
    }), [objContext.state]);

    const HandleOnChange = (objContext, e) => {
        let objData = e.target.type.toLowerCase() !== "checkbox" ? { [e.target.id]: e.target.value } : { [e.target.id]: e.target.checked ? "Y" : "N" };
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objUserFileData": {
                    ...objContext.state.objUserFileData,
                    ["vElementJson"]: { ...objContext.state.objUserFileData["vElementJson"], ...objData }
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
        if (objFileData) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "objFileData": objFileData, "objUserFileData": {
                        ...objContext.state.objUserFileData,
                        ["vElementJson"]: {
                            ...objContext.state.objUserFileData["vElementJson"], "vImageName": objFileData["OriginalFileName"].split(".")[0]
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
                            ["vImageName"]: "",
                            ["vElementImageTitle"]: "",
                            ["cShowTitle"]: "",
                            ["cShowDescription"]: "",
                            ["cIsHighResolution"]: "",
                            ["vElementImageDescription"]: ""
                        }
                    }
                }
            });
        }
    };

    /**
     * @name HandleUploadFile
     * @param {object} objContext {props, state, dispatch}
     * @summary handles file upload
     * @returns {Promise} return's promise on successful file upload 
     */
    const HandleUploadFile = (objContext) => {

        // Gets file upload details
        let arrFileDetails = JSON.parse(FileUploadRef.current.GetUploadedFileDetails());
        console.log("File", arrFileDetails);
        let objNewImage;
        // Save if file is uploaded with no errors. Status check is made to avoid re-uploading( Removed )
        if ((arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) || objContext.state.strActionType === "edit") {
            // If Action type is ADD form new Image object 
            if (objContext.state.strActionType !== "edit") {
                objNewImage = CMSImage_Editor_MetaData.GetDefaultElementJson();
                objNewImage = {
                    ...objNewImage, // Default image object
                    ["vElementJson"]: { ...objNewImage["vElementJson"], ...objContext.state.objUserFileData["vElementJson"] }, // User entered and selected checkbox values(FileName, FileDescrition, Title, cShowTitle, cShowDescription  etc...)
                    ["ImageDetails"]: { ...arrFileDetails[0] }, // Uploaded file details
                    ["iFolderID"]: props.Data.NodeData ? props.Data.NodeData["Id"] : objNewImage["iFolderID"]
                };
                if (props.Data.NodeData &&
                    props.Data.NodeData["NP"]["DataNodeType"].toLowerCase().indexOf("folder") !== -1 &&
                    props.Data.NodeData["NP"]["cIsRootNode"] === "Y") {
                    objNewImage = { ...objNewImage, ["iFolderID"]: 0 };
                }
                return new Promise((resolve, reject) => {
                    //API call for AddData
                    Object_TaskContent_CMSElement_CMSImage.AddData(objNewImage, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0] } });
                            //editorPopup.ClosePopup(props.Id);
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("IMAGE_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
                    });
                });
            }
            else {
                // If action type is EDIT 
                objNewImage = { ...objContext.state.objUserFileData };
                // If user uploads new Image in EDIT mode, cIsFileChanged is set to Y. On the server side If cIsFileChanged is Y file version is incremented by 1.
                if (arrFileDetails.length > 0) {
                    objNewImage = {
                        ...objNewImage,
                        ["ImageDetails"]: { ...arrFileDetails[0] },
                        ["vElementJson"]: {
                            ...objNewImage["vElementJson"], ["cIsFileChanged"]: "Y"
                        }
                    };
                }

                // need to be removed
                if (!objNewImage["vElementTypeName"]) {
                    objNewImage = { ...objNewImage, ["vElementTypeName"]: "Image" };
                }

                return new Promise((resolve, reject) => {
                    //API call for EditData
                    Object_TaskContent_CMSElement_CMSImage.EditData(objNewImage, (objReturnData) => {
                        if (objReturnData?.[0]?.["iElementId"]) {
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true, "objUserFileData": objReturnData[0] } });
                            resolve(objReturnData[0]);
                        }
                        else {
                            console.log("IMAGE_UPLOAD_ERROR"); //CHECK
                            reject(false);
                        }
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
            <div className="ai-title"> {objTextResource["Properties"]} </div>
            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["Name"]}</span>
                    <input id="vImageName" type="text" value={objContext.state.objUserFileData.vElementJson.vImageName} onChange={(e) => { HandleOnChange(objContext, e); }} />
                </div>
                <div className="ai-block">
                    <span>{objTextResource["Title_Text"]}</span>
                    <input id="vElementImageTitle" type="text" value={objContext.state.objUserFileData.vElementJson.vElementImageTitle} onChange={(e) => { HandleOnChange(objContext, e); }} />
                </div>
            </div>
            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["ShowTitle_Text"]}</span>
                    <label className="ia-checkbox">
                        <input id="cShowTitle" type="checkbox" onChange={(e) => { HandleOnChange(objContext, e); }} checked={objContext.state.objUserFileData.vElementJson.cShowTitle === "Y" ? true : false} />
                        <span className="cmark"></span>
                    </label>
                </div>
                <div className="ai-block">
                    <span>{objTextResource["ShowDescription_Text"]}</span>
                    <label className="ia-checkbox">
                        <input id="cShowDescription" type="checkbox" onChange={(e) => { HandleOnChange(objContext, e); }} checked={objContext.state.objUserFileData.vElementJson.cShowDescription === "Y" ? true : false} />
                        <span className="cmark"></span>
                    </label>
                </div>
            </div>
            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["Druckversion"]}</span>
                    <label className="ia-checkbox">
                        <input id="cIsHighResolution" type="checkbox" onChange={(e) => { HandleOnChange(objContext, e); }} checked={objContext.state.objUserFileData.vElementJson.cIsHighResolution === "Y" ? true : false} />
                        <span className="cmark"></span>
                    </label>
                </div>
            </div>

            <div className="ai-title">{objTextResource["Description"]}</div>
            <div className="ta-padd">
                <textarea id="vElementImageDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vElementJson.vElementImageDescription} onChange={(e) => { HandleOnChange(objContext, e) }}></textarea>
            </div>

            {objContext.state.blnShowUploadControl &&
                <div>
                    <div className="ai-title"> {objTextResource["Upload_Image"]} </div>
                    <div className="fl-padd">
                        <FileUpload
                            {...props}
                            Id="ImageUploadFile"
                            ref={FileUploadRef}
                            Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                            Resource={{ "Text": { "UploadButtonText": objTextResource["Choose_Image"] }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                            CallBacks={{ "OnUploadComplete": OnUploadComplete }}
                        />
                    </div>
                </div>
            }
            <div>
                {objContext.state.blnShowError && <span style={{ "color": "red", "marginLeft": "8px" }}>{objTextResource["No_File_Selected_Status"]}</span>}
            </div>
        </div>
    );
});

export default React.memo(ImageAddEdit);