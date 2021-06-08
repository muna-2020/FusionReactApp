// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as Client_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Client/Client_Hook';
import Client_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/Client/Client_ModuleProcessor";


/**
 * @name Client
 * @param {object} props props
 * @summary This component displays the Client data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Client details.
 */
const Client = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, Client_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Client", ["Client_ModuleProcessor"]: new Client_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Client_ModuleProcessor.Initialize(objContext, objContext.Client_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Client_Hook, that contains all the custom hooks.
     * @returns null
     */
    Client_Hook.Initialize(objContext);

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
                    SelectedValue: state.objFilter.iMainClientId
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.Client_ModuleProcessor.HandleDropDownChange("iMainClientId", objChangeData, objContext),
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
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iApplicationTypeId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [],
                    SelectedValue: state.objFilter.iApplicationTypeId
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.Client_ModuleProcessor.HandleDropDownChange("iApplicationTypeId", objChangeData, objContext),
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'SelectMainClient')}</span>
                        {GetMainClientDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, 'SelectApplicationType')}</span>
                        {GetApplicationTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='ClientGrid'
                        Meta={objContext.Client_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.Client_ModuleProcessor.GetResourceData(objContext)}
                        Data={objContext.Client_ModuleProcessor.GetGridData(objContext)}
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

export default connect(CockpitBase_Hook.MapStoreToProps(Client_ModuleProcessor.StoreMapList()))(Client);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Client_ModuleProcessor;