// React related imports.
import React, { forwardRef, useReducer, useRef } from 'react';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component Specific imports
import * as FileUpload_Hook from '@shared/Framework/Controls/FileUpload/FileUpload_Hook';
import FileUpload_ComponentProcessor from '@shared/Framework/Controls/FileUpload/FileUpload_ComponentProcessor';

//Components used
import ProgressBar from "@root/Framework/Controls/ProgressBar/ProgressBar";

import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name FileUpload
 * @summary This component displays the FileUpload data.
 * @param {object} props props
 * @param {any} ref ref
 * @returns {object} React.Fragement that encapsulated the FileUpload Data.
 */
const FileUpload = (props, ref) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FileUpload_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["FileUpload_ComponentProcessor"]: new FileUpload_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.FileUpload_ComponentProcessor.Initialize(objContext, objContext.FileUpload_ComponentProcessor);

    /**
    * @summary Initializing the events
    * */
    FileUpload_Hook.Initialize(objContext, ref);

    const fileUploadRef = useRef(null);

    /**
    * @name UploadFiles
    * @param {*} e event object
    * @summary sets the loacl state with the details of the uploaded files and calls the API to upload the File.
    */
    const UploadFiles = async (e) => {

        let arrFiles = e.currentTarget.files;
        if (arrFiles.length !== 0) {
            for (var i = 0; i < arrFiles.length; i++) {
                const file = arrFiles[i];
                let strExtension = file.name.split('.')[1];
                if (strExtension != "exe") {
                    dispatch({ type: "SET_STATE", payload: { blnShowValidation: false } });
                    var className = props.Data.ClassName ? props.Data.ClassName : "";
                    var methodName = props.Data.MethodName ? props.Data.MethodName : "";
                    const chunkSize = 10485760; // max size 10mb //4194304; // max size 4mb
                    const url = props.ParentProps.JConfiguration.BaseUrl + "API/Framework/Controls/FileUploadHandler/UploadFile" + '?sessionkey=' + JConfiguration.SessionKey;
                    var intTotalChunks = Math.ceil(file.size / chunkSize);
                    if (intTotalChunks == 1)
                        dispatch({ type: "SET_STATE", payload: { "uploadPercentage": 50 } });
                    else (intTotalChunks > 0)
                        dispatch({ type: "SET_STATE", payload: { "uploadPercentage": 5 } });
                    //dispatch({ type: "SET_STATE", payload: { "uploadPercentage": 10 } });
                    var chunkIndex = 0;
                    var uploadUid = UniqueId.GetUniqueId();
                    var fileName = file.name;
                    var objFileData;
                    for (let start = 0; start < file.size; start += chunkSize) {
                        var objMetaData = {
                            "chunkIndex": chunkIndex,
                            "contentType": file.type,
                            "fileName": fileName,
                            "relativePath": fileName,
                            "totalFileSize": file.size,
                            "totalChunks": intTotalChunks,
                            "uploadUid": uploadUid
                        };
                        chunkIndex = chunkIndex + 1;
                        const chunk = file.slice(start, start + chunkSize);
                        const fd = new FormData();
                        fd.append(`files[${i}]`, chunk);
                        fd.append("metaData", JSON.stringify(objMetaData));
                        fd.append("ClassName", className);
                        fd.append("MethodName", methodName);

                        //    dispatch({ type: "SET_STATE", payload: { "uploadPercentage": 50 } });

                        var r = await fetch(url, {
                            method: 'POST',
                            body: fd,
                            headers: new Headers({}),
                            credentials: 'same-origin'
                        });

                        //dispatch({ type: "SET_STATE", payload: { "uploadPercentage": 30 } });

                        var data = await r.json();
                        uploadUid = data["UploadUid"];
                        objFileData = data;
                        console.log("Completed" + Math.floor((chunkIndex / intTotalChunks) * 100) + "%");
                        dispatch({ type: "SET_STATE", payload: { "uploadPercentage": Math.floor((chunkIndex / intTotalChunks) * 100) } });
                    }
                    var intTemp = objFileData.FilePath.split('\\').indexOf("Temporary");
                    var strDate = objFileData.FilePath.split('\\')[intTemp + 1];
                    let arrFileData = [...state.arrFileData, objFileData];
                    dispatch({ type: "SET_STATE", payload: { "arrFileData": arrFileData } });
                    var strFileSrc = props.ParentProps.JConfiguration.WebDataPath + "Temporary/" + strDate + "/EmbededFileUpload/" + data.FileName;
                    objFileData = { ...objFileData, "FileSrc": strFileSrc };
                    props.CallBacks && props.CallBacks.OnUploadComplete ? props.CallBacks.OnUploadComplete(objFileData, arrFileData) : () => { };
                }
                else {
                    dispatch({ type: 'SET_STATE', payload: { blnShowValidation: true } })
                }
            }
        }
    };

    /**
    * @name DeleteFile
    * @param {*} eventFile event file
    * @summary To clear the latest uploaded file details from the File Input Element and from the state.
    */
    const DeleteFile = (eventFile) => {
        let intRemoveFileIndex = state.arrFileData.indexOf(eventFile);
        if (intRemoveFileIndex !== -1) {
            let arrFilteredFiles = state.arrFileData.filter((f, index) => index !== intRemoveFileIndex);
            dispatch({ type: "SET_STATE", payload: { "arrFileData": arrFilteredFiles } });
            props.CallBacks && props.CallBacks.OnUploadComplete ? props.CallBacks.OnUploadComplete(eventFile, arrFilteredFiles) : () => { };
        }
        //To clear the latest uploaded file details from the File Input Element. 
        //So that it will accept the same file again but only when it is deleted from the state.
        //document.getElementById("FileUpload").value = '';
        fileUploadRef.current.value = '';
    };

    /**
     * @name GetFileElements
     * @returns {array} file elements
     * @summary Returns the file jsx.
     * */
    let GetFileElements = () => {
        let strDownloadIconUrl = objContext.FileUpload_ComponentProcessor.GetDownloadIconUrl(objContext);
        let strDeleteIconUrl = objContext.FileUpload_ComponentProcessor.GetDeleteIconUrl(objContext);
        let arrFileElements = state.arrFileData.map(objFileData => {
            let objFile = objFileData.FileOrigin ? objContext.FileUpload_ComponentProcessor.GetFileDetails(objFileData) : objFileData;
            return (
                <div className="uploadedfile">
                    <span><a href={props.ParentProps.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objFile.FileName + "&Type=" + (objFile.Type ? objFile.Type : "Temporary") + "/" + (objFile.Folder ? objFile.Folder : "EmbededFileUpload") + "&DisplayFileName=" + objFile.OriginalFileName}>{objFile.OriginalFileName}</a> {props.Meta.ShowFileSize == 'Y' ? <span>{objFile.ContentLength} B </span> : <React.Fragment />}</span>
                    <a href={props.ParentProps.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objFile.FileName + "&Type=" + (objFile.Type ? objFile.Type : "Temporary") + "/" + (objFile.Folder ? objFile.Folder : "EmbededFileUpload") + "&DisplayFileName=" + objFile.OriginalFileName}>
                        <img src={strDownloadIconUrl} />
                    </a>
                    <img onClick={(e) => { DeleteFile(objFileData); }} src={strDeleteIconUrl} />
                </div>
            );
        });
        return arrFileElements;
    };

    /**
     * @name GetContent
     * @returns {any} component JSX
     * @summary Returns jsx of file upload.
     * */
    function GetContent() {
        let blnDisable = props.Meta.UploadSingle && props.Meta.UploadSingle === 'Y' && state.arrFileData.length > 0;
        let strDropFilesIconUrl = objContext.FileUpload_ComponentProcessor.GetDropFilesIconUrl(objContext);
        return (
            <div>
                <div id={ "div_"+ props.Id + "_FileUpload"} className={"file-upload" + (props.Meta.AllowDropFiles == false ? " hide-droparea" : "") }>
                    {
                        !blnDisable
                            ?
                            <>
                                {/* <label className={blnDisable ? "add-file disabled" : "add-file"} style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}>
                                <img src={objContext.FileUpload_ComponentProcessor.GetUploadIconUrl(objContext)} style={{ cursor: 'pointer' }} />
                                <input id="FileUpload" ref={fileUploadRef} multiple={props.Meta?.UploadSingle != "Y"} type="file" onChange={(e) => { UploadFiles(e); }} style={{ display: "none" }} disabled={blnDisable} accept={state.allowTypes} />
                                <span className="upload-button">{props.Resource.Text.UploadButtonText}</span>
                            </label> */}
                                <React.Fragment>
                                    <div className="left-box">
                                        <label className="choose-file-label" for={"inpt_" + props.Id + "FileUpload"}>
                                            {props.Meta.AllowDropFiles == false ?
                                                <img src={objContext.FileUpload_ComponentProcessor.GetUploadIconUrl(objContext)} style={{ cursor: 'pointer' }} />
                                                : <React.Fragment />
                                            }
                                            <span>{Localization.TextFormatter(props.Resource.Text, 'UploadButtonText')}</span>
                                        </label>
                                    </div>
                                    <div className="drop-area" style={props.Meta.AllowDropFiles == false ? { display: "none" } : {}}>
                                        <input id={"inpt_" + props.Id + "FileUpload"} ref={fileUploadRef} multiple={props.Meta?.UploadSingle != "Y"}
                                            type="file"
                                            onChange={(e) => { UploadFiles(e); }}
                                            disabled={blnDisable}
                                            accept={props.AllowTypes ? props.AllowTypes : state.allowTypes} />
                                        <span><img src={strDropFilesIconUrl} text="DropArea" alt="" />{Localization.TextFormatter(props.Resource.Text, 'DropAreaText')}</span>
                                    </div>
                                </React.Fragment>


                                {
                                    state.blnShowValidation ?
                                        <div>{props.Resource.Text.ValidationMessage}</div> : <React.Fragment />
                                }

                            </> :
                            <React.Fragment />
                    }

                    {
                        props.Meta.ShowUploadedFiles !== undefined && !props.Meta.ShowUploadedFiles
                            ?
                            <React.Fragment />
                            :
                            <div className="Uploaded-file-wrap" style={{ display: state.arrFileData.length > 0 ? "block" : "none" }}>
                                {GetFileElements()}
                            </div>
                    }

                </div>
                {
                    (state.uploadPercentage !== 0 && state.uploadPercentage !== 100) && <div className="file-upload-progressbar">
                        <ProgressBar Data={{ Percentage: state.uploadPercentage ? state.uploadPercentage : "5", ProgressText: "" }} Id={props.Id} /></div>
                }
                {
                    objContext.state.uploadPercentage > 0 && <span>{/* Upload progress {objContext.state.uploadPercentage}% */}</span>

                }
            </div>
        );
    }
    return GetContent();
};

export default forwardRef(FileUpload);

