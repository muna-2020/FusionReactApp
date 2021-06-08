//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditClassManagment_Hook from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_Hook';
import AddEditClassManagment_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_ModuleProcessor';


/**
* @name AddEditClassmanagment.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditClassManagement = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditClassManagment_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditClassManagment_ModuleProcessor": new AddEditClassManagment_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditClassManagment_Hook.Initialize(objContext);

    /**
   * @name GetStateDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetStateDropDown = (objTextResource) => {
        let vHandleDropDownChangeValue = state.objData["t_TestDrive_Member_Class_Teacher"] ? state.objData["t_TestDrive_Member_Class_Teacher"][0] : {};
        let SelectedSiteValue = vHandleDropDownChangeValue["iStateId"] != undefined ? vHandleDropDownChangeValue["iStateId"] : -1;
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iStateId"
                Data={{
                    DropdownData: props.Data.DropdownData.State,
                    SelectedValue: SelectedSiteValue
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
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClassManagment_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_Class_Teacher", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditClassManagment_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
   * @name GetStateDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetSchoolDropDown = (objTextResource) => {
        let vHandleDropDownChangeValue = state.objData["t_TestDrive_Member_Class_Teacher"] ? state.objData["t_TestDrive_Member_Class_Teacher"][0] : {};
        let SelectedSchoolValue = vHandleDropDownChangeValue["uSchoolId"] != undefined ? vHandleDropDownChangeValue["uSchoolId"] : -1;
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uSchoolId"
                Data={{
                    DropdownData: state.arrSchoolData,
                    SelectedValue: SelectedSchoolValue
                }}
                Meta={{
                    ValueColumn: "uSchoolId",
                    DisplayColumn: "vSchoolName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && objNode["iStateId"] == vHandleDropDownChangeValue["iStateId"] && objNode["cIsTestSchool"] == state.objData["cIsTestSchool"] && objNode["cIsStellwerk"] == state.objData["cIsStellwerk"] ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClassManagment_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_Class_Teacher", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditClassManagment_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /** 
* @name GetStateDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetTeacherDropDown = (objTextResource) => {
        let vHandleDropDownChangeValue = state.objData["t_TestDrive_Member_Class_Teacher"] ? state.objData["t_TestDrive_Member_Class_Teacher"][0] : {};
        let SelectedTeacherValue = vHandleDropDownChangeValue["uTeacherId"] != undefined ? vHandleDropDownChangeValue["uTeacherId"] : -1;
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uTeacherId"
                Data={{
                    DropdownData: state.arrTeacherData,
                    SelectedValue: SelectedTeacherValue
                }}
                Meta={{
                    ValueColumn: "uTeacherId",
                    DisplayColumn: "vName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    //CheckDeletedDropDownData: (objNode) => {
                    //    return objNode["cIsDeleted"] == "N" && objNode["uSchoolId"] == vHandleDropDownChangeValue["uSchoolId"] ? true : false
                    //}
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClassManagment_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_Class_Teacher", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditClassManagment_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
* @name GetStateDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetSchoolYearDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iSchoolYearId"
                Data={{
                    DropdownData: props.Data.DropdownData.SchoolYear,
                    SelectedValue: state.objData && state.objData["iSchoolYear"] !== -1 ? state.objData["iSchoolYear"] : -1
                }}
                Meta={{
                    DependingTableName: "t_TestDrive_Member_Class_SchoolYear_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iSchoolYear",
                    DisplayColumn: "vSchoolYearName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClassManagment_ModuleProcessor.HandleDropDownChange("iSchoolYear", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditClassManagment_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }



    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="subject-container">
                    <div className="col col-2">
                        <div className="filter-block col-item">
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "State")}</span>
                            <div className="row-right intranet-dropdown" >
                                {GetStateDropDown(objTextResource)}
                            </div>
                        </div>

                        <div className="filter-block col-item">
                            <span className="row-left">{Localization.TextFormatter(objTextResource, "SchoolName")}</span>
                            <div className="row-right intranet-dropdown">
                                {GetSchoolDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="filter-block col-item">
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "TeacherName")}</span>
                            <div className="row-right intranet-dropdown" >
                                {GetTeacherDropDown(objTextResource)}
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ClassName")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vClassName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditClassManagment_ModuleProcessor.HandleChange("vClassName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditClassManagment_ModuleProcessor.ValidateFocus(objContext, "vClassName")}
                                    onKeyDown={(e) => objContext.AddEditClassManagment_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClassManagment_ModuleProcessor, objContext)}
                                    value={state.objData["vClassName"]} />
                            </div>
                        </div>

                    </div>

                    <div className="col col-2">
                        <div className="filter-block col-item">
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "SchoolYear")}</span>
                            <div className="row-right intranet-dropdown" >
                                {GetSchoolYearDropDown(objTextResource)}
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "IsTestSchool")}:</span></div>
                            <div className="row-right">
                                <label className="checkbox mt-10">
                                    <input
                                        onFocus={(e => { objContext.AddEditClassManagment_ModuleProcessor.ValidateFocus(objContext, 'cIsTestSchool'); })}
                                        className="text-input"
                                        id="cIsTestClass"
                                        type="checkbox"
                                        vFilterType="match"
                                        onChange={(e) => {
                                            objContext.AddEditClassManagment_ModuleProcessor.HandleChange("cIsTestSchool", e.target.checked == true ? "Y" : "N", objContext);
                                        }}
                                        checked={state.objData["cIsTestSchool"] == "Y"}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "IsStellwerk")}:</span></div>
                            <div className="row-right">
                                <label className="checkbox mt-10">
                                    <input
                                        onFocus={(e => { objContext.AddEditClassManagment_ModuleProcessor.ValidateFocus(objContext, 'cIsStellwerk'); })}
                                        className="text-input"
                                        id="cIsStellwerk"
                                        type="checkbox"
                                        vFilterType="match"
                                        onChange={(e) => {
                                            objContext.AddEditClassManagment_ModuleProcessor.HandleChange("cIsStellwerk", e.target.checked == true ? "Y" : "N", objContext);
                                        }}
                                        checked={state.objData["cIsStellwerk"] == "Y"}
                                    />
                                    <span className="checkmark" />
                                </label>
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
export default AddEditClassManagement;