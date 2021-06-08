// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component related imports.
import * as ProgressBarPopup_Hook from '@shared/Framework/Blocks/Popup/ProgressBarPopup/ProgressBarPopup_Hook';
import ProgressBarPopup_ComponentProcessor from "@shared/Framework/Blocks/Popup/ProgressBarPopup/ProgressBarPopup_ComponentProcessor";

//Components used
import ProgressBar from "@root/Framework/Controls/ProgressBar/ProgressBar";

//Helper files.
import * as Popup_TextResource from '@shared/Framework/Blocks/Popup/Popup_TextResource';

//Inline Images import
import PdfImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Popup/pdf_file.png?inline';
import ExcelImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Popup/Excel_icon.gif?inline';

/**
* @name ProgressBarPopup
* @param {object} props props
* @summary This component displays the ProgressBarPopup.
* @returns {object} returns a jsx .
*/
const ProgressBarPopup = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ProgressBarPopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    var objContext = { props, state, dispatch, ["ModuleName"]: props.Id, ["ProgressBarPopup_ComponentProcessor"]: new ProgressBarPopup_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ProgressBarPopup_ComponentProcessor.Initialize(objContext, objContext.ProgressBarPopup_ComponentProcessor);

    var blnShowProgressStatus = props.Meta.ShowProgressStatus == "N" ? false : true;
    var blnHasCloseButton = props.Meta.HasCloseButton == "N" ? false : true;
    var blnHasCancelButton = props.Meta.HasCancelButton == "N" ? false : true;

    var blnShowCloseButtonOnComplete = props.Meta.ShowCloseButtonOnComplete == "Y" ? true : false;
    if (blnShowCloseButtonOnComplete) {
        if (state.ProgressDetails && parseInt(state.ProgressDetails.Percentage) >= 100) {
            blnHasCloseButton = true;
            blnHasCancelButton = false;
        }
    }

    //Will be called only once, starts the progress bar when StartProgressOnLoad is passsed true...
    ProgressBarPopup_Hook.useStartProgressOnLoad(objContext);

    //Called in the time interval of one second, To call the API to get the ProgressBar details and update the local state...
    //ProgressBarPopup_Hook.useGetProgressBarDetails(objContext);

    //Keeps watch on local state change of ProgressDetails...
    //Logic written will be invoked  when Percentage reaches 100 or IsRunning becomes "N"
    //Logic ==> close the Progress Bar if CloseProgessBarOnComplete is passed as "Y", Calls the CallBack OnProgressComplete with ProgressDetails
    ProgressBarPopup_Hook.useCheckCloseProgressBar(objContext);


    return (
        <div className={"progressbar-wrapper " + props.Meta.ClassName}>
            <hr />
            <div className="progressbar-header"><span>{Popup_TextResource.GetResouceText(props.Resource, "TitleText")}</span>
            </div>
            <ProgressBar Data={{ Percentage: state.ProgressDetails.Percentage ? state.ProgressDetails.Percentage : "5", ProgressText: props.Data.ProgressText }} />
            <div className="process-wrapper">
                {blnShowProgressStatus ?
                    <div className="process-status">
                        <div className="process-block"><span>   {Popup_TextResource.GetResouceText(props.Resource, "Total")}:</span><span>{state.ProgressDetails["Total"] || '0'}</span></div>
                        <div className="process-block"><span>  {Popup_TextResource.GetResouceText(props.Resource, "Posted")}:</span><span>{state.ProgressDetails["Success"] || '0'}</span></div>
                        <div className="process-block"><span>  {Popup_TextResource.GetResouceText(props.Resource, "Failed")}:</span><span>{state.ProgressDetails["Failure"] || '0'}</span></div>
                    </div>
                    : <React.Fragment />
                }
                {(blnShowProgressStatus || props.Meta.ShowFileToDownload) && state.ProgressDetails["Percentage"] === '100' && state.ProgressDetails["FileName"] !== '' ?
                    <div className="file-name">
                        < a href={state.ProgressDetails["FilePath"]} download>{state.ProgressDetails["LinkDisplayText"] ? state.ProgressDetails["LinkDisplayText"] : state.ProgressDetails["FileName"]} </a>

                        {props.Meta.HideFileIcon == "Y" ? <React.Fragment /> : state.ProgressDetails["FileType"] !== "" && state.ProgressDetails["FileType"] === "PDF" ? <img src={PdfImage} /> : <img src={ExcelImage} />}


                    </div>
                    :
                    <React.Fragment />}
            </div>
            <hr />
            <div className="progress-bar-popup-footer">
                {!props.Meta.StartProgressOnLoad
                    ?
                    <button onClick={() => objContext.ProgressBarPopup_ComponentProcessor.StartProgress(objContext)}>
                        {Popup_TextResource.GetResouceText(props.Resource, "StartButtonText")}
                    </button>
                    :
                    <React.Fragment />}
                {blnHasCancelButton
                    ?
                    <span className="button brown-button" onClick={() => { objContext.ProgressBarPopup_ComponentProcessor.CancelProgress(objContext); props.Events.CloseParentPopup(); }}>
                        {Popup_TextResource.GetResouceText(props.Resource, "CancelButtonText")}
                    </span>
                    :
                    <React.Fragment />}
                {blnHasCloseButton
                    ?
                    <span className="button brown-button" onClick={e => props.Events.CloseParentPopup()}>{Popup_TextResource.GetResouceText(props.Resource, "CloseButtonText")}</span>
                    :
                    <React.Fragment />}
            </div>
        </div>
    );
}

/**
 * @name GetDimensions
 * @param {any} objPopupData
 * @summary Gets the Height and Width from the meta.
 * @returns {object} Dimension
 */

ProgressBarPopup.GetDimensions = (objPopupData) => {
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : 140,
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 390
    };
};

export default ProgressBarPopup;