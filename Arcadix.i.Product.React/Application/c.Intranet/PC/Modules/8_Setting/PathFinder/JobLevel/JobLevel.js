// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as JobLevel_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/JobLevel_Hook';
import JobLevel_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/JobLevel_ModuleProcessor";

/**
* @name JobLevel
* @param {object} props props
* @summary This component displays the JobLevel  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with JobLevel  details.
*/
const JobLevel = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, JobLevel_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "JobLevel", ["JobLevel_ModuleProcessor"]: new JobLevel_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in JobLevel_Hook, that contains all the custom hooks.
    * @returns null
    */
    JobLevel_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.JobLevel_ModuleProcessor.Initialize(objContext, objContext.JobLevel_ModuleProcessor);

    /**
    * @name GetStateDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetStateDropDown = (objTextResource, DropDown) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="StateDropDown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                    SelectedValue: state.iStateId ? state.iStateId : 0
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobLevel_ModuleProcessor.OnStateDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.JobLevel_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
        * @name GetJobTypeDropDown
        * @summary Forms the  jsx required for the dropdown.
        * @returns {object} jsx, React.Fragment
        */
    const GetJobFieldDropDown = (objTextResource, DropDown) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="JobFieldDropDown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"] ?? [],
                    SelectedValue: state.uJobFieldId != "00000000-0000-0000-0000-000000000000" ? state.uJobFieldId : "00000000-0000-0000-0000-000000000000",
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
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["iStateId"] == objContext.state.iStateId && objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobLevel_ModuleProcessor.OnJobFieldDropDownChange(objContext, objChangeData)
                }}
                ParentProps={{ ...props }}
            />
        );
    }


    /**
    * @name GetContent
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobLevel", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Organisationseinheit")}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Berufsfelder")}</span>
                        {GetJobFieldDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='JobLevelGrid'
                        Data={objContext.JobLevel_ModuleProcessor.GetGridData(objContext)}
                        Meta={objContext.JobLevel_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.JobLevel_ModuleProcessor.GetResourceData(objContext)}
                        CallBacks={objContext.JobLevel_ModuleProcessor.GetGridCallBacks(objContext)}  
                        ParentProps={{ ...props }}
                    />
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

export default connect(IntranetBase_Hook.MapStoreToProps(JobLevel_ModuleProcessor.StoreMapList()))(JobLevel);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = JobLevel_ModuleProcessor; 