// React related imports
import React, { useReducer, useEffect, useRef } from "react";

//Module related fies.
import * as OfficeRibbon_Hook from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon_Hook';
import OfficeRibbon_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon_ModuleProcessor";
import * as OfficeRibbon_MetaData from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon_MetaData';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Component used in the module
import StartTab from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/1_StartTab/StartTab";
import InsertTab from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/2_InsertTab/InsertTab";
import TableTab from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/3_TablesTab/TablesTab";
import InteractionElementsTab from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionElementsTab";
import FormulaTab from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab";
import PageLanguageArea from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/PageLanguageArea/PageLanguageArea";

/**
 * @name OfficeRibbon
 * @param {object} props parent props.
 * @summary Editor office ribbon Components (contains various tab to performs Task related operations).
 * @returns {component} OfficeRibbon
 */
const OfficeRibbon = props => {

    /**
     * @name [state, dispatch]
     * @summary Gets the state and dispatch for the component. Initializes the UndoRedo for the component.
     * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OfficeRibbon_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
     * */
    let objContext = {
        state, dispatch, props,
        ["ModuleName"]: "OfficeRibbon",
        ["OfficeRibbon_ModuleProcessor"]: new OfficeRibbon_ModuleProcessor(),
        ["AddElementTabRef"]: useRef(null),
            "StartTabRef" : React.createRef(),
            "InsertTabRef" :React.createRef(),
            "TableTabRef" : React.createRef()

    }; // objContext.

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.OfficeRibbon_ModuleProcessor.Initialize(objContext, objContext.OfficeRibbon_ModuleProcessor);

    /**
    * @name OfficeRibbon_Hook.Initialize
    * @summary Initialize method call in OfficeRibbon_Hook, that contains all the custom hooks.
    */
    OfficeRibbon_Hook.Initialize(objContext);

    /**
    * @name useEffect
    * @summary adds reference attached to useImperative method, provides method for adding a new tab for selected elements.
    */
    useEffect(() => {
        EditorState.SetReference("AddElementTabRef", objContext.props.OfficeRibbonRef);
        EditorState.SetReference("OfficeRibbonRef", objContext.props.OfficeRibbonRef);
    }, []);

    /**
     * @name LoadTabs
     * @summary This method loads various OfficeRibbon tabs based on State.
     * @returns {tab_component} return the tab component.
     * */
    const LoadTabs = () => {
        let objTextResource = props.TextResource;
        if (objContext.state.strActiveTab === "START") {
            return <StartTab JConfiguration={props.JConfiguration} 
                             StartTabRef={objContext.StartTabRef}
                             ComponentController={props.ComponentController} 
                             TextResource={Localization.TextFormatter(objTextResource, "StartTab")} />;
        }
        else if (objContext.state.strActiveTab === "INSERT") {
            return <InsertTab JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} TextResource={Localization.TextFormatter(objTextResource, "InsertTab")}
                TextFormatter={props.TextFormatter}
                MultiMediaUsageGroupId={props.MultiMediaUsageGroupId} />;
        }
        else if (objContext.state.strActiveTab === "TABLES") {
            return <TableTab JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} TextResource={Localization.TextFormatter(objTextResource, "TableTab")} TextFormatter={props.TextFormatter} />;
        }
        else if (objContext.state.strActiveTab === "FORMULA") {
            return <FormulaTab JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} TextResource={Localization.TextFormatter(objTextResource, "FormulaTab")} TextFormatter={props.TextFormatter} />;
        }
        else if (objContext.state.strActiveTab === "INTERACTION_ELEMENTS") {
            return <InteractionElementsTab JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} TextResource={Localization.TextFormatter(objTextResource, "InteractionElementsTab")} TextFormatter={props.TextFormatter} />;
        }
        else if (objContext.state.arrSelectedElementTabs.findIndex(t => t.name.toUpperCase() === objContext.state.strActiveTab.toUpperCase()) > -1) {
            const ElementTab = props.ComponentController.GetComponent(`${objContext.state.strActiveTab}Tab`);
            return <ElementTab JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} />;
        }
        else return "";
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objTextResource = props.TextResource;
        let objImageMeta = OfficeRibbon_MetaData.GetImageMeta();
        return (<div>
            <div className="nav-bar">
                <ul>
                    <li className="date ribbon-tabs">FILE</li>
                    <li className={objContext.state.strActiveTab === "START" ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, "START")}>
                        START
                        </li>
                    <li className={objContext.state.strActiveTab === "INSERT" ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, "INSERT")}>
                        INSERT
                        </li>
                    <li className={objContext.state.strActiveTab === "TABLES" ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, "TABLES")}>
                        TABLES
                        </li>
                    {
                        (!props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup") &&
                        <React.Fragment>
                            <li className={objContext.state.strActiveTab === "INTERACTION_ELEMENTS" ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, "INTERACTION_ELEMENTS")}> INTERACTIONSELEMENT
                            </li>
                            <li className={objContext.state.strActiveTab === "FORMULA" ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, "FORMULA")}> FORMULA
                            </li>
                        </React.Fragment>
                    }
                    {
                        objContext.state.arrSelectedElementTabs.map((tab, index) => {
                            return (
                                <li key={`office-ribbon-${tab.name}-${index}`} className={objContext.state.strActiveTab === tab.name ? "active ribbon-tabs" : "ribbon-tabs"} onClick={objEvt => objContext.OfficeRibbon_ModuleProcessor.SwitchTab(objContext, tab.name)}>
                                    {tab.name.toUpperCase()}
                                </li>
                            );
                        })
                    }
                </ul>
                <ul className="nav-right">
                    {
                        !props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup" ?
                            <React.Fragment>
                                <PageLanguageArea
                                    LanguageData={props.LanguageData}
                                    OnLanguageChange={props.OnLanguageChange}
                                    GetActivePageLanguage={props.GetActivePageLanguage}
                                    GetActivePageProperties={props.GetActivePageProperties}
                                />
                                {
                                    state.blnCollapseTabDetails ?
                                        <li onClick={() => { objContext.OfficeRibbon_ModuleProcessor.ExpandTabDetails(objContext); }}>
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.ExpandImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        </li>
                                        :
                                        <li onClick={() => { objContext.OfficeRibbon_ModuleProcessor.CollapseTabDetails(objContext); }}>
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.CollapseImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        </li>
                                }
                                <li onClick={() => { objContext.OfficeRibbon_ModuleProcessor.MinimizeEditor(objContext); }}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.MinimizeImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </li>
                            </React.Fragment>
                            : ""
                    }
                    <li onClick={() => { objContext.OfficeRibbon_ModuleProcessor.CloseEditor(objContext); }}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: objImageMeta.CloseEditorImage,
                            }}
                            ParentProps={props}
                        />
                    </li>
                </ul>
            </div>
            {
                !state.blnCollapseTabDetails ?
                    <div className="office-ribbon-wrapper">
                        {LoadTabs()}
                    </div> : ""
            }
        </div>);
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default OfficeRibbon;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = OfficeRibbon_ModuleProcessor; 