//React imports
import React, { useReducer, useRef, useEffect, forwardRef } from 'react';

//Application and Editor State related classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module Related Imports.
import CMSContainer_PC from '@root/Application/e.Editor/PC/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_Wrapper';
import CMSContainer_Phone from '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_Wrapper';
import * as CMSPageContent_Editor_Hooks from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor_Hooks';
import CMSPageContent_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor_ModuleProcessor';

//Container Template Controller.
import ContainerTemplateController_Pc from "@root/Application/e.Editor/PC/Controller/ContainerTemplateController/ContainerTemplateController";
import ContainerTemplateController_Phone from "@root/Application/e.Editor/Phone/Controller/ContainerTemplateController/ContainerTemplateController";

//Base Classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Component Controller.
import ComponentController_PC from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";
import ComponentController_Phone from "@root/Application/e.Editor/Phone/Controller/ComponentController/ComponentController";

/**
 * @name CMSPageContent_Editor
 * @param {object} props Component Props.
 * @param {Ref} ref Ref forwarded from parent.
 * @summary Loads the page content for a Task.
 * @returns {component} CMSPageContent_Editor.
 */
const CMSPageContent_Editor = (props, ref) => {
    
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSPageContent_Editor_Hooks.GetInitialState(props));

    /**
     * @summary state, props, dispatch and other objects used throughout the component are grouped into one context object. "PageJsonRef": This ref is used to store the Preserved element state to be used in Undo-Redo.
     */
    let objContext = {
        state,
        props,
        dispatch,
        "PageContent_TaskEditStatusRef": useRef(false),
        "PageContent_InformationDataRef": useRef({
            "TaskHint": {
                "objTaskHint": props.PageJson["TaskHint"] ? props.PageJson["TaskHint"] : null,
                "blnTaskHintRemoved": false
            },
            "AdditionalInformation": {
                "objAdditionalInformation": props.PageJson["AdditionalInformation"] ? props.PageJson["AdditionalInformation"] : null,
                "blnAdditionalInformationRemoved": false
            }
        }),
        "PageContent_UndoRedoDataRef": useRef({
            "ContainerState": {}
        }),
        "PageContent_HandlerRef": ref,
        "ModuleName": "CMSPageContent_Editor_" + props.PageJson["iPageId"],
        "CMSPageContent_Editor_ModuleProcessor": new CMSPageContent_Editor_ModuleProcessor(),
        "InitialPageJson": useRef(null)
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPageContent_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSPageContent_Editor_ModuleProcessor);

    /**
     * @name useEffect
     * @summary This updates the "ActivePageContentRef" of editor state.
     */
    useEffect(() => {
        if (objContext.PageContent_HandlerRef) {
            EditorState.SetProperty("ActivePageContentRef", objContext.PageContent_HandlerRef);
        }
    }, [props]);

    /**
     * @name CMSPageContent_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSPageContent_Editor_Hooks, that contains all the custom hooks.
     */
    CMSPageContent_Editor_Hooks.Initialize(objContext);

    /**
     * @summary This refs gives access to Task DOM.
     * */
    let PageRef = useRef(null);

    /**
     * @name GetContainerContent
     * @summay returns container jsx.
     */
    const GetContainerContent = (objContainerJson) => {
        let ContainerTemplate, ComponentController, CMSContainer;
        if(objContext.state.strDeviceType.toLowerCase() === "pc"){
            ContainerTemplate = ContainerTemplateController_Pc.GetTemplate(objContainerJson["iContainerTemplateId"], objContext.state.strDeviceType);
            ComponentController = ComponentController_PC;
            CMSContainer = CMSContainer_PC;
        }else{
            ContainerTemplate = ContainerTemplateController_Phone.GetTemplate(objContainerJson["iContainerTemplateId"], objContext.state.strDeviceType);
            ComponentController = ComponentController_Phone;
            CMSContainer = CMSContainer_Phone;
        }
        let objSubject;
        if (props.PageProperties && props.SubjectForMainClient) {
            objSubject = props.SubjectForMainClient.find(objTempData => objTempData["iSubjectId"] === props.PageProperties["iSubjectId"]);
        }
        return(
            <PerformanceProfiler ComponentName={"CMSContainer_Editor_" + objContainerJson["iContainerId"]} JConfiguration={props.JConfiguration}>
                <CMSContainer
                    {...(props.IsForServerRenderHtml ? props : {})}
                    ParentRef={objContext.PageContent_HandlerRef}
                    ContentUsageGroupId={props.ContentUsageGroupId}
                    MultiMediaUsageGroupId={props.MultiMediaUsageGroupId}
                    PreservedState={objContext.PageContent_UndoRedoDataRef.current.ContainerState[objContainerJson["iContainerId"]]}
                    ComponentController={ComponentController}
                    ContainerRef={objContainerJson.Ref}
                    PageProperties={props.PageProperties}
                    SubjectDetails={objSubject}
                    ContainerJson={objContainerJson}
                    ContainerId={objContainerJson["iContainerId"]}
                    FolderID={props.FolderID}
                    PageId={props.PageId}
                    Mode={props.Mode}
                    JConfiguration={props.JConfiguration}>
                    <ContainerTemplate type="ContainerTemplate" />
                </CMSContainer>
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetPageContentContent
     * @summary this returns the page content jsx. 
     */
    const GetPageContentContent = () => {
        return (
          <React.Fragment>
                {
                    state.PageJson && state.PageJson.Containers.length > 0 ? state.PageJson.Containers.map(objContainerJson => {
                        return (
                            <React.Fragment>
                            {GetContainerContent(objContainerJson)}
                            </React.Fragment>
                        );
                    }) :
                        <div style={{ "height": "100%", "width": "100%", "display": "flex", "align-items": "center", "justify-content": "center" }}>
                            <img
                                onClick ={objEvent => objContext.CMSPageContent_Editor_ModuleProcessor.InsertContainer({objContext : objContext, objContainerJson : null})}
                                onContextMenu={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                objContext.CMSPageContent_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                            }}
                                src={props.JConfiguration.EditorSkinPath + "/Images/Common/container_placeholder.gif"} />
                        </div>
                }
            </React.Fragment>
        );
    };
 
    /**
     * @name GetContent
     * @summary contains Container JSX
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objPhoneStyles = {};
        if (objContext.state.strDeviceType.toLowerCase() !== "pc") {
            objPhoneStyles = { overflow: "hidden", background: "transparent" };           
        }

        return (
            <div className="workarea-relative" ref={PageRef} id={'activeworkarea_' + props.Mode + '_' + props.PageId} style={objPhoneStyles}>
                {
                   objContext.state.strDeviceType.toLowerCase() === "pc" ?
                    <React.Fragment>
                        {GetPageContentContent()}
                    </React.Fragment>:
                    <div class="smartphone">
                        <div class="content">
                            {GetPageContentContent()}
                        </div>
                     </div>
                }
            </div>
        );
    };

    /**
     * @summary Returns Container JSX.
     **/
    return GetContent();
};

