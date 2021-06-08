// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as DatabaseServer_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/DatabaseServer/DatabaseServer_Hook';
import DatabaseServer_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/DatabaseServer/DatabaseServer_ModuleProcessor";

//In-line Image imports...
import ShowDiagramImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ShowDiagram_Large.png?inline';

/**
 * @name DatabaseServer
 * @param {object} props props
 * @summary This component displays the DatabaseServer  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with DatabaseServer  details.
 */
const DatabaseServer = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DatabaseServer_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "DatabaseServer", ["DatabaseServer_ModuleProcessor"]: new DatabaseServer_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting DatabaseServer
     */
    objContext.DatabaseServer_ModuleProcessor.Initialize(objContext, objContext.DatabaseServer_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in DatabaseServer_Hook, that contains all the custom hooks.
     * @returns null
     */
    DatabaseServer_Hook.Initialize(objContext);

    /**
     * @name GetGateKeeperTargetTypeDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetGateKeeperTargetTypeDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"GateKeeperDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="GateKeeperDropDown"
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.DatabaseServer_ModuleProcessor.OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.DatabaseServer_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }


    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/DatabaseServer", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Zielgruppe")}</span>
                        {GetGateKeeperTargetTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"DataBaseServerGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='DataBaseServerGrid'
                            Meta={objContext.DatabaseServer_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.DatabaseServer_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.DatabaseServer_ModuleProcessor.GetGridData(objContext)}
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

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        ShowDiagramImage: ShowDiagramImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(DatabaseServer_ModuleProcessor.StoreMapList()))(DatabaseServer);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DatabaseServer_ModuleProcessor;