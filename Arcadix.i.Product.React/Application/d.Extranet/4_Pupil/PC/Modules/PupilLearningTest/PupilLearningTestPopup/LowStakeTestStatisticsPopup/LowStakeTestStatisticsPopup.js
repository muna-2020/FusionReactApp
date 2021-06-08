//React imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//module imports
import * as LowStakeTestStatistics_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/LowStakeTestStatisticsPopup/LowStakeTestStatistics_Hook';
import LowStakeTestStatistics_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/LowStakeTestStatisticsPopup/LowStakeTestStatistics_ModuleProcessor';

//Inline Images import
import imgEditArbeiten from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/LowStakeTestStatisticsPopup/edit_arbeiten.svg?inline';
import imgCloseText from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/LowStakeTestStatisticsPopup/closeText.svg?inline';
import imgTestPreview from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/LowStakeTestStatisticsPopup/TestPreview.svg?inline';

/**
* @name PupilLearningTestStatistics
* @param {object} props Passes props
* @summary statistics component.
* @returns {object} jsx, div
*/
const PupilLearningTestStatistics = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LowStakeTestStatistics_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["LowStakeTestStatistics_ModuleProcessor"]: new LowStakeTestStatistics_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.LowStakeTestStatistics_ModuleProcessor.Initialize(objContext, objContext.LowStakeTestStatistics_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LowStakeTestStatistics_Hook, that contains all the custom hooks.
    * @returns null
    */
    LowStakeTestStatistics_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, div
    */
    const GetContent = () => {
        let objTest = props.Data.objTest;
        let objTextResource = props.Resource.Text;
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

        return (
            <div className="progress-wrapper" id="ProgressWrapper">
                <div className="progress-content">
                    <div className="exercise-header" id="ExerciseHeader">
                        <div className="leftblock">
                            <span className="leftblock-title">{Localization.TextFormatter(objTextResource, 'Learn')}: {objTest.vTestName}</span> <br />
                            <span className="leftblock-date">{(new Date(objTest.dtCreatedOn)).toLocaleDateString('de-DE', dateOptions)}</span>
                        </div>
                        <span className="edit-icon">
                            <img src={imgEditArbeiten} alt="" />
                        </span>
                        <span className="close-block" onClick={e => Popup.ClosePopup(props.Id)}>
                            <img src={imgCloseText} alt="" />
                        </span>
                    </div>

                    <div className="progress-content-block">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="PupilLearningTestStatistic_FillHeight" Meta={{ HeaderIds: ["ExerciseHeader", "ContentHeader"], FooterIds: ["ExerciseFooter"], }} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                            <div className="content-header" id="ContentHeader">
                                Auswertung
                            </div>

                            <div className="works-table-section">
                                <span className="table-header"> {Localization.TextFormatter(objTextResource, 'Tasks')}</span>
                                <div className="table-block">
                                    <div className="left-table-block">
                                        <table>
                                            <tr className="row-header">
                                                <td>&nbsp;</td>
                                                <td>{Localization.TextFormatter(objTextResource, 'Difficulty')}</td>
                                                <td colspan="7">{Localization.TextFormatter(objTextResource, 'Passage')}</td>
                                            </tr>

                                            <tr className="row-header rows">
                                                <td>
                                                    <div className="radio-button-block">
                                                        <span className="radio-button-fields pl-2">{Localization.TextFormatter(objTextResource, 'AllTasks')}</span>
                                                    </div>
                                                </td>
                                                <td />
                                                <td>Richtig</td>
                                                <td>Falsch</td>
                                                <td>Offen</td>
                                            </tr>
                                            {GetTaskElements()}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </WrapperComponent>
                    </div>

                    <div className="progress-footer" id="ExerciseFooter">  {/*footer id*/}
                        <div className="footer-section">
                            <span className="footerclose-button pupil-green-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'ShutDown')}</span>
                        </div>
                    </div>
                </div>
            </div>
        );

        /**
        * @name GetTaskElements
        * @summary Forms the jsx tr of the Task elements
        * @returns {object} jsx, tr
        */
        function GetTaskElements() {
            let { objTest } = objContext.props.Data
            let arrTaskElements = DataRef(objContext.props.Extranet_Pupil_PupilLearningTestStatistics_Module, "Extranet_Pupil_PupilLearningTestStatistics_Module;uTestId;" + objTest.uTestId)["Data"].map(tsk => {
                return (
                    <tr className="rows task-list">
                        <td>
                            <div className="radio-button-block">
                                <span className="radio-button-fields">
                                    <img src={imgTestPreview} alt="" onClick={() => { objContext.LowStakeTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                                    <a> {tsk.PageName}</a>
                                </span>
                            </div>
                        </td>
                        <td> {tsk.DifficultyLevelId} </td>
                        <td className="circle-block">
                            <div className={tsk.Rep1 === "bubble-circle green" ? "bubble-circle green" : ""} onClick={() => { objContext.LowStakeTestStatistics_ModuleProcessor.OpenTestPopUp(tsk.TaskURL1); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep1 === "bubble-circle red" ? "bubble-circle red" : ""} onClick={() => { objContext.LowStakeTestStatistics_ModuleProcessor.OpenTestPopUp(tsk.TaskURL2); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep1 === "bubble-circle black" ? "bubble-circle black" : ""} onClick={() => { objContext.LowStakeTestStatistics_ModuleProcessor.OpenTestPopUp(tsk.TaskURL3); }} />
                        </td>
                    </tr>
                );
            });
            return arrTaskElements;
        }
    };
    return state.isLoadComplete ? GetContent(props) : <React.Fragment />;
};

/**
* @name Connector
* @summary connects component to store.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(LowStakeTestStatistics_ModuleProcessor.StoreMapList()))(PupilLearningTestStatistics);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LowStakeTestStatistics_ModuleProcessor;