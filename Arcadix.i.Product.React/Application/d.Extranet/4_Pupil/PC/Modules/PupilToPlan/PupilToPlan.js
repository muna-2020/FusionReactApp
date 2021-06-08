//React related imports.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PupilToPlan_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_Hook';
import PupilToPlan_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_ModuleProcessor';

//Components used in module.
import { TextFormatter } from '@root/Framework/Blocks/Localization/Localization';
import DayDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/DayDisplay/DayDisplay";
import EventsTable from '@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilSubPlan/EventsTable';
import EventSectionTable from '@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilSubPlan/EventSectionTable';

/**
* @name PupilToPlan
* @param {object} props props
* @summary This component displays the PupilToPlan data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with PupilToPlan details.
*/
const PupilToPlan = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilToPlan_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilToPlan", ["PupilToPlan_ModuleProcessor"]: new PupilToPlan_ModuleProcessor() };

    useEffect(() => {
        return () => {
            ApplicationState.SetProperty("DisplayFor", undefined);
        }
    }, [])

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilToPlan_ModuleProcessor.Initialize(objContext, objContext.PupilToPlan_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TeacherProfile_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilToPlan_Hook.Initialize(objContext);

    function GetContent(props) {
        let objTextResource = state.objTextResource;
        const arrDropdownData = [
            {
                Key: "Day",
                Value: 1
            },
            {
                Key: "Week",
                Value: 2
            }
        ];
        return (
            <div className="pupilparent-wrapper" id="PupilToPlanaComponent">
                <div className="toplan-border" id="NavigationSecondaryMenu" />
                <div className="pupil-table-section">
                    <div className="pupilplan-content" id="PupilPlanContent">
                        <div className="eventHeader">
                            <div className="calender-selector">
                                <div className="calender">
                                    <PerformanceProfiler ComponentName={"PupilToPlanDayDisplay"} JConfiguration={props.JConfiguration} >
                                        <DayDisplay Id="PupilToPlanDayDisplay" JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.PupilToPlan_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem); }} backgroundColor="rgba(62, 204, 80, 0.64)" />
                                    </PerformanceProfiler>
                                </div>
                                <div className="today-date">
                                    <button className="pupil-toplan-darkgreen-button" onClick={() => { objContext.PupilToPlan_ModuleProcessor.OnClickGetCurrentDate(objContext); }}>{TextFormatter(objTextResource, 'Today')}</button>
                                </div>
                            </div>
                            <div className="event-tab-toggler">
                                <ul>
                                    <li><span className={state.strType == 'Day' ? 'pupil-toplan-darkgreen-button' : 'pupil-toplan-lightgreen-button'} onClick={(event) => { objContext.PupilToPlan_ModuleProcessor.OnChangeDisplay(objContext, arrDropdownData[0], 'Day'); }}>{TextFormatter(objTextResource, 'Day')}</span></li>
                                    <li><span className={state.strType == 'Week' ? 'pupil-toplan-darkgreen-button' : 'pupil-toplan-lightgreen-button'} onClick={(event) => { objContext.PupilToPlan_ModuleProcessor.OnChangeDisplay(objContext, arrDropdownData[1], 'Week'); }}>{TextFormatter(objTextResource, 'Week')}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="PupilToPlan_FillHeight" Meta={{ HeaderIds: ["PupilHeader", "NavigationSecondaryMenu", "PupilPlanContent"], FooterIds: ["bottomSpacing", "BgFooter"] }} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                        <div className="toplancontent">
                            {
                                (state.dateComponentLoaded && state.initialDataLoaded) ?
                                    state.strType == 'Day' ?
                                        <PerformanceProfiler ComponentName={"PupilToPlanEventsTable"} JConfiguration={props.JConfiguration} >
                                            <EventsTable
                                                Id="PupilToPlanEventsTable"
                                                arrData={state.arrEventDisplayData}
                                                objCurrentDay={state.objCurrentDay ?
                                                    state.objCurrentDay :
                                                    { strDayShortCutName: "", iDayNumber: "", iMonthNumber: "" }}
                                                arrSAOptionData={state.arrSAOptionData}
                                                arrReviewCriteriaData={state.arrReviewCriteriaData}
                                                strClassId={state.strClassId} strPupilId={ClientUserDetails.UserId}
                                                objTextResource={objTextResource}
                                                pupilName={props.ClientUserDetails.UserName}
                                                objContext={objContext}
                                            />
                                        </PerformanceProfiler>
                                        :
                                        <PerformanceProfiler ComponentName={"PupilToPlanEventSectionTable"} JConfiguration={props.JConfiguration} >
                                            <EventSectionTable
                                                Id="PupilToPlanEventSectionTable"
                                                arrData={state.arrEventSectionData}
                                                arrWeekDayMonth={state.arrWeekDayMonth}
                                                arrSAOptionData={state.arrSAOptionData}
                                                arrReviewCriteriaData={state.arrReviewCriteriaData}
                                                strClassId={state.strClassId}
                                                strPupilId={ClientUserDetails.UserId}
                                                objTextResource={objTextResource}
                                                pupilName={props.ClientUserDetails.UserName}
                                                objContext={objContext} />
                                        </PerformanceProfiler>
                                    : ''
                            }
                        </div>
                    </WrapperComponent>
                </div>
                <div className="bgfooter" id="BgFooter" />
            </div>
        );
    }
    return props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilToPlan_ModuleProcessor.StoreMapList()))(PupilToPlan);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilToPlan_ModuleProcessor;