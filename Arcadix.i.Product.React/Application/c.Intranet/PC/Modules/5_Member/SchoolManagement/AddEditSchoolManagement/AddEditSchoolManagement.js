//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditSchoolManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_Hook';
import AddEditSchoolManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_ModuleProcessor';

/**
* @name AddEditSchoolmanagment.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditSchoolmanagment = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditSchoolManagement_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditSchoolManagement_ModuleProcessor": new AddEditSchoolManagement_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditSchoolManagement_Hook.Initialize(objContext);

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
                        {Localization.TextFormatter(objTextResource, 'SchoolData')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'OrganizationalUnit')}</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown" Id="iStateId">
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
                                        Callbacks={{
                                            CheckDeletedDropDownData: (objNode) => {
                                                return objNode["cIsDeleted"] == "N" ? true : false
                                            }
                                        }}
                                        Events={{
                                            OnChangeEventHandler: (objChangeData, props) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleDropDownChange("iStateId", objChangeData, props, objContext),
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "SchoolName")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vSchoolName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vSchoolName", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vSchoolName", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vSchoolName"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Street")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vStreet"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vStreet", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vStreet", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vStreet"]} />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ZIPCode")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iZIPCode"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("iZIPCode", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("iZIPCode", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["iZIPCode"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolType')}</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown" Id="iSchoolTypeId">
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="iSchoolTypeId"
                                        Data={{
                                            DropdownData: props.Data.DropdownData.SchoolStatus,
                                            SelectedValue: state.objData["iSchoolTypeId"] != undefined && state.objData ? state.objData["iSchoolTypeId"] : -1
                                        }}
                                        Meta={{
                                            DependingTableName: "t_TestDrive_Member_School_SchoolType_Data",
                                            IsLanguageDependent: "Y",
                                            ValueColumn: "iSchoolTypeId",
                                            DisplayColumn: "vSchoolTypeName",
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
                                            OnChangeEventHandler: (objChangeData, props) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleDropDownChange("iSchoolTypeId", objChangeData, props, objContext),
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Phone")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vPhone"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vPhone", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vPhone", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vPhone"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "E-Mail")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vEmail"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vEmail", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vEmail"]} />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Town")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vTown"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vTown", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vTown", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vTown"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "IsTestSchool")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsTestSchool"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsTestSchool"] == "Y"}
                                        onChange={(e) => {
                                            objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("cIsTestSchool", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "IsStellwerk")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsStellwerk"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsStellwerk"] == "Y"}
                                        onChange={(e) => {
                                            objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("cIsStellwerk", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="title">{Localization.TextFormatter(objTextResource, 'ContactPerson')}</div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'TitleId')}</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown" Id="iTitleId">
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="iTitleId"
                                        Data={{
                                            DropdownData: props.Data.DropdownData.Title,
                                            SelectedValue: state.objData["iTitleId"] != undefined && state.objData ? state.objData["iTitleId"] : -1
                                        }}
                                        Meta={{
                                            DependingTableName: "t_TestDrive_Member_Title_Data",
                                            IsLanguageDependent: "Y",
                                            ValueColumn: "iTitleId",
                                            DisplayColumn: "vTitleName",
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
                                            OnChangeEventHandler: (objChangeData, props) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleDropDownChange("iTitleId", objChangeData, props, objContext),
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "FirstName")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vFirstName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vFirstName", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vFirstName"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Name")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditSchoolManagement_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditSchoolManagement_ModuleProcessor.ValidateOnBlur("vName", objContext)}
                                    onKeyDown={(e) => objContext.AddEditSchoolManagement_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditSchoolManagement_ModuleProcessor, objContext)}
                                    value={state.objData["vName"]} />
                            </div>
                        </div>
                    </div>
                    <div id="ValidationError"></div>
                </div>
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditSchoolmanagment;