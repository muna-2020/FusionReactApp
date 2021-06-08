// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related imports
import CurrentExecutionName_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/Preload/CurrentExecutionName/CurrentExecutionName_ModuleProcessor";
import * as CurrentExecutionName_Hook from "@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/Preload/CurrentExecutionName/CurrentExecutionName_Hook";


/**
* @name CurrentExecutionName
* @param {object} props props
* @summary This component displays the CurrentExecutionName data in View.
* @returns {object} React.Fragement that encapsulated the display grid with CurrentExecutionName details.
*/
const CurrentExecutionName = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, CurrentExecutionName_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["CurrentExecutionName_ModuleProcessor"]: new CurrentExecutionName_ModuleProcessor()};


    /**  
    * @name GetContent
    * @summary Get the content to display
    * @return {JSX} Jxs
    */
    function GetContent() {
        return (
            <React.Fragment>
                <div style={{ "paddingLeft": "100px", "paddingTop": "50px" }}>
                    <span>{props.Resource.Text["ExecutionNameInput"]}</span>
                    <br />
                    <input type="text" id="ExecutionName" style={{ "width": "250px" }} value={objContext.state.ExecutionName}
                        onChange={() => { objContext.CurrentExecutionName_ModuleProcessor.onChangeText(objContext,event) }} />
                    <br /><br />
                    <button id="ExecutionNameConfirm" style={{ "borderRadius": "3px", "backgroundColor": "#ffe8bf" }}
                        onClick={() => props.Events.ConfirmEvent(props.Id)}
                    >{props.Resource.Text["ExecutionConfirm"]}</button>
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

export default CurrentExecutionName;