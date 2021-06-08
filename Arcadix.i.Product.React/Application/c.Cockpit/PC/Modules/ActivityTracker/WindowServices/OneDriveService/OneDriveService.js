// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as OneDriveService_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService/OneDriveService_Hook';
import OneDriveService_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService/OneDriveService_ModuleProcessor";

/**
 * @name OneDriveService
 * @param {object} props props
 * @summary This component displays the OneDriveService  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with OneDriveService  details.
 */
const OneDriveService = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, OneDriveService_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "OneDriveService", ["OneDriveService_ModuleProcessor"]: new OneDriveService_ModuleProcessor() };

    /**
      * @name  Initialize
      * @param {object} objContext context object
      * @summary Initializing API and DynamicStyles
      * @returns null
      */
    objContext.OneDriveService_ModuleProcessor.Initialize(objContext, objContext.OneDriveService_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in OneDriveService_Hook, that contains all the custom hooks.
     * @returns null
     */
    OneDriveService_Hook.Initialize(objContext);

    /**
     * @name GetMainClientDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iMainClientId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] ?? [],
                    SelectedValue: state.strMainClientId
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iMainClientId",
                    DisplayColumn: "vMainClientIdentifier",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.OneDriveService_ModuleProcessor.HandleDropdownChange(objChangeData, objContext),
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
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService", objContext.props) ?? [];
        return (
            <div className="subject-container">
                <div className="file-watcher" id="ServiceStatus">
                    <div>
                        <span>{Localization.TextFormatter(objTextResource, 'ServerName')}</span>
                        <span>{objContext.state.arrServiceStatusData?.[0]?.["ServerName"]}</span>
                        <span>{Localization.TextFormatter(objTextResource, 'Status')}</span>
                        <span>{objContext.state.arrServiceStatusData?.[0]?.["Status"]}</span>
                    </div>
                </div>
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "MainClient")}</span>
                        {GetMainClientDropDown(objTextResource)}
                    </div>
                </div>
                <Grid
                    Id='OneDriveServiceGrid'
                    Meta={objContext.OneDriveService_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.OneDriveService_ModuleProcessor.GetResourceData(objContext)}
                    Data={objContext.OneDriveService_ModuleProcessor.GetGridData(objContext)}
                    ParentProps={props}
                />
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(OneDriveService_ModuleProcessor.StoreMapList()))(OneDriveService);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = OneDriveService_ModuleProcessor;