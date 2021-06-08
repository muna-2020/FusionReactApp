// React related imports.
import React, { useReducer } from 'react';

//Module Related imports.
import * as TaskExport_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskExport/TaskExport_Hook';
import TaskExport_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskExport/TaskExport_ModuleProcessor';

/**
 * @name TaskExport
 * @param {object} props props
 * @summary This component is used for Export of Task details into Excel.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TaskExport.
 */
const TaskExport = props => {


    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskExport_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["TaskExport_ModuleProcessor"]: new TaskExport_ModuleProcessor() };

    /**
     * @summary JSX for TaskExport
     */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        return <div className="print-to-pdf-parent">
            <div className="print-to-pdf-header">
                <span>{objTextResource.TaskExport_SubTitle}</span>
            </div>
            <div className="print-to-pdf-content-flex">
                <div className="mb-20">{objTextResource.TaskExport_Message}</div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className ="row-left">
                            <span>{props.Resource.Text["ExecutionName"]}</span>
                        </div>
                        <div className="row-right">
                            <input type="text" id="ExecutionName" style={{ "width": "250px" }} value={objContext.state.strExecutionName}
                                onChange={() => { objContext.TaskExport_ModuleProcessor.HandleChange(objContext, event) }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="print-to-pdf-footer">
                <button className="ptp-btn" onClick={() => objContext.TaskExport_ModuleProcessor.InsertOfflineExecutionDetails(objContext)}>
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

export default TaskExport;