//React Imports
import React, { useImperativeHandle } from "react";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Contains the initial local state.
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        ["ContainerJson"]: {
            ...props.ContainerJson,
            ["ContainerTemplate_Ref"]: React.createRef(),
            ["Elements"]: PrepareElementsForTemplate(props)
        },
        ["PageId"]: props.PageId,
        ["isLoadComplete"]: false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, Ref, ComponentRef, CMSPageContent_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, Ref, ComponentRef, CMSPageContent_TestApplication_ModuleProcessor}
 * @summary Contains imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ComponentRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            let strIsAnswered = "Y";
            objContext.state.ContainerJson.Elements.forEach(objTempData => {
                if (objTempData.Ref && objTempData.Ref.current !== null && objTempData.Ref.current.GetUserResponse) {
                    let arrUserResponse = objTempData.Ref.current.GetUserResponse();
                    let objUserResponse = arrUserResponse[0];
                    if (objUserResponse) {
                        if (objUserResponse["cIsAnswered"] && objUserResponse["cIsAnswered"] === "N") {
                            strIsAnswered = "N";
                        }
                        arrResponse = [
                            ...arrResponse,
                            objUserResponse
                        ];
                    }
                }
            });
            return {
                ["iContainerId"]: objContext.state.ContainerJson.iContainerId,
                ["cIsAnswered"]: strIsAnswered,
                ["Elements"]: arrResponse
            };
        },
        "LoadSolution": (ContainerJsonWithAnswer, UserResponse, ContainerEvaluationResult) => {
            objContext.state.ContainerJson["Elements"].map(objElementJson => {
                let objElementJsonWithAnswer, objUserResponse, objElementEvaluationResult;
                if (ContainerJsonWithAnswer) {
                    objElementJsonWithAnswer = ContainerJsonWithAnswer["Elements"].find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
                }
                if (UserResponse) {
                    objUserResponse = UserResponse.find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
                    objElementEvaluationResult = ContainerEvaluationResult.find(objTempData => objTempData["iElementId"] === objElementJson["iElementId"]);
                }
                if (objElementJson.Ref.current && objElementJson.Ref.current !== null && objElementJson.Ref.current.LoadSolution) {
                    objElementJson.Ref.current.LoadSolution(objElementJsonWithAnswer, objUserResponse, objElementEvaluationResult);
                }
            });
        },
        "ResetAnswer": () => {
            objContext.state.ContainerJson.Elements.forEach(objTempData => {
                if (objTempData.Ref && objTempData.Ref.current && objTempData.Ref.current.ResetAnswer) {
                    objTempData.Ref.current.ResetAnswer();
                }
            });
        },
        "ChangeContainerBackground": (strColor) => {
            if (strColor) {
                objContext.state.ContainerJson["ContainerTemplate_Ref"].current.setAttribute("style", "background-color: " + strColor);
            }
            else {
                objContext.state.ContainerJson["ContainerTemplate_Ref"].current.removeAttribute("style");
            }
        },
        "ExecuteAction": (strActionType, objData) => {
        }
    }), [objContext.state, objContext.props]);
}

/**
 * @name PrepareElementsForTemplate
 * @param {object} props Component Props
 * @summary This methods adds the ref to the Element Component to the ElementJson. This is later used to get the Element json while saving as well as to get user response. React.createRef is used instead of useRef
 * @returns {any} Element Array with Ref property to hold the Element component References.
 */
const PrepareElementsForTemplate = (props) => {
    let arrModifiedElements = [];
    if (props.ContainerJson.Elements && props.ContainerJson.Elements.length > 0) {
        props.ContainerJson.Elements.forEach(objElementJson => {
            let objModifiedElementJson = BaseCMSElement.AttachRef(objElementJson);
            arrModifiedElements = [
                ...arrModifiedElements,
                {
                    ...objModifiedElementJson
                }
            ];
        });
    }
    return arrModifiedElements;
};
