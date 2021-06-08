// React related imports.
import React, { useReducer } from 'react';

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
  * @name ShowProcedureDefinition
  * @param {object} props props
  * @summary This component displays the DatabaseComparision procedure definition.
  * @returns {object} React.Fragement that encapsulated the display grid with DatabaseCompare details.
  */
const ShowProcedureDefinition = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, { isSql: true });

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch };

    /**  
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
    function GetContent() {
        if (state.ProcedureData == undefined) {
            OnClickNavigation(objContext, "SqlProcedure") 
        }

        return (
            <React.Fragment>
                <div>
                    <ul style={{ "display": "flex" }} className="peformance-navigation" id="FilterBlock">
                        <li>
                            <span id="SqlProcedure" className={state.isSql ? "" : "active"} onClick={(event) => { OnClickNavigation(objContext, "SqlProcedure") }} >{"SqlProcedure"}</span>
                        </li>
                        <li>
                            <span id="PostgresProcedure" className={state.isSql ? "active" : ""} onClick={(event) => { OnClickNavigation(objContext, "PostgresProcedure") }} >{"PostgresProcedure"}</span>
                        </li>
                    </ul>
                </div>
                <div className="task-container">
                    {
                        state.ProcedureData && state.ProcedureData.length != 0 ?
                            <React.Fragment>
                                <textarea rows="30" cols="100" style={{ "margin": "0px", "width": "948px", "height": "632px", "resize": "none" }}
                                    value={state.ProcedureData[0].ProcdureDefinition == null || state.ProcedureData[0].ProcdureDefinition == "" ? "no dependent procedure found." : state.ProcedureData[0].ProcdureDefinition}>
                                </textarea>
                            </React.Fragment> :
                            <span style={{ "color": "blue" }} >no dependent procedure found.</span>
                    }
                </div>
            </React.Fragment>
        );
    }

    /**
     * @name OnClickNavigation
     * @param {any} strTabType
     * @summary event to switch tabs
     */
    function OnClickNavigation(objContext, strTabType) {
        let objParams = props.Data.objParams;
        if (strTabType == "PostgresProcedure" && objParams) {
            objParams["Params"]["Provider"] = "Postgres"
        }
        else {
            objParams["Params"]["Provider"] = "Sql"
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetProcedureDetails", "POST", objParams)
            .then((objResponce) => {
                return objResponce.json();
            }).then((objJson) => {
                let objData = objJson["DatabaseCompare"].map((objProcs) => { return { ...objProcs, IsShowProc: false } });
                objContext.dispatch({ type: "SET_STATE", payload: { "ProcedureData": objData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            })

        objContext.dispatch({ type: "SET_STATE", payload: { isSql: strTabType == "SqlProcedure" ? true : false } });
        if (state.ProcedureData == undefined) {
            objContext.dispatch({ type: "SET_STATE", payload: { "ProcedureData": [] } });
        }
    }


    function GetContent1() {
        if (props.Data.ProcedureData.length != 0) {
            return (
                <React.Fragment>
                    <div>
                        <textarea rows="30" cols="100" style={{ "margin": "0px", "width": "948px", "height": "632px", "resize": "none" }}
                            value={props.Data.ProcedureData[0].ProcdureDefinition}>
                        </textarea>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <span style={{ "color": "blue" }} >no dependent procedure found.</span>
                </React.Fragment>
            );
        }
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

export default ShowProcedureDefinition;