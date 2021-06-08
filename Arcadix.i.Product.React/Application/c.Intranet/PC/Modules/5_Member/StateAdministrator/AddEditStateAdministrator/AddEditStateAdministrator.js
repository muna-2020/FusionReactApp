//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditStateAdministrator_Hook from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_Hook';
import AddEditStateAdministrator_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator_ModuleProcessor';

/**
* @name AddEditStateAdministrator.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditStateAdministrator = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditStateAdministrator_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditStateAdministrator_ModuleProcessor": new AddEditStateAdministrator_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditStateAdministrator_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    /**
    * @name GetContent
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="SchoolYear" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'Klassentypen')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'OrganizationalUnit')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iStateId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.State,
                                        SelectedValue: state.objData["iStateId"] != undefined && state.objData ? state.objData["iStateId"] : -1
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Member_State_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iStateId",
                                        DisplayColumn: "vStateName",
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
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditStateAdministrator_ModuleProcessor.HandleDropDownChange("iStateId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditStateAdministrator_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Name")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditStateAdministrator_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditStateAdministrator_ModuleProcessor.ValidateFocus(objContext, "vName")}
                                    onKeyDown={(e) => objContext.AddEditStateAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditStateAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vName"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "FirstName")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vFirstName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditStateAdministrator_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditStateAdministrator_ModuleProcessor.ValidateFocus(objContext, "vFirstName")}
                                    onKeyDown={(e) => objContext.AddEditStateAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditStateAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vFirstName"]} />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Email")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vEmail"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditStateAdministrator_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditStateAdministrator_ModuleProcessor.ValidateFocus(objContext, "vEmail")}
                                    onKeyDown={(e) => objContext.AddEditStateAdministrator_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditStateAdministrator_ModuleProcessor, objContext)}
                                    value={state.objData["vEmail"]} />
                            </div>
                        </div>
                    </div>

                </div>


                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditStateAdministrator;