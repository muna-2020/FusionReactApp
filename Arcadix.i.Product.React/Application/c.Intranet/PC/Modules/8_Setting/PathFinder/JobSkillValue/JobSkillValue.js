// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as JobSkillValue_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue/JobSkillValue_Hook';
import JobSkillValue_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue/JobSkillValue_ModuleProcessor";

/**
* @name JobSkillValue
* @param {object} props props
* @summary This component displays the JobSkillValue  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with JobSkillValue  details.
*/
const JobSkillValue = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, JobSkillValue_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "JobSkillValue", ["JobSkillValue_ModuleProcessor"]: new JobSkillValue_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.JobSkillValue_ModuleProcessor.Initialize(objContext, objContext.JobSkillValue_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in JobSkillValue_Hook, that contains all the custom hooks.
    * @returns null
    */
    JobSkillValue_Hook.Initialize(objContext);

    /**
     * @name GetStateDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="StateDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                    SelectedValue: state.objFilters.iStateId ? state.objFilters.iStateId : 0
                }}
                Meta={{
                    ValueColumn: "iStateId",
                    DisplayColumn: "vStateName",
                    DependingTableName: "t_TestDrive_Member_State_Data",
                    IsLanguageDependent: "Y",
                    DefaultOptionValue: 0,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobSkillValue_ModuleProcessor.HandleDropDownChange("iStateId", objChangeData, objContext)
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetJobFieldDropdown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetJobFieldDropdown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="JobFieldDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"] ?? [],
                    SelectedValue: state.objFilters.uJobFieldId
                }}
                Meta={{
                    ValueColumn: "uJobFieldId",
                    DisplayColumn: "vJobFieldName",
                    DependingTableName: "t_PathFinder_JobField_Data",
                    IsLanguageDependent: "Y",
                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                        return objNode["cIsDeleted"] == "N" && objNode["iStateId"] == state.objFilters.iStateId ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobSkillValue_ModuleProcessor.HandleDropDownChange("uJobFieldId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetJobsDropdown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetJobDropdown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="JobDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_Job)["Data"] ?? [],
                    SelectedValue: state.objFilters.uJobId
                }}
                Meta={{
                    ValueColumn: "uJobId",
                    DisplayColumn: "vJobName",
                    DependingTableName: "t_PathFinder_Jobs_Data",
                    IsLanguageDependent: "Y",
                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                        return objNode["cIsDeleted"] == "N" && objNode["t_PathFinder_Job_JobField"].find(obj => obj["uJobFieldId"] == state.objFilters["uJobFieldId"]) ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobSkillValue_ModuleProcessor.HandleDropDownChange("uJobId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetJobLevelDropdown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetJobLevelDropdown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="JobLevelDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobLevel)["Data"] ?? [],
                    SelectedValue: state.objFilters.uJobLevelId
                }}
                Meta={{
                    ValueColumn: "uJobLevelId",
                    DisplayColumn: "vJobLevelName",
                    DependingTableName: "t_PathFinder_JobField_JobLevel_Data",
                    IsLanguageDependent: "Y",
                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                        return objNode["cIsDeleted"] == "N" && objNode["uJobFieldId"] == state.objFilters["uJobFieldId"] ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobSkillValue_ModuleProcessor.HandleDropDownChange("uJobLevelId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetJobSkillValueTable
     * @summary Forms the  jsx required for the whole module.
     * @returns {object} jsx, React.Fragment
     */
    const GetJobSkillValueTable = (objTextResource) => {
        return <div className="job-skillvalue-grid">
            <WrapperComponent
                ComponentName={"FillHeight"}
                Meta={{
                    HeaderIds: ["MasterHeader", "TopHead", "TaskTitle", "BreadCrumb", "OfflineExecution", "filterHeader"],
                    FooterIds: ["FooterId"]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}>
                <table className="job-skillvalue-grid-table">
                    <tr>
                        <td className="header-cell">{Localization.TextFormatter(objTextResource, "Subject")}</td>
                        <td className="header-cell">{Localization.TextFormatter(objTextResource, "MinimumValue")}</td>
                        <td className="header-cell">{Localization.TextFormatter(objTextResource, "SubjectFromValue")}</td>
                        <td className="header-cell">{Localization.TextFormatter(objTextResource, "SubjectToValue")}</td>
                    </tr>
                    {objContext.state.arrSubjectTemplateData?.map(objSubjectTemplateData => {
                        let objSkillValueData = objContext.JobSkillValue_ModuleProcessor.GetJobSkillValueData(objSubjectTemplateData["iSubjectId"], objContext) ?? {};
                        return <tr>
                            <td className="subject-template">{objSubjectTemplateData["SubjectName"]}</td>
                            <td>
                                {objSubjectTemplateData["cHasMinimumValue"] == "Y" ?
                                    <input
                                        id=""
                                        type="text"
                                        className="text-input"
                                        value={objSkillValueData.iMinimumTestValue ? objSkillValueData.iMinimumTestValue : ""}
                                        onChange={(e) => { objContext.JobSkillValue_ModuleProcessor.HandleChange("iMinimumTestValue", e.target.value, objSubjectTemplateData["iSubjectId"], objContext) }}
                                    />
                                    : <React.Fragment />}
                            </td>

                            {objSubjectTemplateData["cHasFromToValue"] == "Y" ?
                                <React.Fragment>
                                    <td>
                                        <input
                                            id=""
                                            type="text"
                                            className="text-input"
                                            value={objSkillValueData.iSubSubjectFrom ? objSkillValueData.iSubSubjectFrom : ""}
                                            onChange={(e) => { objContext.JobSkillValue_ModuleProcessor.HandleChange("iSubSubjectFrom", e.target.value, objSubjectTemplateData["iSubjectId"], objContext) }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            id=""
                                            type="text"
                                            className="text-input"
                                            value={objSkillValueData.iSubSubjectTo ? objSkillValueData.iSubSubjectTo : ""}
                                            onChange={(e) => { objContext.JobSkillValue_ModuleProcessor.HandleChange("iSubSubjectTo", e.target.value, objSubjectTemplateData["iSubjectId"], objContext) }}
                                        />
                                    </td>
                                </React.Fragment>
                                : <React.Fragment>
                                    <td />
                                    <td />
                                </React.Fragment>}
                        </tr>
                    })}
                </table>
            </WrapperComponent>
        </div>
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the whole module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label">{Localization.TextFormatter(objTextResource, "State") + ":"}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label">{Localization.TextFormatter(objTextResource, "JobField") + ":"}</span>
                        {GetJobFieldDropdown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label">{Localization.TextFormatter(objTextResource, "Jobs") + ":"}</span>
                        {GetJobDropdown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label">{Localization.TextFormatter(objTextResource, "JobLevel") + ":"}</span>
                        {GetJobLevelDropdown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <button className="btn" onClick={() => { objContext.JobSkillValue_ModuleProcessor.OnSearchClick(objContext) }}>{Localization.TextFormatter(objTextResource, "Search")}</button>
                    </div>
                </div>
                <div>
                    {GetJobSkillValueTable(objTextResource)}
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(JobSkillValue_ModuleProcessor.StoreMapList()))(JobSkillValue);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = JobSkillValue_ModuleProcessor; 