//React related imports.
import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module related files.
import * as PupilTopic_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTopic/PupilTopic_Hook';
import PupilTopic_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTopic/PupilTopic_ModuleProcessor';

//Components used in module.
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//Inline Images import
import imgPlanen from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/planen.svg?inline';
import imgNachdenkenBlack from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/nachdenken_black.svg?inline';

/**
* @name PupilToPlan_PopUp
* @param {object} props props
* @summary This component displays the PupilToPlan_PopUp data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with PupilToPlan_PopUp details.
*/
const PupilToPlan_PopUp = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilTopic_Hook.GetInitialState(props.Data));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objPopUpContext = { state, props, dispatch, ["PupilTopic_ModuleProcessor"]: new PupilTopic_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objPopUpContext.PupilTopic_ModuleProcessor.Initialize(objPopUpContext, objPopUpContext.PupilTopic_ModuleProcessor);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        let strDate = objPopUpContext.PupilTopic_ModuleProcessor.GetFormattedDate(objPopUpContext, props.Data.objDate)
        return (
            <div className="popup-wrapper" id="PopUpWrapper"> {/*parent refernece*/}
                <div className="popup-content">
                    <div className="popup-header" id="PopUpHeader"> {/*header id*/}
                        <div className="edit-icon">
                            <img src={imgPlanen} alt="" />
                        </div>
                    </div>
                    <div className="popup-content-block">
                        <div className="ich-plane-popup">
                            <div className="ich-plane">
                                <p>{props.Data.objDay.t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayName}, {strDate}</p>
                                <p>{props.Data.objDay.objSubject.t_TestDrive_Subject_Data[0].vSubjectName}, {props.Data.objTime.vClassTimeFrom + " - " + props.Data.objTime.vClassTimeTo}</p>
                                <div className="ich-plane-textarea">
                                    <p>{Localization.TextFormatter(objTextResource, 'TopicHeader')}</p>
                                    <textarea placeholder="Notizen" value={state.strTopic} disabled={!state.blnCurrentSchoolYear || props.Data.blnDay} onChange={(e) => { objPopUpContext.PupilTopic_ModuleProcessor.UpdateTopicState(objPopUpContext, e.target.value); }} />
                                </div>
                                {state.strTopic.trim().length === 0 && state.blnSaveTopicClicked ? <div className="error-message">{Localization.TextFormatter(objTextResource, 'ThinkErrorMessage')}</div> : <React.Fragment />}
                                <div className="ich-plane-footer">
                                    <p>{Localization.TextFormatter(objTextResource, 'TopicFooter')}:</p>
                                </div>

                                <button onClick={() => { OnClickSaveTopic(); }}>
                                    <img src={imgNachdenkenBlack} alt="" />
                                    {Localization.TextFormatter(objTextResource, 'ThinkTopic')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="popup-footer" id="PopUpFooter">  {/*footer id*/}
                        <div className="footer-section">
                            <span className="footerclose-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'CloseTopic')}</span>
                            {props.Data.blnDay ? <React.Fragment /> : <span className="footerclose-button" onClick={() => { OnClickSaveTopic(); }}>{Localization.TextFormatter(objTextResource, 'SaveTopic')}</span>}
                        </div>
                    </div>
                </div>

            </div>
        );

        /**
        * @name OnClickSaveTopic
        * @summary Calls OpenTaskPopUp method
        */
        function OnClickSaveTopic() {
            if (props.Data.blnDay) {
                Popup.ClosePopup(props.Id);
                let objTopic = DataRef(props.Data.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + props.Data.strClassId)[0];
                OpenTaskPopUp(objTopic);
            }
            else {
                objPopUpContext.dispatch({ type: 'SET_STATE', payload: { "blnSaveTopicClicked": true } });
                let objTopic = DataRef(props.Data.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + props.Data.strClassId)[0];
                if (state.strTopic.trim().length > 0) {
                    Popup.ClosePopup(props.Id);
                    if (state.blnCurrentSchoolYear) {
                        objPopUpContext.PupilTopic_ModuleProcessor.SaveTopic(objPopUpContext, props.Data).then(data => {
                            OpenTaskPopUp(data[0]);
                        });
                    } else {
                        OpenTaskPopUp(objTopic);
                    }
                }
            }
        }

        /**
        * @name OpenTaskPopUp
        * @param {object} objTopic Topic
        * @summary Opens the Task PopUp 
        */
        function OpenTaskPopUp(objTopic) {
            Popup.ShowPopup({
                Data: {
                    arrSAOptionData: state.arrSAOptionData,
                    arrReviewCriteriaData: state.arrReviewCriteriaData,
                    objTopic: objTopic,
                    objTime: props.Data.objTime,
                    objSubject: props.Data.objDay.objSubject,
                    pupilName: props.Data.pupilName,
                    blnCurrentSchoolYear: state.blnCurrentSchoolYear,
                    Object_Extranet_Teacher_Topic: props.Data.Object_Extranet_Teacher_Topic,
                    blnDay: props.Data.blnDay,
                    objDay: props.Data.objDay
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

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
};

///**
//* @name DynamicStyles
//* @param {object} props props
//* @summary Required for css
//* @returns {object} arrStyles
//*/
//PupilToPlan_PopUp.DynamicStyles = () => {
//    return [
//        JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp.css"
//    ];
//};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilTopic_ModuleProcessor.StoreMapList()))(PupilToPlan_PopUp);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilTopic_ModuleProcessor;