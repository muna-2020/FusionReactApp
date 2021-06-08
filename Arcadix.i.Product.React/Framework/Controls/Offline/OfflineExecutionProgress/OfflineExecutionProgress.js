//React related imports
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import OfflineExecutionProgress_ComponentProcessor from "@shared/Framework/Controls/Offline/OfflineExecutionProgress/OfflineExecutionProgress_ComponentProcessor";
import * as OfflineExecutionProgress_Hook from "@shared/Framework/Controls/Offline/OfflineExecutionProgress/OfflineExecutionProgress_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Framework/ReactJs/Pc/Blocks/Popup/Icon_Close.png?inline';

/**
 * @name OfflineExecutionProgress
 * @param {any} props
 */
const OfflineExecutionProgress = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OfflineExecutionProgress_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["OfflineExecutionProgress_ComponentProcessor"]: new OfflineExecutionProgress_ComponentProcessor() };


    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in OfflineExecutionDisplay_Hook, that contains all the custom hooks.
    * @returns null
    */
    OfflineExecutionProgress_Hook.Initialize(objContext);

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.OfflineExecutionProgress_ComponentProcessor.Initialize(objContext, objContext.OfflineExecutionProgress_ComponentProcessor);

    /**
     * @name GetContent
     * @summary to get the Jsx to display for Offline Progress.
     */
    const GetContent = () => {
        let cIsOfflineClosed = ApplicationState.GetProperty("cIsOfflineClosed") == undefined ? "N" : ApplicationState.GetProperty("cIsOfflineClosed")
        return (
            < div className="offline-execution">
                <div className="close-icon" onClick={() => objContext.OfflineExecutionProgress_ComponentProcessor.OnClickClose(objContext)}>
                    <img src={CloseImage} />
                </div>
                {
                    cIsOfflineClosed == "N" ?
                        <div className="offline-execution-inner-wrapper">
                            {
                                props.Data.OfflineExecutionData.map(objData => {
                                    if (objData.vExecutionName) {
                                        let strDisplayFileName = objData?.["vExecutionName"] + '.' + objData?.t_TestDrive_OfflineProcess_Execution_File?.[0]?.["vFileName"]?.substring(objData.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"].lastIndexOf('.') + 1)
                                        return objContext.OfflineExecutionProgress_ComponentProcessor.ShowProcess(objContext, objData) ?
                                            <div className="offline-execution-list">
                                                <span className="filename" title={objData.vExecutionName}>{objData.cIsViewed == "N" ? objData.vExecutionName : ""}</span>
                                                <div className="progress-bar">
                                                    <div className="progress-bar-loader" style={{ width: objData.iProgressValue + "%" }} />
                                                </div>
                                                {
                                                    objData.iProgressValue == 100 && objData.t_TestDrive_OfflineProcess_Execution_File && objData.t_TestDrive_OfflineProcess_Execution_File[0] && objData.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"]
                                                        ?
                                                        <React.Fragment>
                                                            {/*< button id="ViewButton" id={objData.vExecutionName + "_" + objData.uOfflineProcessExecutionId} className="view"
                                                                onClick={() => {
                                                                    objContext.OfflineExecutionProgress_ComponentProcessor.OnClickView(objContext, objData.uOfflineProcessExecutionId, false)
                                                                }}

                                                            >View</button>*/}
                                                            <span
                                                                onClick={() => {
                                                                    objContext.OfflineExecutionProgress_ComponentProcessor.OnClickView(objContext, objData.uOfflineProcessExecutionId, false)
                                                                }}
                                                            >
                                                                <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objData.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"] + "&Type=Offline/" + objData.t_TestDrive_OfflineProcess_Definition[0]["vOfflineProcessKeyword"] + "&MainClientId=" + objData["iMainClientId"] + "&DisplayFileName=" + strDisplayFileName}>
                                                                    View
                                                            </a></span>
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment />
                                                }
                                            </div>
                                            :
                                            <React.Fragment />

                                    }
                                })
                            }
                            < button id="ShowAllButton" className="button-div"
                                onClick={() => {
                                    objContext.OfflineExecutionProgress_ComponentProcessor.OnClickView(objContext, "00000000-0000-0000-0000-000000000000");
                                }}>All Files</button>
                            <img className="close-icon" onClick={() => objContext.OfflineExecutionProgress_ComponentProcessor.OnClickClose(objContext)} src={CloseImage} />
                        </div> : ""
                }
            </div>
        );
    }

    return (
        <React.Fragment>
            {props.Data && props.Data.OfflineExecutionData && objContext.state.cIsClosed ? GetContent() : <React.Fragment />}
        </React.Fragment>
    );
}

export default OfflineExecutionProgress;