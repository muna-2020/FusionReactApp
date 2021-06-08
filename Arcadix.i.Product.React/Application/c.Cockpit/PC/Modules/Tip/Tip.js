// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as Tip_Hook from '@shared/Application/c.Cockpit/Modules/Tip/Tip_Hook';
import Tip_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/Tip/Tip_ModuleProcessor";

//In-line Image imports...
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';
import PreviewNewWindowImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/PreviewNewWindow.svg?inline';

/**
 * @name Tip
 * @param {object} props props
 * @summary This component displays the Tip data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Tip details.
 */
const Tip = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, Tip_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Tip", ["Tip_ModuleProcessor"]: new Tip_ModuleProcessor() ,["ImageMeta"]: GetImageMeta()};

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} ModuleProcessor Props
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Tip_ModuleProcessor.Initialize(objContext, objContext.Tip_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Tip_Hook, that contains all the custom hooks.
     * @returns null
     */
    Tip_Hook.Initialize(objContext);

    /**
     * @name GetMainClientDropDown
     * @param {object} objTextResource Text Resource object
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
                    SelectedValue: state.strMainClientId ? state.strMainClientId : -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iMainClientId",
                    DisplayColumn: "vMainClientIdentifier",
                    DefaultOptionValue: -1,
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.Tip_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.Tip_ModuleProcessor.CheckDeletedDropDownDataEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    };


    /**
     * @name GetApplicationTypeDropDown
     * @param {object} objTextResource Text Resource object
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iApplicationTypeId"
                Data={{
                    DropdownData: state.arrApplicationId ?? [],
                    SelectedValue: state.strApplicationId ? state.strApplicationId : -1
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.Tip_ModuleProcessor.OnApplicationTypeDropDownChange(objChangeData, objContext),
                    CheckDeletedDropDownData: objContext.Tip_ModuleProcessor.CheckDeletedDropDownDataEventHandler
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", props) ?? {};
        
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        {props.ClientUserDetails.MainClientId == 0 ? <div className="filter-block">
                            <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectMainClient")}</span>
                            {GetMainClientDropDown(objTextResource)}
                        </div> : ""}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "SelectApplicationType")}</span>
                        {GetApplicationTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='TipGrid'
                        Meta={objContext.Tip_ModuleProcessor.GetMetaData(objContext)}
                        Data={objContext.Tip_ModuleProcessor.GetGridData(objContext)}
                        Resource={objContext.Tip_ModuleProcessor.GetResourceData(objContext)}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
 * */
const GetImageMeta = () => {
    return {
        OpenEditorImage: OpenEditorImage,
        PreviewNewWindowImage: PreviewNewWindowImage
    }
}

export default connect(CockpitBase_Hook.MapStoreToProps(Tip_ModuleProcessor.StoreMapList()))(Tip);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Tip_ModuleProcessor; 