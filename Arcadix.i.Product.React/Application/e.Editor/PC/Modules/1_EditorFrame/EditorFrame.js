//React imports
import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';
import * as EditorFrame_Hooks from '@shared/Application/e.Editor/Modules/1_EditorFrame/EditorFrame_Hooks';

//Module related files.
import EditorFrame_ModuleProcessor from '@shared/Application/e.Editor/Modules/1_EditorFrame/EditorFrame_ModuleProcessor';

//Components used.
import ContextMenu from "@root/Framework/Controls/ContextMenu_New/ContextMenu";
import Popup from "@root/Framework/Blocks/Popup/Popup";
import TopLeft from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/TopLeft/TopLeft";
import TopCenter from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/TopCenter/TopCenter";
import TopRight from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/TopRight/TopRight";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import OfficeRibbon from "@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/OfficeRibbon";

//Text action related import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Polyfills used.
import * as EditorPolyfills from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/EditorPolyfills/EditorPolyfills';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name EditorFrame
 * @param {object} props props from parent.
 * @summary this is the root Component of Editor.
 * @returns {JSX} EditorFrame
 */
const EditorFrame = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, EditorFrame_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        ["ModuleName"]: "EditorFrame",
        ["EditorWorkAreaRef"]: useRef(null),//This is the EditorWorkAreaRef holds method to open, close task related operation.
        ["EditorFrame_ModuleProcessor"]: new EditorFrame_ModuleProcessor(),
        ["OfficeRibbonRef"]: React.createRef(),

    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.EditorFrame_ModuleProcessor.Initialize(objContext, objContext.EditorFrame_ModuleProcessor);

    /**
     * @name EditorFrame_Hooks.Initialize
     * @summary Initialize method call in EditorFrame_Hooks, that contains all the custom hooks.
     */
    EditorFrame_Hooks.Initialize(objContext);

    /**
     * @name useEffect
     * @summary Adding necessary function references that will be used through out editor later.
     */
    useEffect(() => {
        EditorState.SetReference("EditorRef", objContext.EditorWorkAreaRef);
        EditorState.SetReference("OfficeRibbonRef", objContext.OfficeRibbonRef);
    }, [props, state]);

    /**
     * @name useLayoutEffect
     * @summary this run all the polyfills required for the editor dom manipulation.
     */
    useLayoutEffect(() => {
        EditorPolyfills.RunEditorPolyfills();
    }, []);

    /**
     * @name GetContent
     * @summary Returns the JSX for the component.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/EditorFrame", objContext.props);
        let objRibbonTextResources = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon", objContext.props);
        let EditorWorkArea = props.ComponentController.GetComponent("EditorWorkArea");
        return (
            <div className="master-parent">
                <div className="main-wrapper">
                    <div className="header w-100" id="EditorMasterHeader">
                        <div id="editor_div" className="editor">
                            <div className="header">
                                <TopLeft
                                    JConfiguration={props.JConfiguration}
                                    ContentUsageGroupId={props.ContentUsageGroupId}
                                    MultiMediaUsageGroupId={props.MultiMediaUsageGroupId}
                                    OpenPreview={(strContentUsageGroupId) => { objContext.EditorFrame_ModuleProcessor.OpenPreview(objContext, strContentUsageGroupId); }}
                                    OpenPreviewInNewTab={() => { objContext.EditorFrame_ModuleProcessor.OpenPreviewInNewTab(objContext); }}
                                    OpenMobilePreview={() => { objContext.EditorFrame_ModuleProcessor.OpenMobilePreviewInNewTab(objContext); }}
                                    OpenTaskAddEditPopup={() => { objContext.EditorFrame_ModuleProcessor.OpenTaskAddEditPopup(objContext); }}
                                    SaveTask={() => { objContext.EditorFrame_ModuleProcessor.SaveTask(objContext); }}
                                    SpellCheck={() => { TextActions.SpellCheck(objContext); }}
                                    OpenAdditionalInformationSidebar={(strType) => { objContext.EditorFrame_ModuleProcessor.OpenAdditionalInformationSidebar(objContext, strType); }}
                                    OpenAuditPopup={() => { objContext.EditorFrame_ModuleProcessor.OpenAuditPopup(objContext); }}
                                    OpenSourceViewPopup={() => { objContext.EditorFrame_ModuleProcessor.OpenSourceViewPopup(objContext); }}
                                    TextResource={Localization.TextFormatter(objTextResource, "TopLeft")}
                                    ComponentController={props.ComponentController}
                                />
                                <TopCenter
                                    JConfiguration={props.JConfiguration}
                                    ComponentController={props.ComponentController}
                                />
                                <TopRight
                                    JConfiguration={props.JConfiguration}
                                    ComponentController={props.ComponentController}
                                    TextFormatter={(strKey) => { objContext.EditorFrame_ModuleProcessor.TextFormatter(objTextResource, strKey); }}
                                />
                            </div>
                            <PerformanceProfiler ComponentName="OfficeRibbon" JConfiguration={props.JConfiguration}>
                                <OfficeRibbon
                                    Id={"OfficeRibbon"}
                                    OfficeRibbonRef={objContext.OfficeRibbonRef}
                                    TextResource={objRibbonTextResources}
                                    TextFormatter={objContext.EditorFrame_ModuleProcessor.TextFormatter}
                                    LanguageData={props.LanguageData}
                                    OnLanguageChange={(intLanguageId) => { objContext.EditorFrame_ModuleProcessor.OnLanguageChange(objContext, intLanguageId); }}
                                    GetActivePageProperties={() => { return objContext.EditorFrame_ModuleProcessor.GetActivePageProperties(objContext); }}
                                    GetActivePageLanguage={() => { return objContext.EditorFrame_ModuleProcessor.GetActivePageLanguage(objContext); }}
                                    ContentUsageGroupId={props.ContentUsageGroupId}
                                    MultiMediaUsageGroupId={props.MultiMediaUsageGroupId}
                                    JConfiguration={props.JConfiguration}
                                    ComponentController={props.ComponentController} />
                            </PerformanceProfiler>
                            <PerformanceProfiler ComponentName="EditorWorkArea" IsMainModule={true} JConfiguration={props.JConfiguration}>
                                {
                                    <EditorWorkArea
                                        {...(props.IsForServerRenderHtml ? { ...props, IsForServerRenderAPI: props.JConfiguration["SSR_Editor"]["PageContent"] == "Y" ? true : false } : {})}
                                    Id={"EditorWorkArea"}
                                    IsFirstTask={props.IsFirstTask}
                                    IsLastTask={props.IsLastTask}
                                    SubjectForMainClient={props.SubjectForMainClient}
                                    PageProperties={props.PageProperties}
                                    LanguageData={props.LanguageData}
                                    LanguageId={props.LanguageId}
                                    ComponentController={props.ComponentController}
                                    JConfiguration={props.JConfiguration}
                                    ContentUsageGroupId={props.ContentUsageGroupId}
                                    MultiMediaUsageGroupId={props.MultiMediaUsageGroupId}
                                    PageIds={props.PageIds}
                                    Mode={"edit"}
                                    DisplayCallback={props.DisplayCallback}
                                    EditorWorkAreaRef={objContext.EditorWorkAreaRef} />

                                }
                            </PerformanceProfiler>
                            {
                                !ApplicationState.GetProperty("ShowContextMenu") ? <ContextMenu ParentProps={{ ...props }} Resource={{ "SkinPath": props.JConfiguration.IntranetSkinPath + "/" }} JConfiguration={props.JConfiguration} /> : ""
                            }
                            <Popup Id="EditorPopup" Meta={{ "GroupName": "editorPopup" }}
                                Resource={{ "SkinPath": props.JConfiguration.IntranetSkinPath }}
                                ParentProps={props} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * @summary checks for the isLoadComplete and calls the GetContent().
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

/**
 * @name ConectedEditorFrame
 * @summary this map store properties to component props.
 * */
let ConectedEditorFrame = connect(EditorBase_Hook.MapStoreToProps(EditorFrame_ModuleProcessor.StoreMapList()))(EditorFrame);


export default ConectedEditorFrame;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = EditorFrame_ModuleProcessor; 