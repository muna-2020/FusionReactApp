// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Helper classes.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";


//Module related fies.
import * as ClassType_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/ClassType_Hook';
import ClassType_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/ClassType_ModuleProcessor';

/**
 * @name ClassType
 * @param {object} props props
 * @summary This component displays the ClassType  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ClassType  details.
 */
const ClassType = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ClassType_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClassType", ["ClassType_ModuleProcessor"]: new ClassType_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ClassType_ModuleProcessor.Initialize(objContext, objContext.ClassType_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ClassType_Hook, that contains all the custom hooks.
     * @returns null
     */
    ClassType_Hook.Initialize(objContext);

    /**
     * @name GetStateDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"StateDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="StateDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        SelectedValue: state.strStateId ? state.strStateId : -1
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.ClassType_ModuleProcessor.OnStateDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.ClassType_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }


    /**
     * JSX for ClassType
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClassType", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "OrganizationalUnit")}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"ClassTypeGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='ClassTypeGrid'
                            Meta={objContext.ClassType_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.ClassType_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.ClassType_ModuleProcessor.GetGridData(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(ClassType_ModuleProcessor.StoreMapList()))(ClassType);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClassType_ModuleProcessor; 