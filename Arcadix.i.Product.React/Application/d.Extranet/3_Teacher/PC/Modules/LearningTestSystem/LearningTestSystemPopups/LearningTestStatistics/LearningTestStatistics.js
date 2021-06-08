//React related imports.
import React, { useReducer } from "react";

//Module related files.
import * as LearningTestStatistics_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestStatistics/LearningTestStatistics_Hook';
import LearningTestStatistics_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestStatistics/LearningTestStatistics_ModuleProcessor';


//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import CheckImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/check.svg?inline';

/**
 * @name LearningTestStatistics
 * @param {any} props props
 * @returns {*} Returns the jsx object
 */
const LearningTestStatistics = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestStatistics_Hook.GetInitialState());
    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["LearningTestStatistics_ModuleProcessor"]: new LearningTestStatistics_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @summary Assigns textresource to an object
     * */
    let objTestStatisticsData = objContext.props.Resource.Text.objTestStatisticsData;
    let objTextResource = objContext.props.Resource.Text.objTextResource;

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Billing_Hook, that contains all the custom hooks.
     * @returns null
    */
    LearningTestStatistics_Hook.Initialize(objContext);

    /**
     * @name GetStatusTestImage
     * @param {any} iTestUsageId iTestUsageId
     * @summary Get Status Test Icon for test status as completed,inprogress and not yet taken
     * @returns {*} Image html element
     */
    function GetStatusTestImage(iTestUsageId) {
        switch (iTestUsageId) {
            case 5:
                return <img title="Übung abgeschlossen" src={CheckImage} />;
            case 3:
                return <img title="In Arbeit" src={ProcessImage} />;
            default:
                return <img title="Übung bereit – noch nicht angefangen" src={RocketImage} />;
        }
    }

    /**
     * @name GetTaskElements
     * @summary Returns the task elements
     * @returns {*} Jsx for each row
     * */
    function GetTaskElements() {
        return (
            state.arrTaskData.map(objTask => {
                return (
                    <tr>
                        <td onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.ShowTaskImagePopup(objContext, objTask) }}> <a>{objTask["vPageName"]}</a></td>
                        <td>{Localization.TextFormatter(objTestStatisticsData, 'vSubjectName')}</td>
                        <td>{Localization.TextFormatter(objTestStatisticsData, 'vSubSubjectName')}</td>
                        <td>{objTask["DifficultyLevelId"]}</td>
                        <td className="circle-block">
                            <div className={objTask.Rep1} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep2} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep3} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep4} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep5} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep6} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                        <td className="circle-block">
                            <div className={objTask.Rep7} onClick={() => { objContext.LearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext) }}></div>
                        </td>
                    </tr>
                );
            })
        );
    }

    const GetContent = () => {
        return (
            <div className="test-statistics-popup">
                <div className="test-statistics-popup-header" id="TestStatisticsHeader">
                    <h2>{Localization.TextFormatter(objTestStatisticsData, 'vFirstName')}</h2>
                    <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                        {Localization.TextFormatter(objTextResource, 'Schliessen')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>

                <div class="ul-block" id="ulBlock">
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}: </span>
                            <span className="right">{Localization.TextFormatter(objTestStatisticsData, 'vSubjectName')}</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'Übung')}:  </span>
                            <span className="right">{Localization.TextFormatter(objTestStatisticsData, 'vTestName')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'Generiert_am')}:</span>
                            <span className="right">{Localization.TextFormatter(objTestStatisticsData, 'dtCreatedOn')}</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                            <span className="right">{Localization.TextFormatter(objTestStatisticsData, 'vClassName')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'Aufgaben')}:</span>
                            <span className="right">15</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'Status')}:</span>
                            {GetStatusTestImage(Localization.TextFormatter(objTestStatisticsData, 'iTestUsageId'))}
                        </li>
                    </ul>
                </div>

                <div className="test-statistics">
                    <ul className="tablinks" id="TestStatisticsTabsHeader">
                        <li className={state.iTab == 1 ? "active" : ""}
                            onClick={() =>
                                //OpenTab(1)
                                dispatch({ type: 'SET_STATE', payload: { "iTab": 1 } })
                            }>
                            {Localization.TextFormatter(objTextResource, 'Aufgabenstatistik')}
                        </li>
                    </ul>
                    <div className="tabscontent" style={{ display: state.iTab == 1 ? "block" : "none" }}>
                        <div className="test-statistics-table" id="TestStatisticsTable">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="FillHeightTestStatistic" Meta={objContext.LearningTestStatistics_ModuleProcessor.GetMetaDataFillheightTestStatistics(objContext)} ParentProps={{ ...props }}>
                                <div className="test-statistics-table-block">
                                    <div class="color-block">
                                        <ul>
                                            <li>
                                                <span class="bubble-circle green" />
                                                <span>{Localization.TextFormatter(objTextResource, 'Status_after_losing')}</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle green-ring" />
                                                <span>{Localization.TextFormatter(objTextResource, 'Status_after_repeat')}</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle red" />
                                                <span>{Localization.TextFormatter(objTextResource, 'Status_Wrongly_solved')}</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle yellow" />
                                                <span>{Localization.TextFormatter(objTextResource, 'Status_partially')}</span>
                                            </li>
                                            <li>
                                                <span class="bubble-circle black" />
                                                <span>{Localization.TextFormatter(objTextResource, 'Status_unsolved')}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colspan="7" className="tr-row">
                                                <span>{Localization.TextFormatter(objTextResource, 'Passage')}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{Localization.TextFormatter(objTextResource, 'Tasks')} ({state.arrTaskData.length})</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Passage')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Area')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Difficulty')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'One')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Two')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Three')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Four')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Five')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Six')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Seven')}</th>
                                        </tr>
                                        {GetTaskElements()}
                                    </tbody>
                                </table>
                            </WrapperComponent>
                        </div>
                    </div>

                    <div className="tabscontent" style={{ display: state.iTab == 2 ? "block" : "none" }}>
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="FillHeightTestStatistics" Meta={objContext.LearningTestStatistics_ModuleProcessor.GetMetaDataFillheightTestStatistics(objContext)} ParentProps={{ ...props }}>
                            <div className="auswertungen-tab-flex">
                                <div className="auswertungen-tab-box">
                                    {Localization.TextFormatter(objTextResource, 'Number_of_views')}:
                                    <br /> {Localization.TextFormatter(objTextResource, 'Last_call')}:
                                    <br />
                                    <br /> {Localization.TextFormatter(objTextResource, 'Number_of_tasks')}:
                                    <br /> {Localization.TextFormatter(objTextResource, 'Max_num_of_points')} :
                                    <br />
                                    <br /> {Localization.TextFormatter(objTextResource, 'Status_after_losing')} :
                                    <br /> {Localization.TextFormatter(objTextResource, 'Status_partially')} :
                                    <br /> {Localization.TextFormatter(objTextResource, 'Status_Wrongly_solved')} :
                                    <br /> {Localization.TextFormatter(objTextResource, 'Status_unsolved')} :
                                    <br /> {Localization.TextFormatter(objTextResource, 'Score')} :
                                    <br />
                                    <br />
                                </div>
                                <div className="auswertungen-tab-box">
                                    1<br />
                                    <span>15.03.2019 06:10:32</span>
                                    <br />
                                    <br /> -<br /> -<br />
                                    <br /> -<br /> -<br /> -<br /> -<br /> -<br />
                                    <br />
                                </div>
                            </div>
                        </WrapperComponent>
                    </div>
                    <div className="tabscontent" style={{ display: state.iTab == 3 ? "block" : "none" }}>
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="FillHeightTestStatistics" Meta={objContext.LearningTestStatistics_ModuleProcessor.GetMetaDataFillheightTestStatistics(objContext)} ParentProps={{ ...props }}>
                            <div className="test-statistics-table protocol-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Bereich')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Last_call')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Aufgaben')} </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Punkte')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'Number_of_views')} ({Localization.TextFormatter(objTextResource, 'Dauer')})</th>
                                        </tr>
                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'Nature_of_technology')}</td>
                                            <td>
                                                {Localization.TextFormatter(objTextResource, 'Understandthenatureandmeaningofscienceandtechnology')}
                                            </td>
                                            <td>{Localization.TextFormatter(objTextResource, 'Date')}</td>
                                            <td>-</td>
                                            <td>- (-)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'Detuch')}</td>
                                            <td>{Localization.TextFormatter(objTextResource, 'Lesson')}</td>
                                            <td>{Localization.TextFormatter(objTextResource, 'Date')}</td>
                                            <td>-</td>
                                            <td>- (-)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'Detuch')}</td>
                                            <td>{Localization.TextFormatter(objTextResource, 'Lesson')}</td>
                                            <td>11.03.2019</td>
                                            <td>10</td>
                                            <td>1 (13)</td>
                                            <td>1 (0 Min.)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </WrapperComponent>
                    </div>
                </div>
                <div className="test-statistics-popup-footer" id="test-statistics-popup-footer" />
            </div>
        );
    }
    return (
        <React.Fragment>
            {
                state.isLoadComplete ? GetContent() : <React.Fragment />
            }
        </React.Fragment>
    );
};

export default LearningTestStatistics;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestStatistics_ModuleProcessor; 