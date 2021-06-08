//React Imports.
import React, { useReducer, forwardRef, useRef, useEffect } from 'react';

////SplitPane imports
//import SplitPane from "react-split-pane";

//Base Classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Classes.
import * as EditorWorkArea_Hooks from '@shared/Application/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea_Hooks';
import EditorWorkArea_ModuleProcessor from '@shared/Application/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea_ModuleProcessor';
import * as EditorWorkArea_MetaData from '@shared/Application/e.Editor/Modules/3_EditorWorkArea/EditorWorkArea_MetaData';

//Components used.
import CMSPageContent from '@root/Application/e.Editor/PC/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor_Wrapper';
import Sidebar from '@root/Application/e.Editor/PC/Modules/3_EditorWorkArea/Sidebar/RightSidebar';
import LeftSidebar from '@root/Application/e.Editor/PC/Modules/3_EditorWorkArea/Sidebar/LeftSidebar';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Pane
import SplitPane from '@root/Framework/Controls/SplitPane/SplitPane';

/**
 * @name EditorWorkArea
 * @param {object} props Component Props.
 * @param {Ref} ref Ref forwarded from parent.
 * @summary This component loads all the tasks in the editor.
 * @returns {JSX} EditorWorkArea Component.
 */
const EditorWorkArea = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, EditorWorkArea_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        SplitPaneRef: React.createRef(),
        LeftSplitPaneRef : React.createRef(),
        RightSidebarPaneRef : React.createRef(),
        RightSplitPaneRef : React.createRef(),
        "ModuleName": "EditorWorkArea",
        "EditorWorkArea_HandlerRef": props.EditorWorkAreaRef,
        "ActiveTaskOrder_Ref": useRef([]),
        "EditorWorkArea_ModuleProcessor": new EditorWorkArea_ModuleProcessor()
    };

    /**
     * @name EditorWorkArea_Hooks.Initialize
     * @summary Initialize method call in EditorWorkArea_Hooks, that contains all the custom hooks.
     */
    EditorWorkArea_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.EditorWorkArea_ModuleProcessor.Initialize(objContext, objContext.EditorWorkArea_ModuleProcessor);

    /**
     * @name LoadPreviousTask
     * @param {object} event object.
     * @param {object} objPageJson object.
     */
    const LoadPreviousTask = (event, objPageJson) => {
        event.preventDefault();
        event.stopPropagation();
        objContext.EditorWorkArea_ModuleProcessor.Traverse(objContext, objPageJson["iPageId"], "PREVIOUS");
    }

    /**
     * @name LoadNextTask
     * @param {object} event
     * @param {object} objPageJson
     * @summary this loads the next task.
     */
    const LoadNextTask = (objEvent, objPageJson) => {
        objEvent.preventDefault();
        objEvent.stopPropagation();
        objContext.EditorWorkArea_ModuleProcessor.Traverse(objContext, objPageJson["iPageId"], "NEXT");
    }

    /**
     * @name useEffect
     * @summary make the dispay div to block.
     * */
    useEffect(() => {
        objContext.props.DisplayCallback();
    }, []);

    /**
     * @name GetWorkAreaContent
     * */
    const GetWorkAreaContent = () => {
        let objImageMeta = EditorWorkArea_MetaData.GetImageMeta();
        return (
            <div style={{ height: "100%" }}>
                <ul className="filenames">
                    {
                        state.PageDetails.map(objTempData => {
                            let objPageJson = objTempData["PageJson"];
                            let objPageProperties = objTempData["PageProperties"];
                            let blnShowPrevTaskArrow = objContext.EditorWorkArea_ModuleProcessor.GetAdjacentTaskStatus(objContext, objPageJson["iPageId"], "PREVIOUS");
                            let blnShowNextTaskArrow = objContext.EditorWorkArea_ModuleProcessor.GetAdjacentTaskStatus(objContext, objPageJson["iPageId"], "NEXT");
                            return (
                                !props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup" ?
                                    <li key={objPageJson["iPageId"]}
                                        id={'filename_' + objPageJson["iPageId"]}
                                        onContextMenu={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            objContext.EditorWorkArea_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                                        }}
                                        onClick={(event) => { objContext.EditorWorkArea_ModuleProcessor.SetCurrentTask(objContext, objPageJson["iPageId"]); }}
                                        className={state.ActiveTaskId === objPageJson["iPageId"] ? "active" : ""}>
                                        {
                                            state.ActiveTaskId === objPageJson["iPageId"] && blnShowPrevTaskArrow ?
                                                <div
                                                    className="prev"
                                                    onClick={(event) => { LoadPreviousTask(event, objPageJson); }}>
                                                    <WrapperComponent
                                                        ComponentName={"Image"}
                                                        Data={{
                                                            Image: objImageMeta.MovePrevImage
                                                        }}
                                                        ParentProps={props}
                                                    />
                                                </div> : ""
                                        }
                                        <div className="teacher-icon">
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objContext.EditorWorkArea_ModuleProcessor.GetTaskTypeIconPath(objPageProperties, objContext)
                                                }}
                                                ParentProps={props}
                                            />
                                        </div>
                                        <div className="override-icon" onClick={(event) => { objContext.EditorWorkArea_ModuleProcessor.SetPointOverrideStatus(objContext, objPageJson); }}>
                                            {
                                                objPageJson["cPointOverride"] === "Y" ?
                                                    <WrapperComponent
                                                        ComponentName={"Image"}
                                                        Data={{
                                                            Image: objImageMeta.PointOverride_YesImage
                                                        }}
                                                        ParentProps={props}
                                                    />
                                                    :
                                                    <WrapperComponent
                                                        ComponentName={"Image"}
                                                        Data={{
                                                            Image: objImageMeta.PointOverride_NoImage
                                                        }}
                                                        ParentProps={props}
                                                    />
                                            }
                                        </div>
                                        <div className="page-name">
                                            <span>
                                                {objPageProperties && objPageProperties["vPageName"] ? objPageProperties["vPageName"] : ""}
                                            </span>
                                        </div>
                                        <div className="page-text">
                                            <span>
                                                {objPageProperties && objPageProperties["WorkFlowStatus"] ? "[ " + objPageProperties["WorkFlowStatus"] + " ]" : ""}
                                            </span>
                                        </div>
                                        <div className="teacher-icon" onClick={objEvent => objContext.EditorWorkArea_ModuleProcessor.TogglePhoneView(objContext)}>
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.MobilePreviewImage
                                                }}
                                                ParentProps={props}
                                            />
                                        </div>
                                        {
                                            state.ActiveTaskId === objPageJson["iPageId"] && blnShowNextTaskArrow ?
                                                <div
                                                    className="next"
                                                    onClick={(event) => { LoadNextTask(event, objPageJson); }}>
                                                    <WrapperComponent
                                                        ComponentName={"Image"}
                                                        Data={{
                                                            Image: objImageMeta.MoveNextImage
                                                        }}
                                                        ParentProps={props}
                                                    />
                                                </div> : ""
                                        }
                                        <div className="close" onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.EditorWorkArea_ModuleProcessor.RemoveTasksFromState(objContext, objPageJson.iPageId); }}>
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.CloseWindowImage
                                                }}
                                                ParentProps={props}
                                            />
                                        </div>
                                    </li> :
                                    <li onClick={(event) => { objContext.EditorWorkArea_ModuleProcessor.SetCurrentTask(objContext, objPageJson["iPageId"]); }}
                                        key={objPageJson["iPageId"]} className={state.ActiveTaskId === objPageJson["iPageId"] ? "active" : ""}>
                                        <div key={objPageJson["iPageId"]} >
                                            <span>
                                                {objPageProperties && objPageProperties["vPageName"] ? objPageProperties["vPageName"] : ""}
                                            </span>
                                        </div>
                                    </li>
                            );
                        })
                    }
                </ul>
                <div className="workarea">
                    {
                        state.PageDetails.map(objTempData => {
                            let objPageJson = objTempData["PageJson"];
                            let objPageProperties = objTempData["PageProperties"];
                            return (
                                <div
                                    key={objPageJson["iPageId"]}
                                    className={"workarea-container " + (state.ActiveTaskId === objPageJson["iPageId"] ? "active-tab" : "inactive-tab")}
                                    id={'activeworkareaTab_' + props.Mode + '_' + objPageJson["iPageId"]}>
                                    <PerformanceProfiler ComponentName={"CMSPageContent_Editor_" + objPageJson["iPageId"]} JConfiguration={props.JConfiguration}>
                                        <CMSPageContent
                                            {...(props.IsForServerRenderHtml ? props : {})}
                                            PageContentRef={objPageJson.Ref}
                                            ActiveTaskId={state.ActiveTaskId}
                                            ComponentController={props.ComponentController}
                                            PageJson={objPageJson}
                                            PageProperties={objPageProperties}
                                            SubjectForMainClient={props.SubjectForMainClient}
                                            FolderID={objPageProperties && objPageProperties["iFolderId"] ? objPageProperties["iFolderId"] : -1}
                                            PageId={objPageJson["iPageId"]}
                                            Mode={props.Mode}
                                            JConfiguration={props.JConfiguration}
                                            ContentUsageGroupId={props.ContentUsageGroupId}
                                            MultiMediaUsageGroupId={props.MultiMediaUsageGroupId}
                                        />
                                    </PerformanceProfiler>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    /**
     * @name GetContent
     * @summary The JSX content of the component.
     * @returns {any} JSX
     */
    const GetContent = () => {
        if (state.PageDetails.length > 0) {
            return (
                <div id="task_tab_edit">
                    <div className="workarea-wrapper">
                        <div className style={{
                            position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 3000, background: 'rgb(255 255 255 / 37%)',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}>
                            <span style={{ background: 'white', padding: '19px', display: 'block', boxShadow: '0 0 10px #d2d2d2', borderRadius: '29px' }}>
                                Task From Old Editor
                            </span>
                        </div>
                        <div id={"pagecontent_sidebar_container"} className="workarea-flex">
                            <SplitPane
                                ref={objContext.LeftSplitPaneRef}
                                Meta={{
                                    SplitDirection: "vertical",
                                    DefaultSize: "0%",
                                    MinSize: 200,
                                    MaxSize:700,
                                  //  Primary: "second",
                                    ResizerStyle: {  marginRight: "-6px", position: "relative", flex: "0 0 5px", left: "-6px", zIndex: "999999", display : "none" }
                                }}
                            >
                                <LeftSidebar Mode={props.Mode} PageId={state.ActiveTaskId} JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} />
                                <SplitPane
                                    ref={objContext.RightSplitPaneRef}
                                    Meta={{
                                        SplitDirection: "vertical",
                                        MinSize: 200,
                                        MaxSize: 800,
                                        DefaultSize: "0%",
                                        Primary:"second",
                                        ResizerStyle: {display : "none" }
                                    }}
                                >
                                    {GetWorkAreaContent()}
                                    <Sidebar Mode={props.Mode} PageId={state.ActiveTaskId} JConfiguration={props.JConfiguration} ComponentController={props.ComponentController} />
                                </SplitPane>
                            </SplitPane>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return "";
        }
    };

    /**
     * @summary Calls the GetContent()
     */
    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name forwardRef
 * @summary this wrap the Component inside the forwarded ref.
 * */
export default EditorWorkArea;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = EditorWorkArea_ModuleProcessor; 