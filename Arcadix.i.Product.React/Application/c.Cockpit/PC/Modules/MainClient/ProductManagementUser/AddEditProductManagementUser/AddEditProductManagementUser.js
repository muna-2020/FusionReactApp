// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditProductManagementUser_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser_ModuleProcessor";
import * as AddEditProductManagementUser_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser_Hook';


/**
 * @name AddEditProductManagementUser
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditProductManagementUser = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditProductManagementUser_Hook.GetInitialState());
    
    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditProductManagementUser_ModuleProcessor": new AddEditProductManagementUser_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditProductManagementUser_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditProductManagementUser_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    return (
        <React.Fragment>
            <div id="MainClientUser" className="tabcontent subject-management">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'Name')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditProductManagementUser_ModuleProcessor.ValidateFocus(objContext, 'vName'); })}
                                className="text-input"
                                id="vName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditProductManagementUser_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                }}
                                value={state.objData["vName"]}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'FirstName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditProductManagementUser_ModuleProcessor.ValidateFocus(objContext, 'vFirstName'); })}
                                className="text-input"
                                id="vFirstName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditProductManagementUser_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                }}
                                value={state.objData["vFirstName"]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'Email')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditProductManagementUser_ModuleProcessor.ValidateFocus(objContext, 'vEmail'); })}
                                className="text-input"
                                id="vEmail"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditProductManagementUser_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext)
                                }}
                                value={state.objData["vEmail"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'IsTwoFactorAuthenticationRequired')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input
                                    className="check-box"
                                    id="cIsTwoFactorAuthenticationRequired"
                                    type="checkbox"
                                    onChange={(e) => {
                                        objContext.AddEditProductManagementUser_ModuleProcessor.HandleChange("cIsTwoFactorAuthenticationRequired", e.target.checked ? "Y" : "N", objContext)
                                    }}
                                    checked={state.objData["cIsTwoFactorAuthenticationRequired"] == "Y" ? true : false}
                                />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'WindowUserName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditProductManagementUser_ModuleProcessor.ValidateFocus(objContext, 'vWindowUserName'); })}
                                className="text-input"
                                id="vWindowUserName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditProductManagementUser_ModuleProcessor.HandleChange("vWindowUserName", e.target.value, objContext)
                                }}
                                value={state.objData["vWindowUserName"]}
                            />
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </div>
        </React.Fragment>
    );
}

export default AddEditProductManagementUser;
