//React imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//module imports
import * as PupilLearningTestStatistics_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestStatistics_Hook';
import PupilLearningTestStatistics_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestStatistics_ModuleProcessor';

//Inline Images import
import imgEditArbeiten from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/PupilLearningTestStatisticsPopup/edit_arbeiten.svg?inline';
import imgCloseText from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/PupilLearningTestStatisticsPopup/closeText.svg?inline';
import imgTestPreview from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/PupilLearningTestStatisticsPopup/TestPreview.svg?inline';

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
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilLearningTestStatistics_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["PupilLearningTestStatistics_ModuleProcessor"]: new PupilLearningTestStatistics_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.PupilLearningTestStatistics_ModuleProcessor.Initialize(objContext, objContext.PupilLearningTestStatistics_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in PupilLearningTestStatistics_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilLearningTestStatistics_Hook.Initialize(objContext);

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
                            Id="PupilLearningTestStatistic_FillHeight"
                            Meta={{
                                HeaderIds: ["ExerciseHeader", "ContentHeader"],
                                FooterIds: ["ExerciseFooter"]
                            }}
                            ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                            <div className="content-header" id="ContentHeader">
                                {Localization.TextFormatter(objTextResource, 'Evaluation')}: {objTest.vModeText}
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
                                                        {
                                                            objTest.objStatus["strSatus"] != "Completed" ?
                                                                <label className="check-container">
                                                                    <input type="checkbox" checked={state.blnAllTasks} onClick={(e) => { objContext.PupilLearningTestStatistics_ModuleProcessor.OnClickSelectUnSelectAll(objContext, e.target.checked); }} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                : ''
                                                        }
                                                        <span className="radio-button-fields pl-2">{Localization.TextFormatter(objTextResource, 'AllTasks')}</span>
                                                    </div>

                                                </td>
                                                <td />
                                                <td>1</td>
                                                <td>2</td>
                                                <td>3</td>
                                                <td>4</td>
                                                <td>5</td>
                                                <td>6</td>
                                                <td>7</td>
                                            </tr>
                                            {GetTaskElements(objTextResource, objTest)}
                                        </table>
                                    </div>
                                    <div className="right-table-block">
                                        <table>
                                            <tr><td className="circle-block">{Localization.TextFormatter(objTextResource, 'Legend')}</td></tr>
                                            <tr><td className="circle-block"><span className="bubble-circle green"></span><span>{Localization.TextFormatter(objTextResource, 'RightAfterA_SingleRelease')}</span></td></tr>
                                            <tr><td className="circle-block"><span className="bubble-circle green-ring"></span><span>{Localization.TextFormatter(objTextResource, 'CorrectAfterRepeatedLoosening')}</span></td></tr>
                                            <tr><td className="circle-block"><span className="bubble-circle yellow"></span><span>{Localization.TextFormatter(objTextResource, 'PartlyCorrect')}</span></td></tr>
                                            <tr><td className="circle-block"><span className="bubble-circle red"> </span><span>{Localization.TextFormatter(objTextResource, 'WrongSolved')}</span></td></tr>
                                            <tr><td className="circle-block"><span className="bubble-circle black"></span><span>{Localization.TextFormatter(objTextResource, 'UnSolved')}</span></td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {
                                objTest.objStatus["strSatus"] != "Completed" ?
                                    <div className="submit-button">
                                        <span className="pupil-green-button" onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OnClickRepeatSelectedTasks(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'RepeatSelectedTasks')} </span>
                                    </div>
                                    : <React.Fragment />
                            }
                        </WrapperComponent>
                    </div>
                    <div className="progress-footer" id="ExerciseFooter">  {/*footer id*/}
                        <div className="footer-section">
                            <span className="footerclose-button pupil-green-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'ShutDown')}</span>
                            {
                                objTest.objStatus.cManuallyCreated ?
                                    objTest.objStatus["strSatus"] != "Completed" ?
                                        <span className="footerclose-button pupil-green-button" onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.CompleteRoundForManualLearningTest(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'CompleteRound')}</span>
                                        : <span className="footerclose-button pupil-green-button" >{Localization.TextFormatter(objTextResource, 'RoundFinished')}</span>
                                    : objTest.objStatus.cNewTestAllowed == true ?
                                        <span className="footerclose-button pupil-green-button" onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenCreateTestConfirmPopup(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'CreateTest')}</span>
                                        : <span className="footerclose-button pupil-green-button" >{Localization.TextFormatter(objTextResource, 'RoundFinished')}</span>

                            }
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
        function GetTaskElements(objTextResource, objTest) {
            let arrTaskElements = state.arrTaskData.map(tsk => {
                return (
                    <tr className="rows task-list">
                        <td>
                            <div className="radio-button-block">
                                {
                                    objTest.objStatus["strSatus"] != "Completed" ?
                                        <label className="check-container">
                                            <input type="checkbox" name={tsk.iPageId} checked={tsk.isSelected} value={tsk.iPageId} onClick={(e) => { objContext.PupilLearningTestStatistics_ModuleProcessor.OnClickSelectUnSelect(objContext, e.target.checked, tsk.iPageId); }} />
                                            <span className="checkmark" />
                                        </label>
                                        : ''
                                }
                                <span className="radio-button-fields" onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} >
                                    <img src={imgTestPreview} alt="" />
                                    <a> {tsk.vPageName}</a>
                                </span>
                            </div>
                        </td>
                        <td> {tsk.DifficultyLevelId} </td>
                        <td className="circle-block">
                            <div className={tsk.Rep1} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep2} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep3} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep4} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep5} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep6} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
                        </td>
                        <td className="circle-block">
                            <div className={tsk.Rep7} onClick={() => { objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTaskImagePopUp(objTextResource, tsk); }} />
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
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilLearningTestStatistics_ModuleProcessor.StoreMapList()))(PupilLearningTestStatistics);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilLearningTestStatistics_ModuleProcessor;