// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import AddEditBusinessUnit_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/AddEditBusinessUnit/AddEditBusinessUnit_ModuleProcessor";
import * as AddEditBusinessUnit_Hook from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/AddEditBusinessUnit/AddEditBusinessUnit_Hook";

/**
 * @name AddEditBusinessUnit
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditBusinessUnit = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditBusinessUnit_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditBusinessUnit_ModuleProcessor": new AddEditBusinessUnit_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditBusinessUnit_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditBusinessUnit_Hook.Initialize(objContext);


    let objTextResource = props.Resource.Text;

    return (
        <React.Fragment>
            <div id="MainClientUser" className="tabcontent subject-management">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'BusinessUnit')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditBusinessUnit_ModuleProcessor.ValidateFocus(objContext, 'vBusinessUnitName'); })}
                                className="text-input"
                                id="vBusinessUnitName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditBusinessUnit_ModuleProcessor.HandleChange("vBusinessUnitName", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditBusinessUnit_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditBusinessUnit_ModuleProcessor, objContext)}
                                value={state.objData["vBusinessUnitName"]}
                            />
                        </div>
                    </div>
                </div>

                <div id="ValidationError" />
            </div>
        </React.Fragment>
    );
}

export default AddEditBusinessUnit;
