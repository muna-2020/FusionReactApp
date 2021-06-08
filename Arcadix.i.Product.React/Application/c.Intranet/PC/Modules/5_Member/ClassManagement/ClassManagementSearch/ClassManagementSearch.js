//React related imports...
import React, { useReducer, useMemo } from 'react';

//Module related fies...
import * as ClassManagementSearch_Hook from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagementSearch/ClassManagementSearch_Hook';
import ClassManagementSearch_ModuleProcessor from "@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagementSearch/ClassManagementSearch_ModuleProcessor";


/**
* @name ClassManagementSearch
* @param {object} props props
* @summary This component gets jsx for ClassManagement search filter block.
* @returns {object} React.Fragement that encapsulated the display grid with ClassManagement details.
*/
const ClassManagementSearch = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ClassManagementSearch_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ClassManagementSearch_ModuleProcessor"]: new ClassManagementSearch_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to laod the custom hooks.
     * @returns null
     */
    ClassManagementSearch_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

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
                    DropdownData: props.Data.StateData,
                    SelectedValue: objContext.state.objSearchFilters["iStateId"] != undefined ? objContext.state.objSearchFilters["iStateId"] : -1
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
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "AllStateDropdownText")
                    },
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClassManagementSearch_ModuleProcessor.HandleDropDownChange("state", objChangeData, objContext),
                }}
                ParentProps={{ ...props.ParentProps }}
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
                Id="vSchoolName"
                Data={{
                    DropdownData: state.arrSchoolData,
                    SelectedValue: objContext.state.objSearchFilters["uSchoolId"] !== undefined ? objContext.state.objSearchFilters["uSchoolId"] : -1
                }}
                Meta={{
                    ValueColumn: "uSchoolId",
                    DisplayColumn: "vSchoolName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "ChooseSchool")
                    },
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && objNode["cIsTestSchool"] == objContext.state.objSearchFilters["cIsTestSchool"] && objNode["cIsStellwerk"] == objContext.state.objSearchFilters["cIsStellwerk"] ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClassManagementSearch_ModuleProcessor.HandleDropDownChange("school", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
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
                    DropdownData: state.arrTeacherData,
                    SelectedValue: objContext.state.objSearchFilters["uTeacherId"] != undefined ? objContext.state.objSearchFilters["uTeacherId"] : -1
                }}
                Meta={{
                    ValueColumn: "uTeacherId",
                    DisplayColumn: "vName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "ChooseTeacher")
                    },
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClassManagementSearch_ModuleProcessor.HandleDropDownChange("Teacher", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
    * @name GetSchoolYearDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetSchoolYearDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iSchoolYearId"
                Data={{
                    DropdownData: props.Data.SchoolYearData,
                    SelectedValue: objContext.state.objSearchFilters["iSchoolYearId"] != undefined ? objContext.state.objSearchFilters["iSchoolYearId"] : -1
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
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClassManagementSearch_ModuleProcessor.HandleDropDownChange("SchoolYear", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
         * @name GetContent
         * @summary Forms the jsx required for the FilterBlock in the Top.
         * @returns {object} jsx
         */
    const GetContent = () => {
        return useMemo(() => <div className="form-block school-management-search" id="ClassManagementSearch">
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "State")}:	</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetStateDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "SchoolName")}:	</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetSchoolDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TeacherName")}:	</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetTeacherDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ClassName")}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vClassName"
                            type="text"
                            vFilterType="match"
                            onChange={(e) => {
                                objContext.ClassManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vClassName"] ? objContext.state.objSearchFilters["vClassName"] : ""} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "SchoolYear")}:	</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetSchoolYearDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TestSchool")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="cIsTestSchool"
                                name="check"
                                type="checkbox"
                                checked={state.objSearchFilters["cIsTestSchool"] == "Y"}
                                onChange={(e) => {
                                    objContext.ClassManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }} />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left"><span>{objTextResource["IsStellwerk"]}:</span></div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="cIsStellwerk"
                                vFilterType="match"
                                type="checkbox"
                                checked={state.objSearchFilters["cIsStellwerk"] == "Y"}
                                onChange={(e) => { objContext.ClassManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext) }} />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="button-div">
                <button className="btn" onClick={() => { props.Events.OnSearchButtonClick(objContext.state) }}>{objTextResource["SearchButtonText"]}</button>
            </div>
        </div>, [state]);
    }

    return GetContent();
}

export default ClassManagementSearch;