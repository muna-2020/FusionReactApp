// React related import
import React, { useReducer, useRef, forwardRef } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//File upload import.
import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

//Module realated imports
import * as AnimationAddEdit_Hooks from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationAddEdit/AnimationAddEdit_Hooks";
import AnimationAddEdit_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/AnimationAddEdit/AnimationAddEdit_ModuleProcessor";

/**
 * @name AnimationAddEdit
 * @param {object} props parent props.
 * @param {any} ref component ref.
 * @sumamry Conatains AnimationAddEdit module.
 * @returns {any} AnimationAddEdit
 * */
const AnimationAddEdit = forwardRef((props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, AnimationAddEdit_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        ["AnimationAddEditComponentRef"]: ref,
        ["MainFileUploadRef"]: useRef(),
        ["BackupFileUploadRef"]: useRef(),
        ["AnimationAddEdit_ModuleProcessor"]: new AnimationAddEdit_ModuleProcessor()
    };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AnimationAddEdit_ModuleProcessor.Initialize(objContext, objContext.AnimationAddEdit_ModuleProcessor);

    /**
     * @name AnimationAddEdit_Hooks.Initialize
     * @summary Initialize method call in AnimationAddEdit_Hooks, that contains all the custom hooks.
     */
    AnimationAddEdit_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Contains the JSX.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objTextResource = objContext.props.TextResource;
        let objMainFileData = {};
        let objBackupFileData = {};
        if(props.Data.ActionType && props.Data.ActionType.toLowerCase() === "edit")
        {
            objMainFileData = {
                "FileData": [
                    {
                        "FileOrigin": "Animation/" + objContext.state.objUserFileData["iElementId"] + "_Animation_" + objContext.state.objUserFileData["vElementJson"]["iAnimationFileVersion"] + "/" + objContext.state.objUserFileData["vElementJson"]["vAnimationFileName"]
                    }
                ]
            };
            if(objContext.state.objUserFileData["vElementJson"]["vZipFileName"])
            {
                objBackupFileData = {
                    "FileData": [
                        {
                            "FileOrigin": "Animation/" + objContext.state.objUserFileData["iElementId"] + "_Animation_" + objContext.state.objUserFileData["vElementJson"]["iAnimationFileVersion"] + "/" + objContext.state.objUserFileData["vElementJson"]["vZipFileName"]
                        }
                    ]
                };
            }
        }
        return (
            <div className="animation-addedit">
                <div className="anim-addedit-title">
                    {objTextResource["Animation_Properties"]}
                </div>
                <div className="anim-addedit-flex">
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["Name"]}
                        </span>
                        <input
                            id="vAnimationName"
                            style={{ outline: state.ErrorField === "vAnimationName" ? "1px solid Red" : undefined }}
                            type="text"
                            value={objContext.state.objUserFileData.vElementJson.vAnimationName}
                            onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChange(objContext, e.target.id, e.target.value); }} />
                    </div>
                </div>
                <div className="anim-addedit-flex">
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["Logic"]}
                        </span>
                        <label className="anim-addedit-checkbox">
                            <input
                                id="Logic"
                                type="checkbox"
                                checked={objContext.state.objUserFileData.vElementJson.cIsLogic === "Y" ? true : false}
                                onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChangeLogicCheckbox(objContext); }} />
                            <span className="cmark" />
                        </label>
                    </div>
                </div>
                <div className="anim-addedit-flex">
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["Height"]}
                        </span>
                        <input
                            id="iHeight"
                            style={{ outline: state.ErrorField === "iHeight" ? "1px solid Red" : undefined }}
                            type="text"
                            maxLength="3"
                            value={objContext.state.objUserFileData.vElementJson.iHeight ? objContext.state.objUserFileData.vElementJson.iHeight : ""}
                            onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChange(objContext, e.target.id, e.target.value); }} />
                    </div>
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["Width"]}
                        </span>
                        <input
                            id="iWidth"
                            style={{ outline: state.ErrorField === "iWidth" ? "1px solid Red" : undefined }}
                            type="text"
                            maxLength="3"
                            value={objContext.state.objUserFileData.vElementJson.iWidth ? objContext.state.objUserFileData.vElementJson.iWidth : ""}
                            onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChange(objContext, e.target.id, e.target.value); }} />
                    </div>
                </div>
                <div className="anim-addedit-flex radio-flex">
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["IsAnimateCC"]}
                        </span>
                        <input
                            id="IsAnimateCC"
                            name="AnimationType"
                            style={{ outline: state.ErrorField === "AnimationType" ? "1px solid Red" : undefined }}
                            type="radio"
                            checked={objContext.state.objUserFileData.vElementJson.cIsAnimateCC === "Y" ? true : false}
                            onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChangeAnimationTypeRadio(objContext, e.target.id); }} />
                    </div>
                    <div className="anim-addedit-block">
                        <span>
                            {objTextResource["IsCustom"]}
                        </span>
                        <input
                            id="IsCustom"
                            name="AnimationType"
                            style={{ outline: state.ErrorField === "AnimationType" ? "1px solid Red" : undefined }}
                            type="radio"
                            checked={objContext.state.objUserFileData.vElementJson.cIsCustom === "Y" ? true : false}
                            onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChangeAnimationTypeRadio(objContext, e.target.id); }} />
                    </div>
                </div>
                <div className="anim-addedit-title">
                    {objTextResource["Description"]}
                </div>
                <div className="ta-padd">
                    <textarea
                        id="vAnimationDescription"
                        cols="30"
                        rows="9"
                        value={objContext.state.objUserFileData.vElementJson.vAnimationDescription}
                        onChange={(e) => { objContext.AnimationAddEdit_ModuleProcessor.HandleOnChange(objContext, e.target.id, e.target.value); }} />
                </div>
                <div className="anim-addedit-title">
                    {objTextResource["Upload_Animation"]}
                </div>
                <div className="anim-fl-padd" style={{outline: state.ErrorField === "MainFileUpload" ? "1px solid red" : undefined}}>
                    <FileUpload
                        ref={objContext.MainFileUploadRef}
                        Id="MainFile"
                        Data={{ ...objMainFileData, "ClassName": "Arcadix.Object.Editor.TaskContent.CMSAnimation", "MethodName": "GetAnimationDetailsFromMetaFile"}}
                        Resource={{ "Text": { "UploadButtonText": "Choose File" }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                        Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                        ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                        CallBacks={{"OnUploadComplete": (objFileData) => { objContext.AnimationAddEdit_ModuleProcessor.OnUploadComplete(objContext, objFileData, "MainFile"); }}}
                    />
                </div>
                <div className="anim-addedit-title">
                    {objTextResource["Zip_Upload"]}
                </div>
                <div className="anim-fl-padd">
                    <FileUpload
                        ref={objContext.BackupFileUploadRef}
                        Id="BackupFile"
                        Data={{...objBackupFileData }}
                        Resource={{ "Text": { "UploadButtonText": "Choose File" }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                        Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                        ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                        CallBacks={{"OnUploadComplete": (objFileData) => { objContext.AnimationAddEdit_ModuleProcessor.OnUploadComplete(objContext, objFileData, "BackupFile"); }}}
                    />
                </div>
                <div>
                    {
                        objContext.state.IsError ?
                            <span style={{ "color": "red", "marginLeft": "8px" }}>
                                {objContext.state.ErrorMessage}
                            </span> : ""
                    }
                </div>
            </div>
        );
    };

    return GetContent();
});

let MemoizedComponent = React.memo(AnimationAddEdit);

export default MemoizedComponent;
