// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as JobField_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobField/JobField_Hook';
import JobField_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobField/JobField_ModuleProcessor";

/**
* @name JobField
* @param {object} props props
* @summary This component displays the JobField  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with JobField  details.
*/
const JobField = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, JobField_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "JobField", ["JobField_ModuleProcessor"]: new JobField_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in JobField_Hook, that contains all the custom hooks.
    * @returns null
    */
    JobField_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.JobField_ModuleProcessor.Initialize(objContext, objContext.JobField_ModuleProcessor);

    /**
     * @name GetStateDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource) => {
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.JobField_ModuleProcessor.OnStateDropDownChange(objContext, objChangeData),
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobField", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Organisationseinheit")}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='JobFieldGrid'
                        Meta={objContext.JobField_ModuleProcessor.GetMetaData(objContext)}
                        Data={objContext.JobField_ModuleProcessor.GetGridData(objContext)}
                        Resource={objContext.JobField_ModuleProcessor.GetResourceData(objContext)}
                        CallBacks={objContext.JobField_ModuleProcessor.GetGridCallBacks(objContext)}             
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

export default connect(IntranetBase_Hook.MapStoreToProps(JobField_ModuleProcessor.StoreMapList()))(JobField);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = JobField_ModuleProcessor; 