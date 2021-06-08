// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditMainClient_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_ModuleProcessor';
import * as AddEditMainClient_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/AddEditMainClient/AddEditMainClient_Hook';

/**
 * @name AddEditMainClient
 * @param {object} props props
 * @summary This component is used to Add/Edit the MainClient data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditMainClient = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditMainClient_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditMainClient_ModuleProcessor": new AddEditMainClient_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditMainClientConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditMainClient_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="MainClient" className="tabcontent subject-management multilanguage-div">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'MainClient')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'MainClientIdentifier')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vMainClientIdentifier'); })}
                                className="text-input"
                                id="vMainClientIdentifier"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vMainClientIdentifier", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vMainClientIdentifier"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'MainClientName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vMainClientName",
                                    DependingTableName: "t_Framework_MainClient_Data",
                                    DisplayColumn: "vMainClientName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditMainClient_ModuleProcessor.HandleChange("t_Framework_MainClient_Data.vMainClientName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ManagerName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vManagerName'); })}
                                className="text-input"
                                id="vManagerName"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vManagerName", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vManagerName"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Title')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vTitle",
                                    DependingTableName: "t_Framework_MainClient_Data",
                                    DisplayColumn: "vTitle"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditMainClient_ModuleProcessor.HandleChange("t_Framework_MainClient_Data.vTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Street')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vStreet'); })}
                                className="text-input"
                                id="vStreet"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vStreet", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vStreet"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'MainClientThemeConfiguration')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iMainClientThemeConfigurationId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.MainClientThemeConfiguration,
                                    SelectedValue: state.objData["iMainClientThemeConfigurationId"] != undefined && state.objData ? state.objData["iMainClientThemeConfigurationId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iMainClientThemeConfigurationId",
                                    DisplayColumn: "vThemeConfigurationName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true",
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
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClient_ModuleProcessor.HandleDropDownChange("iMainClientThemeConfigurationId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditMainClient_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Town')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vTown'); })}
                                className="text-input"
                                id="vTown"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vTown", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vTown"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Phone')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                className="text-input"
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vPhone'); })}
                                id="vPhone"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vPhone", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vPhone"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Email')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                className="text-input"
                                onFocus={(e => { objContext.AddEditMainClient_ModuleProcessor.ValidateFocus(objContext, 'vEmail  '); })}
                                id="vEmail"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditMainClient_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditMainClient_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClient_ModuleProcessor, objContext)}
                                value={state.objData["vEmail"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'MainClientConfiguration')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iFusionMainClientConfigurationId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.MainClientConfiguration,
                                    SelectedValue: state.objData["iFusionMainClientConfigurationId"] != undefined && state.objData ? state.objData["iFusionMainClientConfigurationId"] : -1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "iMainClientConfigurationId",
                                    DisplayColumn: "vMainClientConfigurationName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true",
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
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClient_ModuleProcessor.HandleDropDownChange("iFusionMainClientConfigurationId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditMainClient_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>


                <div id="ValidationError" />
            </div>
        </React.Fragment>
    );
};

export default AddEditMainClient;
