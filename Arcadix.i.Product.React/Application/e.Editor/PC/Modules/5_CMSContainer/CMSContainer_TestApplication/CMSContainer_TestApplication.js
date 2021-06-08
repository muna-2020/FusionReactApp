//React Imports
import React, { useReducer, forwardRef, useRef, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related imports
import * as CMSContainer_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_TestApplication/CMSContainer_TestApplication_Hooks';
import CMSContainer_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_TestApplication/CMSContainer_TestApplication_ModuleProcessor';

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name CMSContainer_TestApplication
 * @param {object} props Component Props.
 * @param {any} ref Forwarded red from the parent component.
 * @summary This component is responsible for loading the Containers in the Task.
 * @returns {any} CMSContainer_TestApplication
 */
const CMSContainer_TestApplication = (props, ref) => {

    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSContainer_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name ElementState
     * @summary This Ref is used to store the preserved element state to be used for undo-redo
     * */
    var ElementState = useRef(props.PreservedState ? props.PreservedState.ElementState : {});

    /**
     * @name objContext
     * @summary state, props, dispatch and other objects used throughout the component are grouped into one context object.
     * */
    let objContext = {
        state,
        dispatch,
        props,
        ["Ref"]: ElementState,
        ["ModuleName"]: "CMSContainer_TestApplication_" + props.ContainerJson["iContainerId"],
        ["CMSContainer_TestApplication_ModuleProcessor"]: new CMSContainer_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSContainer_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSContainer_TestApplication_ModuleProcessor);

    /**
    * @name CMSContainer_Editor_Hooks
    * @summary Initialize method call in CMSContainer_TestApplication_Hooks, that contains all the custom hooks.
    * @returns null
    */
    CMSContainer_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name RenderElement
     * @param {object} objElementJson The element json for the container to be rendered.
     * @param {number} iContainerId the container Id for the container to which the elements are linked.
     * @summary Create the Element JSX to be displayed.
     * @returns {any} Component
     */
    const RenderElement = (objElementJson) => {
        let Element = props.ComponentController.GetElement(objElementJson["vElementTypeName"]);
        let objElementJsonWithAnswer, objUserResponse, objElementEvaluationResult;
        if (props.ContainerJsonWithAnswer) {
            objElementJsonWithAnswer = props.ContainerJsonWithAnswer["Elements"].find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
        }
        if (props.UserAnswerJson) {
            objUserResponse = props.UserAnswerJson.find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
        }
        if (props.ContainerEvaluationResult) {
            objElementEvaluationResult = props.ContainerEvaluationResult.find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
        }
        var blnRenderElement = props.IsForServerRenderHtml ? props.JConfiguration["SSR_TestApplication"]["InteractionTypes"].includes(objElementJson["vElementTypeName"]) ? true : false : true;
        let objElementProps = {
            ...(props.IsForServerRenderHtml ? props : {}),
            "ComponentController": props.ComponentController,
            "ElementJson": objElementJson,
            "ElementRef": objElementJson.Ref,
            "ContainerId": props.ContainerId,
            "FolderID": props.FolderID,
            "PageId": props.PageId,
            "Mode": props.Mode,
            "JConfiguration": props.JConfiguration,
            "ElementJsonWithAnswer": objElementJsonWithAnswer,
            "UserAnswerJson": objUserResponse,
            "ElementEvaluationResult": objElementEvaluationResult
        };
        return (
            <PerformanceProfiler ComponentName={"CMS" + objElementJson["vElementTypeName"] + "_TestApplication_" + objElementJson["iElementId"]} JConfiguration={props.JConfiguration}>
                {blnRenderElement === true ? <Element {...objElementProps} /> : <React.Fragment />}
                {
                    objContext.state.ContainerJson.cShowCalculator === "Y" && objElementJson.vElementJson.isQuestionOrAnswerType === "Answer" &&
                    <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/Calculator.gif"} onClick={() => { objContext.CMSContainer_TestApplication_ModuleProcessor.ShowCalculatorPopup(objContext) }} />
                }
            </PerformanceProfiler>
        );
    };

    /**
     * @summary This method renders the element present at the required order number else it renders a place holder
     * @param {number} iOrder the Order number where the element needs to be rendered
     * @param {string} strOverlayImageName name of overlay image
     * @returns {any} Element JSX
     */
    const GetElement = (iOrder, strOverlayImageName = null, strQuestionOrAnswerTitle = null) => {
        if (state.ContainerJson && state.ContainerJson.Elements && state.ContainerJson.Elements.length > 0) {
            let arrElementJson = state.ContainerJson.Elements.filter(Element => Element.iOrder === iOrder);
            if (arrElementJson.length > 0) {
                var objElementJson = { ...arrElementJson[0] };
                if (strQuestionOrAnswerTitle != null) {
                    objElementJson = {
                        ...objElementJson, ["vElementJson"]: {
                            ...objElementJson.vElementJson,
                            "isQuestionOrAnswerType": strQuestionOrAnswerTitle == "Aufgabe" ? "Question" : "Answer"
                        }
                    }
                }
                return RenderElement(objElementJson);
            }
        }
        if (strQuestionOrAnswerTitle != null) {
            let strTitleType = strQuestionOrAnswerTitle == "Aufgabe" ? "Question" : "Answer";
            return (
                <React.Fragment>
                    <div className={"pink-heading grid-1"}>
                        {strQuestionOrAnswerTitle}
                    </div>
                    {
                        objContext.state.ContainerJson.cShowCalculator === "Y" && strTitleType === "Answer" &&
                        <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/Calculator.gif"} onClick={() => { objContext.CMSContainer_TestApplication_ModuleProcessor.ShowCalculatorPopup(objContext) }} />
                    }
                </React.Fragment>
            );
        }
        if (props.PageProperties && props.SubjectDetails && strOverlayImageName === "SubjectPlaceholder") {
            let strPlaceHolderImageType;
            // strPlaceHolderImageType = "TaskTypeImage";
            strPlaceHolderImageType = "SubjectImage";
            if (strPlaceHolderImageType) {
                let strImageUrl = props.JConfiguration.EditorSkinPath + "/Images/";
                if (strPlaceHolderImageType === "TaskTypeImage") {
                    strImageUrl += "TaskTypePlaceholder/TaskTypePlaceHolder_" + props.PageProperties["iTaskTypeId"];
                }
                else if (strPlaceHolderImageType === "SubjectImage") {
                    strImageUrl += "SubjectPlaceholder/SubjectPlaceholder_" + props.SubjectDetails["vKeyForImage"];
                }
                strImageUrl += ".gif";
                return (
                    <div className="empty-overlay-image">
                        <img src={strImageUrl} />
                    </div>
                );
            }
        }
        return "";
    };

    /**
     * @name GetContent
     * @summary contains JSX for CMSContainer Editor version
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objProps = {
            ...props,
            ["ContainerTemplate_Ref"]: objContext.state.ContainerJson["ContainerTemplate_Ref"],
            ["ContainerJson"]: state.ContainerJson,
            ["GetElement"]: GetElement
        };
        let ContainerTemplate = props.ComponentController.GetContainerTemplate(state.ContainerJson.iContainerTemplateId);
        return <ContainerTemplate {...objProps} />;
    };

    return GetContent();
};

/**
 * This forward ref wrapping is done so that while calling undo-redo functions from editor frame component we will have access to the UnoRedo Methods of the Container Component.
 */
let WrappedContainer = forwardRef((props, ref) => {
    let ContainerRef = useRef(null);
    let ComponentKey = "container_" + props.ContainerJson.iContainerId;

    useEffect(() => {
        EditorState.SetReference(ComponentKey, ContainerRef);
    }, [props]);

    let WrappedComponent = forwardRef(CMSContainer_TestApplication);

    return <WrappedComponent ref={ContainerRef} {...props} ComponentRef={ref} ComponentKey={ComponentKey} />;
});

export default WrappedContainer;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSContainer_TestApplication_ModuleProcessor; 
