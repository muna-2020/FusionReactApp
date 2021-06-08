// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as OfflineProcess_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess_Hook';
import OfflineProcess_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcess_ModuleProcessor";

/**
 * @name OfflineProcess
 * @param {object} props props
 * @summary This component displays the OfflineProcess  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with OfflineProcess  details.
 */
const OfflineProcess = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, OfflineProcess_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "OfflineProcess", ["OfflineProcess_ModuleProcessor"]: new OfflineProcess_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.OfflineProcess_ModuleProcessor.Initialize(objContext, objContext.OfflineProcess_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in OfflineProcess_Hook, that contains all the custom hooks.
     * @returns null
     */
    OfflineProcess_Hook.Initialize(objContext);

    /**
     * @name GetGateKeeperTargetTypeDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetGateKeeperTargetTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uTargetTypeId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Intranet_Setting_GateKeeperTargetType)["Data"] ?? [],
                    SelectedValue: state.strGateKeeperTargetTypeId ? state.strGateKeeperTargetTypeId : -1
                }}
                Meta={{
                    ValueColumn: "uTargetTypeId",
                    DisplayColumn: "vTargetGroupIdentifier",
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.OfflineProcess_ModuleProcessor.OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.OfflineProcess_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

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
                    SelectedValue: state.strMainClientId != -1 ? state.strMainClientId : -1
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.OfflineProcess_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "MainClient")}</span>
                        {GetMainClientDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Zielgruppe")}</span>
                        {GetGateKeeperTargetTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='OfflineProcessGrid'
                        Data={objContext.OfflineProcess_ModuleProcessor.GetGridData(objContext)}
                        Meta={objContext.OfflineProcess_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.OfflineProcess_ModuleProcessor.GetResourceData(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(OfflineProcess_ModuleProcessor.StoreMapList()))(OfflineProcess);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = OfflineProcess_ModuleProcessor;