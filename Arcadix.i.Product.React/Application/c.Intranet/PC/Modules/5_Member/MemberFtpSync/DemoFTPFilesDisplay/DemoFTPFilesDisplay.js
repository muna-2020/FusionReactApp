//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as DemoFTPFilesDisplay_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay/DemoFTPFilesDisplay_Hook';
import DemoFTPFilesDisplay_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay/DemoFTPFilesDisplay_ModuleProcessor';

//Components used...
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

/**
 * @name DemoFTPFilesDisplay
 * @param {object} props props
 * @summary This component displays the DemoFTPFilesDisplay data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with DemoFTPFilesDisplay details.
 */
const DemoFTPFilesDisplay = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DemoFTPFilesDisplay_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "DemoFTPFilesDisplay", ["DemoFTPFilesDisplay_ModuleProcessor"]: new DemoFTPFilesDisplay_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.DemoFTPFilesDisplay_ModuleProcessor.Initialize(objContext, objContext.DemoFTPFilesDisplay_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to laod the custom hooks.
     * @returns null
     */
    DemoFTPFilesDisplay_Hook.Initialize(objContext);

    /**
     * @name GetFolderDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetFolderDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"FolderDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="FolderDropDown"
                    Data={{
                        DropdownData: Localization.TextFormatter(objTextResource, "FolderData") ?? [],
                        SelectedValue: state.intFolderDropdownSelectedValue ? state.intFolderDropdownSelectedValue : -1
                    }}
                    Meta={{
                        ValueColumn: "vFolderValue",
                        DisplayColumn: "vFolderText",
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
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.DemoFTPFilesDisplay_ModuleProcessor.OnFolderDropDownChange(objContext, objChangeData)
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay", objContext.props) ?? {};
        return <div className="subject-container">
            <div className="filter" id="filterHeader">
                <div className="filter-block">
                    <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "FolderText")}</span>
                    {GetFolderDropDown(objTextResource)}
                </div>
            </div>
            <div>
                <React.Fragment>
                    <PerformanceProfiler ComponentName={"DemoFTPFilesDisplayGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id="DemoFTPFilesDisplayGrid"
                            Meta={objContext.DemoFTPFilesDisplay_ModuleProcessor.GetMetaData(objContext)}
                            Data={objContext.DemoFTPFilesDisplay_ModuleProcessor.GetGridData(objContext)}
                            Resource={objContext.DemoFTPFilesDisplay_ModuleProcessor.GetResourceData(objContext)}
                            Events={objContext.DemoFTPFilesDisplay_ModuleProcessor.GetGridEvents(objContext)}
                            CallBacks={objContext.DemoFTPFilesDisplay_ModuleProcessor.GetGridCallBacks(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </React.Fragment>
            </div>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(DemoFTPFilesDisplay_ModuleProcessor.StoreMapList()))(DemoFTPFilesDisplay);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DemoFTPFilesDisplay_ModuleProcessor; 