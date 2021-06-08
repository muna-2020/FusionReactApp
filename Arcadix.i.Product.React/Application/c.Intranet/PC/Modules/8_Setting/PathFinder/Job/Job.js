// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as Job_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/Job_Hook';
import Job_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/Job_ModuleProcessor";

/**
* @name Job
* @param {object} props props
* @summary This component displays the Job  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Job  details.
*/
const Job = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Job_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Job", ["Job_ModuleProcessor"]: new Job_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Job_Hook, that contains all the custom hooks.
    * @returns null
    */
    Job_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Job_ModuleProcessor.Initialize(objContext, objContext.Job_ModuleProcessor);


    /**
     * @name GetStateDropDown
     * @summary Forms the  JSX required for the DropDown.
     * @returns {object} JSX, React.Fragment
     */
    const GetStateDropDown = (objTextResource, DropDown) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="StateDropDown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                    SelectedValue: state.iStateId  ? state.iStateId : -1
                }}
                Meta={{
                    ValueColumn: "iStateId",
                    DisplayColumn: "vStateName",
                    DependingTableName: "t_TestDrive_Member_State_Data",
                    IsLanguageDependent: "Y",
                    DefaultOptionValue: -1,
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.Job_ModuleProcessor.OnStateDropDownChange(objContext, objChangeData),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
        * @name GetJobTypeDropDown
        * @summary Forms the  JSX required for the DropDown.
        * @returns {object} JSX, React.Fragment
        */
    const GetJobTypeDropDown = (objTextResource, DropDown) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="JobTypeDropDown"
                Data={{
                    DropdownData: objTextResource["arrJobType"] ?? [],
                    SelectedValue: state.iJobTypeId ? state.iJobTypeId : -1
                }}
                Meta={{
                    ValueColumn: "iJobTypeId",
                    DisplayColumn: "vJobType",
                    DefaultOptionValue: -1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.Job_ModuleProcessor.OnJobTypeDropDownChange(objContext, objChangeData)
                }}
                ParentProps={{ ...props }}
            />
        );
    }


    /**
    * @name GetContent
    * @summary Forms the  JSX required for the DropDown.
    * @returns {object} JSX, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Filter")}</span>
                        {GetJobTypeDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Organisationseinheit")}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='JobGrid'
                        Meta={objContext.Job_ModuleProcessor.GetMetaData(objContext)}
                        Data={objContext.Job_ModuleProcessor.GetGridData(objContext)}
                        Resource={objContext.Job_ModuleProcessor.GetResourceData(objContext)}
                        Events={objContext.Job_ModuleProcessor.GetGridEvents(objContext)}
                        CallBacks={objContext.Job_ModuleProcessor.GetGridCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(Job_ModuleProcessor.StoreMapList()))(Job);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Job_ModuleProcessor; 