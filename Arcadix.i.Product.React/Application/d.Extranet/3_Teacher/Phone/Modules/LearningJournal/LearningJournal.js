//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as LearningJournal_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournal/LearningJournal_Hook';
import LearningJournal_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournal/LearningJournal_ModuleProcessor';

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import TestPreviewImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/TestPreview.svg?inline';

/**
* @name LearningJournal
* @param {object} props props
* @summary This component displays the LearningJournal data.
* @returns {object} div that encapsulated the LearningJournal div with its details.
*/
const LearningJournal = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningJournal_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "LearningJournal", ["LearningJournal_ModuleProcessor"]: new LearningJournal_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.LearningJournal_ModuleProcessor.Initialize(objContext, objContext.LearningJournal_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LearningJournal_Hook, that contains all the custom hooks.
    * @returns null
    */
    LearningJournal_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournal", objContext.props);
        let arrClassData = objContext.LearningJournal_ModuleProcessor.GetClassDropDownData(objContext).arrFinalClassData;
        let arrClassRawData = objContext.LearningJournal_ModuleProcessor.GetClassDropDownData(objContext).arrClassData;
        let arrProcessStep = objContext.LearningJournal_ModuleProcessor.GetProcessStepDropdownData(objContext);
        objTextResource = objTextResource ? objTextResource : {};
        let objAllSubject = {
            iSubjectId: -1,
            t_TestDrive_Subject_Data: [{
                vSubjectName: objTextResource["AllText"],
                iLanguageId: props.JConfiguration.InterfaceLanguageId
            }]
        };
        let arrIntranetSubjects = [];
        let arrSchoolSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")) {
            arrIntranetSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"]
        }
        if (DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")) {
            arrSchoolSubjects = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        }
        let arrSubjects = [objAllSubject, ...arrIntranetSubjects, ...arrSchoolSubjects];
        let arrWeekDisplayDropdownData = objContext.LearningJournal_ModuleProcessor.GetWeekDisplayDropdownData(objContext);
        let arrTimeTableClassTime = [];
        let arrTimeTableDay = [];
        let arrSAOption = [];
        let arrAllTopicData = [];
        if (DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)) {
            arrTimeTableClassTime = DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)) {
            arrTimeTableDay = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)) {
            arrSAOption = DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)) {
            arrAllTopicData = DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"];
        }
        let arrTopicData = [];
        if (arrAllTopicData && arrAllTopicData.length > 0)
            arrTopicData = arrAllTopicData.filter(tpc => tpc["t_LearnCoacher_LearningJournal_Pupil_CommentFeedback"].find(fdbck => fdbck["cIsByTeacher"] == 'Y') == undefined);
        let arrSegmentData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")) {
            arrSegmentData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
        }
        objContext.LearningJournal_ModuleProcessor.SetInitialState(objContext, state.arrPupilData, arrSubjects, arrProcessStep);
        if (state.blnDateFilterCalled) {
            objContext.LearningJournal_ModuleProcessor.GetDataByFilters(objContext, arrTopicData, arrSegmentData, arrSubjects, arrClassRawData, arrTimeTableClassTime, arrTimeTableDay);
        }
        let arrReviewCriteriaData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)) {
            arrReviewCriteriaData = DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"];
        }
        let objFormatedDate = props.JConfiguration.Locale.DATETIME_FORMATS;
        return (
            <div className="learnjournal">
                {/*Title head section*/}
                <div className="learnjournal-title">
                    <div className="learnjournal-title-left">
                        <span className="heading-left">Learnjournal</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/arrow-pointing-to-right.svg")}
                        />
                        <span className="menu-title">Im Prozess</span>
                    </div>
                    <div className="learnjournal-title-right">
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                        />
                    </div>
                </div>

                {/*Top head dropdown section*/}

                <div className="top-head">
                    <div className="dropdown-main-wrapper">
                        <div className="learnjournal-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                            <div className="learnjournal-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournalClassDropDown"} JConfiguration={props.JConfiguration} >
                                    <ClassDropDown
                                        id="LearningJournalClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.LearningJournal_ModuleProcessor.OnChangeClassDropDown(objContext, objItem); }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        <div className="learnjournal-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'PupilLabel')}:</span>
                            <div className="learnjournal-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournal_Pupil"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournal_Pupil"}
                                        Meta={objContext.LearningJournal_ModuleProcessor.GetPupilDropdownMetaData()}
                                        Data={objContext.LearningJournal_ModuleProcessor.GetPupilDropdownData(objContext)}
                                        Resource={objContext.LearningJournal_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournal_ModuleProcessor.GetPupilDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown-main-wrapper">
                        <div className="learnjournal-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubjectLabel')}:</span>
                            <div className="learnjournal-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournal_Subject"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournal_Subject"}
                                        Meta={objContext.LearningJournal_ModuleProcessor.GetSubjectDropdownMetaData()}
                                        Data={objContext.LearningJournal_ModuleProcessor.GetSubjectDropdownData(objContext, arrSubjects)}
                                        Resource={objContext.LearningJournal_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournal_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        <div className="learnjournal-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ProcessStep')}:</span>
                            <div className="learnjournal-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournal_ProcessStep"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournal_ProcessStep"}
                                        Meta={objContext.LearningJournal_ModuleProcessor.GetProcessStepDropdownMetaData()}
                                        Data={{
                                            DropdownData: arrProcessStep,
                                            SelectedValue: state.objProcessStep ? state.objProcessStep.value : arrProcessStep[0].value
                                        }}
                                        Resource={objContext.LearningJournal_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournal_ModuleProcessor.GetProcessStepDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>

                    <div className="top-head-buttons">
                        <button className="green-btn" onClick={() => { objContext.LearningJournal_ModuleProcessor.GetDataByFilters(objContext, arrTopicData, arrSegmentData, arrSubjects, arrClassRawData, arrTimeTableClassTime, arrTimeTableDay); }}> {Localization.TextFormatter(objTextResource, 'SearchButtonText')}</button>
                        {/* <button className="yellow-btn">Information schliessen</button> */}
                    </div>

                </div>

                {/*main wrapper starts here*/}

                <div className="learnjournal-main-wrapper">
                    <span className="wrapper-top-heading">{Localization.TextFormatter(objTextResource, 'LernJournalHeadingText')}</span>

                    {/* MULTISELECT DATA BLOCK STARTS HERE */}
                    <div className="multiselect-container">
                        <div className="multiselect-left">
                            <PerformanceProfiler ComponentName={"LearningJournal_WeekDisplay"} JConfiguration={props.JConfiguration} >
                                <WeekDisplay
                                    Id={"LearningJournal_WeekDisplay"}
                                    JConfiguration={props.JConfiguration}
                                    OnChangeDisplay={(objItem) => { objContext.LearningJournal_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem); }}
                                    backgroundColor="rgb(229, 194, 205)"
                                />
                            </PerformanceProfiler>
                        </div>

                        <div className="multiselect-right">
                            <div className="multiselect-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournal_WeekDisplayDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournal_WeekDisplayDropdown"}
                                        Meta={objContext.LearningJournal_ModuleProcessor.GetWeekDisplayDropdownMetaData()}
                                        Data={{
                                            DropdownData: arrWeekDisplayDropdownData,
                                            SelectedValue: ApplicationState.GetProperty("DisplayFor") ? ApplicationState.GetProperty("DisplayFor") : arrWeekDisplayDropdownData[2]["Value"]
                                        }}
                                        Resource={objContext.LearningJournal_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournal_ModuleProcessor.GetWeekDisplayDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                    </div>

                    {/* MULTISELECT DATA BLOCK ENDS HERE */}

                    {/*Task accordian section starts here*/}
                    {state.arrDisplayData.length > 0 ?
                        GetElements(objFormatedDate, arrReviewCriteriaData, arrSAOption, objTextResource)
                        : <div className="empty-test-message"><span>{Localization.TextFormatter(objTextResource, 'EmptyDataMessage')}</span></div>
                    }
                </div>
            </div>
        );

        /**
        * @name GetElements
        * @param {Object} objFormatedDate Passes FormatedDate
        * @param {Array} arrReviewCriteriaData Passes ReviewCriteriaData
        * @param {Array} arrSAOption Passes Strength Assessment Option
        * @param {Object} objTextResource Passes TextResource
        * @summary Forms the jsx for the elements.
        * @returns {object} jsx, React.Fragment
        */
        function GetElements(objFormatedDate, arrReviewCriteriaData, arrSAOption, objTextResource) {
            var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
            let arrElements = state.arrDisplayData.map((tpc, intIndex) => {
                let arrTopicDate = tpc.dtTopicDate.split('-');
                let dtCommented = tpc.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0] ? tpc.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0].dtCommentDate : undefined;
                let arrDtCommented = [];
                let strCommentedDay;
                if (dtCommented) {
                    arrDtCommented = dtCommented.split('-');
                    strCommentedDay = objFormatedDate.SHORTDAY[(Number(arrDtCommented[1]) % 7 - 1)];
                }
                let blnPlanen = objContext.LearningJournal_ModuleProcessor.CheckIsPlanen(objContext, tpc);
                let blnShowAccordion = state.intSelectedAccordionIndex == -1? false : state.intSelectedAccordionIndex == intIndex || state.intSelectedAccordionIndex == 0 && intIndex == 0 
                return (
                    <div className="task-accordian-main-wrapper">
                        <div className="task-accordian-header" onClick={() => {
                            // accordion == 1 ? openAccordian(0) : openAccordian(1);
                            objContext.LearningJournal_ModuleProcessor.SetAccordionIndex(objContext, intIndex)
                        }}>
                            <div className="task-accordian-header-left-content">
                                <span title="Task Three">{Localization.TextFormatter(objTextResource, 'FirstName')}: <b>{tpc.objPupil.vFirstName}</b></span>
                                <span title="Deutsch">{Localization.TextFormatter(objTextResource, 'SubjectLabel')}: <b>{tpc.objSubject.t_TestDrive_Subject_Data[0].vSubjectName}</b></span>
                            </div>

                            <div className="task-accordian-header-right-content">
                                {blnPlanen ?                                  
                                    <img src={TestPreviewImage} onClick={() => { objContext.LearningJournal_ModuleProcessor.OpenPlanenTopicDisplay(objContext, tpc, objTextResource) }} /> :
                                    <React.Fragment /> 
                                }
                                {
                                    blnShowAccordion ?
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_up.png")}
                                        />

                                        :

                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                        />


                                }
                            </div>
                        </div>

                        <div className={blnShowAccordion ? "task-accordian-content show" : "task-accordian-content"} >
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'LastName')}</td>
                                        <td colspan="2">{tpc.objPupil.vName}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</td>
                                        <td colspan="2">{tpc.objClass.vClassName}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TopicDate')}</td>
                                        <td colspan="2">{objFormatedDate.SHORTDAY[(Number(arrTopicDate[1]) % 7 - 1)] + ". " + new Date(tpc.dtTopicDate).toLocaleDateString('de-DE', dateOptions)}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'CommentedDate')}</td>
                                        {state.blnPlanen ? <React.Fragment /> :
                                            <td colspan="2">{dtCommented ? strCommentedDay + ". " + new Date(dtCommented).toLocaleDateString('de-DE', dateOptions) : ''}</td>
                                        }
                                    </tr>

                                    {/* <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'Action')}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                            <div className="table-footer-button">
                            {blnPlanen ?
                                <React.Fragment /> :
                                <button
                                 onClick={() => {
                                    let strMonth = arrTopicDate[2] + ". " + objFormatedDate.MONTH[Number(arrTopicDate[1]) - 1] + " " + arrTopicDate[0];
                                    console.log("topic of commented", tpc)
                                    Popup.ShowPopup({
                                        Data: {
                                            objTopic: tpc,
                                            arrReviewCriteriaData: arrReviewCriteriaData,
                                            strTeacherName: props.ClientUserDetails.Name,
                                            arrSAOption: arrSAOption,
                                            schoolYearMonth: strMonth,
                                            Object_Extranet_Teacher_Topic: props.Object_Extranet_Teacher_Topic
                                        },
                                        Meta: {
                                            PopupName: 'PupilTopicReviewCriteria',
                                            ShowHeader: false,
                                            ShowCloseIcon: false,
                                            Height: '98%',
                                            Width: '98%'
                                        },
                                        Resource: {
                                            Text: objTextResource,
                                            SkinPath: JConfiguration.ExtranetSkinPath
                                        },
                                        Events: {
                                        },
                                        CallBacks: {
                                        }
                                    });
                                }}
                                >{objTextResource.Submit}</button>
                            }
                            </div>
                        </div>
                    </div>
                );
            });

            return arrElements;
        }
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningJournal_ModuleProcessor.StoreMapList()))(LearningJournal);

// /**
//  * @name ModuleProcessor
//  * @summary Adding the Module_Processsor to export(for Prefetch)
//  */
// export const ModuleProcessor = LearningJournal_ModuleProcessor; 