// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as CompetencyLevel_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/CompetencyLevel_Hook';
import CompetencyLevel_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/CompetencyLevel_ModuleProcessor";

/**
 * @name CompetencyLevel
 * @param {object} props props
 * @summary This component displays the CompetencyLevel  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with CompetencyLevel  details.
 */
const CompetencyLevel = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CompetencyLevel_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CompetencyLevel", ["CompetencyLevel_ModuleProcessor"]: new CompetencyLevel_ModuleProcessor() };

    /**
     * @name  InitializeSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CompetencyLevel_ModuleProcessor.Initialize(objContext, objContext.CompetencyLevel_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in CompetencyLevel_Hook, that contains all the custom hooks.
     * @returns null
     */
    CompetencyLevel_Hook.Initialize(objContext);

    /**
     * @name GetSubjectDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSubjectDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"SubjectDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SubjectDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] ?? [],
                        SelectedValue: state.strSubjectId ? state.strSubjectId : -1
                    }}
                    Meta={{
                        DependingTableName: "t_TestDrive_Subject_Data",
                        IsLanguageDependent: "Y",
                        ValueColumn: "iSubjectId",
                        DisplayColumn: "vSubjectName",
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
                            return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == "0" ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.CompetencyLevel_ModuleProcessor.OnSubjectDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.CompetencyLevel_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }


    /**
     * JSX for CompetencyLevel 
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/CompetencyLevel", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectSubjectArea")}</span>
                        {GetSubjectDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"CompetencyGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='CompetencyGrid'
                            Meta={objContext.CompetencyLevel_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.CompetencyLevel_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.CompetencyLevel_ModuleProcessor.GetGridData(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
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

export default connect(IntranetBase_Hook.MapStoreToProps(CompetencyLevel_ModuleProcessor.StoreMapList()))(CompetencyLevel);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CompetencyLevel_ModuleProcessor; 