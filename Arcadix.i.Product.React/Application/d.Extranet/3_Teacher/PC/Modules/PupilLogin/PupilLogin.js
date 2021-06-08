//React related imports.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PupilLogin_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_Hook';
import PupilLogin_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_ModuleProcessor';

//Components used in module.;
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';
import DeleteImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/delete.svg?inline';
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import RightArrowImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/arrow_right.svg?inline';

/**
* @name PupilLogin
* @param {object} props props
* @summary This component displays the PupilLogin data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with PupilLogin details.
*/
const PupilLogin = (props) => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilLogin_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilLogin", ["PupilLogin_ModuleProcessor"]: new PupilLogin_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilLogin_ModuleProcessor.Initialize(objContext, objContext.PupilLogin_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in PupilLogin_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilLogin_Hook.Initialize(objContext);

    useEffect(() => {
        if (typeof state.Open !== "undefined" && state.Open === false) {
            window.dispatchEvent(new Event('resize'));
        }
    }, [state.Open]);

    /**
    * @name ViewPupil
    * @param {string} strClassName Passes ClassName
    * @param {string} strOfflinePropcessExecutionId Passes OfflinePropcessExecutionId
    * @param {string} strFileName Passes FileName
    * @param {object} objTextResource Passes TextResource
    * @summary Forms the jsx for list of pupil whose logins are generated.
    * @returns {object} jsx, React.Fragment
    */
    function GetList(objOfflinePropcessExecutionData, objTextResource) {
        let strOfflinePropcessExecutionId = objOfflinePropcessExecutionData["uOfflineProcessExecutionId"];
        let strFileName = objContext.PupilLogin_ModuleProcessor.GetOfflineFileName(objContext,objOfflinePropcessExecutionData);        
        let strCombinedFileName = strOfflinePropcessExecutionId + "/" + objOfflinePropcessExecutionData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFileName"];
        let strStreamFileApiUrl = "API/Framework/Services/StreamFile?";
        let strFileDownloadUrl = props.JConfiguration.BaseUrl + strStreamFileApiUrl + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strCombinedFileName + "&Type=Offline/ExtranetPupilLogin&DisplayFileName=" + Localization.TextFormatter(objTextResource, 'DisplayFileName');
        return (
            <React.Fragment>
                <ul>
                    <li>
                        <img src={PDFIconImage} alt="" />
                        <a href={strFileDownloadUrl} className="not-downloaded">
                            {" "}
                            {strFileName}
                        </a>
                        <img onClick={() => { objContext.PupilLogin_ModuleProcessor.DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId); }}
                            src={DeleteImage} alt="" />
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    /**
    * @name ViewPupil
    * @param {object} objPupil Passes pupil object
    * @param {boolean} blnIsChecked Passes IsChecked
    * @summary Forms the jsx for ViewPupil
    * @returns {object} jsx, React.Fragment
    */
    function ViewPupil(objPupil, blnIsChecked) {
        let strFullName = objPupil.vFirstName + " " + objPupil.vName;
        return (
            <li>
                <span>
                    {strFullName}
                </span>
                <label className="check-container">
                    {/* {
                        blnIsChecked ?  */}
                    <input id={objPupil.uPupilId} type="checkbox" onClick={(event) => { objContext.PupilLogin_ModuleProcessor.OnChangeCheckBoxItem(objContext, event.target.id, strFullName, !blnIsChecked); }} checked={blnIsChecked} />
                    {/* :<input id={objPupil.uPupilId} type="checkbox" onClick={(event)=>{objContext.PupilLogin_ModuleProcessor.OnChangeCheckBoxItem(objContext, event.target.id, strFullName, event.target.checked)}}/> */}
                    {/* } */}
                    <span className="checkmark" />
                </label>
            </li>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", props);
        objTextResource = objTextResource ? objTextResource : {};
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClasses = objContext.PupilLogin_ModuleProcessor.GetAllClasses(objContext);
        let objClass = arrClasses.find(x => x["uClassId"] == strClassId);
        objClass ? objClass : { HasPackage: 'N', uClassId: "00000000-0000-0000-0000-000000000000" };
        let arrClassDropDownData = objContext.PupilLogin_ModuleProcessor.GetClassDropDownData(objContext);
        let arrSchoolYearPeriodData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")) {
            arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        }

        let objCurrentSchoolYeraPeriod = objContext.PupilLogin_ModuleProcessor.GetCurrentSchoolYearPeriod(arrSchoolYearPeriodData);
        let arrLicenseData = [];
        if (DataRef(objContext.props.Object_Extranet_School_ClassLicense)) {
            arrLicenseData = DataRef(objContext.props.Object_Extranet_School_ClassLicense)["Data"];
        }

        let blnHasPackage = objContext.PupilLogin_ModuleProcessor.HasPackage(objClass, arrLicenseData);

        let objOfflineProcessDefinitionId = "";
        if (DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")) {
            objOfflineProcessDefinitionId = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin").Data[0]["uOfflineProcessDefinitionId"];
        }

        let arrPdfFilesInfo = objContext.PupilLogin_ModuleProcessor.GetOfflineExecutionLoaded(objContext) ? DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId)["Data"] : [];

        return (
            <div className="pupil-login">
                <div className="top-space" id="TopSpace" />
                <div className={state.Open === false ? "all-pdf-popup-wrapper" : "all-pdf-popup-wrapper open"}>
                    <div className="all-pdf-popup">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="PupilLogin_Pdf" Meta={objContext.PupilLogin_ModuleProcessor.GetPDFFillHeightMetaData()} ParentProps={{ ...props }}>
                            <div className="all-pdf-popup-padd">
                                <div className="all-pdf-popup-header">
                                    <h3>{Localization.TextFormatter(objTextResource, 'PupilLogins')}</h3>
                                    <div className="close" onClick={(event) => { objContext.PupilLogin_ModuleProcessor.HandlePdfPopup(objContext); }}>
                                        <span>{Localization.TextFormatter(objTextResource, 'ClosePopupText')}</span>
                                        <img src={CloseImage} alt="" />
                                    </div>
                                </div>
                                <div className="pdf-list">
                                    {
                                        arrPdfFilesInfo.length > 0 && arrPdfFilesInfo.find(objTempData => JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] === strClassId) ?
                                            <React.Fragment>
                                                <h4>
                                                    {Localization.TextFormatter(objTextResource, 'ClassLabel')} {state.objSelectedClass["vClassName"]}
                                                </h4>
                                                {
                                                    arrPdfFilesInfo.map(objTempData => {
                                                        if (JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] === strClassId) {
                                                            return GetList(objTempData, objTextResource);
                                                        }
                                                    })
                                                }
                                            </React.Fragment> : <React.Fragment></React.Fragment>
                                    }
                                    {
                                        arrPdfFilesInfo.length > 0 ? arrClasses.map(objClass => {
                                            if (objClass["uClassId"] === strClassId) {
                                                return <React.Fragment />;
                                            }
                                            else {
                                                return (
                                                    <React.Fragment>
                                                        {
                                                            arrPdfFilesInfo.find(objTempData => JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] === objClass["uClassId"]) ?
                                                                <React.Fragment>
                                                                    <h4>
                                                                        {Localization.TextFormatter(objTextResource, 'ClassLabel')} {objClass["vClassName"]}
                                                                    </h4>
                                                                    {
                                                                        arrPdfFilesInfo.map(objTempData => {
                                                                            if (JSON.parse(objTempData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFilter"])["ClassId"] === objClass["uClassId"]) {
                                                                                return GetList(objTempData, objTextResource);
                                                                            }
                                                                        })
                                                                    }
                                                                </React.Fragment> : <React.Fragment></React.Fragment>
                                                        }
                                                    </React.Fragment>
                                                );
                                            }
                                        }) : <React.Fragment>{Localization.TextFormatter(objTextResource, 'EmptyLoginListText')}</React.Fragment>
                                    }
                                </div>
                            </div>
                        </WrapperComponent>
                    </div>
                </div>
                <div className={state.Open === false ? "logins-wrap" : "logins-wrap close"}>
                    <div className="top-head-padd" id="PupilLoginHeader">
                        <div className="top-head">
                            <div className="top-head-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"PupilLogin_ClassDropDown"} JConfiguration={props.JConfiguration} >
                                        <ClassDropDown
                                            id="PupilLogin_ClassDropDown"
                                            Data={arrClassDropDownData}
                                            DisplayColumn="vClassName"
                                            ValueColumn="uClassId"
                                            SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                            JConfiguration={props.JConfiguration}
                                            ClientUserDetails={props.ClientUserDetails}
                                            OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.PupilLogin_ModuleProcessor.OnChangeClassDropDown(objContext, objItem); }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <span>{objTextResource.SchoolYear}</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"PupilLogin_SchoolYearPeriod"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"PupilLogin_SchoolYearPeriod"}
                                            Meta={objContext.PupilLogin_ModuleProcessor.GetSchoolYearPeriodDropdownMetaData()}
                                            Data={objContext.PupilLogin_ModuleProcessor.GetSchoolYearPeriodDropdownData(objCurrentSchoolYeraPeriod)}
                                            Resource={objContext.PupilLogin_ModuleProcessor.GetResourceData()}
                                            Events={objContext.PupilLogin_ModuleProcessor.GetSchoolYearPeriodDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="PupilLogin" Meta={objContext.PupilLogin_ModuleProcessor.GetLoginFillHeightMetaData()} ParentProps={{ ...props }}>
                        {
                            blnHasPackage ?
                                <div className="light-brown-bg teacher-logins">

                                    <div className="padding-20">
                                        <h3>{Localization.TextFormatter(objTextResource, 'PupilLabel')} {state.objSelectedClass.vClassName}</h3>
                                        <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')}</span>
                                    </div>


                                    <ul className="pupil-logins-list padding-20">
                                        <li>
                                            <span>{objTextResource["AllPupil"]} ({state.arrPupilData.length})</span>
                                            <label className="check-container">
                                                {/* {
                                            state.isSelectAll ? */}
                                                <input id="AllPupil" type="checkbox" checked={state.isSelectAll} onClick={(event) => { objContext.PupilLogin_ModuleProcessor.OnChangeCheckBoxItem(objContext, event.target.id, "AllPupil", !state.isSelectAll); }} />
                                                :<input id="AllPupil" type="checkbox" onClick={(event) => { objContext.PupilLogin_ModuleProcessor.OnChangeCheckBoxItem(objContext, event.target.id, "AllPupil", event.target.checked); }} />
                                                {/* } */}
                                                <span className="checkmark" />
                                            </label>
                                        </li>
                                        {
                                            state.arrPupilData.map(objPupil => {
                                                let blnIsChecked = false;
                                                if (state.isSelectAll) {
                                                    blnIsChecked = true;
                                                }
                                                else {
                                                    if (state.arrSelectedPupil.findIndex(objSelectedPupil => objSelectedPupil["uPupilId"] === objPupil["uPupilId"]) > -1) {
                                                        blnIsChecked = true;
                                                    }
                                                }
                                                return ViewPupil(objPupil, blnIsChecked);
                                            })
                                        }
                                    </ul>
                                </div>
                                : <div className="noLicenseMessage">{objTextResource.LicenseNotActivatedMessage}</div>
                        }
                    </WrapperComponent>
                </div>
                <div className="footer pupil-login-footer" id="FooterPupil">
                    <div className="footer-button-flex">
                        {blnHasPackage && !state.Open && <button className="button yellow-button" onClick={(event) => { objContext.PupilLogin_ModuleProcessor.OpenConfirmationPopup(objContext, RightArrowImage); }}>
                            {Localization.TextFormatter(objTextResource, 'FooterButtonPDF')}
                        </button>}
                    </div>
                    <div className="footer-right-flex">
                        <div className="all-pdf">
                            <span onClick={(event) => { objContext.PupilLogin_ModuleProcessor.HandlePdfPopup(objContext); }}>{Localization.TextFormatter(objTextResource, 'FooterButtonAllPDF')}</span>
                            <img className={state.Open === true ? "active" : ""} src={AngleDownImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilLogin_ModuleProcessor.StoreMapList()))(PupilLogin);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilLogin_ModuleProcessor; 