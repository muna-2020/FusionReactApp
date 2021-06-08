// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import * as  AddEditBusinessUnitTeam_Hook from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_Hook";
import AddEditBusinessUnitTeam_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_ModuleProcessor";


/**
 * @name AdditionalProperty
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AdditionalProperty = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditBusinessUnitTeam_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditBusinessUnitTeam_ModuleProcessor": new AddEditBusinessUnitTeam_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditCategory_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditBusinessUnitTeam_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;


    const GetContent = () => {
        let objSelectedValuesforDropDown = objContext.AddEditBusinessUnitTeam_ModuleProcessor.GetSelectedValuesforDropDown(objContext);
        let objMultiselectData = {
            MultiSelectDropdownData: props.Data.UserRoleData,
            SelectedItems: objSelectedValuesforDropDown["arrMultiselectDropDownValue"]
        };
        if (objSelectedValuesforDropDown["arrMultiselectDropDownValue"].length == 0) {
            objMultiselectData = {
                MultiSelectDropdownData: props.Data.UserRoleData,
            }
        }
        return (
            <React.Fragment>
                <div id="BusinessUnitTeam" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'BusinessUnit')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Team')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    onFocus={(e => { objContext.AddEditBusinessUnitTeam_ModuleProcessor.ValidateFocus(objContext, 'vTeamName'); })}
                                    className="text-input"
                                    id="vTeamName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditBusinessUnitTeam_ModuleProcessor.HandleChange("vTeamName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditBusinessUnitTeam_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditBusinessUnitTeam_ModuleProcessor, objContext)}
                                    value={state.objData["vTeamName"]} />
                            </div>
                        </div>
                    </div>


                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span >{Localization.TextFormatter(objTextResource, 'Roles')}</span>
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
                                        DefaultOptionTextKey: 'DefaultOptionText'
                                    }}
                                    Data={objMultiselectData}
                                    Resource={{
                                        SkinPath: JConfiguration.IntranetSkinPath,
                                        Text: objTextResource
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (arrItem) => objContext.AddEditBusinessUnitTeam_ModuleProcessor.HandleMultiSelectDropDownChange("uUserRoleId", arrItem, props, objContext)
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
                    </div>

                    <div id="ValidationError"></div>
                </div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

}

export default AdditionalProperty;