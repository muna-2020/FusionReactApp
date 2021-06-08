// React related imports.
import React, { useReducer } from 'react';

//Module Related imports.
import * as GenerateOnlineHelpContentPdf_Hook from '@shared/Core/8_OnlineHelpView/OnlineHelpView/GenerateOnlineHelpContentPdf/GenerateOnlineHelpContentPdf_Hook';
import GenerateOnlineHelpContentPdf_ModuleProcessor from '@shared/Core/8_OnlineHelpView/OnlineHelpView/GenerateOnlineHelpContentPdf/GenerateOnlineHelpContentPdf_ModuleProcessor';

//Components used
import ProgressBar from "@root/Framework/Controls/ProgressBar/ProgressBar";

/**
 * @name GenerateOnlineHelpContentPdf
 * @param {object} props props
 * @summary This component is used for Export of Task details into Excel.
 * @returns {object} React.Fragement that contains the content to be added in popup required for GenerateOnlineHelpContentPdf.
 */
const GenerateOnlineHelpContentPdf = props => {


     /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GenerateOnlineHelpContentPdf_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["GenerateOnlineHelpContentPdf_ModuleProcessor"]: new GenerateOnlineHelpContentPdf_ModuleProcessor() };


    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    GenerateOnlineHelpContentPdf_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.GenerateOnlineHelpContentPdf_ModuleProcessor.Initialize(objContext, objContext.GenerateOnlineHelpContentPdf_ModuleProcessor);

    /**
     * @summary JSX for GenerateOnlineHelpContentPdf
     */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        return <div className="print-to-pdf-parent">            
            <div className="print-to-pdf-content-flex">
                <div className="mb-20">{objTextResource.MessageText}</div>
                {objContext.state.strPerCentage != 100 ?
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-right">
                                <ProgressBar Data={{ Percentage: objContext.state.strPerCentage, ProgressText: ""}} />
                        </div>
                    </div>
                </div>
            : <React.Fragment/>
                } 
                {objContext.state.strFilePath ?                                 
                                             
                <a href={props.ParentProps.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + state.strFilePath + "&Type=" + "Offline/GenerateOnlineHelpContentPdf" + "&DisplayFileName=" + props.Data.DisplayFileName + ".pdf"}>
                    <span className="row-right ptp-btn uploadedfile"> Download
                    {/*<img src={objContext.props.Resource.SkinPath + "/Images/Common/Icons/download.svg"} />*/}
                    </span>
                </a>                            
                    
                : <React.Fragment/>
                }       
            </div>
            <div className="print-to-pdf-footer">
                <button className="ptp-btn" onClick={() => Popup.ClosePopup(props.Id)}>
                    {objTextResource.OkButtonText}
                </button>                
            </div>
        </div>
    }

    return  GetContent();
}

export default GenerateOnlineHelpContentPdf;