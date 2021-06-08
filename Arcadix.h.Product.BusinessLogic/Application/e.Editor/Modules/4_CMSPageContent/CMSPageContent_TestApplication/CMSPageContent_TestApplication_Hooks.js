//React Imports
import React, { useLayoutEffect, useEffect, useImperativeHandle } from "react";

//EditorState imports
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Text resource related imports.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objCommonTextResource = EditorState.GetProperty("CommonTextResource");
    if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", props) || objCommonTextResource) {
        blnIsLoadComplete = true;
    }
    return {
        "PageJson": {
            ...props.PageJson,
            ["Containers"]: props.PageJson.Containers.map(objTempContainer => {
                return {
                    ...objTempContainer,
                    ["Ref"]: React.createRef()
                };
            })
        },
        "PageId": props.PageId,
        "isLoadComplete": blnIsLoadComplete
    };
}

/**
 * @name Initialize
 * @param {any} objContext {state, props, dispatch, Ref, ComponentRef, CMSPageContent_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext Passes Context Object
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!objContext.state.isLoadComplete) {
            objContext.CMSPageContent_TestApplication_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext Passes Context Object
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (!objContext.state.isLoadComplete && Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props)) {
            let objCommonTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props);
            EditorState.SetProperty("CommonTextResource", objCommonTextResource);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props)]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
 * @summary Imperative methods.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.ComponentRef, () => ({
        "GetUserResponse": () => {
            let arrUserResponse = [];
            let strIsAnswered = "Y";
            objContext.state.PageJson.Containers.forEach(objTempData => {
                let objTempResponse = objTempData.Ref.current.GetUserResponse();
                if (objTempResponse["cIsAnswered"] === "N") {
                    strIsAnswered = "N";
                }
                arrUserResponse = [
                    ...arrUserResponse,
                    objTempResponse
                ];
            });
            return {
                ["Containers"]: arrUserResponse,
                ["cIsAnswered"]: strIsAnswered
            };
        },
        "LoadSolution": (objLoadSolutionResult) => {
            objContext.state.PageJson.Containers.map(objContainerJson => {
                let objContainerJsonWithAnswer, arrUserResponse, arrContainerEvaluationResult;
                if (objLoadSolutionResult.PageJsonWithAnswer && objLoadSolutionResult.PageJsonWithAnswer !== null) {
                    objContainerJsonWithAnswer = objLoadSolutionResult.PageJsonWithAnswer["Containers"].find(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"]);
                }
                if (objLoadSolutionResult.UserAnswerJson && objLoadSolutionResult.UserAnswerJson !== null && objLoadSolutionResult.UserAnswerJson.length > 0) {
                    arrUserResponse = objLoadSolutionResult.UserAnswerJson.find(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"])["Elements"];
                    arrContainerEvaluationResult = objLoadSolutionResult.ElementAnswerDetails.filter(objTempData => objTempData["iContainerId"] === objContainerJson["iContainerId"]);
                }
                objContainerJson.Ref.current.LoadSolution(objContainerJsonWithAnswer, arrUserResponse, arrContainerEvaluationResult);
            });
            console.log("objLoadSolutionResult", objLoadSolutionResult);
        },
        "ResetAnswer": () => {
            objContext.state.PageJson.Containers.forEach(objTempData => {
                if (objTempData.Ref && objTempData.Ref.current && objTempData.Ref.current.ResetAnswer) {
                    objTempData.Ref.current.ResetAnswer();
                }
            });
        },
        "ChangeContainerBackground": (objData) => {
            objContext.state.PageJson.Containers.map(objContainerJson => {
                if (objData["Containers"].filter(x => x["iContainerId"] === objContainerJson["iContainerId"] && x["cIsAnswered"] === "N").length > 0) {
                    objContainerJson.Ref.current.ChangeContainerBackground("Yellow");
                }
                else {
                    objContainerJson.Ref.current.ChangeContainerBackground("");
                }
            });
        },
        "ExecuteAction": (strActionType, objData) => {
            switch (strActionType.toLowerCase()) {
                case "change_container_backgroud":
                    objContext.ComponentRef.current.ChangeContainerBackground(objData);
                    break;
            }
        }
    }), [objContext.props, objContext.state]);
}
