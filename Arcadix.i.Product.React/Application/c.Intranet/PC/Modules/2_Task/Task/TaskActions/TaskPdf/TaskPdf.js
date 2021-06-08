// React related imports.
import React, { useReducer } from 'react';

//Module Related imports.
import * as TaskPdf_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskPdf/TaskPdf_Hook';
import TaskPdf_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskPdf/TaskPdf_ModuleProcessor';

//Components used
import ProgressBar from "@root/Framework/Controls/ProgressBar/ProgressBar";

/**
 * @name TaskPdf
 * @param {object} props props
 * @summary This component is used for Export of Task details into Excel.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskPdf.
 */
const TaskPdf = props => {


    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskPdf_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["TaskPdf_ModuleProcessor"]: new TaskPdf_ModuleProcessor() };


    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TaskPdf_Hook.Initialize(objContext);

    /**
     * @summary JSX for TaskPdf
     */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        return <div className="print-to-pdf-parent">
            <div className="print-to-pdf-header">
                <span>{objTextResource.GenereateTaskPdf_SubTitle}</span>
            </div>
            <div className="print-to-pdf-content-flex">
                <div className="mb-20">{objTextResource.GenereateTaskPdf_Message}</div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left nowrap">
                            {Localization.TextFormatter(objTextResource, "ExecutionName")}
                        </div>
                        <div className="row-right">
                            <input
                                type="text"
                                id="ExecutionName"
                                style={{ "width": "250px" }}
                                value={objContext.state.strExecutionName}
                                onChange={() => { objContext.TaskPdf_ModuleProcessor.HandleChange(objContext, event) }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left nowrap">
                            InputStatus
                        </div>
                        <div className="row-right" style={{ color: "red" }}>
                            (-NI-)
                        </div>
                    </div>
                </div>

                {
                    objContext.props.Data.PdfType == "Task" && state.strPerCentage ?
                        <React.Fragment>
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="row-right">
                                        <ProgressBar Data={{ Percentage: state.strPerCentage, ProgressText: ""}} />
                                    </div>
                                </div>
                            </div>
                            {
                                state.strPerCentage == "100" ?
                                    <div className="col col-1">
                                        <div className="col-item">
                                            <div className="row-right file-name">
                                                <span><a href={props.ParentProps.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + state.strFilePath + "&Type=" + "Offline/GenerateTaskPdf" + "&DisplayFileName=" + state.strExecutionName + ".pdf"}>{state.strExecutionName + ".pdf"}</a> </span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <React.Fragment />
                            }                            
                        </React.Fragment>            
                        :
                        <React.Fragment/>
                }
            </div>
            <div className="print-to-pdf-footer">
                <button className="ptp-btn" onClick={() => objContext.props.Data.PdfType == "Task" ? objContext.TaskPdf_ModuleProcessor.GenerateSingleTaskPdf(objContext) : objContext.TaskPdf_ModuleProcessor.InsertOfflineExecutionDetails(objContext)}>
                    {objTextResource.Okay}
                </button>
                <button className="ptp-btn" onClick={() => { Popup.ClosePopup(props.Id); }}>
                    {objTextResource.Cancel}
                </button>
            </div>
        </div>
    }

    return  GetContent();
}

export default TaskPdf;