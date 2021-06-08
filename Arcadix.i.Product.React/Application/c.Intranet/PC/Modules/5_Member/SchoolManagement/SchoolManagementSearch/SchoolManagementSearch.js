//React related imports...
import React, { useReducer, useMemo } from 'react';

//Module related fies...
import * as SchoolManagementSearch_Hook from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagementSearch/SchoolManagementSearch_Hook';
import SchoolManagementSearch_ModuleProcessor from "@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagementSearch/SchoolManagementSearch_ModuleProcessor";

/**
* @name SchoolManagementSearch
* @param {object} props props
* @summary This component gets jsx for SchoolManagement search filter block.
* @returns {object} React.Fragement that encapsulated the display grid with SchoolManagement details.
*/
const SchoolManagementSearch = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SchoolManagementSearch_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["SchoolManagementSearch_ModuleProcessor"]: new SchoolManagementSearch_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to laod the custom hooks.
     * @returns null
     */
    SchoolManagementSearch_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.SchoolManagementSearch_ModuleProcessor.HandleDropDownChange("state", objChangeData, objContext),
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
    * @name GetSchoolTypeDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetSchoolTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iSchoolTypeId"
                Data={{
                    DropdownData: props.Data.SchoolTypeData,
                    SelectedValue: objContext.state.objSearchFilters["iSchoolTypeId"] !== undefined ? objContext.state.objSearchFilters["iSchoolTypeId"] : -1
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
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.SchoolManagementSearch_ModuleProcessor.HandleDropDownChange("schooltype", objChangeData, objContext)
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
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "AllSchools")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.SchoolManagementSearch_ModuleProcessor.HandleDropDownChange("school", objChangeData, objContext)
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
        return useMemo(() => <div className="form-block school-management-search" id="SchoolManagementSearch">
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "OrganizationalUnit") + ": "}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetStateDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "SchoolLabelText") + ": "}</span>
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
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Name") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vName"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vName"] ? objContext.state.objSearchFilters["vName"] : ""} />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "FirstName") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vFirstName"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vFirstName"] ? objContext.state.objSearchFilters["vFirstName"] : ""} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Town") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vTown"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vTown"] ? objContext.state.objSearchFilters["vTown"] : ""} />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ZIPCode") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="iZIPCode"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["iZIPCode"] ? objContext.state.objSearchFilters["iZIPCode"] : ""} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Phone") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vPhone"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vPhone"] ? objContext.state.objSearchFilters["vPhone"] : ""} />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "EMail") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vEmail"
                            type="text"
                            vFilterType="wildcard"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vEmail"] ? objContext.state.objSearchFilters["vEmail"] : ""} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "SchoolType") + ": "}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetSchoolTypeDropDown(objTextResource)}
                        </div>
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Street") + ": "}</span></div>
                    <div className="row-right">
                        <input className="text-input"
                            id="vStreet"
                            type="text"
                            vFilterType="match"
                            onChange={(e) => {
                                objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                            }}
                            value={objContext.state.objSearchFilters["vStreet"] ? objContext.state.objSearchFilters["vStreet"] : ""} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "IsTestSchool") + ": "}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="cIsTestSchool"
                                name="check"
                                type="checkbox"
                                checked={state.objSearchFilters["cIsTestSchool"] == "Y"}
                                onChange={(e) => {
                                    objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }} />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "WithoutLogin") + ": "} (-NI-)</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="dtWhenLoginlEmailSent"
                                name="check"
                                type="checkbox"
                                checked={state.objSearchFilters["dtWhenLoginlEmailSent"] == null}
                                onChange={(e) => {
                                    objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }} />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "IsStellwerk") + ": "}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="cIsStellwerk"
                                name="check"
                                type="checkbox"
                                checked={state.objSearchFilters["cIsStellwerk"] == "Y"}
                                onChange={(e) => {
                                    objContext.SchoolManagementSearch_ModuleProcessor.AddSearchFilters(e, objContext)
                                }} />
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

export default SchoolManagementSearch;