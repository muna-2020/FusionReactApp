//React related imports...
import React, { useReducer, useMemo } from 'react';

//Module related fies...
import * as PupilManagementSearch_Hook from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagementSearch/PupilManagementSearch_Hook';
import PupilManagementSearch_ModuleProcessor from "@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagementSearch/PupilManagementSearch_ModuleProcessor";


/**
* @name PupilManagementSearch
* @param {object} props props
* @summary This component gets jsx for PupilManagement search filter block.
* @returns {object} React.Fragement that encapsulated the display grid with PupilManagement details.
*/
const PupilManagementSearch = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, PupilManagementSearch_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilManagementSearch", ["PupilManagementSearch_ModuleProcessor"]: new PupilManagementSearch_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilManagementSearch_ModuleProcessor.Initialize(objContext, objContext.PupilManagementSearch_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    PupilManagementSearch_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.PupilManagementSearch_ModuleProcessor.HandleDropDownChange("state", objChangeData, objContext),
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
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultChooseSchool")
                    },
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && objNode["cIsTestSchool"] == objContext.state.objSearchFilters["cIsTestSchool"] && objNode["cIsStellwerk"] == objContext.state.objSearchFilters["cIsStellwerk"]? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.PupilManagementSearch_ModuleProcessor.HandleDropDownChange("school", objChangeData, objContext)
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
                    IsLanguageDependent: "N",
                    ValueColumn: "uTeacherId",
                    DisplayColumn: "vName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultSelectTeacher")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.PupilManagementSearch_ModuleProcessor.HandleDropDownChange("teacher", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
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
                    DropdownData: state.arrClassData,
                    SelectedValue: objContext.state.objSearchFilters["uClassId"] != undefined ? objContext.state.objSearchFilters["uClassId"] : -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "uClassId",
                    DisplayColumn: "vClassName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultSelectClass")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.PupilManagementSearch_ModuleProcessor.HandleDropDownChange("class", objChangeData, objContext)
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
        return useMemo(() => <div className="grey-bg" id="PupilManagementSearch">
            <div className="pupil-wrapper pupil-textbox">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "StateName")}:	</span>
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
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "TeacherName")}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            {GetTeacherDropDown(objTextResource)}
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "ClassName")}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            {GetClassDropDown(objTextResource)}
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "TestNumberLabelText") + "(-NI-)"}</span></div>
                        <div className="row-right">
                            <input className="text-input"
                                id=""
                                type="text"
                                value="" />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ActivePupilLabelText")}</span></div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id=""
                                Data={{
                                    DropdownData: Localization.TextFormatter(objTextResource, "ActivePupilLabelDropdown") != "" ? Localization.TextFormatter(objTextResource, "ActivePupilLabelDropdown"):[],
                                    SelectedValue: objContext.state.objSearchFilters["cIsViewed"] != undefined ? objContext.state.objSearchFilters["cIsViewed"] : 1
                                }}
                                Meta={{
                                    IsLanguageDependent: "N",
                                    ValueColumn: "cIsViewed",
                                    DisplayColumn: "vActivePupilLabel",
                                }}
                                Resource={{
                                    Text: {
                                    },
                                    JConfiguration: props.ParentProps.JConfiguration,
                                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                                }}
                                Callbacks={{
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.PupilManagementSearch_ModuleProcessor.HandleDropDownChange("IsViewed", objChangeData, objContext)
                                }}
                                ParentProps={{ ...props.ParentProps }}
                            />
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
                                vFilterType="wildcard"
                                onChange={(e) => {
                                    objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }}
                                value={objContext.state.objSearchFilters["vName"] ? objContext.state.objSearchFilters["vName"] : ""} />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "FirstName")}</span></div>
                        <div className="row-right">
                            <input className="text-input"
                                id="vFirstName"
                                type="text"
                                vFilterType="wildcard"
                                onChange={(e) => {
                                    objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }}
                                value={objContext.state.objSearchFilters["vFirstName"] ? objContext.state.objSearchFilters["vFirstName"] : ""} />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "EMail")}</span></div>
                        <div className="row-right">
                            <input className="text-input"
                                id="vEmail"
                                type="text"
                                vFilterType="wildcard"
                                onChange={(e) => {
                                    objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }}
                                value={objContext.state.objSearchFilters["vEmail"] ? objContext.state.objSearchFilters["vEmail"] : ""} />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left"><span>{objTextResource["TestPupilLabelText"]}:</span></div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsTestSchool"
                                    vFilterType="match"
                                    type="checkbox"
                                    checked={state.objSearchFilters["cIsTestSchool"] == "Y"}
                                    onChange={(e) => { objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext) }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left"><span>{objTextResource["ExternalLabelText"]}:</span></div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsExternal"
                                    vFilterType="match"
                                    type="checkbox"
                                    checked={state.objSearchFilters["cIsExternal"] == "Y"}
                                    onChange={(e) => { objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext) }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left"><span>{objTextResource["IsStellwerk"]}:</span></div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsStellwerk"
                                    vFilterType="match"
                                    type="checkbox"
                                    checked={state.objSearchFilters["cIsStellwerk"] == "Y"}
                                    onChange={(e) => { objContext.PupilManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext) }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="wrap mb-20">
                    <button className="FR btn" onClick={() => { props.Events.OnSearchButtonClick(objContext.state) }}>{objTextResource["SearchButtonText"]}</button>
                </div>
            </div>
        </div>, [state]);
    }

    return GetContent();
}

export default PupilManagementSearch;