/**
 * @name WrappedCMSPageContent
 * @param {object} props props
 * @summary The following code wraps the CMSPageContent Component and adds a reference to it in store to be used for undo-redo.
 * @returns {component} Wrapped Component
 */
let WrappedCMSPageContent = (props) => {
    /**
     * @name PageContent_HandlerRef
     * @summary This gives access to the UndoRedo Method of CMSPageContent.
     * */
    let PageContent_HandlerRef = props.PageContentRef;

    /**
     * @name ComponentKey
     * @summary This uniquely identifies an instance of CMSPagecontent.
     * */
    let ComponentKey = "page_" + props.PageJson.iPageId;

    /**
     * @name useEffect
     * @summary This Use effects adds the relevant refs to the application state to be used for UndoRedo.
     **/
    useEffect(() => {
        EditorState.SetReference(ComponentKey, PageContent_HandlerRef);
        let objSaveReferences = EditorState.GetReference("SaveReferences");
        EditorState.SetReference("SaveReferences", {
            ...objSaveReferences,
            [props.PageId]: PageContent_HandlerRef
        });
    }, [props]);

    /**
     * @name WrappedComponent
     * @summary The CMSPageContent_Editor wrapped in forwardRef HOC.
     * */
    let WrappedComponent = forwardRef(CMSPageContent_Editor);

    return <WrappedComponent ref={PageContent_HandlerRef} {...props} ComponentKey={ComponentKey} />;
};

export default WrappedCMSPageContent;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPageContent_Editor_ModuleProcessor; 