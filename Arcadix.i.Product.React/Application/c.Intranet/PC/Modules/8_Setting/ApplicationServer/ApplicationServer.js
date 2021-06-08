// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as ApplicationServer_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/ApplicationServer_Hook';
import ApplicationServer_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/ApplicationServer_ModuleProcessor";

//In-line Image imports...
import ResetCounterImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ResetCounter_Large.png?inline';
import ShowDiagramImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/ShowDiagram_Large.png?inline';

/**
 * @name ApplicationServer
 * @param {object} props props
 * @summary This component displays the ApplicationServer  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ApplicationServer  details.
 */
const ApplicationServer = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ApplicationServer_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ApplicationServer", ["ApplicationServer_ModuleProcessor"]: new ApplicationServer_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ApplicationServer_ModuleProcessor.Initialize(objContext, objContext.ApplicationServer_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ApplicationServer_Hook, that contains all the custom hooks.
     * @returns null
     */
    ApplicationServer_Hook.Initialize(objContext);

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
                        OnChangeEventHandler: (objChangeData, props) => objContext.ApplicationServer_ModuleProcessor.OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.ApplicationServer_ModuleProcessor.CreateItemEventHandler
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ApplicationServer", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Zielgruppe")}</span>
                        {GetGateKeeperTargetTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"ApplicationServerGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='ApplicationServerGrid'
                            Meta={objContext.ApplicationServer_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.ApplicationServer_ModuleProcessor.GetGridResource(objContext,objTextResource)}
                            Data={objContext.ApplicationServer_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={objContext.ApplicationServer_ModuleProcessor.GetGridCallBack(objContext)}
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
        ResetCounterImage: ResetCounterImage,
        ShowDiagramImage: ShowDiagramImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(ApplicationServer_ModuleProcessor.StoreMapList()))(ApplicationServer);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ApplicationServer_ModuleProcessor; 