//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import FTPFilesDisplay_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPFilesDisplay/FTPFilesDisplay_ModuleProcessor';
import * as FTPFilesDisplay_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPFilesDisplay/FTPFilesDisplay_Hook';

//Components used...
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

/**
 * @name FTPFilesDisplay
 * @param {object} props props
 * @summary This component displays the FTPFilesDisplay data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with FTPFilesDisplay details.
 */
const FTPFilesDisplay = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, FTPFilesDisplay_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "FTPFilesDisplay", ["FTPFilesDisplay_ModuleProcessor"]: new FTPFilesDisplay_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.FTPFilesDisplay_ModuleProcessor.Initialize(objContext, objContext.FTPFilesDisplay_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to laod the custom hooks.
     * @returns null
     */
    FTPFilesDisplay_Hook.Initialize(objContext);

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
                        OnChangeEventHandler: (objChangeData, props) => objContext.FTPFilesDisplay_ModuleProcessor.OnFolderDropDownChange(objContext, objChangeData)
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPFilesDisplay", objContext.props) ?? {};
        return <div className="subject-container">
            <div className="filter" id="filterHeader">
                <div className="filter-block">
                    <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "FolderText")}</span>
                    {GetFolderDropDown(objTextResource)}
                </div>
            </div>
            <div>
                <React.Fragment>
                    <PerformanceProfiler ComponentName={"FTPFilesDisplayGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id="FTPFilesDisplayGrid"
                            Meta={objContext.FTPFilesDisplay_ModuleProcessor.GetMetaData(objContext)}
                            Data={objContext.FTPFilesDisplay_ModuleProcessor.GetGridData(objContext)}
                            Resource={objContext.FTPFilesDisplay_ModuleProcessor.GetResourceData(objContext)}
                            Events={objContext.FTPFilesDisplay_ModuleProcessor.GetGridEvents(objContext)}
                            CallBacks={objContext.FTPFilesDisplay_ModuleProcessor.GetGridCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(FTPFilesDisplay_ModuleProcessor.StoreMapList()))(FTPFilesDisplay);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = FTPFilesDisplay_ModuleProcessor; 