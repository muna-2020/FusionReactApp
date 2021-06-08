//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditRoles_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AddEditRoles/AddEditRoles_Hook';
import AddEditRoles_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/AddEditRoles/AddEditRoles_ModuleProcessor';

/**
* @name AddEditRoles.
* @param {object} props props.
* @summary This component is used to Add/Edit the Roles data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditRoles = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditRoles_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditRoles_ModuleProcessor": new AddEditRoles_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditRoles_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    
    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="UserRoleName" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "UserRoleName" ? "block" : "none") }}>                    
                     
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "UserRoleName") + ": "}</span>
                            </div>
                            <div className="row-right" style={{ width: "80%" }}>                                
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vUserRoleName",
                                        DependingTableName: "t_Framework_MainClient_UserRole_Data",
                                        DisplayColumn: "vUserRoleName",
                                        AutoFocus: true
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditRoles_ModuleProcessor.HandleChange("t_Framework_MainClient_UserRole_Data.vUserRoleName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => { objContext.AddEditRoles_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditRoles_ModuleProcessor, objContext) }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "IsSystemRole") + ": "}</span>
                            </div>
                            <div className="row-right" style={{ width: "80%" }}>
                                <span>{objContext.props.Data.IsEdit ? (state.objData["cIsSystemRole"] ? state.objData["cIsSystemRole"] : "-") : "-"}</span>
                                {
                                    //<label className="checkbox">
                                    //    <input id="cIsArchiveSchool"
                                    //        name="check"
                                    //        type="checkbox"
                                    //        checked={state.objData["cIsArchiveSchool"] && state.objData["cIsArchiveSchool"].toUpperCase() === "Y" ? true : false}
                                    //    />
                                    //    <span className="checkmark" />
                                    //</label>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ValidationError"/>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
})

export default AddEditRoles;