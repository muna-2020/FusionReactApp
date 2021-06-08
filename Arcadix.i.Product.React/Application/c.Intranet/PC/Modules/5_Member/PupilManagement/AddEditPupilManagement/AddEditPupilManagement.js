//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditPupilManagement_Hook from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_Hook';
import AddEditPupilManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_ModuleProcessor';

/**
* @name AddEditPupilManagement.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditPupilManagement = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditPupilManagement_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditPupilManagement_ModuleProcessor": new AddEditPupilManagement_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditPupilManagement_Hook.Initialize(objContext);

    /**
   * @name GetStateDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetStateDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iStateId"
                Data={{
                    DropdownData: props.Data.DropdownData.StateData,
                    SelectedValue: objContext.state.objData["t_TestDrive_Member_School_Pupil"] ? state.objData["t_TestDrive_Member_School_Pupil"][0]["iStateId"] : -1
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditPupilManagement_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_School_Pupil", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditPupilManagement_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
   * @name GetSchoolDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetSchoolDropDown = (objTextResource) => {
        
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uSchoolId"
                Data={{
                    DropdownData: props.Data.DropdownData.SchoolData,
                    SelectedValue: objContext.state.objData["t_TestDrive_Member_School_Pupil"] ? state.objData["t_TestDrive_Member_School_Pupil"][0]["uSchoolId"] : -1
                }}
                Meta={{
                    ValueColumn: "uSchoolId",
                    DisplayColumn: "vSchoolName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultChooseSchool")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && objNode["iStateId"] == objContext.state.objData["t_TestDrive_Member_School_Pupil"][0]["iStateId"] ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditPupilManagement_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_School_Pupil", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditPupilManagement_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /** 
* @name GetTeacherDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetTeacherDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uTeacherId"
                Data={{
                    DropdownData: props.Data.DropdownData.TeacherData,
                    SelectedValue: objContext.state.objData["t_TestDrive_Member_Class_Pupil"] ? state.objData["t_TestDrive_Member_Class_Pupil"][0]["uTeacherId"] : -1
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
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && objNode["uSchoolId"] == objContext.state.objData["t_TestDrive_Member_School_Pupil"][0]["uSchoolId"]  ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditPupilManagement_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_Class_Pupil", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditPupilManagement_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
* @name GetClassDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetClassDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uClassId"
                Data={{
                    DropdownData: props.Data.DropdownData.ClassData,
                    SelectedValue: objContext.state.objData["t_TestDrive_Member_Class_Pupil"] ? state.objData["t_TestDrive_Member_Class_Pupil"][0]["uClassId"] : -1
                }}
                Meta={{
                    ValueColumn: "uClassId",
                    DisplayColumn: "vClassName",
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
                        return objNode["cIsDeleted"] == "N" && objNode["t_TestDrive_Member_Class_Teacher"].find(obj => obj["uTeacherId"] == objContext.state.objData["t_TestDrive_Member_Class_Pupil"][0]["uTeacherId"]) != null ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditPupilManagement_ModuleProcessor.HandleSubTableDropDownChange("t_TestDrive_Member_Class_Pupil", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditPupilManagement_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
* @name GetGenderDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetGenderDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iGenderId"
                Data={{
                    DropdownData: props.Data.DropdownData.GenderData,
                    SelectedValue: objContext.state.objData["t_TestDrive_Member_Class_Pupil"] ? state.objData["t_TestDrive_Member_Class_Pupil"][0]["uClassId"] : -1
                }}
                Meta={{
                    IsLanguageDependent: "Y",
                    DependingTableName: "t_TestDrive_Member_Gender_Data",
                    ValueColumn: "iGenderId",
                    DisplayColumn: "vGenderName",
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditPupilManagement_ModuleProcessor.HandleDropDownChange("iGenderId", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditPupilManagement_ModuleProcessor.CreateItemEventHandler
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
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "StateName")}</span>
                            <div className="row-right" >
                                {GetStateDropDown(objTextResource)}
                            </div>
                        </div>

                        <div className="filter-block col-item">
                            <span className="row-left">{Localization.TextFormatter(objTextResource, "SchoolName")}</span>
                            <div className="row-right">
                                {GetSchoolDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="filter-block col-item"> 
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "TeacherName")}</span>
                            <div className="row-right" >
                                {GetTeacherDropDown(objTextResource)}
                            </div>
                        </div>
                        <div className="filter-block col-item">
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "ClassName")}</span>
                            <div className="row-right" >
                                {GetClassDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="filter-block col-item">
                            <span className="row-left" >{Localization.TextFormatter(objTextResource, "Gender")}</span>
                            <div className="row-right" >
                                {GetGenderDropDown(objTextResource)}
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Name")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vName")}
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
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vFirstName")}
                                    value={state.objData["vFirstName"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "EMail")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vEmail"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vEmail", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vEmail")}
                                    value={state.objData["vEmail"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "BirthDate")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vBirthdate"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vBirthdate", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vBirthdate")}
                                    value={state.objData["vBirthdate"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Street")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vStreet"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vStreet", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vStreet")}
                                    value={state.objData["vStreet"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ZipCode")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iZIPCode"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("iZIPCode", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "iZIPCode")}
                                    value={state.objData["iZIPCode"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Town")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vTown"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditPupilManagement_ModuleProcessor.HandleChange("vTown", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditPupilManagement_ModuleProcessor.ValidateFocus(objContext, "vTown")}
                                    value={state.objData["vTown"]} />
                            </div>
                        </div>
                    </div>
                  


                </div>
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditPupilManagement;