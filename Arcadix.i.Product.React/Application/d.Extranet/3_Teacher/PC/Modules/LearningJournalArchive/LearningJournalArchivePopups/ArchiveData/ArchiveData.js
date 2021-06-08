//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as ArchiveData_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/ArchiveData/ArchiveData_Hook';
import ArchiveData_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/ArchiveData/ArchiveData_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name ArchiveData
* @param {object} props props
* @summary This component displays the ArchiveData data.
* @returns {object} div that encapsulated the ArchiveData div with its details.
*/
const ArchiveData = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, ArchiveData_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objPopupContext = { state, props, dispatch, ["ArchiveData_ModuleProcessor"]: new ArchiveData_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objPopupContext.ArchiveData_ModuleProcessor.Initialize(objPopupContext, objPopupContext.ArchiveData_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objPopupContext context object
    * @summary Initialize method call in ArchiveData_Hook, that contains all the custom hooks.
    * @returns null
    */
    ArchiveData_Hook.Initialize(objPopupContext);

    let arrTopic = props.Data.objItem.arrTopic;
    let objTextResource = props.Resource.Text;
    return (
        <div className="review-criteria-popup archive-data">
            <div className="review-criteria-header" id="ArchiveDataHeader">
                <div className="review-criteria-header-left">
                    <h2>{props.Data.objItem.vFirstName + " " + props.Data.objItem.vName}({props.Data.objClass.vClassName}) </h2>
                </div>
                <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                    {Localization.TextFormatter(objTextResource, 'ShutDown')}
                    <img src={CloseImage} />
                </span>
            </div>
            <WrapperComponent
                ComponentName={"FillHeight"}
                Id="LearningJournal" Meta={objPopupContext.ArchiveData_ModuleProcessor.GetFillHeightMetaData(objPopupContext)} ParentReference={`EditorPopupParent${objPopupContext.props.id}`} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }}>
                <div className="schedule-wrap">
                    {GetElements()}
                </div>
            </WrapperComponent>
            <div className="wrap review-criteria-footer" id="review-criteria-footer">
                <div />
                <div className="button yellow-button" onClick={e => Popup.ClosePopup(props.Id)}>
                    {Localization.TextFormatter(objTextResource, 'ShutDown')}
                </div>
            </div>
        </div>
    );

    /**
    * @name GetElements
    * @param {Array} arrWorkApproachData WorkApproachData
    * @summary Gets elements
    * @returns {Array} jsx, React.Fragment
    */
    function GetElements() {
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        let arrElements = arrTopic.map(item => {
            let objSureUnSure = item.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment.length > 0 ? props.Data.arrSAOption.find(sa => item.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment[0].iStrengthAssessmentOptionId == sa["iTopicStrengthAssessmentOptionId"]) : null;
            return (
                <div className="archive-data-info">
                    <div className="schedule-block">
                        <ul>
                            <li>
                                <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</span>
                                <span>: {item.objSubject["t_TestDrive_Subject_Data"][0].vSubjectName} </span>
                            </li>
                            <li className="data-list">
                                <span>{Localization.TextFormatter(objTextResource, 'PlanningFor')}</span>
                                <span>: {new Date(item.dtTopicDate).toLocaleDateString('de-DE', dateOptions)},{item.objClassTime ? item.objClassTime.vClassTimeFrom + " - " + item.objClassTime.vClassTimeTo : ""}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="add-flex">
                        <div className="add-left">
                            <div className="planning-flex">
                                <div className="div">
                                    <h3>{Localization.TextFormatter(objTextResource, 'Planning')}</h3>
                                    <div className="summary-block">
                                        <ul>
                                            <li>{item.vTopicDescription}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add-center">
                            <div className="planning-flex">
                                <div className="planning-left">
                                    <h3>{Localization.TextFormatter(objTextResource, 'SelfAssessment')}</h3>
                                    <table className="left-table">
                                        <tbody>
                                            {GetWorkApproachElements(objPopupContext.ArchiveData_ModuleProcessor.GetWorkApproachData(props.Data.arrReviewCriteriaData, item.t_LearnCoacher_LearningJournal_Pupil_WorkApproach))}
                                        </tbody>
                                    </table>
                                    <p>{Localization.TextFormatter(objTextResource, 'SureUnSureText')} {objSureUnSure ? objSureUnSure.t_LearnCoacher_LearningJournal_StrengthAssessmentOption_Data[0].vStrengthAssessmentOptionLevel : ""}</p>
                                </div>
                            </div>
                        </div>

                        <div className="add-right">
                            <div className="planning-flex">
                                <span>{Localization.TextFormatter(objTextResource, 'Comments')}</span>
                                <div className="summary-block">
                                    {
                                        item.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.map(fdbck => {
                                            return (
                                                <React.Fragment>
                                                    <h3>{fdbck.cIsByTeacher == 'Y' ? props.Data.strTeacherName : props.Data.objItem.vFirstName} - {new Date(fdbck.dtCommentDate).toLocaleDateString('de-DE', dateOptions)}</h3>
                                                    <p>{fdbck.tComment}</p>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return arrElements;
    }

    /**
    * @name GetWorkApproachElements
    * @param {Array} arrWorkApproachData WorkApproachData
    * @summary Gets work approach elements
    * @returns {Array} jsx, React.Fragment
    */
    function GetWorkApproachElements(arrWorkApproachData) {
        let arrElements = arrWorkApproachData.map(rc => {
            return (
                <tr>
                    <td>{rc.vReviewCriteria}</td>
                    <td />
                    <td>
                        <div className={rc.iReviewLevel == 1 ? "number-in-circle selected" : "number-in-circle"}>1 </div>
                    </td>
                    <td>
                        <div className={rc.iReviewLevel == 2 ? "number-in-circle selected" : "number-in-circle"}>2 </div>
                    </td>
                    <td>
                        <div className={rc.iReviewLevel == 3 ? "number-in-circle selected" : "number-in-circle"}>3 </div>
                    </td>
                    <td>
                        <div className={rc.iReviewLevel == 4 ? "number-in-circle selected" : "number-in-circle"}>4 </div>
                    </td>
                    <td>
                        <div className={rc.iReviewLevel == 5 ? "number-in-circle selected" : "number-in-circle"}>5 </div>
                    </td>
                    <td>
                        <div className={rc.iReviewLevel == 6 ? "number-in-circle selected" : "number-in-circle"}>6 </div>
                    </td>
                </tr>
            );
        });
        return arrElements;
    }
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(ArchiveData_ModuleProcessor.StoreMapList()))(ArchiveData);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ArchiveData_ModuleProcessor; 