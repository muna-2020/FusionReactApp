//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as PlanenTopicDisplay_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/PlanenTopicDisplay/PlanenTopicDisplay_Hook';
import PlanenTopicDisplay_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/PlanenTopicDisplay/PlanenTopicDisplay_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
 * @name PlanenTopicDisplay
 * @summary Displaying for test preview.
 * @param {any} props
 */
const PlanenTopicDisplay = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PlanenTopicDisplay_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objPopupContext
    */
    let objContext = { state, props, dispatch, ["PlanenTopicDisplay_ModuleProcessor"]: new PlanenTopicDisplay_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objPopupContext context object
    * @summary Initialize method call in PlanenTopicDisplay_Hook, that contains all the custom hooks.
    * @returns null
    */
    PlanenTopicDisplay_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.PlanenTopicDisplay_ModuleProcessor.Initialize(objContext, objContext.PlanenTopicDisplay_ModuleProcessor);

    function GetContent(props) {
        let strDate = objContext.PlanenTopicDisplay_ModuleProcessor.GetFormattedDate(objContext, props.Data.objTopic.dtTopicDate);
        let objTextResource = props.Resource.Text;
        return (
            <div class="ichPlane-popup-overlay">
                <div class="ichPlane-popup-outer-div">
                    <div class="ichPlane-popup-container">
                        <div class="header-flex">
                            <span onClick={e => Popup.ClosePopup(props.Id)} class="close">
                                <span> {Localization.TextFormatter(objTextResource, 'Close')}</span>
                                <img src={CloseImage} alt="" />
                            </span>
                        </div>
                        <div class="tp-content">
                            <div class="tp-flex"><span class="dateTime-text">{props.Data.objTopic.objDay.t_LearnCoacher_Planner_TimeTable_Day_Data[0]["vTimeTableDayName"]}, {strDate}</span></div>
                            <div class="tp-flex"><span class="dateTime-text">{props.Data.objTopic.objSubject.t_TestDrive_Subject_Data[0].vSubjectName}, {props.Data.objTopic.objClassTime.vClassTimeFrom + " - " + props.Data.objTopic.objClassTime.vClassTimeTo}</span></div>
                            <div class="heading-text"> {Localization.TextFormatter(objTextResource, 'MessageHeader')}</div>
                            <textarea disabled placeholder="Topic" value={props.Data.objTopic.vTopicDescription}>

                            </textarea>
                        </div>
                        <div class="tp-footer">
                            <button onClick={e => Popup.ClosePopup(props.Id)} class="blue-button">
                                {Localization.TextFormatter(objTextResource, 'Close')}
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return GetContent(props);
};

export default PlanenTopicDisplay;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PlanenTopicDisplay_ModuleProcessor; 