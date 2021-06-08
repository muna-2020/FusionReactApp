//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as PupilProfile_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_Hook';
import PupilProfile_ModuleProcessor from "@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_ModuleProcessor";

//Components used in module.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

//Inline Images import
import imgExclamationMark from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/exclamation_mark.svg?inline';

/**
 * @name PupilProfile
 * @param {object} props props
 * @summary This component consists of three editable notes.
 * @returns {object} React.Fragement that encapsulated PupilProfile divs.
 */
const PupilProfile = props => {

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilProfile_Hook.GetInitialState(props));

    /**
    * @name Assigning objContext
    * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilProfile", ["PupilProfile_ModuleProcessor"]: new PupilProfile_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.PupilProfile_ModuleProcessor.Initialize(objContext, objContext.PupilProfile_ModuleProcessor);

    /**
    * @name Initialize
    * @summary Initialize Custom hooks
    */
    PupilProfile_Hook.Initialize(objContext);

    const domProfileFileUploadRef = useRef(null);
    const domBackgroundFileUploadRef = useRef(null);

    /**
    * @name GetContent
    * @summary Returns the required jsx for component
    * @returns {*} jsx
    */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilProfile", props)

        const arrUserPrefernceBackgroundTheme = DataRef(objContext.props.Object_Cockpit_UserPreferenceBackgroundTheme, "Object_Cockpit_UserPreferenceBackgroundTheme;uUserId;" + props.ClientUserDetails.UserId)["Data"];


        let objShowSamePasswordMessage = ApplicationState.GetProperty("ShowSamePasswordMessage");

        const arrUserPrefernceProfileImage = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;uUserId;" + props.ClientUserDetails.UserId)["Data"];
        console.log("showPasswordExistsMsg", state.showPasswordExistsMsg);
        var BackgroundImage = state.arrBackgroundTheme.map((objItem, index) => {
            let blnShowClass = false;
            let strPath = "";
            if (objItem && objItem["cIsDeleted"] === "N") {
                if (objItem["uUserId"] === "00000000-0000-0000-0000-000000000000") {
                    if (objItem["uBackgroundThemeId"] === state.objSelectedBackgroundId) {
                        blnShowClass = true;
                    }
                    strPath = props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/0/00000000-0000-0000-0000-000000000000/" + objItem["uBackgroundThemeId"] + "_" + objItem["vBackgroundFileVersion"] + "." + objItem["vBackgroundFileType"];
                }
                else if (arrUserPrefernceBackgroundTheme.length > 0) {
                    {
                        if (objItem["uBackgroundThemeId"] === state.objSelectedBackgroundId) {
                            blnShowClass = true;
                        }
                        strPath = props.JConfiguration.WebDataPath + "Repo/BackGroundTheme/" + props.JConfiguration.MainClientId + "/" + props.ClientUserDetails.UserId + "/" + objItem["uBackgroundThemeId"] + "_" + objItem["vBackgroundFileVersion"] + "." + objItem["vBackgroundFileType"];
                    }
                }
            }
            else if (objItem && objItem["FileName"]) {
                if (objItem["FileName"].split('.')[0] === state.objSelectedBackgroundId) {
                    blnShowClass = true;
                }
                strPath = objItem["FileSrc"];
            }
            else return null;
            return (
                <div className={blnShowClass ? "img-box selected" : "img-box"} onClick={e => { objContext.PupilProfile_ModuleProcessor.SelectedBackgroundImage(objContext, objItem); }}>
                    <img src={strPath} />
                </div>
            );

        });

        var ProfileImage = state.arrProfileImage.map((objItem, index) => {
            let blnShowClass = false;
            let strImgPath = "";
            if (objItem && objItem["cIsDeleted"] === "N") {
                if (objItem["uUserId"] === "00000000-0000-0000-0000-000000000000") {
                    if (objItem["uProfileImageId"] === state.objSelectedProfileImageId) {
                        blnShowClass = true;
                    }
                    strImgPath = props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/0/00000000-0000-0000-0000-000000000000/" + objItem["uProfileImageId"] + "_" + objItem["iFileVersion"] + "." + objItem["vFileType"];
                }

                else if (arrUserPrefernceProfileImage.length > 0) {
                    if (objItem["uProfileImageId"] === state.objSelectedProfileImageId) {
                        blnShowClass = true;
                    }
                    strImgPath = props.JConfiguration.WebDataPath + "Repo/LearncoacherProfilePicture/" + props.JConfiguration.MainClientId + "/" + props.ClientUserDetails.UserId + "/" + objItem["uProfileImageId"] + "_" + objItem["iFileVersion"] + "." + objItem["vFileType"];
                }
            }
            else if (objItem && objItem["FileName"]) {
                if (objItem["FileName"].split('.')[0] === state.objSelectedProfileImageId) {
                    blnShowClass = true;
                }
                strImgPath = objItem["FileSrc"];
            }
            else return null;

            return (
                <div className={blnShowClass ? "img-box selected" : "img-box"} onClick={e => { objContext.PupilProfile_ModuleProcessor.SelectedProfileImage(objContext, objItem); }}>
                    <img src={strImgPath} />
                </div>
            );
        });

        return (
            <div className="my-profile" id="PupilProfileComponent">
                <li className="pupil-help-icon">
                    {/*
                    <div className="pupil-icon-trigger">
                        <img
                            onClick={() => { objContext.PupilProfile_ModuleProcessor.ShowOnlineHelp(); }}
                            src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"} alt=""
                        />
                    </div>
                    */}
                </li>
                <h2 id="PupilInnerHeader">{Localization.TextFormatter(objTextResource, 'PupilProfileHeader')}</h2>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="PupilProfile_FillHeight"
                    Meta={{ HeaderIds: ["PupilHeader", "PupilInnerHeader"], FooterIds: ["ProfileFooter", "bottomSpacing"] }}
                    ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                    <div className="my-profile-flex">
                        <div className="my-profile-box select-background">
                            <h2>{Localization.TextFormatter(objTextResource, 'SelectBackgroundHeader')}</h2>
                            <div className="background-image-selection">
                                <div className="image-grid">
                                    {BackgroundImage}
                                    <div className="select-background-input">
                                        <span className="document-file-upload-button background-profile">
                                            <PerformanceProfiler ComponentName={"FileUpload_PupilProfile_BackGround"} JConfiguration={props.JConfiguration} >
                                                <FileUpload
                                                    ref={domBackgroundFileUploadRef}
                                                    Id="FileUpload_PupilProfile_BackGround"
                                                    Data={{
                                                        "FileData": []
                                                    }}
                                                    Resource={objContext.PupilProfile_ModuleProcessor.GetResourceFileUploadData(objTextResource)}
                                                    Meta={objContext.PupilProfile_ModuleProcessor.GetMetaFileUploadData()}
                                                    ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                                                    CallBacks={objContext.PupilProfile_ModuleProcessor.GetCallBacksBackgroundFileUpload(objContext)}
                                                    AllowTypes="image/*"
                                                />
                                            </PerformanceProfiler>
                                        </span>
                                    </div>
                                </div>
                                <div className="button-wrap">
                                    <button className="pupil-button green-button" onClick={(e) => { objContext.PupilProfile_ModuleProcessor.DeleteBackGroundTheme(objContext, objTextResource) }}>
                                        {Localization.TextFormatter(objTextResource, 'DeleteImage')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="my-profile-box select-profile-picture">
                            <h2>{Localization.TextFormatter(objTextResource, 'SelectUserProfileHeader')}</h2>
                            <div className="profile-picture-selection">
                                <div className="image-grid profile-image-grid">
                                    {ProfileImage}
                                    <label className="select-background-input">
                                        <span className="document-file-upload-button">
                                            <PerformanceProfiler ComponentName={"FileUpload_PupilProfile_Profile"} JConfiguration={props.JConfiguration} >
                                                <FileUpload
                                                    ref={domProfileFileUploadRef}
                                                    Id="FileUpload_PupilProfile_Profile"
                                                    Data={{
                                                        "FileData": []
                                                    }}
                                                    Resource={objContext.PupilProfile_ModuleProcessor.GetResourceFileUploadData(objTextResource)}
                                                    Meta={objContext.PupilProfile_ModuleProcessor.GetMetaFileUploadData()}
                                                    ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                                                    CallBacks={objContext.PupilProfile_ModuleProcessor.GetCallBacksProfileFileUpload(objContext)}
                                                    AllowTypes="image/*"
                                                />
                                            </PerformanceProfiler>
                                        </span>
                                    </label>
                                </div>
                                <div className="button-wrap">
                                    <button className="pupil-button green-button" onClick={(e) => { objContext.PupilProfile_ModuleProcessor.DeleteProfileImage(objContext, objTextResource) }}>
                                        {Localization.TextFormatter(objTextResource, 'DeleteImage')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        (props.ClientUserDetails.PupilDetails.cIsExternalMember && props.ClientUserDetails.PupilDetails.cIsExternalMember == "Y") ?
                            <div className="pupilemail">
                                <br />
                                <h2>{Localization.TextFormatter(objTextResource, 'EMailTitle')}</h2>
                                <div>
                                    {
                                        props.ClientUserDetails.Email.length > 0
                                            ? <span>{props.ClientUserDetails.Email}</span>
                                            : <span>{Localization.TextFormatter(objTextResource, 'NoEmail')}</span>
                                    }
                                </div>
                            </div>
                            : <div className="password-padd">
                                <div className="change-password-block">
                                    <h2>{Localization.TextFormatter(objTextResource, 'ChangePasswordText')}</h2>
                                    <div className="change-password-flex">
                                        <div className="password-block">
                                            <span>{Localization.TextFormatter(objTextResource, 'NewPassword')}</span>
                                            <input type="password" name="password" id="profilepassword" onChange={(e) => objContext.PupilProfile_ModuleProcessor.HideSamePasswordMessage(objContext)} />
                                        </div>
                                        <div className="password-block">
                                            <span>{Localization.TextFormatter(objTextResource, 'ConfirmPassword')}</span>
                                            <input type="password" name="confirmpassword" id="confirmprofilepassword" onChange={(e) => objContext.PupilProfile_ModuleProcessor.SavePassword(objContext)} />
                                        </div>
                                    </div>
                                    {state.strPasswordMismatch.length > 0 &&
                                        <div className="password-mismatch-error">
                                            <img src={imgExclamationMark} />
                                            <span>{state.strPasswordMismatch}</span>
                                        </div>
                                    }
                                </div>
                            </div>}
                </WrapperComponent>

                <div className="profile-footer" id="ProfileFooter">
                    {

                        props.ShowSamePasswordMessage ?
                            <div>
                                {Localization.TextFormatter(objTextResource, 'PasswordSameMessage')}
                            </div> : <React.Fragment />
                    }
                    <button className="pupil-button green-button" onClick={() => { objContext.PupilProfile_ModuleProcessor.OnClickBack(objContext) }}>
                        {Localization.TextFormatter(objTextResource, 'AbortText')}
                    </button>
                    <button className="pupil-button green-button" onClick={(e) => objContext.PupilProfile_ModuleProcessor.SaveData(objContext, objTextResource)}>
                        {Localization.TextFormatter(objTextResource, 'Save')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {state.isLoadComplete ? GetContent() : <React.Fragment />}
        </React.Fragment>
    );
};

export default connect(ExtranetBase_Hook.MapStoreToProps(PupilProfile_ModuleProcessor.StoreMapList()))(PupilProfile);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilProfile_ModuleProcessor;