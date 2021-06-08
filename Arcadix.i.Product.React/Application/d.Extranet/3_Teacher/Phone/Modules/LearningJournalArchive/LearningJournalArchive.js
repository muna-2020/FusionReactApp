//React related imports.
import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as LearningJournalArchive_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournalArchive/LearningJournalArchive_Hook';
import LearningJournalArchive_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournalArchive/LearningJournalArchive_ModuleProcessor';

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

/**
* @name LearningJournalArchive
* @param {object} props props
* @summary This component displays the LearningJournalArchive data.
* @returns {object} div that encapsulated the LearningJournalArchive div with its details.
*/
const LearningJournalArchive = (props) => {
    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningJournalArchive_Hook.GetInitialState(props));

    const [accordion, openAccordian] = useState(1);

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["LearningJournalArchive_ModuleProcessor"]: new LearningJournalArchive_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.LearningJournalArchive_ModuleProcessor.Initialize(objContext, objContext.LearningJournalArchive_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LearningJournalArchive_Hook, that contains all the custom hooks.
    * @returns null
    */
    LearningJournalArchive_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournalArchive", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        let arrClassData = objContext.LearningJournalArchive_ModuleProcessor.GetClassDropDownData(objContext).arrFinalClassData;
        let arrClassRawData = objContext.LearningJournalArchive_ModuleProcessor.GetClassDropDownData(objContext).arrClassData;
        let objClass = state.objClass ? state.objClass : arrClassRawData.find(cls => cls["uClassId"] == strClassId);
        let objAllSubject = {
            iSubjectId: -1,
            t_TestDrive_Subject_Data: [{
                vSubjectName: objTextResource["AllText"],
                iLanguageId: props.JConfiguration.InterfaceLanguageId
            }]
        }
        let arrIntranetSubjects = [];
        let arrSchoolSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")) {
            arrIntranetSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"]
        }
        if (DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")) {
            arrSchoolSubjects = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"];
        }
        let arrSubjects = [objAllSubject, ...arrIntranetSubjects, ...arrSchoolSubjects];
        let arrWeekDisplayDropdownData = objContext.LearningJournalArchive_ModuleProcessor.GetWeekDisplayDropdownData(objContext);
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
        if (arrAllTopicData && arrAllTopicData.length > 0) {
            arrTopicData = arrAllTopicData.filter(tpc => tpc["t_LearnCoacher_LearningJournal_Pupil_CommentFeedback"].find(fdbck => fdbck["cIsByTeacher"] == 'Y') != undefined &&
                tpc["t_LearnCoacher_LearningJournal_Pupil_CommentFeedback"].find(fdbck => fdbck["cIsByPupil"] == 'Y') != undefined)
        }
        let arrSegmentData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")) {
            arrSegmentData = DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
        }

        if (state.blnDateFilterCalled) {
            objContext.LearningJournalArchive_ModuleProcessor.GetDataByFilters(objContext, arrTopicData, arrSegmentData, arrSubjects, arrClassRawData, arrTimeTableClassTime, arrTimeTableDay)
        }
        let arrReviewCriteriaData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)) {
            arrReviewCriteriaData = DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"];
        }

        return (
            <div className="learnjournal-archive">
                {/*Title head section*/}

                <div className="learnjournal-archive-title">
                    <div className="learnjournal-archive-title-left">
                        <span className="heading-left">Learnjournal</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/arrow-pointing-to-right.svg")}
                        />
                        <span className="menu-title">Protokoll</span>
                    </div>
                    <div className="learnjournal-archive-title-right">
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                        />
                    </div>
                </div>

                {/*Top head dropdown section*/}

                <div className="top-head">
                    <div className="dropdown-main-wrapper">
                        <div className="learnjournal-archive-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                            <div className="learnjournal-archive-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournalArchiveClassDropDown"} JConfiguration={props.JConfiguration} >
                                    <ClassDropDown
                                        id="LearningJournalArchiveClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.LearningJournalArchive_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        <div className="learnjournal-archive-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'PupilLabel')}:</span>
                            <div className="learnjournal-archive-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournalArchive_Pupil"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournalArchive_Pupil"}
                                        Meta={objContext.LearningJournalArchive_ModuleProcessor.GetPupilDropdownMetaData()}
                                        Data={objContext.LearningJournalArchive_ModuleProcessor.GetPupilDropdownData(objContext)}
                                        Resource={objContext.LearningJournalArchive_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournalArchive_ModuleProcessor.GetPupilDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>



                    </div>

                    <div className="dropdown-main-wrapper">
                        <div className="learnjournal-archive-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubjectLabel')}:</span>
                            <div className="learnjournal-archive-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournalArchive_Subject"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournalArchive_Subject"}
                                        Meta={objContext.LearningJournalArchive_ModuleProcessor.GetSubjectDropdownMetaData()}
                                        Data={objContext.LearningJournalArchive_ModuleProcessor.GetSubjectDropdownData(objContext, arrSubjects)}
                                        Resource={objContext.LearningJournalArchive_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournalArchive_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        {/* <div className="learnjournal-archive-dropdown-wrapper">
                            <span className="dropdown-label">Lernende:</span>
                            <div className="learnjournal-archive-dropdown">
                                <span>Horen</span>
                                <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                />
                            </div>
                        </div> */}



                    </div>


                    <div className="dropdown-main-wrapper">
                        {/* <div className="learnjournal-archive-dropdown-wrapper">
                            <span className="dropdown-label">Klasse:</span>
                            <div className="learnjournal-archive-dropdown">
                                <span>Horen</span>
                                <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                />
                            </div>
                        </div> */}
                        <button className="green-btn" onClick={() => { objContext.LearningJournalArchive_ModuleProcessor.GetDataByFilters(objContext, arrTopicData, arrSegmentData, arrSubjects, arrClassRawData, arrTimeTableClassTime, arrTimeTableDay) }}> {Localization.TextFormatter(objTextResource, 'SearchButtonText')}</button>
                    </div>
                </div>

                {/*main wrapper starts here*/}

                <div className="learnjournal-archive-main-wrapper">

                    <div className="action-block">
                        <span className="wrapper-top-heading">{Localization.TextFormatter(objTextResource, 'LernjournalarchiveHeadingText')} (0)</span>
                        {/* <div className="action-block-dropdown">
                            <span>Aktive Aufgabensets</span>
                            <img
                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                            />
                        </div> */}
                    </div>


                    {/* MULTISELECT DATA BLOCK STARTS HERE */}
                    <div className="multiselect-container">
                        <div className="multiselect-left">
                            {/* <div className="multiselect">
                                <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_left.png")}
                                />
                            </div>
                            <div className="multiselect-text">
                                <span>Schuljahr: 1.8.2020 - 31.7.2021</span>
                            </div>
                            <div className="multiselect">
                                <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_right.png")}
                                />
                            </div> */}
                            <PerformanceProfiler ComponentName={"LearningJournalArchive_WeekDisplay"} JConfiguration={props.JConfiguration} >
                                <WeekDisplay Id={"LearningJournalArchive_WeekDisplay"} JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.LearningJournalArchive_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }} backgroundColor="rgb(229, 194, 205)" />
                            </PerformanceProfiler>
                        </div>

                        <div className="multiselect-right">
                            <div className="multiselect-dropdown">
                                <PerformanceProfiler ComponentName={"LearningJournalArchive_WeekDisplayDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningJournalArchive_WeekDisplayDropdown"}
                                        Meta={objContext.LearningJournalArchive_ModuleProcessor.GetWeekDisplayDropdownMetaData()}
                                        Data={{
                                            DropdownData: arrWeekDisplayDropdownData,
                                            SelectedValue: ApplicationState.GetProperty("DisplayFor") ? ApplicationState.GetProperty("DisplayFor") : arrWeekDisplayDropdownData[2]["Value"]
                                        }}
                                        Resource={objContext.LearningJournalArchive_ModuleProcessor.GetResourceData()}
                                        Events={objContext.LearningJournalArchive_ModuleProcessor.GetWeekDisplayDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                    </div>

                    {/* MULTISELECT DATA BLOCK ENDS HERE */}


                    {/*Task accordian section starts here*/}
                    {state.arrDisplayData.length > 0 ?
                        GetElements(arrReviewCriteriaData, arrSAOption, objTextResource)
                        : <div className="empty-test-message"><span>{Localization.TextFormatter(objTextResource, 'EmptyDataMessage')}</span></div>
                    }
                </div>

                {/*footer starts here*/}

                {/* <div className="learnjournal-archive-footer">
                    <button>Anwenden</button>
                </div> */}

            </div>
        );

        /**
        * @name GetElements
        * @param {Array} arrReviewCriteriaData Passes ReviewCriteriaData
        * @param {Array} arrSAOption Passes Strength Assessment Option
        * @param {Object} objTextResource Passes TextResource
        * @summary Forms the jsx for the elements.
        * @returns {object} jsx, React.Fragment
        */
        function GetElements(arrReviewCriteriaData, arrSAOption, objTextResource) {
            let arrElements = state.arrDisplayData.map((item, intIndex) => {
                let blnShowAccordion = state.intSelectedAccordionIndex == -1? false : state.intSelectedAccordionIndex == intIndex || state.intSelectedAccordionIndex == 0 && intIndex == 0 
                return (
                    <div className="task-accordian-main-wrapper">
                        <div className="task-accordian-header" onClick={() => {
                            // accordion == 1 ? openAccordian(0) : openAccordian(1);
                            objContext.LearningJournalArchive_ModuleProcessor.SetAccordionIndex(objContext, intIndex)
                            }}>
                            <div className="task-accordian-header-left-content">
                                <span title="Deutsch-Lesen">{Localization.TextFormatter(objTextResource, 'FirstName')}: <b>{item.vFirstName}</b></span>
                                <span title="11.01.2021">{Localization.TextFormatter(objTextResource, 'SubjectLabel')}: <b>{item.objSubject["t_TestDrive_Subject_Data"][0].vSubjectName}</b></span>
                            </div>

                            <div className="task-accordian-header-right-content">
                                {/* <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/process.svg")}
                                /> */}
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
                                        <td colspan="2">{item.vName}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</td>
                                        <td colspan="2">{item.arrTopic[0].objClass.vClassName}</td>
                                    </tr>

                                   
                                </tbody>
                            </table>
                            <div className="table-footer-button">                               
                                <button
                                    onClick={() => {
                                        Popup.ShowPopup({
                                            Data: {
                                                objItem: item,
                                                arrReviewCriteriaData: arrReviewCriteriaData,
                                                arrSAOption: arrSAOption,
                                                strTeacherName: props.ClientUserDetails.Name,
                                                objClass: objClass,
                                                Object_Extranet_Teacher_Topic: props.Object_Extranet_Teacher_Topic
                                            },
                                            Meta: {
                                                PopupName: 'ArchiveData',
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
                                > {Localization.TextFormatter(objTextResource, 'Show')}</button>
                            </div>
                        </div>
                    </div>
                )
            })
            return arrElements;
        }
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment/>;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningJournalArchive_ModuleProcessor.StoreMapList()))(LearningJournalArchive);

// /**
//  * @name ModuleProcessor
//  * @summary Adding the Module_Processsor to export(for Prefetch)
//  */
// export const ModuleProcessor = LearningJournalArchive_ModuleProcessor; 