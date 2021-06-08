//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PupilThink_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink_Hook';
import PupilThink_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink_ModuleProcessor';

//Components used in module.
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import imgCheckBlue from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/check_blue.svg?inline';
import imgNachdenkenBlack from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/nachdenken_black.svg?inline';
import imgNachdenkenWhitebg from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/nachdenken_whitebg.svg?inline';
import imgComment from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/comment.svg?inline';

/**
* @name PupilThink
* @param {object} props props
* @summary This component displays the PupilThink data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with PupilThink details.
*/
const PupilThink = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilThink_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["PupilThink_ModuleProcessor"]: new PupilThink_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilThink_ModuleProcessor.Initialize(objContext, objContext.PupilThink_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TeacherProfile_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilThink_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = state.objTextResource;
        let arrTopicData = DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + state.strClassId)["Data"];
        let arrDisplayData = [];
        if (state.objSelectedSchoolYear)
            arrDisplayData = objContext.PupilThink_ModuleProcessor.FormDisplayData(objContext, arrTopicData);
        return (
            <div className="pupilparent-wrapper">
                <div className="toplan-border" id="NavigationSecondaryMenu" />
                <div className="pupil-table-section">

                    <div className="pupilthink-content" id="PupilThinkHeader">
                        <div className="eventHeader">
                            <div className="calender-selector">
                                <div className="calender">
                                    <PerformanceProfiler ComponentName={"PupilThinkWeekDisplay"} JConfiguration={props.JConfiguration} >
                                        <WeekDisplay Id="PupilThinkWeekDisplay" JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.PupilThink_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem); }} backgroundColor="rgba(62, 204, 80, 0.64)" />
                                    </PerformanceProfiler>
                                </div>
                                {/** <div className="today-date">
                                        <span className="pupil-toplan-darkgreen-button">Heute</span>
                                    </div>
                                **/}
                            </div>
                            {/** 
                                <div className="event-tab-toggler">
                                    <ul>
                                        <li><span className="pupil-toplan-lightgreen-button" onClick={(e) => ShowEventSectionTable(e)}>Tag</span></li>
                                        <li><span className="pupil-toplan-darkgreen-button" onClick={(e) => ShowEventsTable(e)}>Woche</span></li>
                                    </ul>
                                </div>
                            **/}
                        </div>
                    </div>

                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="PupilThink_FillHeight" Meta={{ HeaderIds: ["PupilHeader", "NavigationSecondaryMenu", "PupilThinkHeader"], FooterIds: ["bottomSpacing", "bgFooter"] }} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                        <div className="table-block">
                            {arrDisplayData.length === 0 ?
                                <div className="pupil-think-no-data">{Localization.TextFormatter(objTextResource, 'PupilThinkNoData')}</div>
                                :
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>{Localization.TextFormatter(objTextResource, 'Date')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Subject')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'PlannedWork')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'ThinkAndEdit')}</th>
                                        </tr>
                                        {GetElements()}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </WrapperComponent>
                </div>
                <div className="bgFooter" id="bgFooter" />
            </div>
        );

        function GetElements() {
            let arrDisplayElements = arrDisplayData.map(itm => {
                let strFeedbackText = itm.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0] ? itm.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0].tComment : undefined;
                return (
                    <tr>
                        <td>{itm.objDay["t_LearnCoacher_Planner_TimeTable_Day_Data"][0].vTimeTableDayShortName}.{+ " " + itm.dtTopicDate}</td>
                        <td> {itm.objSubject.t_TestDrive_Subject_Data[0].vSubjectName} </td>
                        <td>
                            <div className="geplante-arbeiten-lists">
                                {itm.vTopicDescription}
                            </div>
                        </td>
                        <td>
                            <ul className="nachdenken-bearbeiten-buttons">
                                <li>
                                    {!itm.cIsTeacherCommented ?
                                        <span className="pupil-green-button andern-button" onClick={() => { OpenTopicPopup(itm); }}>
                                            {objTextResource.ToChange}
                                        </span>
                                        : ''
                                    }
                                </li>
                                <li>
                                    <span className={itm.cIsTeacherCommented && strFeedbackText ? "pupil-green-button nachdenken-button light-green-bg" : "pupil-green-button nachdenken-button"} onClick={() => { OpenTaskPopup(itm); }}>
                                        {itm.cIsTeacherCommented && strFeedbackText ? <img src={imgNachdenkenBlack} alt="" /> :
                                            <img src={imgNachdenkenWhitebg} alt="" />}
                                        {objTextResource.ThinkTopic}
                                    </span>
                                    {strFeedbackText ?
                                        <img src={imgCheckBlue} alt="" />
                                        : ''}

                                    {itm.cIsTeacherCommented ?
                                        <img src={imgComment} alt="" />
                                        : ''}
                                </li>
                            </ul>
                        </td>

                    </tr>
                );
            });
            return arrDisplayElements;
        }

        /**
        * @name OpenTopicPopup
        * @param {object} objTopic Topic
        * @summary Opens the Topic popup
        */
        function OpenTopicPopup(objTopic) {
            let arrDateData = objTopic.dtTopicDate.split('-');
            let objDate = {
                iDayNumber: arrDateData[2],
                iMonthNumber: arrDateData[1],
                iYearNumber: arrDateData[0]
            };
            let objDay = {
                ...objTopic.objDay,
                objTopic: objTopic,
                objSubject: objTopic.objSubject,
                objSegment: objTopic.objSegment
            };

            Popup.ShowPopup({
                Data: {
                    objTime: objTopic.objTime,
                    objDay: objDay,
                    objDate: objDate,
                    arrSAOptionData: state.arrSAOptionData,
                    arrReviewCriteriaData: state.arrReviewCriteriaData,
                    strClassId: state.strClassId,
                    strPupilId: ClientUserDetails.UserId,
                    pupilName: ClientUserDetails.Name,
                    objContext: objContext,
                    Object_Extranet_Teacher_Topic: props.Object_Extranet_Teacher_Topic
                },
                Meta: {
                    PopupName: 'PupilToPlan_PopUp',
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "98%",
                    Width: "98%"
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
        }

        /**
        * @name OpenTopicPopup
        * @param {object} objTopic Topic
        * @summary Opens the Topic popup
        */
        function OpenTaskPopup(objTopic) {
            let objDay = {
                ...objTopic.objDay,
                objTopic: objTopic,
                objSubject: objTopic.objSubject,
                objSegment: objTopic.objSegment
            };
            let objSegment = objDay.objSegment;
            let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
            let objCurrentSchoolYearPeriod = arrSchoolYearPeriodData.filter(x =>
                new Date(x["dtFromDate"]) < new Date() &&
                new Date(x["dtToDate"]) > new Date()
            );
            let blnCurrentSchoolYear = false;
            if (objSegment["uSchoolYearPeriodId"] == objCurrentSchoolYearPeriod["uSchoolYearPeriodId"]); {
                blnCurrentSchoolYear = true;
            }

            Popup.ShowPopup({
                Data: {
                    arrSAOptionData: state.arrSAOptionData,
                    arrReviewCriteriaData: state.arrReviewCriteriaData,
                    objTopic: objTopic,
                    objTime: objTopic.objTime,
                    objSubject: objTopic.objSubject,
                    objTextResource: objTextResource,
                    pupilName: props.ClientUserDetails.UserName,
                    blnCurrentSchoolYear: blnCurrentSchoolYear,
                    Object_Extranet_Teacher_Topic: props.Object_Extranet_Teacher_Topic,
                    objDay: objTopic.objDay
                },
                Meta: {
                    PopupName: 'PupilTaskPage',
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "98%",
                    Width: "98%"
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
        }
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

///**
//* @name DynamicStyles
//* @param {object} props props
//* @summary Required for css
//* @returns {object} arrStyles
//*/
//PupilThink.DynamicStyles = () => {
//    return [
//        JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilThink/PupilThink.css",
//        JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css"
//    ];
//};

///**
//* @name InitialDataParams
//* @param {object} props props
//* @summary Required for SSR
//* @returns {object} InitialDataParams
//*/
//PupilThink.InitialDataParams = (props) => {
//    return (new ObjectQueue()).Queue((new PupilThink_ModuleProcessor()).InitialDataParams(props));
//};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilThink_ModuleProcessor.StoreMapList()))(PupilThink);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilThink_ModuleProcessor;