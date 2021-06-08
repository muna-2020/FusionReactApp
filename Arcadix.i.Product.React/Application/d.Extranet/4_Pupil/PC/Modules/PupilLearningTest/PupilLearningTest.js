//React imports
import { connect } from 'react-redux';
import React, { useReducer } from 'react';

//Module specific imports
import * as PupilLearningTest_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTest_Hook';
import PupilLearningTest_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTest_ModuleProcessor';

//Components used in module.
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import imgRocket from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/rocket.svg?inline';
import imgProcess from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/process.svg?inline';
import imgCheck from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/check.svg?inline';
import imgZoom from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/Zoom.svg?inline';

/**
* @name PupilLearningTest
* @param {object} props props
* @summary This component displays the PupilLearningTest data.
* @returns {object} div that encapsulated the components with PupilLearningTest details.
*/
const PupilLearningTest = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilLearningTest_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilLearningTest", ["PupilLearningTest_ModuleProcessor"]: new PupilLearningTest_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilLearningTest_ModuleProcessor.Initialize(objContext, objContext.PupilLearningTest_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in PupilLearningTest_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilLearningTest_Hook.Initialize(objContext);

    /**
    * @name GetTestElements
    * @param {Array} arrFormatedData Formatted Test Data
    * @param {object} objTextResource Text Resource
    * @summary Forms the jsx tr of the Test elements
    * @returns {object} jsx, tr
    */
    function GetTestElements(arrFormatedData, objTextResource) {
        let dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let arrElements = arrFormatedData.map(test => {
            return (<tr className="worktable-row" key={test.uTestId}
                onClick={() => {
                    if (test.objStatus.strSatus == 'Started' || test.objStatus.strSatus == 'NotStarted') {
                        objContext.PupilLearningTest_ModuleProcessor.OpenTestPopUp(objContext, test, objTextResource);
                    }
                }}
            >
                <td>{test.vTestName}</td>
                <td>{(new Date(test.dtCreatedOn)).toLocaleDateString('de-DE', dateOptions)}</td>
                <td>{test.vSubjectName}</td>
                <td>{test.vModeText} {test.vRoundDetails}</td>
                <td>
                    <div className="step">
                        {test.objStatus.strSatus == 'NotStarted' ?
                            <img src={imgRocket} alt="" /> : ''}
                        {test.objStatus.strSatus == 'Started' || test.objStatus.strSatus == 'NotCompleted' ?
                            <img src={imgProcess} alt="" /> : ''}
                        {test.objStatus.strSatus == 'Completed' ?
                            <img src={imgCheck} alt="" /> : ''}
                        {objContext.PupilLearningTest_ModuleProcessor.GetStatusText(objTextResource, test.objStatus.strSatus)}
                    </div>
                </td>
                <td>{test.iNumberOfAttempts}</td>
                <td>
                    {
                        test.objStatus.strSatus == 'Completed' || test.objStatus.strSatus == 'NotCompleted' ?
                            <label onClick={(e) => {
                                e.stopPropagation();
                                if ((test.iTestUsageId == 2 || test.iTestUsageId == '2') && test.cIsSystemGenerated == 'N') {//for low stake
                                    objContext.PupilLearningTest_ModuleProcessor.OpenStatisticsPopup(objContext, test, objTextResource, true);
                                } else {
                                    objContext.PupilLearningTest_ModuleProcessor.OpenStatisticsPopup(objContext, test, objTextResource);
                                }
                            }}>{Localization.TextFormatter(objTextResource, 'OpenStatistics')}</label>
                            : <img className="clsZoomIcon" src={imgZoom}
                                title={Localization.TextFormatter(objTextResource, 'ZoomIconTitle')} onClick={() => { objContext.PupilLearningTest_ModuleProcessor.OpenTestPopUp(objContext, test, objTextResource); }} />
                    }
                </td>
            </tr >);
        });
        return arrElements;
    }

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, div
    */
    const GetContent = () => {
        let strCycleTypeId = objContext.PupilLearningTest_ModuleProcessor.GetCycleTypeId();
        let iStateId = objContext.PupilLearningTest_ModuleProcessor.GetStateId(props);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilLearningTest", props);//objContext.PupilLearningTest_ModuleProcessor.GetTextResource();
        let arrAllSubjects = [];
        if (DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")) {
            arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"];
        }


        let arrExtranetTest = [];
        if (state.arrExtranetTest == undefined)
            arrExtranetTest = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + state.strClassId + ";uPupilId;" + props.ClientUserDetails.UserId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + state.strSchoolYearPeriodId)["Data"];
        else
            arrExtranetTest = [...state.arrExtranetTest];
        let arrTestLoginResult = [];
        if (DataRef(props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uPupilId;" + props.ClientUserDetails.UserId + ";iStateId;" + iStateId)) {
            arrTestLoginResult = DataRef(props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uPupilId;" + props.ClientUserDetails.UserId + ";iStateId;" + iStateId)["Data"];
        }

        let objMaxRoundDetails = {};
        if (DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;NumberOfRepetitionForSystemGeneratedTest")) {
            objMaxRoundDetails = DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;NumberOfRepetitionForSystemGeneratedTest")["Data"][0];
        }
        let arrFormatedData = objContext.PupilLearningTest_ModuleProcessor.GetFormatedData(objContext, arrExtranetTest, arrAllSubjects, arrTestLoginResult, objMaxRoundDetails, objTextResource);
        let strWeekDisplayTitle = objContext.PupilLearningTest_ModuleProcessor.GetWeekDisplayTitle(objContext, objTextResource);

        return (
            <div id="WorkTestComponent">
                <hr className="hr top" id="hrTop" />
                <div className="worktest-wrapper">
                    <div className="work-table-section">

                        <div className="pupil-table-header-flex pupil-headerborder" id="NavigationSecondaryMenu">
                            <div className="subflex-left">
                                <div className="pupil-subflex">
                                    <div className="label-text">
                                        <span className="label">{Localization.TextFormatter(objTextResource, 'Subject')}:</span>
                                    </div>
                                    <div className="pupil-dropdown">
                                        <PerformanceProfiler ComponentName={"PupilLearningTest_Subject"} JConfiguration={props.JConfiguration} >
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"PupilLearningTest_Subject"}
                                                Meta={objContext.PupilLearningTest_ModuleProcessor.GetSubjectDropdownMetaData()}
                                                Data={objContext.PupilLearningTest_ModuleProcessor.GetSubjectDropdownData(objContext, arrAllSubjects)}
                                                Resource={objContext.PupilLearningTest_ModuleProcessor.GetResourceData(objTextResource)}
                                                Events={objContext.PupilLearningTest_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                </div>

                                <div className="pupil-subflex">
                                    <div className="label-text">
                                        <span className="label">{Localization.TextFormatter(objTextResource, 'SubSubject')}:</span>
                                    </div>
                                    <div className="pupil-dropdown">
                                        <PerformanceProfiler ComponentName={"PupilLearningTest_SubSubject"} JConfiguration={props.JConfiguration} >
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"PupilLearningTest_SubSubject"}
                                                Meta={objContext.PupilLearningTest_ModuleProcessor.GetSubSubjectDropdownMetaData()}
                                                Data={objContext.PupilLearningTest_ModuleProcessor.GetSubSubjectDropdownData(objContext)}
                                                Resource={objContext.PupilLearningTest_ModuleProcessor.GetResourceData(objTextResource)}
                                                Events={objContext.PupilLearningTest_ModuleProcessor.GetSubSubjectDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                </div>

                                <div className="pupil-subflex">
                                    <div className="label-text">
                                        <span className="label">{Localization.TextFormatter(objTextResource, 'Modes')}:</span>
                                    </div>
                                    <div className="pupil-dropdown">
                                        <PerformanceProfiler ComponentName={"PupilLearningTest_Modes"} JConfiguration={props.JConfiguration} >
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"PupilLearningTest_Modes"}
                                                Meta={objContext.PupilLearningTest_ModuleProcessor.GetModesDropdownMetaData()}
                                                Data={objContext.PupilLearningTest_ModuleProcessor.GetModesDropdownData(objContext)}
                                                Resource={objContext.PupilLearningTest_ModuleProcessor.GetResourceData(objContext)}
                                                Events={objContext.PupilLearningTest_ModuleProcessor.GetModesDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                </div>
                            </div>

                            <div className="subflex-right">
                                <button className="save-button" onClick={() => { objContext.PupilLearningTest_ModuleProcessor.OnClickSearch(objContext); }}> {Localization.TextFormatter(objTextResource, 'SearchButtonText')}</button>
                            </div>
                        </div>

                        <div className="work-tableblock">
                            <div className="table-header" id="TableHeader">
                                <h3>{strWeekDisplayTitle}</h3>
                                <div style={{ display: "inline-block" }}>
                                    <PerformanceProfiler ComponentName={"PupilLearningTest_WeekDisplay"} JConfiguration={props.JConfiguration} >
                                        <WeekDisplay
                                            Id={"PupilLearningTest_WeekDisplay"}
                                            JConfiguration={props.JConfiguration}
                                            OnChangeDisplay={(objItem) => { objContext.PupilLearningTest_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem); }}
                                            backgroundColor="rgba(62, 204, 80, 0.64)"
                                        />
                                    </PerformanceProfiler>
                                </div>
                            </div>

                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="PupilLearningTest_FillHeight" Meta={{ HeaderIds: ["PupilHeader", "NavigationSecondaryMenu", "TableHeader", "hrTop", "hrBottom"], FooterIds: ["bottomSpacing", "bgFooter"] }} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                                <table>
                                    <tbody>
                                        {arrFormatedData && arrFormatedData.length > 0 ? <React.Fragment>
                                            <tr className="row-header">
                                                <td>{Localization.TextFormatter(objTextResource, 'Name')}</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Date')}</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Subject')}</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Modes')}</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Step')}</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Tries')}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            {GetTestElements(arrFormatedData, objTextResource)}
                                        </React.Fragment> :
                                            <React.Fragment>
                                                <div className="error-block">{Localization.TextFormatter(objTextResource, 'NoTestDataMessage')}</div>
                                            </React.Fragment>
                                        }
                                    </tbody>
                                </table>
                            </WrapperComponent>
                            <div id="InternalBottomSpacing" />
                        </div>
                    </div>

                    <div className="bgFooter" id="bgFooter" />
                </div>
                <hr className="hr bottom" id="hrBottom" />
            </div>
        );
    };

    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name Connector
* @summary connects component to store.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilLearningTest_ModuleProcessor.StoreMapList()))(PupilLearningTest);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilLearningTest_ModuleProcessor;