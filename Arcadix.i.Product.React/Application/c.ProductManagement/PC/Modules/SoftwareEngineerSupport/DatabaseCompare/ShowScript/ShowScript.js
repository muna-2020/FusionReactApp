// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as ShowScript_Hook from '@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowScript/ShowScript_Hook';
import ShowScript_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowScript/ShowScript_ModuleProcessor";

/**
  * @name ShowScript
  * @param {object} props props
  * @summary This component displays the ShowScript.
  * @returns {object} React.Fragement .
  */
const ShowScript = props => {

    /**
        * @name [state,dispatch]
        * @summary Define state and dispatch for the reducer to set state.
        * @returns {[]} state and dispatch
        */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ShowScript_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ShowScript", ["ShowScript_ModuleProcessor"]: new ShowScript_ModuleProcessor() };

    /**
   * @name Initialize
   * @param {object} objContext context object
   * @summary Initialize method call in ShowScript_Hook, that contains all the custom hooks.
   * @returns null
   */
    ShowScript_Hook.Initialize(objContext);

    /**  
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
    function GetContent() {
        if (state.arrScriptData.length != 0) {
            return <div className="show-script-parent">
                {/*<button className="show-script-button" onClick={() => { objContext.ShowScript_ModuleProcessor.ExecuteScript(objContext) }}>RunScript</button>*/}
                <button className="show-script-button right" onClick={() => { Popup.ClosePopup(props.Id) }}>CLOSE</button>
                <ul className="show-script-list">
                    {
                        state.arrScriptData.map((strScript, intIndex) => {
                            return (
                                <li>
                                    <textarea rows="15" cols="50" value={strScript} onChange={(e) => {
                                        objContext.ShowScript_ModuleProcessor.HandleChange(e.target.value, intIndex, objContext)
                                    }} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        }
        else return <div className="show-script-no-data"><button className="show-script-button right" onClick={() => { Popup.ClosePopup(props.Id) }}>CLOSE</button><span>No Scripts Found</span></div>;
    }

    return state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default ShowScript;