// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditClientConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_ModuleProcessor';
import * as AddEditClientConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_Hook';

/**
 * @name AddEditClientConfiguration
 * @param {object} props props
 * @summary This component is used to Add/Edit the ClientConfiguration data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditClientConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditClientConfiguration_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditClientConfiguration_ModuleProcessor": new AddEditClientConfiguration_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditClientConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditClientConfiguration_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="ClientConfiguration" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'ClientConfiguration')}
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClientConfigurationName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                className="text-input"
                                onFocus={(e => { objContext.AddEditClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vClientConfigurationName'); })}
                                id="vClientConfigurationName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientConfiguration_ModuleProcessor.HandleChange("vClientConfigurationName", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientConfiguration_ModuleProcessor, objContext)}
                                value={state.objData["vClientConfigurationName"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClientIdentifier')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vClientIdentifier'); })}
                                className="text-input"
                                id="vClientIdentifier"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientConfiguration_ModuleProcessor.HandleChange("vClientIdentifier", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientConfiguration_ModuleProcessor, objContext)}
                                value={state.objData["vClientIdentifier"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'SecretKeyForToken')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vSecretKeyForToken'); })}
                                className="text-input"
                                id="vSecretKeyForToken"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientConfiguration_ModuleProcessor.HandleChange("vSecretKeyForToken", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientConfiguration_ModuleProcessor, objContext)}
                                value={state.objData["vSecretKeyForToken"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'SecretKeyForEncryption')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vSecretKeyForEncryption'); })}
                                className="text-input"
                                id="vSecretKeyForEncryption"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientConfiguration_ModuleProcessor.HandleChange("vSecretKeyForEncryption", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientConfiguration_ModuleProcessor, objContext)}
                                value={state.objData["vSecretKeyForEncryption"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="ValidationError" />
        </React.Fragment>

    );
};

export default AddEditClientConfiguration;
