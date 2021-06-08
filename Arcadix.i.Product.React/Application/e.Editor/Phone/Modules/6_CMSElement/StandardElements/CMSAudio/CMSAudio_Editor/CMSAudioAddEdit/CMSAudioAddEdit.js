// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as CMSAudioAddEdit_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudioAddEdit/CMSAudioAddEdit_Hook';
import CMSAudioAddEdit_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudioAddEdit/CMSAudioAddEdit_ModuleProcessor";

//Helper classes.
import * as ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

// Tree component
import Tree from "@root/Application/e.Editor/PC/Modules/TreeDisplay/Tree";

import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

// ArcadixFetchData class
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

import * as CMSAudio_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Common/CMSAudio_Common_MetaData"

import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

/**
 * @name CMSAudioAddEdit
 * @summary This component is responsible for loading Audio Popup.
 * @param {any} props Component Props.
 */
const CMSAudioAddEdit = (props) => {
    
    const FileUploadRef = useRef();
    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAudioAddEdit_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["CMSAudioAddEdit_ModuleProcessor"]: new CMSAudioAddEdit_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CMSAudioAddEdit_Hook, that contains all the custom hooks.
    * @returns null
    */
    CMSAudioAddEdit_Hook.Initialize(objContext);

    /**
     * @name useEffect
     * @summary To load styles.
     */
    useEffect(() => {
        let AddStyles = EditorState.GetReference("AddStyles");
        AddStyles(CMSAudioAddEdit.DynamicStyles(props));
    }, []);

    /**
    * @name Nodeclick
    * @param {object} objNode Contains selected Audio details
    * @summary Makes an API call to get details of the selected Audio
    */
    const Nodeclick = objNode => {
        var ArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        ArcadixFetchAndCacheData.ExecuteSingle("API/Editor/TaskContent/CMSAudioAddEdit_Module/GetAudioElementDetails", { iElementId: objNode.Id }, null, (objResponse) => {
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "objSelectedAudio": { ...objResponse["Editor_TaskContent_CMSAudioAddEdit_Module_GetAudioElementDetails"][0], ["iElementType"]: "Audio" },
                    "SelectedAudio": true,
                    ["ElementJson"]: objResponse["Editor_TaskContent_CMSAudioAddEdit_Module_GetAudioElementDetails"][0]
                }
            })
        }, true);
    };

    /**
    * @name GetPopupDescriptionContent
    * @param {object} objTextResource text resource data
    * @returns {any} returns popup description content JSX
    * */
    const GetPopupDescriptionContent = (objTextResource) => {
        return (
            
        );
    }

    /**
    * @name GetSelectedDetails
    * @param {object} objTextResource text resource data
    * @returns {any} returns selected content JSX
    * */
    const GetSelectedDetails = (objTextResource) => {
        var Audio = props.ComponentController.GetEditorElement("Audio");
        return (
            <div className="object-detail">
                <h2>{objTextResource["Folder"]}</h2>
                <h3>{objTextResource["Base_Data"]}</h3>
                <table>
                    <tr>
                        <td>{objTextResource["Name"]}:</td>
                        <td>{objContext.state.objSelectedAudio["vAudioName"]}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource["Base_Data"]}:</td>
                        <td>{objContext.state.objSelectedAudio["iAudioTime"]}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource["Created_On"]}:</td>
                        <td>{objContext.CMSAudioAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedAudio["dtCreatedOn"])}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource["Edited_On"]}:</td>
                        <td>{objContext.CMSAudioAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedAudio["dtModifiedOn"])}</td>
                    </tr>
                </table>
                <h3>{objTextResource["Description"]}:</h3>
                <p>{objContext.state.objSelectedAudio["vAudioDescription"]}</p>
                <h2>{objTextResource["Listen_to_the_audio"]}</h2>
                <Audio {...objContext.props} ElementJson={objContext.state.objSelectedAudio} />
            </div>
        );
    }

        /**
    * @name GetLocalTabContent
    * @param {object} objTextResource text resource data
    * @returns {any} returns local tab JSX
    * */
    const GetLocalTabContent = (objTextResource) => {
        return (
            <div class="image-addedit-upload">
                <div class="ai-title"> {objTextResource["Audio_Properties"]} </div>

                <div class="ai-flex">
                    <div class="ai-block">
                        <span>{objTextResource["Name"]}</span>
                        <input id="vAudioName" type="text" value={objContext.state.objUserFileData.vAudioName} onChange={(e) => { HandleOnChange(objContext, e) }} />
                    </div>
                </div>

                <div class="ai-title">{objTextResource["Description"]}</div>
                <div class="ta-padd">
                    <textarea name="" id="vAudioDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vAudioDescription} onChange={(e) => { HandleOnChange(objContext, e) }}></textarea>
                </div>

                <div class="ai-title"> {objTextResource["Upload_Image"]} </div>

                <div class="fl-padd">
                    <FileUpload {...objContext.props} ref={FileUploadRef} OnUploadComplete={OnUploadComplete} />
                    {objContext.state.objFileData !== null && <button onClick={() => { HandleUploadFile(objContext) }}>{objTextResource["Upload"]}</button>}
                </div>
                <div>
                    {objContext.state.blnShowError && <span style={{ "color": "red", "marginLeft": "8px" }}>{objTextResource["No_File_Selected_Status"]}</span>}
                    {objContext.state.status && <span style={{ "color": "red", "marginLeft": "8px" }}> {objTextResource["Successful_Status"]} </span>}
                    {objContext.state.status === false && < span style={{ "color": "red", "marginLeft": "8px" }}> {objTextResource["File_Exists_Error"]} </span>}
                </div>
            </div>
        );
    }

    const HandleOnChange = (objContext, e) => {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objUserFileData": { ...objContext.state.objUserFileData, [e.target.id]: e.target.value } } });
    }

    const OnUploadComplete = (objFileData) => {
        console.log("Uploaded File", objFileData)
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objFileData": objFileData, "objUserFileData": { ...objContext.state.objUserFileData, "vAudioName": objFileData["OriginalFileName"].split(".")[0] }, "blnShowError": false, "status": null } });
    }

    const HandleUploadFile = (objContext) => {
        let arrFileDetails = JSON.parse(FileUploadRef.current.GetUploadedFileDetails());
        console.log("File", arrFileDetails);

        if (arrFileDetails.length > 0 && !objContext.state.blnShowError && objContext.state.status === null) {
            let objNewAudio = CMSAudio_Editor_MetaData.GetDefaultAudioObject();
            objNewAudio = {
                ...objNewAudio,
                ...objContext.state.objUserFileData,
                ["AudioDetails"]: { ...arrFileDetails[0] }
            }
            var response = ArcadixFetchData.ExecuteCustom("API/Editor/TaskContent/SaveAudio", "POST", objNewAudio);
            response.then(res => res.json()).then((res) => {
                if (res["SavedAudioDetails"]["iElementId"]) {
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "status": true } })
                }
            });

            if (objContext.state.blnShowError) {
                objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowError": false, "status": null } });
            }
        }
        else {
            let objPayload = objContext.state.status === null ? { "blnShowError": true } : arrFileDetails.length > 0 ? { "status": false } : { "blnShowError": true, "status": null }
            objContext.dispatch({ "type": "SET_STATE", "payload": objPayload });
        }
    }

    /**
     * @name SetTabSelection
     * @param {string} strSelectedTab
     */
    const SetTabSelection = (strSelectedTab) => {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedTab": strSelectedTab } })
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSAudio/CMSAudioAddEdit"]["Data"][0]["CMSAudioAddEdit"];
        return (
            <section>
                <div className="audio-add-edit-header"> <h3>{objTextResource["Title"]} </h3> <span>{objTextResource["Select_Audio"]}</span> </div>
                <div className="popupContent">
                    <div className="tabPanel">
                        <nav>
                            <ul className="tabLists">
                                <li onClick={() => { SetTabSelection("Local") }}>
                                    <a href="#">{objTextResource["Local"]}</a>
                                </li>
                                <li onClick={() => { SetTabSelection("Global") }}>
                                    <a href="#">{objTextResource["Global"]}</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        {
                            objContext.state.strSelectedTab === "Local" ? GetLocalTabContent(objTextResource) :
                            <div className="image-upload-grid">
                                <div className="folder-tree">
                                    <Tree
                                        JConfiguration={objContext.props.JConfiguration}
                                        NodeData={objContext.state.arrNodeData[0]["Children"]}
                                        NodeClick={Nodeclick}
                                    />
                                </div>
                                {!objContext.state.SelectedAudio ? GetPopupDescriptionContent(objTextResource) : GetSelectedDetails(objTextResource)}
                            </div>
                        }
                    </div>
                    <footer>
                        <div className="fR">
                            <button className="btn btnOrnge" onClick={() => { objContext.CMSAudioAddEdit_ModuleProcessor.OkClick(objContext) }}> {objTextResource["Ok"]} </button>
                            <button className="btn btnOrnge" onClick={objEvt => props.ClosePopup(props.ObjModal)}> {objTextResource["Abort"]} </button>
                        </div>
                    </footer>
                </div>
            </section>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};


/**
 * @name InitialDataParams
 * @param {object} props props
 * @summary required for SSR
 * @returns {object} InitialDataParams 
 */
CMSAudioAddEdit.InitialDataParams = (props) => {
    return new ObjectQueue().Queue(new CMSAudioAddEdit_ModuleProcessor().InitialDataParams(props));
};

/**
 * @name CMSAudioAddEdit.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns Styles array
 */
CMSAudioAddEdit.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAudio/CMSAudioAddEdit/CMSAudioAddEdit.css",
    ];
};

export default connect(EditorBase_Hook.MapStoreToProps(CMSAudioAddEdit_ModuleProcessor.StoreMapList()))(CMSAudioAddEdit);