// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as ClientHostUrl_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/ClientHostUrl_Hook';
import ClientHostUrl_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/ClientHostUrl_ModuleProcessor";


/**
 * @name ClientHostUrl
 * @param {object} props props
 * @summary This component displays the ClientHostUrl data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ClientHostUrl details.
 */
const ClientHostUrl = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ClientHostUrl_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClientHostUrl", ["ClientHostUrl_ModuleProcessor"]: new ClientHostUrl_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ClientHostUrl_ModuleProcessor.Initialize(objContext, objContext.ClientHostUrl_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ClientHostUrl_Hook, that contains all the custom hooks.
     * @returns null
     */
    ClientHostUrl_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClientHostUrl_ModuleProcessor.HandleDropDownChange("iMainClientId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetApplicationTypeDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iApplicationTypeId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [],
                    SelectedValue: state.strApplicationTypeId
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClientHostUrl_ModuleProcessor.HandleDropDownChange("iApplicationTypeId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetClientDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetClientDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iClientId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_Client)["Data"] ?? [],
                    SelectedValue: state.objFilter.iClientId
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iClientId",
                    DisplayColumn: "vClientName",
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
                        return (objNode["iMainClientId"] == objContext.state.strMainClientId && objNode["iApplicationTypeId"] == objContext.state.strApplicationTypeId && objNode["cIsDeleted"] == "N") ? objNode : null
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.ClientHostUrl_ModuleProcessor.HandleDropDownChange("iClientId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    };

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientHostUrl", props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectMainClient"]}</span>
                        {GetMainClientDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectApplicationType"]}</span>
                        {GetApplicationTypeDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectClient"]}</span>
                        {GetClientDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='ClientHostUrlGrid'
                        Meta={objContext.ClientHostUrl_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.ClientHostUrl_ModuleProcessor.GetResourceData(objContext)}
                        Data={objContext.ClientHostUrl_ModuleProcessor.GetGridData(objContext)}
                        ParentProps={props}
                    />
                </div>
            </div>
        );
    }

    return (
        props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
    );
};

export default connect(CockpitBase_Hook.MapStoreToProps(ClientHostUrl_ModuleProcessor.StoreMapList()))(ClientHostUrl);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClientHostUrl_ModuleProcessor;