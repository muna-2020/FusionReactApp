// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditClientHostUrl_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_ModuleProcessor';
import * as AddEditClientHostUrl_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_Hook';


/**
 * @name AddEditClientHostUrl
 * @param {object} props props
 * @summary This component is used to Add/Edit the ClientHostUrl data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditClientHostUrl = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditClientHostUrl_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditClientHostUrl_ModuleProcessor": new AddEditClientHostUrl_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditClientHostUrl_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditClientHostUrl_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="ClientHostUrl" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'ClientHostUrl')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'HostURL')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'vHostURL'); })}
                                className="text-input"
                                id="vHostURL"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("vHostURL", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientHostUrl_ModuleProcessor, objContext)}
                                value={state.objData["vHostURL"]}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ApplicationType')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iApplicationTypeId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.ApplicationType,
                                    SelectedValue: state.objData["iApplicationTypeId"] != undefined && state.objData ? state.objData["iApplicationTypeId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iApplicationTypeId",
                                    DisplayColumn: "vApplicationName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.JConfiguration,
                                    SkinPath: props.JConfiguration.CockpitSkinPath
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleApplicationtypeDropDownChange("iApplicationTypeId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditClientHostUrl_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Client')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iClientId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.Client,
                                    SelectedValue: state.objData["iClientId"] != undefined && state.objData ? state.objData["iClientId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iClientId",
                                    DisplayColumn: "vClientName",
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
                                        return (objNode["iMainClientId"] == state.objData["iMainClientId"] && objNode["iApplicationTypeId"] == state.objData["iApplicationTypeId"] && objNode["cIsDeleted"] == "N") ? objNode : null
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleDropDownChange("iClientId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditClientHostUrl_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'IsForTesting')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input
                                    onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'cIsForTesting'); })}
                                    id="cIsForTesting" type="checkbox" name=""
                                    checked={state.objData["cIsForTesting"] && state.objData["cIsForTesting"].toUpperCase() === "Y" ? true : false}
                                    onChange={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("cIsForTesting", e.target.checked ? "Y" : "N", objContext)}
                                />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'IsActive')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input
                                    onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'cIsActive'); })}
                                    id="cIsActive"
                                    type="checkbox" name=""
                                    checked={state.objData["cIsActive"] && state.objData["cIsActive"].toUpperCase() === "Y" ? true : false}
                                    onChange={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext)}
                                />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'StartPage')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'vStartPage'); })}
                                className="text-input"
                                id="vStartPage"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("vStartPage", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientHostUrl_ModuleProcessor, objContext)}
                                value={state.objData["vStartPage"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'TargetGroup')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iTargetGroupId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.TargetGroup,
                                    SelectedValue: state.objData["iTargetGroupId"] != undefined && state.objData ? state.objData["iTargetGroupId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iTargetGroupId",
                                    DisplayColumn: "vTargetGroupName",
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
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleDropDownChange("iTargetGroupId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditClientHostUrl_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'IsAngularApplication')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input
                                    onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'cIsAngularApplication'); })}
                                    id="cIsAngularApplication" type="checkbox" name=""
                                    checked={state.objData["cIsAngularApplication"] && state.objData["cIsAngularApplication"].toUpperCase() === "Y" ? true : false}
                                    onChange={(e) => {
                                        objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("cIsAngularApplication", e.target.checked ? "Y" : "N", objContext);
                                    }}
                                />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'TargetDeviceId')}</span>
                        </div>
                        <div className="row-right">
                            <input id="iTargetDeviceId"
                                className="text-input"
                                onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'iTargetDeviceId'); })}
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("iTargetDeviceId", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientHostUrl_ModuleProcessor, objContext)}
                                value={state.objData["iTargetDeviceId"]}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'PrefetchURL')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditClientHostUrl_ModuleProcessor.ValidateFocus(objContext, 'vPrefetchURL'); })}
                                className="text-input"
                                id="vPrefetchURL"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditClientHostUrl_ModuleProcessor.HandleChange("vPrefetchURL", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditClientHostUrl_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClientHostUrl_ModuleProcessor, objContext)}
                                value={state.objData["vPrefetchURL"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="ValidationError" />
        </React.Fragment>

    );
};

export default AddEditClientHostUrl;