// React related import
import React, { useReducer, useRef, useLayoutEffect } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Module realated imports
import * as AnimationManagement_Hooks from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationManagement/AnimationManagement_Hooks";
import AnimationManagement_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationManagement/AnimationManagement_ModuleProcessor";

/**
 * @name AnimationManagement_AnimationDetails
 * @param {object} props props from parent.
 * @summary Contains the AnimationManagement_AnimationDetails module.
 * @returns {any} AnimationManagement_AnimationDetails
 */
const AnimationManagement_AnimationDetails = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, AnimationManagement_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "iFrameRef": useRef(null),
        "AnimationManagement_ModuleProcessor": new AnimationManagement_ModuleProcessor()
    };

    /**
     * @name AnimationManagement_Hooks.Initialize
     * @summary Initialize method call in AnimationManagement_Hooks, that contains all the custom hooks.
     */
    AnimationManagement_Hooks.Initialize(objContext);

    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete && state.ElementJson !== null && (!state.ElementJson["vElementJson"]["cLoadAsUrl"] || state.ElementJson["vElementJson"]["cLoadAsUrl"] === null || state.ElementJson["vElementJson"]["cLoadAsUrl"] === "N")) {
            let objDocument = objContext.iFrameRef.current.contentDocument || objContext.iFrameRef.current.contentWindow.document;
            objDocument.open();
            objDocument.write(state.ElementJson["WrapperContents"]["HtmlDoc"]);
            objDocument.close();
            if (objDocument.readyState === "loading" || objDocument.readyState === "interactive") {
                objDocument.addEventListener("DOMContentLoaded", OnIFrameLoadComplete);
            }
            else {
                OnIFrameLoadComplete();
            }
        }
    }, [state.ElementJson]);

    /**
     * @name OnIFrameLoadComplete
     * @summary Calls the Load Initialize on iframe load complete.
     */
    const OnIFrameLoadComplete = () => {
        let objDocument = objContext.iFrameRef.current.contentDocument || objContext.iFrameRef.current.contentWindow.document;
        if (!state.ElementJson["vElementJson"]["cLoadAsUrl"] || state.ElementJson["vElementJson"]["cLoadAsUrl"] === null || state.ElementJson["vElementJson"]["cLoadAsUrl"] === "N") {
            objDocument.removeEventListener("DOMContentLoaded", OnIFrameLoadComplete);
        }
        if (!objContext.state.ElementJson["vElementJson"]["cIs3D"] || objContext.state.ElementJson["vElementJson"]["cIs3D"] === null || objContext.state.ElementJson["vElementJson"]["cIs3D"] === "N") {
            setTimeout(ExecuteLoadInitialize, 100);
        }
    };

    const ExecuteLoadInitialize = () => {
        let fnLoadInitialize;
        if (objContext.iFrameRef.current.contentWindow.stage) {
            let objStage = objContext.iFrameRef.current.contentWindow.stage.children[0];
            fnLoadInitialize = objStage.LoadInitialize;
        }
        else if (objContext.iFrameRef.current.contentWindow.LoadInitialize) {
            fnLoadInitialize = objContext.iFrameRef.current.contentWindow.LoadInitialize;
        }
        fnLoadInitialize(null, null);
    };

    const GetContent = () => {
        let strFolderPath = props.JConfiguration.WebDataPath + "Repo/Animation/" + props.JConfiguration["MainClientId"] + "/" + state.ElementJson["iElementId"] + "_Animation_" + state.ElementJson["vElementJson"]["iAnimationFileVersion"] + "/";
        let blnLoadAsUrl = false;
        if (state.ElementJson["vElementJson"]["cLoadAsUrl"] && state.ElementJson["vElementJson"]["cLoadAsUrl"] === "Y") {
            blnLoadAsUrl = true;
        }
        return (
            <div className="object-detail">
                <h2>
                    {props.TextResource["Folder"]}
                </h2>
                <h3>
                    {props.TextResource["Base_Data"]}
                </h3>
                <table>
                    <tr>
                        <td>
                            {props.TextResource["Name"]}:
                        </td>
                        <td>
                            {state.ElementJson["vElementJson"]["vAnimationName"]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Created_On"]}:
                        </td>
                        <td>
                            {BaseCMSElement.GetDate(state.ElementJson["dtCreatedOn"])}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Edited_On"]}:
                        </td>
                        <td>
                            {BaseCMSElement.GetDate(state.ElementJson["dtModifiedOn"])}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Solution_Size"]}:
                        </td>
                        <td>
                            {state.ElementJson["vElementJson"]["iAnimationFileSize"]}({props.TextResource["KB"]})
                            </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Download"]}:
                        </td>
                        <td>
                            <a href={strFolderPath + state.ElementJson["vElementJson"]["vAnimationFileName"]}>
                                {state.ElementJson["vElementJson"]["vAnimationFileName"]}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Project_Size"]}:
                        </td>
                        <td>
                            {state.ElementJson["vElementJson"]["iZipFileSize"]}({props.TextResource["KB"]})
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Zip_Link"]}:
                        </td>
                        <td>
                            <a href={strFolderPath + state.ElementJson["vElementJson"]["vZipFileName"]}>
                                {state.ElementJson["vElementJson"]["vZipFileName"]}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {props.TextResource["Logic"]}:
                        </td>
                        <td>
                            {state.ElementJson["vElementJson"]["cIsLogic"] === "Y" ? props.TextResource["Yes"] : props.TextResource["No"]}
                        </td>
                    </tr>
                </table>
                <h2>
                    {props.TextResource["Preview"]}
                </h2>
                <div style={{ padding: "10px", overflow: "auto" }}>
                    <div style={{ height: state.ElementJson["vElementJson"]["iHeight"] + 4 + "px", width: state.ElementJson["vElementJson"]["iWidth"] + 4 + "px", outline: "1px solid black" }}>
                        <div style={{ height: "100%", width: "100%" }}>
                            {
                                blnLoadAsUrl ?
                                    < iframe
                                        style={{ height: "100%", width: "100%" }}
                                        ref={objContext.iFrameRef}
                                        src={objContext.state.ElementJson["WrapperContents"]["HtmlDoc"]}
                                        onLoad={() => { setTimeout(OnIFrameLoadComplete, 100); }}
                                    /> :
                                    <iframe
                                        style={{ height: "100%", width: "100%" }}
                                        ref={objContext.iFrameRef}
                                    />
                            }
                        </div>
                    </div>
                </div>
                <h2>
                    {props.TextResource["Tasks"]}
                </h2>
                {
                    state.ElementJson["PageIds"] === null || state.ElementJson["PageIds"].length === 0 ?
                        <div>
                            No task is using this animation.
                        </div> :
                        <table>
                            <thead>
                                <tr>
                                    <th align="left">
                                        Task Name
                                    </th>
                                    <th align="left">
                                        Task Id
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.ElementJson["PageIds"].map(objTempPageDetails => {
                                        return (
                                            <tr>
                                                <td>
                                                    {objTempPageDetails["vPageName"]}
                                                </td>
                                                <td>
                                                    {objTempPageDetails["iPageId"]}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                }
            </div>
        );
    };

    return objContext.state.isLoadComplete ? GetContent() : "";
};

export default AnimationManagement_AnimationDetails;
