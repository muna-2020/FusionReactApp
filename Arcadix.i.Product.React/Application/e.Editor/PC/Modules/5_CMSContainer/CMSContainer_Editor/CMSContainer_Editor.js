//React Imports.
import React, { useReducer, forwardRef, useRef, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related imports.
import * as CMSContainer_Editor_Hooks from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_Hooks';
import CMSContainer_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_ModuleProcessor';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Element Template.
import CMSElement from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSElement';

/**
 * @name CMSContainer_Editor
 * @param {object} props Component Props.
 * @param {ref} ref Forwarded red from the parent component.
 * @summary This component is responsible for loading the Containers in the Task.
 * @returns {component} CMSContainer_Editor
 */
const CMSContainer_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSContainer_Editor_Hooks.GetInitialState(props));

    /**
     * @name Container_UndoRedoDataRef
     * @summary This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Container_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.ElementState : {});

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSContainer_Editor_" + props.ContainerJson["ContainerId"],
        ["Container_UndoRedoDataRef"]: Container_UndoRedoDataRef,
        ["Container_HandlerRef"]: ref,
        ["CMSContainer_Editor_ModuleProcessor"]: new CMSContainer_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSContainer_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSContainer_Editor_ModuleProcessor);

    /**
     * @name CMSContainer_Editor_Hooks
     * @summary Initialize method call in CMSContainer_Editor_Hooks, that contains all the custom hooks.
     */
    CMSContainer_Editor_Hooks.Initialize(objContext);

    /**
     * @name RenderElement
     * @param {object} ElementJson The element json for the container to be rendered.
     * @summary Create the Element JSX to be displayed.
     * @returns {JSX} CMSElement JSX
     */
    const RenderElement = (ElementJson, intAudioOrder = null) => {
        let objElementProps = {
            ...(props.IsForServerRenderHtml ? props : {}),
            "Mode": props.Mode,
            "ContainerId": props.ContainerId,
            "ParentRef": objContext.Container_HandlerRef,
            "PageId": objContext.props.PageId,
            "ElementRef": ElementJson.Ref,
            "ComponentController": props.ComponentController,
            "ElementJson": ElementJson,
            "JConfiguration": props.JConfiguration,
            "AudioOrder": intAudioOrder,
            "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return (
            <React.Fragment>
                <CMSElement ElementProps={objElementProps} />
                {
                    objContext.state.ContainerJson.cShowCalculator === "Y" && ElementJson.vElementJson.isQuestionOrAnswerType === "Answer" &&
                    <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/Calculator.gif"} onClick={() => { objContext.CMSContainer_Editor_ModuleProcessor.ShowCalculatorPopup(objContext) }} />
                }
            </React.Fragment>
        );
    };

    /**
     * @name OnElementDrop
     * @param {HTML_Event} objEvt html drop event.
     * @param {number} intOrder Element order.
     * @summary add the dropped element to container.
     */
    const OnPlaceholderDrop = (objEvt, intOrder) => {
        let strElementTypeName = objEvt.dataTransfer.getData("ActiveDragElement");
        objContext.CMSContainer_Editor_ModuleProcessor.OnPlaceholderDrop(objContext, strElementTypeName, intOrder);
    };

    /**
     * @name GetElement
     * @param {number} iOrder the Order number where the element needs to be rendered.
     * @param {string} strOverlayImageName Overlay image name.
     * @summary This method renders the element present at the required order number else it renders a place holder.
     * @returns {JSX} Element JSX.
     */
    const GetElement = (iOrder, strOverlayImageName = null, strQuestionOrAnswerTitle = null, intAudioOrder = null) => {
        if (state.ContainerJson && state.ContainerJson.Elements && state.ContainerJson.Elements.length > 0) {
            if (state.ContainerJson.Elements.filter(Element => Element.iOrder === iOrder).length > 0) {
                let objElementJson = state.ContainerJson.Elements.find(Element => Element.iOrder === iOrder);
                if (objElementJson.iElementTypeId === 1 && strQuestionOrAnswerTitle !== null) {
                    return RenderElement({
                        ...objElementJson,
                        "vElementJson": {
                            ...objElementJson.vElementJson,
                            "isQuestionOrAnswerType": strQuestionOrAnswerTitle == "Aufgabe" ? "Question" : "Answer",
                            "vClassNames": "pink-heading grid-1"
                        }
                    }, intAudioOrder);
                } else {
                    return RenderElement(objElementJson, intAudioOrder);
               }
            }
        }
        // if (strQuestionOrAnswerTitle !== null) {
        //     objContext.CMSContainer_Editor_ModuleProcessor.AddQuestionOrAnswerTitle(objContext, iOrder, strQuestionOrAnswerTitle);
        // }
        let strImageUrl = props.JConfiguration.EditorSkinPath + "/Images/";
        if (props.PageProperties && props.SubjectDetails && strOverlayImageName === "SubjectPlaceholder") {
            let strPlaceHolderImageType;
            strPlaceHolderImageType = "SubjectImage";
            if (!strPlaceHolderImageType || !props.PageProperties || !props.SubjectDetails) {
                strImageUrl += "Common/MediaPlaceholder";
            }
            else if (strPlaceHolderImageType === "TaskTypeImage") {
                strImageUrl += "TaskTypePlaceholder/TaskTypePlaceHolder_" + props.PageProperties["iTaskTypeId"];
            }
            else if (strPlaceHolderImageType === "SubjectImage") {
                strImageUrl += "SubjectPlaceholder/SubjectPlaceholder_" + props.SubjectDetails["vKeyForImage"];
                return (
                    <div className="subject-image-placeholder"
                        onDrop={objEvent => OnPlaceholderDrop(objEvent, iOrder)}
                        onDragOver={objEvent => {
                            objEvent.preventDefault();
                            objEvent.stopPropagation();
                        }}
                        DragDrop_DropAreaType="PlaceHolder"
                    >
                        <img src={strImageUrl + ".gif"} />
                    </div>
                );
            }
        } else if (strOverlayImageName != null && strOverlayImageName.toLowerCase() === "audio_placeholder") {
            return "";
        }
        else {
            strImageUrl += "Common/" + strOverlayImageName;
        }
        strImageUrl += ".gif";
        // let objDropZoneProps = {
        //     "Meta": {
        //         "GroupId": "InteractionType",
        //         "Disable": false,
        //         "IsDraggable": false
        //     },
        //     "Events": {
        //         "OnDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
        //             if (objDropArea && objDropArea !== null && objDropArea.getAttribute("DragDrop_DropAreaType") === "PlaceHolder" && objDragdropData["DragSource"] === "InteractionTypeSidebar") {
        //                 let strElementTypeName = objDraggedElement.getAttribute("elementtypename");
        //                 objContext.CMSContainer_Editor_ModuleProcessor.OnPlaceholderDrop(objContext, strElementTypeName, iOrder);
        //             }
        //         }
        //     },
        //     "CallBacks": {},
        //     "Data": {}
        // };
        return (
            // <DropZone {...objDropZoneProps}>
            <div
                onDrop={objEvent => OnPlaceholderDrop(objEvent, iOrder)}
                onDragOver={objEvent => {
                    objEvent.preventDefault();
                    objEvent.stopPropagation();
                }}
                className="empty-overlay-image"
                onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSContainer_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, iOrder, true);
                }}
                DragDrop_DropAreaType="PlaceHolder"
            >
                <img src={strImageUrl} />
            </div>
            // </DropZone>
        );
    }

    /**
     * @name GetContent
     * @summary contains JSX for CMSContainer Editor version
     * @return {any} JSX
     * */
    const GetContent = () => {
        let objProps = {
            ...props,
            ["ContainerJson"]: state.ContainerJson,
            ["ContainerTemplate_Ref"]: objContext.state.ContainerJson["ContainerTemplate_Ref"],
            ["OpenContextMenu"]: (event) => {
                event.preventDefault();
                event.stopPropagation();
                objContext.CMSContainer_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
            },
            ["UpdateContainerJson"]: props.UpdateContainerJson,
            ["PreserveElementState"]: (iElementId) => { objContext.CMSContainer_Editor_ModuleProcessor.PreserveElementState(objContext, iElementId); },
            ["UpdateElementJSON"]: (Json) => { objContext.CMSContainer_Editor_ModuleProcessor.UpdateContainerJson(objContext, Json); },
            ["DeleteElement"]: (iElementId) => { objContext.CMSContainer_Editor_ModuleProcessor.DeleteElement(objContext, iElementId); },
            ["GetElement"]: GetElement
        };
        let ContainerTemplate;
        React.Children.map(props.children, (child) => {
            if (child.props.type === "ContainerTemplate") {
                ContainerTemplate = React.cloneElement(child, {
                    ...objProps
                });
            }
        });
        return (
            <div className="container-template-wrapper" onMouseDown={objEvt => props.ParentRef.current.UpdateActiveContainer(objContext.props.ContainerJson.iContainerId)}>
                {ContainerTemplate}
            </div>
        );
    }

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

/**
 * @summary This forward ref wrapping is done so that while calling undo-redo functions from editor frame component.
 * we will have access to the UnoRedo Methods of the Container Component.
 */
let WrappedContainer = (props) => {
    /**
     * @name Container_HandlerRef
     * @summary this ref used for container undo-redo operation.
     * */
    let Container_HandlerRef = props.ContainerRef;
    /**
     * @name ComponentKey
     * @summary This uniquely identifies the instance of CMSContaienr Component.
     * */
    let ComponentKey = "container_" + props.ContainerJson.iContainerId;

    /**
     * @name useEffect
     * @summary this update the container undo-redo ref to the store.
     * */
    useEffect(() => {
        EditorState.SetReference(ComponentKey, Container_HandlerRef);
    }, [props]);

    /**
     * @name WrappedComponent
     * @summary The CMSContainer_Editor wrapped in forwardRef HOC.
     * */
    let WrappedComponent = forwardRef(CMSContainer_Editor);

    return <WrappedComponent ref={Container_HandlerRef} {...props} ComponentKey={ComponentKey} />;
};

export default WrappedContainer;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSContainer_Editor_ModuleProcessor; 