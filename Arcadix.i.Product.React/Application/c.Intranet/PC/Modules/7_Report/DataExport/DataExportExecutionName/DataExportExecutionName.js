// React related imports.
import React, { useReducer } from 'react';

//Module related imports
import DataExportExecutionName_ModuleProcessor from "@shared/Application/c.Intranet/Modules/7_Report/DataExport/DataExportExecutionName/DataExportExecutionName_ModuleProcessor";
import * as DataExportExecutionName_Hook from "@shared/Application/c.Intranet/Modules/7_Report/DataExport/DataExportExecutionName/DataExportExecutionName_Hook";

/**
* @name DataExportExecutionName
* @param {object} props props
* @summary This component displays the DataExportExecutionName data in View.
* @returns {object} React.Fragement that encapsulated the display grid with DataExportExecutionName details.
*/
const DataExportExecutionName = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DataExportExecutionName_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["DataExportExecutionName_ModuleProcessor"]: new DataExportExecutionName_ModuleProcessor()};


    /**  
    * @name GetContent
    * @summary Get the content to display
    * @return {JSX} Jxs
    */
    function GetContent() {
        return (
            <React.Fragment>
                <div style={{ "paddingLeft": "100px", "paddingTop": "50px" }}>
                    <span>ExecutionNameInput:</span>
                    <br />
                    <input type="text" id="ExecutionName" style={{ "width": "250px" }} value={objContext.state.DataExportExecutionName}
                        onChange={() => { objContext.DataExportExecutionName_ModuleProcessor.onChangeText(objContext,event) }} />
                    <br /><br />
                    <button id="ExecutionNameConfirm" style={{ "borderRadius": "3px", "backgroundColor": "#ffe8bf" }}
                        onClick={() => props.Events.ConfirmEvent(props.Id)}
                    >ExecutionConfirm</button>
                </div>
            </React.Fragment>
        );
    }

    /**
    * @summary returns JSX
    */
    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
}
export default DataExportExecutionName;