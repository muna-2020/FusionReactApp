//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TeacherStartPage_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage_Hook';
import TeacherStartPage_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage_ModuleProcessor';

//Components used in module.
import NewsTip from '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/NewsTip/NewsTip';
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

//Inline Images import
import PieIconImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/pie_icon.png?inline';
import DocumentBlackImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/document_black.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';


/**
* @name TeacherStartPage
* @param {object} props props
* @summary This component displays the TeacherStartPage data.
* @returns {object} div that encapsulated the components with TeacherStartPage details.
*/
const TeacherStartPage = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherStartPage_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherStartPage", ["TeacherStartPage_ModuleProcessor"]: new TeacherStartPage_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherStartPage_ModuleProcessor.Initialize(objContext, objContext.TeacherStartPage_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Teacher_Hook, that contains all the custom hooks.
    * @returns null
    */
    TeacherStartPage_Hook.Initialize(objContext);

    /**
    * @name GetTestElements
    * @param {object} arrTestData test data
    * @summary Forms the jsx required for Test elements
    * @returns {object} jsx, React.Fragment
    */
    function GetTestElements(arrTestData) {
        let arrElements = arrTestData.map(test => {
            return (
                <React.Fragment>
                    <span className="subtext"> {test.vSubjectName + " "}{test.vSubSubjectName ? test.vSubSubjectName : ''}</span>

                    <ul className="tsp-main-subject-block-list">
                        {test.arrPupil[0] ? test.arrPupil[0].vName + " " + test.arrPupil[0].vFirstName : ''}
                    </ul>
                </React.Fragment>
            );
        });
        return arrElements;
    }

    /**
    * @name GetTestResultElements
    * @param {object} arrResultData Result test data
    * @summary Forms the jsx required for TestResult elements
    * @returns {object} jsx, React.Fragment
    */
    function GetTestResultElements(arrResultData) {
        let arrElements = arrResultData.map(tstRslt => {
            return (
                <React.Fragment>
                    <tr>
                        <td>{tstRslt.vName + " " + tstRslt.vFirstName}, <span className="grey-text">{tstRslt.vSubjectName}</span></td>
                        <td>{tstRslt.vResult}</td>
                    </tr>
                </React.Fragment>
            );
        });

        return arrElements;
    }

    /**
    * @name GetLearningTestElements
    * @param {object} arrTestData Learning test data
    * @summary Forms the jsx required for Learning Test elements
    * @returns {object} jsx, React.Fragment
    */
    function GetLearningTestElements(arrTestData) {
        let arrElements = arrTestData.map(test => {
            return (
                <React.Fragment>
                    <div className="pie-chart-box">
                        <div className="img">
                            <img src={PieIconImage} alt="" />
                        </div>
                        <p>
                            <b>{test.strTestType}:</b>
                            <p>{test.vTestname}</p>
                            <p>{test.vDay + " "}{test.dtTestStartDate} </p>
                            <p>{test.vName + " "}{test.vFirstName} </p>
                        </p>
                    </div>
                </React.Fragment>
            );
        });
        return arrElements;
    }

    /**
    * @name GetDocumentElements
    * @param {object} arrDocument Document data
    * @summary Forms the jsx required for Document elements
    * @returns {object} jsx, div
    */
    function GetDocumentElements(arrDocument) {
        let arrElements = arrDocument.map(doc => {
            return (
                <div className="pie-chart-box">
                    <div className="img">
                        <img src={DocumentBlackImage} alt="" />
                    </div>
                    <p>
                        <b><a href={doc.vFileUrl}>{doc.vFileName}</a> </b>
                        <p>{doc.dtTimeCreation} </p>
                        <p>{doc.vUserName} </p>
                    </p>
                </div>
            );
        });
        return arrElements;
    }

    /**
    * @name GetNewsElements
    * @param {object} arrNews News data
    * @summary Forms the jsx required for news elements
    * @returns {object} jsx, div
    */
    function GetNewsElements(arrNews) {
        let arrNewsElements = arrNews.map(news => {
            let strFileName = news.arrAttachments[0] ? news.arrAttachments[0].vAttachmentFileName : "";
            let strFileId = news.arrAttachments[0] ? news.arrAttachments[0].vFileId : "";
            let strStreamFileApiUrl = "API/Framework/Services/StreamFile";
            let strFileDownloadUrl = JConfiguration.BaseUrl + strStreamFileApiUrl + "?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strFileId + "&Type=News&DisplayFileName=" + strFileName;
            return (
                <div className="pie-chart-box">
                    <div className="img">
                        <img src={news.vProfilePicPath} alt="" />
                    </div>
                    <p>
                        <b>{news.vName + " " + news.vFirstName},</b>{news.dtCreatedOn}
                        <p>{news.vNews}</p>
                        {news.arrAttachments[0] ? <b><a href={strFileDownloadUrl}>{news.arrAttachments[0].vAttachmentFileName}</a> </b> : ""}
                    </p>
                </div>
            );
        });
        return arrNewsElements;
    }

    /**
    * @name GetFeedback
    * @param {object} objTextResource TextResource
    * @summary Forms the whole jsx required for feedback & opens the survey popup
    * @returns {object} jsx, div
    */
    function GetFeedback(objTextResource) {
        let uSchoolId = ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strTeacherId = ClientUserDetails.UserId;
        let arrSurveyData = DataRef(objContext.props.Object_Extranet_Shared_Survey, "Object_Extranet_Shared_Survey;uUserId;" + strTeacherId)["Data"];
        let arrSurveyQuestionData = DataRef(objContext.props.Object_Extranet_Shared_SurveyQuestion, "Object_Extranet_Shared_SurveyQuestion;uUserId;" + uSchoolId + ";cIsCurrentSurveyQuestion;Y")["Data"];
        let blnShowFeedback = objContext.TeacherStartPage_ModuleProcessor.ShowFeedbackStatus(objContext, arrSurveyData, arrSurveyQuestionData);
        return (
            blnShowFeedback ?
                <div className="feedback-block">
                    <div className="feedback-flex">
                        <p> <b>{Localization.TextFormatter(objTextResource, 'YourFeedback')}</b>{Localization.TextFormatter(objTextResource, 'FeedbackText')}
                            <span className="popup-trigger" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.OpenSurveyPopup(objContext, objTextResource, arrSurveyQuestionData); }}>{Localization.TextFormatter(objTextResource, 'OpenSurveyText')}</span></p>
                        <span className="close">{Localization.TextFormatter(objTextResource, 'Close')}
                            <img src={CloseImage}
                                className="close-icon"
                                onClick={() => { objContext.TeacherStartPage_ModuleProcessor.CloseFeedback(objContext, arrSurveyQuestionData); }}
                            />
                        </span>
                    </div>
                </div>
                :
                <React.Fragment />
        );
    }

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, div
    */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherStartPage", objContext.props);
        let strHtml = "<p onClick={()=>{console.log('working inline ')}}>click here</p>"
        //if (state.blnShowInitialPopup) {
        //    return ShowInitialPopup(objContext, objTextResource);
        //} else {
        let blnShowTips = ApplicationState.GetProperty("DontShowTips");
        //if (state.blnShowNewsTip) {
        //if (!blnShowTips) {
        //    return <NewsTip
        //        {...props}
        //        CloseClick={() => { objContext.TeacherStartPage_ModuleProcessor.CloseNewsTip(objContext) }}
        //        NewsTipData={objContext.TeacherStartPage_ModuleProcessor.GetNewsTipData(objContext)}
        //        />;

        //} else {

        let arrClientUrl = DataRef(props.Object_Extranet_Shared_OpenApplicationCredential, "FusionPupil")["Data"];
        let strBaseUrl = arrClientUrl && arrClientUrl.length > 0 ? (props.JConfiguration.IsSSL == "Y" ? "https://" + arrClientUrl[0]["vCurrentURL"] : "http://" + arrClientUrl[0]["vCurrentURL"]) : '';
        let strFullUrl = strBaseUrl + "/AutoLogin/AutoLogin?uPupilId=";
        let arrManipulatedPupilData = state.arrPupilData.map(ppl => { return { ...ppl, URL: strFullUrl + ppl["uPupilId"] } });
        let objShowHelp = ApplicationState.GetProperty("ShowHelp");
        if (!objShowHelp || (props["ComponentName"] && objShowHelp.NavigationName != props["ComponentName"]))
            ApplicationState.SetProperty("ShowHelp", { NavigationName: props["ComponentName"], ShowHelpIcon: false, ShowAt: "TeacherStartPageModule" });

        let arrTempClass = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId).Data.map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            });
        }

        let arrFilteredClass = arrTempClass.filter(x => x["t_TestDrive_Member_Class_Teacher"].length > 0)
        let TeacherStartPageContent = (
            <div className="content-section">
                {!blnShowTips && <NewsTip
                    {...props}
                    CloseClick={() => { objContext.TeacherStartPage_ModuleProcessor.CloseNewsTip(objContext) }}
                    NewsTipData={objContext.TeacherStartPage_ModuleProcessor.GetNewsTipData(objContext)}
                />}
                <div className="startpage-yellowband-wrapper" id="HelpIcon">
                    {/*GetFeedback(objTextResource)*/}
                    <div className="icon-trigger">
                        <img onClick={() => { objContext.TeacherStartPage_ModuleProcessor.ShowOnlineHelp(); }}
                            src={ExclamationMarkImage} />
                    </div>
                </div>
                {/*
                    <div>
                        <p onClick={() => { objContext.TeacherStartPage_ModuleProcessor.OpenClientNewsPopup(objContext, objTextResource); }}>
                            {Localization.TextFormatter(objTextResource, 'TeacherClienNewsBanner1')} -&gt; <b>{Localization.TextFormatter(objTextResource, 'TeacherClienNewsBanner2')}</b>
                        </p>
                    </div> */}
                {
                    JConfiguration.strDeviceType == "PC" && props.ShowHelp && props.ShowHelp.ShowHelpIcon ?
                        <div className="icon-trigger"> {/*online help icon*/}
                            <img onClick={() => { objContext.TeacherStartPage_ModuleProcessor.ShowOnlineHelp(); }}
                                src={ExclamationMarkImage} />

                        </div>
                        : <React.Fragment />
                }
                <div className="wrap teacher-start-page">
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="TeacherStartPage" Meta={objContext.TeacherStartPage_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                        <div className="tsp-flex">
                            <div className="tspLeft">
                                <div className="hdrflx startpage-header-flex">
                                    <span>{Localization.TextFormatter(objTextResource, 'MainText')}</span>
                                    <div className="content-dropdown">
                                        {arrFilteredClass.length > 0 ? <PerformanceProfiler ComponentName={"TeacherStartPage_ClassDropDown"} JConfiguration={props.JConfiguration} >
                                            <ClassDropDown
                                                id="TeacherStartPage_ClassDropDown"
                                                Data={objContext.TeacherStartPage_ModuleProcessor.GetClassDropDownData(objContext, arrTempClass)}
                                                DisplayColumn="vClassName"
                                                ValueColumn="uClassId"
                                                SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                                JConfiguration={JConfiguration}
                                                ClientUserDetails={props.ClientUserDetails}
                                                OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.TeacherStartPage_ModuleProcessor.HandleOnChangeClassDropDown(objContext, objItem); }}
                                            />
                                        </PerformanceProfiler>
                                            : <React.Fragment />
                                        }

                                    </div>
                                    {arrManipulatedPupilData.length > 0 ? <div className="content-dropdown class-pupil-dropdown">
                                        <PerformanceProfiler ComponentName={"TeacherStartPage_Pupil"} JConfiguration={props.JConfiguration} >
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"TeacherStartPage_Pupil"}
                                                Meta={objContext.TeacherStartPage_ModuleProcessor.GetPupilDropdownMetaData()}
                                                Data={objContext.TeacherStartPage_ModuleProcessor.GetPupilDropdownData(objContext, arrManipulatedPupilData)}
                                                Resource={objContext.TeacherStartPage_ModuleProcessor.GetResourceData(objTextResource)}
                                                Events={objContext.TeacherStartPage_ModuleProcessor.GetPupilDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </PerformanceProfiler>
                                    </div> : <React.Fragment />}

                                </div>

                                <div className="tsp-left-flex">
                                    <div className="tsp-left-div">
                                        <div className="tsp-left-div-padding orientation-test blueBg">
                                            <div className="hdrflx">
                                                <span>{Localization.TextFormatter(objTextResource, 'OrientationTest')}</span>
                                            </div>
                                            {/* repeat this for header subtext */}
                                            <span className="subtext">{Localization.TextFormatter(objTextResource, 'UnLockedTests')}</span>
                                            {state.arrOrientationTestPupil.length > 0 ? <React.Fragment>
                                                {GetTestElements(state.arrOrientationTestPupil)}</React.Fragment> : <div>
                                                    {Localization.TextFormatter(objTextResource, 'NoActiveTests_Message')}
                                                </div>}

                                            <div className="button-wrp">
                                                <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'OrientationTest'); }}>{Localization.TextFormatter(objTextResource, 'UnLockLogins')}</span>
                                            </div>

                                            <span className="subtext">{Localization.TextFormatter(objTextResource, 'LatestResults')}</span>

                                            {
                                                state.arrOrientationTestResult.length > 0 ?
                                                    <table className="tsp-table">
                                                        {GetTestResultElements(state.arrOrientationTestResult)}
                                                    </table> :
                                                    <div>{Localization.TextFormatter(objTextResource, 'NoResultsMessage')}</div>
                                            }
                                            <div className="button-wrp">
                                                <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'OrientationResult'); }}>{Localization.TextFormatter(objTextResource, 'AllResults')}</span>
                                            </div>
                                        </div>

                                        <div className="tsp-left-div-padding high-stake-test blueBg">
                                            <div className="hdrflx">
                                                <span>{Localization.TextFormatter(objTextResource, 'HighStakeTest')}</span>
                                            </div>
                                            <span className="subtext">{Localization.TextFormatter(objTextResource, 'UnLockedTests')}</span>
                                            {/* repeat this for header subtext */}

                                            {state.arrHighStakeTestPupil.length > 0 ?
                                                <React.Fragment>
                                                    {GetTestElements(state.arrHighStakeTestPupil)}
                                                </React.Fragment>
                                                : <div>
                                                    {Localization.TextFormatter(objTextResource, 'NoActiveTests_Message')}
                                                </div>
                                            }

                                            <div className="button-wrp">
                                                <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'HighStakeTest'); }}>{Localization.TextFormatter(objTextResource, 'UnLockLogins')}</span>
                                            </div>

                                            <span className="subtext">{Localization.TextFormatter(objTextResource, 'LatestResults')}</span>

                                            {
                                                state.arrHighStakeTestResult.length > 0 ?

                                                    <table className="tsp-table">
                                                        {GetTestResultElements(state.arrHighStakeTestResult)}
                                                    </table>
                                                    : <div>
                                                        {Localization.TextFormatter(objTextResource, 'NoResultsMessage')}
                                                    </div>
                                            }
                                            <div className="button-wrp">
                                                <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'HighStakeResult'); }}>{Localization.TextFormatter(objTextResource, 'AllResults')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tsp-left-div">
                                        <div className="tsp-left-div-padding greenBg">
                                            <div className="hdrflx">
                                                <span>{Localization.TextFormatter(objTextResource, 'LearningTest')}</span>
                                            </div>

                                            <span className="subtext">{Localization.TextFormatter(objTextResource, 'InProgress')}</span>
                                            {state.arrLearningTestPupil.length > 0 ?
                                                <React.Fragment>
                                                    {GetLearningTestElements(state.arrLearningTestPupil)}
                                                </React.Fragment> : <div>
                                                    {Localization.TextFormatter(objTextResource, 'NoLearningTestsMessage')}
                                                </div>
                                            }
                                            <div className="button-wrp">
                                                <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'LearningTest'); }}>{Localization.TextFormatter(objTextResource, 'AllExcercise')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tspRight">
                                <div className="hdrflx">
                                    <span>{Localization.TextFormatter(objTextResource, 'NewsAndDocument')}</span>
                                </div>
                                <div className="wrap tsp-right-div purpleBg">
                                    <div className="hdrflx">
                                        <span>{Localization.TextFormatter(objTextResource, 'News')}</span>
                                    </div>
                                    <span className="subtext">{Localization.TextFormatter(objTextResource, 'Latest') + " "}  {Localization.TextFormatter(objTextResource, 'News')}</span>

                                    {GetNewsElements(state.arrNewsData)}
                                    <div className="button-wrp">
                                        <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'News'); }}>{Localization.TextFormatter(objTextResource, 'NewsOpen')}</span>
                                    </div>

                                </div>

                                <div className="wrap tsp-right-div purpleBg">
                                    <div className="hdrflx">
                                        <span>{Localization.TextFormatter(objTextResource, 'Document')}</span>
                                    </div>
                                    <span className="subtext rtsbtxt rtsbtxt2">
                                        {Localization.TextFormatter(objTextResource, 'Latest')} {Localization.TextFormatter(objTextResource, 'Document')}
                                    </span>
                                    {GetDocumentElements(state.arrDocumentData)}
                                    <div className="button-wrp">
                                        <span className="blue-text" onClick={() => { objContext.TeacherStartPage_ModuleProcessor.Navigate(objContext, 'Document'); }}>{Localization.TextFormatter(objTextResource, 'DocumentOpen')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </WrapperComponent>
                </div>
            </div>
        );
        return TeacherStartPageContent;
        //}
        //}
    }

    /**
    * @summary renders the jsx.
    */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherStartPage_ModuleProcessor.StoreMapList()))(TeacherStartPage);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherStartPage_ModuleProcessor; 