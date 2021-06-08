// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as OnlineHelp_Hook from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/OnlineHelp_Hook';
import * as OnlineHelp_MetaData from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/OnlineHelp_MetaData';

//Helper classes.
import OnlineHelp_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/OnlineHelp_ModuleProcessor";

//Components used in module.
import OnlineHelpContentDisplay from "@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/OnlineHelpContentDisplay/OnlineHelpContentDisplay";
import Grid from '@root/Framework/Blocks/Grid/Grid';

//In-line Image imports...
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';

/**
 * @name OnlineHelp
 * @param {object} props 
 * @summary This component displays the OnlineHelp data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with OnlineHelp details.
 */
const OnlineHelp = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, OnlineHelp_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "OnlineHelp", ["OnlineHelp_ModuleProcessor"]: new OnlineHelp_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} ModuleProcessor Props
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.OnlineHelp_ModuleProcessor.Initialize(objContext, objContext.OnlineHelp_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in OnlineHelp_Hook, that contains all the custom hooks.
     * @returns null
     */
    OnlineHelp_Hook.Initialize(objContext);

    ///**
    // * @name GetMainClientDropDown
    // * @summary Forms the  jsx required for the dropdown.
    // * @returns {object} jsx, React.Fragment
    // */
    //const GetMainClientDropDown = (objTextResource) => {
    //    return (
    //        <WrapperComponent
    //            ComponentName={"Dropdown"}
    //            Id="MainClientDropdown"
    //            Data={{
    //                DropdownData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"],
    //                SelectedValue: state.objFilter["iMainClientId"] ? state.objFilter["iMainClientId"] : -1
    //            }}
    //            Meta={{
    //                IsLanguageDependent: "N",
    //                ValueColumn: "iMainClientId",
    //                DisplayColumn: "vMainClientIdentifier",
    //                DefaultOptionValue: - 1,
    //                ShowDefaultOption: "true"
    //            }}
    //            Resource={{
    //                Text: {
    //                    DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
    //                },
    //                JConfiguration: props.JConfiguration,
    //                SkinPath: props.JConfiguration.CockpitSkinPath
    //            }}
    //            Callbacks={{
    //                CheckDeletedDropDownData: (objNode) => {
    //                    return objNode["cIsDeleted"] == "N" ? true : false
    //                }
    //            }}
    //            Events={{
    //                OnChangeEventHandler: (objChangeData, props) => objContext.OnlineHelp_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
    //            }}
    //            ParentProps={{ ...props }}
    //        />
    //    );
    //}

    /**
     * @name GetApplicationTypeDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="ApplicationTypeDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [],
                    SelectedValue: state.objFilter["iApplicationTypeId"] ? state.objFilter["iApplicationTypeId"] : -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iApplicationTypeId",
                    DisplayColumn: "vApplicationName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseSelect")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.OnlineHelp_ModuleProcessor.OnApplicationTypeDropDownChange(objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetOnlineHelpGroupDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetOnlineHelpGroupDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="HelpGroupDropdown"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_OnlineHelpGroup)["Data"] ?? [],
                    SelectedValue: state.objFilter["uHelpGroupId"] ? state.objFilter["uHelpGroupId"] : -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "uHelpGroupId",
                    DisplayColumn: "vHelpGroupKey",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseSelect")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["iMainClientId"] == props.ClientUserDetails.MainClientId && objNode["iApplicationTypeId"] == objContext.state.objFilter["iApplicationTypeId"] ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.OnlineHelp_ModuleProcessor.OnHelpGroupIdeDropDownChange(objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/OnlineHelp", props) ?? {};
        let objData = {
            RowData: DataRef(props.Object_Cockpit_OnlineHelp, "Object_Cockpit_OnlineHelp;iMainClientId;" + props.JConfiguration.MainClientId)["Data"] ?? [],
        };
        return (
            <div className="file-explorer-container" id="OnlineHelp">

                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectApplicationType"]}</span>
                        {GetApplicationTypeDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectHelpGroup"]}</span>
                        {GetOnlineHelpGroupDropDown(objTextResource)}
                    </div>
                </div>
                <div className="file-explorer-flex">
                    <SplitPane
                        Meta={{ SplitDirection: "vertical", MinSize: 500, MaxSize: 1000, DefaultSize: "50%" }}
                    > 
                    <Grid
                        Id='OnlineHelpGrid'
                        Meta={{ ...OnlineHelp_MetaData.GetAddEditMetaData(), Filter: { ...objContext.state.objFilter } }}
                        Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.CockpitSkinPath }}
                        Data={objData}
                        ParentProps={{ ...props }}
                    />
                    <OnlineHelpContentDisplay
                        Data={{
                            PageJson: objContext.state.objPageJson ?? {}
                        }}
                        Resource={{
                            Text: objTextResource
                        }}
                        {...props}
                    />
                    </SplitPane>
                </div>
            </div>
        );
    }

    return (
        props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
    );
};

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
 * */
const GetImageMeta = () => {
    return {
        OpenEditorImage: OpenEditorImage
    }
}

export default connect(CockpitBase_Hook.MapStoreToProps(OnlineHelp_ModuleProcessor.StoreMapList()))(OnlineHelp);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = OnlineHelp_ModuleProcessor; 