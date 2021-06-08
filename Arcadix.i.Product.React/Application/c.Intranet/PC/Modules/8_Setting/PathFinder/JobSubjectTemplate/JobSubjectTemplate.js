// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Module related fies.
import * as JobSubjectTemplate_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate_Hook';
import JobSubjectTemplate_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate_ModuleProcessor";

/**
* @name JobSubjectTemplate
* @param {object} props props
* @summary This component displays the JobSubjectTemplate  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with JobSubjectTemplate  details.
*/
const JobSubjectTemplate = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, JobSubjectTemplate_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "JobSubjectTemplate", ["JobSubjectTemplate_ModuleProcessor"]: new JobSubjectTemplate_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.JobSubjectTemplate_ModuleProcessor.Initialize(objContext, objContext.JobSubjectTemplate_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in JobSubjectTemplate_Hook, that contains all the custom hooks.
    * @returns null
    */
    JobSubjectTemplate_Hook.Initialize(objContext);

    /**
    * @name GetJobFieldDropdown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetJobFieldDropdown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName="JobFieldDropdown" JConfiguration={JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="JobFieldDropdown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"] ?? [],
                        SelectedValue: state.uJobFieldId ? state.uJobFieldId : "00000000-0000-0000-0000-000000000000"
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
                            return objNode["cIsDeleted"] == "N" ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.JobSubjectTemplate_ModuleProcessor.OnJobFieldDropDownChange(objContext, objChangeData),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the whole module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label">{Localization.TextFormatter(objTextResource, "JobField") + ":"}</span>
                        {GetJobFieldDropdown(objTextResource)}
                    </div>
                </div>
                <React.Fragment>
                    <PerformanceProfiler ComponentName="JobSubjectTemplateGrid" JConfiguration={JConfiguration}>
                        <Grid
                            Id='JobSubjectTemplateGrid'
                            Meta={objContext.JobSubjectTemplate_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.JobSubjectTemplate_ModuleProcessor.GetResourceData(objContext)}
                            Data={objContext.JobSubjectTemplate_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={objContext.JobSubjectTemplate_ModuleProcessor.GetGridCallBacks(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </React.Fragment>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(JobSubjectTemplate_ModuleProcessor.StoreMapList()))(JobSubjectTemplate);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = JobSubjectTemplate_ModuleProcessor; 