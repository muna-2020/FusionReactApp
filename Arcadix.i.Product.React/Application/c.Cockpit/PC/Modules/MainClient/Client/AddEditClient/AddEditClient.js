// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditClient_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_ModuleProcessor';
import * as AddEditClient_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_Hook';


/**
 * @name AddEditClient
 * @param {object} props props
 * @summary This component is used to Add/Edit the ClientHostUrl data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditClient = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditClient_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditClient_ModuleProcessor": new AddEditClient_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditClient_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditClient_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="Client" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Client')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClientName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditClient_ModuleProcessor.ValidateFocus(objContext, 'vClientName'); })}
                                onKeyDown={(e) => objContext.AddEditClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClient_ModuleProcessor, objContext)}
                                className="text-input"
                                id="vClientName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClient_ModuleProcessor.HandleChange("vClientName", e.target.value, objContext);
                                }}
                                value={state.objData["vClientName"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClientConfiguration')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <div id="iClientConfigurationId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iClientConfigurationId"
                                    Data={{
                                        DropdownData: props.Data.DropDownData.ClientConfiguration,
                                        SelectedValue: state.objData["iClientConfigurationId"] != undefined && state.objData ? state.objData["iClientConfigurationId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iClientConfigurationId",
                                        DisplayColumn: "vClientConfigurationName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.Resource.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClient_ModuleProcessor.HandleDropDownChange("iClientConfigurationId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditClient_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationType')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <div id="iApplicationTypeId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iApplicationTypeId"
                                    Data={{
                                        DropdownData: props.Data.DropDownData.ApplicationType,
                                        SelectedValue: state.objData["iApplicationTypeId"] != undefined && state.objData ? state.objData["iApplicationTypeId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iApplicationTypeId",
                                        DisplayColumn: "vApplicationName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: true,
                                        SortData: true
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.Resource.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClient_ModuleProcessor.HandleDropDownChange("iApplicationTypeId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditClient_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div id="ValidationError" />
        </React.Fragment>
    );
};

export default AddEditClient;
