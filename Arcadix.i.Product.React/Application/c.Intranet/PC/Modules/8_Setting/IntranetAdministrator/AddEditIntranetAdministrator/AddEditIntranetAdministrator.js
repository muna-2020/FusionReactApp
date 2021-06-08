// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import AddEditIntranetAdministrator_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator_ModuleProcessor";
import * as AddEditIntranetAdministrator_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator_Hook';

/**
 * @name AddEditIntranetAdministrator
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditIntranetAdministrator = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditIntranetAdministrator_Hook.GetInitialState(props));


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditIntranetAdministrator_ModuleProcessor": new AddEditIntranetAdministrator_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditIntranetAdministrator_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditIntranetAdministrator_Hook.Initialize(objContext);

    /**
     * @name GetMainClientDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <div className="col-item intranet-dropdown" >
                <div className="row-left">
                    <span>{Localization.TextFormatter(objTextResource, 'MainClient')}</span>
                </div>
                <div className="row-right">
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="iMainClientId"
                        Data={{
                            DropdownData: props.Data.MainClientData,
                            SelectedValue: state.objData["iMainClientId"] != undefined && state.objData ? state.objData["iMainClientId"] : -1
                        }}
                        Meta={{
                            IsLanguageDependent: "N",
                            ValueColumn: "iMainClientId",
                            DisplayColumn: "vMainClientIdentifier",
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
                            OnChangeEventHandler: (objChangeData, props) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleDropDownChange("iMainClientId", objChangeData, props, objContext),
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        );
    }

    /**
     * @name GetBusinessUnitDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetBusinessUnitDropDown = (objTextResource) => {
        return (
            <div className="col-item intranet-dropdown">
                <div className="row-left">
                    <span>{Localization.TextFormatter(objTextResource, 'BusinessUnit')}</span>
                </div>
                <div className="row-right" id="uBusinessUnitId">
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="uBusinessUnitId"
                        Data={{
                            DropdownData: props.Data.BusinessUnitData,
                            SelectedValue: state.objData["uBusinessUnitId"] != undefined && state.objData ? state.objData["uBusinessUnitId"] : -1
                        }}
                        Meta={{
                            IsLanguageDependent: "N",
                            ValueColumn: "uBusinessUnitId",
                            DisplayColumn: "vBusinessUnitName",
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
                            OnChangeEventHandler: (objChangeData, props) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleDropDownChange("uBusinessUnitId", objChangeData, props, objContext),
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        );
    }

    /**
     * @name GetBusinessUnitTeamDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetBusinessUnitTeamDropDown = (objTextResource) => {
        return <div className="col-item intranet-dropdown">
            <div className="row-left">
                <span >{Localization.TextFormatter(objTextResource, 'Team')}</span>
            </div>
            <div className="row-right">
                <WrapperComponent
                    ComponentName={"MultiSelectDropdown"}
                    Id="MultiSelectDropDown"
                    Meta={{
                        DisplayColumn: 'vTeamName',
                        ValueColumn: 'uTeamId',
                        IsLanguageDependent: "N",
                        DefaultOptionValue: -1,
                        ShortNameColumn: "vTeamName",
                        ShowDefaultOption: true,
                        DefaultOptionTextKey: 'PleaseChoose'
                    }}
                    Data={{
                        MultiSelectDropdownData: props.Data.BusinessUnitTeamData,
                        SelectedItems: objContext.AddEditIntranetAdministrator_ModuleProcessor.GetSelectedDropdownItems("BusinessUnitTeam", objContext)
                    }}
                    Resource={{
                        SkinPath: JConfiguration.IntranetSkinPath,
                        Text: objTextResource
                    }}
                    Events={{
                        OnChangeEventHandler: (arrItem) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleMultiSelectDropDownChange("uTeamId", arrItem, props, objContext)
                    }}
                    CallBacks={{
                        CheckDeletedDropDownData: (objItem) => {
                            return objItem["cIsDeleted"] == "N" && objItem["uBusinessUnitId"] == state.objData["uBusinessUnitId"] ? true : false
                        }
                    }}
                    ParentProps={{ ...props }}
                />

            </div>
        </div>
    }

    /**
     * @name GetUserRoleDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetUserRoleDropDown = (objTextResource) => {
        return <div className="col-item intranet-dropdown">
            <div className="row-left">
                <span >{Localization.TextFormatter(objTextResource, 'Role')}</span>
            </div>
            <div className="row-right">
                <WrapperComponent
                    ComponentName={"MultiSelectDropdown"}
                    Id="MultiSelectDropDown"
                    Meta={{
                        DisplayColumn: 'vUserRoleName',
                        ValueColumn: 'uUserRoleId',
                        IsLanguageDependent: "Y",
                        DependingTableName: "t_Framework_MainClient_UserRole_Data",
                        ShortNameColumn: "vUserRoleName",
                        DefaultOptionValue: -1,
                        ShowDefaultOption: true,
                        DefaultOptionTextKey: 'PleaseChoose'
                    }}
                    Data={{
                        MultiSelectDropdownData: props.Data.UserRoleData,
                        SelectedItems: objContext.AddEditIntranetAdministrator_ModuleProcessor.GetSelectedDropdownItems("UserRole", objContext)
                    }}
                    Resource={{
                        SkinPath: JConfiguration.IntranetSkinPath,
                        Text: objTextResource
                    }}
                    Events={{
                        OnChangeEventHandler: (arrItem) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleMultiSelectDropDownChange("uUserRoleId", arrItem, props, objContext)
                    }}
                    CallBacks={{
                        CheckDeletedDropDownData: (objItem) => {
                            return objItem["cIsDeleted"] == "N" ? true : false
                        }
                    }}
                    ParentProps={{ ...props }}
                />

            </div>
        </div>
    }

    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        //let objSelectedRoles = objContext.AddEditIntranetAdministrator_ModuleProcessor.GetSelectedValuesforDropDown(objContext);
        //let objMultiselectData = {
            
        //};
        //if (objSelectedValuesforDropDown["arrMultiselectDropDownValue"].length == 0) {
        //    objMultiselectData = {
        //        MultiSelectDropdownData: props.Data.UserRoleData,
        //    }
        //}
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
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditIntranetAdministrator_ModuleProcessor.ValidateFocus(objContext, 'vName'); })}
                                    className="text-input"
                                    id="vName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditIntranetAdministrator_ModuleProcessor, objContext)}
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
                                    onFocus={(e => { objContext.AddEditIntranetAdministrator_ModuleProcessor.ValidateFocus(objContext, 'vFirstName'); })}
                                    className="text-input"
                                    id="vFirstName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditIntranetAdministrator_ModuleProcessor, objContext)}
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
                                    onFocus={(e => { objContext.AddEditIntranetAdministrator_ModuleProcessor.ValidateFocus(objContext, 'vEmail'); })}
                                    className="text-input"
                                    id="vEmail"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditIntranetAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vEmail"]}
                                />
                            </div>
                        </div>

                        {(objContext.props.ParentProps.ClientUserDetails.MainClientId == 0) ? GetMainClientDropDown(objTextResource) : <div />}

                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'IPRestriction')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditIntranetAdministrator_ModuleProcessor.ValidateFocus(objContext, 'vIPRestriction'); })}
                                    className="text-input"
                                    id="vIPRestriction"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleChange("vIPRestriction", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditIntranetAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vIPRestriction"]}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'WindowUserName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditIntranetAdministrator_ModuleProcessor.ValidateFocus(objContext, 'vWindowUserName'); })}
                                    className="text-input"
                                    id="vWindowUserName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleChange("vWindowUserName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditIntranetAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditIntranetAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vWindowUserName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        {GetBusinessUnitDropDown(objTextResource)}
                        {GetBusinessUnitTeamDropDown(objTextResource)}
                    </div>
                    <div className="col col-2">
                        {GetUserRoleDropDown(objTextResource)}
                    </div>
                    <div id="ValidationError" />
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>{state.objData ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment/>}
        </React.Fragment>
    );    
}

export default AddEditIntranetAdministrator;