// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AddEditMainClientThemeConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_Hook';
import AddEditMainClientThemeConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/AddEditMainClientThemeConfiguration/AddEditMainClientThemeConfiguration_ModuleProcessor';


const AddEditMainClientThemeConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditMainClientThemeConfiguration_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditMainClientThemeConfiguration_ModuleProcessor": new AddEditMainClientThemeConfiguration_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditMainClientThemeConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditMainClientThemeConfiguration_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="MainClientThemeConfiguration" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'MainClientThemeConfiguration')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ThemeConfigurationName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vThemeConfigurationName'); })}
                                    className="text-input"
                                    id="vThemeConfigurationName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleChange("vThemeConfigurationName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientThemeConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vThemeConfigurationName"]}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'LanguageName')}</span>
                            </div>
                            <div className="row-right intranet-dropdown" Id="iLanguageId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iLanguageId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.Languagename,
                                        SelectedValue: state.objData["iLanguageId"] != undefined && state.objData ? state.objData["iLanguageId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iFrameworkLanguageId",
                                        DisplayColumn: "vLanguageIdentifier",
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
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleDropDownChange("iLanguageId", objChangeData, props, objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'DefaultLanguageName')}</span>
                            </div>
                            <div className="row-right intranet-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="vDefaultLanguageName"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.Languagename,
                                        SelectedValue: state.objData["iDefaultLanguageId"] != undefined && state.objData ? state.objData["iDefaultLanguageId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iFrameworkLanguageId",
                                        DisplayColumn: "vLanguageIdentifier",
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
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleDropDownChange("iDefaultLanguageId", objChangeData, props, objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Country')}</span>
                            </div>
                            <div className="row-right intranet-dropdown" id="iCountryId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iCountryId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.Country,
                                        SelectedValue: state.objData["iCountryId"] != undefined && state.objData ? state.objData["iCountryId"] : -1
                                    }}
                                    Meta={{
                                        DependingTableName: "t_Framework_Country_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iCountryId",
                                        DisplayColumn: "vCountryName",
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
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleDropDownChange("iCountryId", objChangeData, props, objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'IsSSL')}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input
                                        onFocus={(e => { objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.ValidateFocus(objContext, 'cIsSSL'); })}
                                        id="cIsSSL" type="checkbox" name=""
                                        checked={state.objData["cIsSSL"] && state.objData["cIsSSL"].toUpperCase() === "Y" ? true : false}
                                        onChange={(e) => {
                                            objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleChange("cIsSSL", e.target.checked ? "Y" : "N", objContext);
                                        }}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'EmailServer')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vEmailServer'); })}
                                    className="text-input"
                                    id="vEmailServer"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleChange("vEmailServer", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientThemeConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vEmailServer"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'TargetGroup')}</span>
                            </div>
                            <div className="row-right intranet-dropdown" Id="iTargetGroupId">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iTargetGroupId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.TargetGroup,
                                        SelectedValue: state.objData["iTargetGroupId"] != undefined ? state.objData["iTargetGroupId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "N",
                                        ValueColumn: "iTargetGroupId",
                                        DisplayColumn: "vTargetGroupName",
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
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleDropDownChange("iTargetGroupId", objChangeData, props, objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Theme')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vTheme'); })}
                                    className="text-input"
                                    id="vTheme"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleChange("vTheme", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientThemeConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientThemeConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vTheme"]}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div id="ValidationError" />
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
};

export default AddEditMainClientThemeConfiguration;
