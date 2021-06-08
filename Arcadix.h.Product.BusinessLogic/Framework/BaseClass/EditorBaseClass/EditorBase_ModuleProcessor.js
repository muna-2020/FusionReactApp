//React Imports
import React from 'react';

//Base classes/methods
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related files.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Editor state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name EditorBase_ModuleProcessor
 * @summary Contains the common methods used in Editor.
 * */
class EditorBase_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name GetTextElementProps
     * @param {object} Context {props, state, dispatch, <module name>_ModuleProcessor}.
     * @param {object} intElementTextId iElementId of CMSText Id.
     * @summary Forms the TextElement's props.
     * @returns {object} TextElement props.
     */
    GetTextElementProps(Context, intElementTextId) {
        let objTextElementJson = Context.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElement => objTempTextElement["iElementId"] === intElementTextId)[0];
        let objElementJsonWithAnswer, objUserAnswerJson, objTextElementEvaluationResult;
        if (Context.props.ElementJsonWithAnswer) {
            objElementJsonWithAnswer = Context.props.ElementJsonWithAnswer["vElementJson"]["TextElements"].find(objTempData => objTempData["iElementId"] === intElementTextId);
        }
        if (Context.props.UserAnswerJson) {
            objUserAnswerJson = Context.props.UserAnswerJson["TextElements"].find(objTempData => objTempData["iElementId"] === intElementTextId);
        }
        if (Context.props.ElementEvaluationResult) {
            objTextElementEvaluationResult = Context.props.ElementEvaluationResult["TextElements"].find(objTempData => objTempData["iElementId"] === intElementTextId);
        }
        let objTextElementProps = {
            ...Context.props,
            ["ElementRef"]: objTextElementJson["Ref"] ? objTextElementJson["Ref"] : React.createRef(),
            ["ParentRef"]: Context.props.ElementRef,
            ["ElementJson"]: {
                ...objTextElementJson,
                ["TextRef"]: objTextElementJson["TextRef"] ? objTextElementJson["TextRef"] : React.createRef(),
            },
            ["IsSubElement"]: "Y",
            ["PageId"]: Context.props.PageId,
            ["PreservedState"]: (Context.Element_UndoRedoDataRef && Context.Element_UndoRedoDataRef.current && Context.Element_UndoRedoDataRef.current !== null) ? Context.Element_UndoRedoDataRef.current[intElementTextId] : undefined,
            ["ElementJsonWithAnswer"]: objElementJsonWithAnswer,
            ["UserAnswerJson"]: objUserAnswerJson,
            ["TextElementEvaluationResult"]: objTextElementEvaluationResult
        };
        return objTextElementProps;
    }

    /**
     * @name ShowHeaderText
     * @param {object} objParams {objContext: {state, props, dispatch, <ModuleName>_ModuleProcessor}, objTextResource}.
     * @summary Sets the Header Text to display or not.
     */
    ShowHeaderText(objParams) {
        let { objContext, objTextResource } = objParams;
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.SetTaskEditStatus) {
            objContext.props.ParentRef.current.SetTaskEditStatus();
        }
        let objElementJson, arrTextElements, arrHeaderValues, cShowHeaderText;
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            cShowHeaderText = "N";
            arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
                if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                    arrTextElements = objContext.state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElementJson => objTempTextElementJson["iElementId"] !== objTempHeaderValue["iElementTextId"]);
                    return {
                        ...objTempHeaderValue,
                        ["iElementTextId"]: null
                    };
                }
                return objTempHeaderValue;
            });
        }
        else {
            cShowHeaderText = "Y";
            let iElementTextHeaderId = UniqueId.GetUniqueId();
            let objTextElementHeaderJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextHeaderId);
            arrHeaderValues = objContext.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
                if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                    return {
                        ...objTempHeaderValue,
                        ["iElementTextId"]: iElementTextHeaderId
                    };
                }
                return objTempHeaderValue;
            });
            arrTextElements = [
                ...objContext.state.ElementJson["vElementJson"]["TextElements"],
                {
                    ...objTextElementHeaderJson,
                    ["vElementJson"]: {
                        ...objTextElementHeaderJson["vElementJson"],
                        ["vText"]: objTextResource["Default_Text"]
                    },
                    ["Ref"]: React.createRef()
                }
            ];
        }
        objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["cShowHeaderText"]: cShowHeaderText,
                ["HeaderValues"]: arrHeaderValues,
                ["TextElements"]: arrTextElements
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name ShowPointOverrideSidebar
     * @param {object} param0 {objContext} component context object.
     * @summary this method display the Point Override sidebar.
     */
    ShowPointOverrideSidebar({ objContext }) {
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        if (objContext.props.ElementRef && objContext.props.ElementRef.current && objContext.props.ElementRef.current.GetPointOverride) {
            let objPoint = objContext.props.ElementRef.current.GetPointOverride();
            fnShowSidebar({
                "Point": {
                    ...objPoint
                },
                "PassedEvents": {
                    "PointsOverride": objContext.props.ElementRef.current.SetPointOverride,
                    "RemovePointOverride": () => {
                        objContext.props.ElementRef.current.RemovePointOverride();
                    },
                    "CloseCallback": () => {
                        objContext = objContext.props.ElementRef.current.GetLatestContext();
                        if (objContext.props.ElementRef.current.HideToolTip) {
                            objContext.props.ElementRef.current.HideToolTip();
                        }
                        else {
                            objContext.dispatch({ type: "SET_STATE", payload: { showTooltip: false }, blnUndoRedoUpdate: false });
                        }
                    }
                },
                "SidebarProps": {
                    "SidebarName": objPoint.SidebarName ? objPoint.SidebarName : "PointOverrideSidebar",
                    "Header": "Point Override",
                    "Title": "Point Override Information",
                    "Status": 1,
                    "AutoHide": true
                }
            });
            if (objContext.props.ElementRef.current.ShowToolTip) {
                objContext.props.ElementRef.current.ShowToolTip();
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { showTooltip: true }, blnUndoRedoUpdate: false });
            }
        }
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {objContext: {state, props, dispatch, <ModuleName>_ModuleProcessor}}
     * @summary Sets 'cIsPointOverride' to 'N'
     */
    RemovePointOverride(objContext) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        "cIsPointOverride": "N",
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0,
                        "dNotAnsweredPoint": 0
                    }
                }
            }
        });
    }

    /**
     * @name PointsOverride
     * @param {object} objContext {objContext: {state, props, dispatch, <ModuleName>_ModuleProcessor}}
     * @param {object} objPoints Points
     * @summary this method update the points in element json.
     */
    PointsOverride(objContext, objPoints) {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["cIsPointOverride"]: "Y",
                        ...objPoints
                    }
                }
            }
        });
    }

    /**
     * @name PreserveTextState
     * @param {number} iElementId unique element id.
     * @param {object} State latest state.
     * @param {object} objContext {objContext: {state, props, dispatch, <ModuleName>_ModuleProcessor}}
     * @summary
     */
    PreserveTextState(iElementId, State, objContext) {
        objContext.CMSTextState.current({
            ...objContext.CMSTextState.current,
            [iElementId]: { ...State }
        });
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson.iElementId, { ...objContext.State, CMSTextState: { ...objContext.textState.current } });
        }
    }

    /**
     * @name GetLoadSolutionType
     * @param {object} objContext {state, props, dispatch, CMS<ElementType>_TestApplication_ModuleProcessor}
     * @summary Gets the type of load solution case.
     * @returns {object} Load Solution types.
     */
    GetLoadSolutionType(objContext = null, ElementJsonWithAnswer = null, UserAnswerJson = null, props = null) {
        let objReturnData = {
            "ViewSolution": false,
            "ViewComparison": false,
            "LoadUserResponse": false
        };
        if (objContext === null) {
            objContext = {
                "props": props
            };
        }
        if (ElementJsonWithAnswer === null && UserAnswerJson === null) {
            ElementJsonWithAnswer = objContext.props.ElementJsonWithAnswer ? objContext.props.ElementJsonWithAnswer : null;
            UserAnswerJson = objContext.props.UserAnswerJson ? objContext.props.UserAnswerJson : null;
        }
        if (ElementJsonWithAnswer !== null && UserAnswerJson === null) {
            objReturnData["ViewSolution"] = true;
        }
        else if (ElementJsonWithAnswer === null && UserAnswerJson !== null) {
            objReturnData["LoadUserResponse"] = true;
        }
        else if (ElementJsonWithAnswer !== null && UserAnswerJson !== null) {
            objReturnData["ViewComparison"] = true;
        }
        return objReturnData;
    }

    /**
     * @name LoadSolution
     * @param {object} objContext {state, props, dispatch, CMS<ElementType>_TestApplication_ModuleProcessor}
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @param {object} ElementEvaluationResult Evalutaion Result
     * @summary Load Solution called from use imperative.
     */
    LoadSolution(objContext, ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) {
        if (objContext.state.ElementJson["vElementJson"]["TextElements"] && objContext.state.ElementJson["vElementJson"]["TextElements"].length > 0) {
            objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.LoadSolution) {
                    let objElementJsonWithAnswer, objUserAnswerJson, objTextElementEvaluationResult;
                    if (ElementJsonWithAnswer !== null) {
                        objElementJsonWithAnswer = ElementJsonWithAnswer["vElementJson"]["TextElements"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    if (UserAnswerJson !== null) {
                        objUserAnswerJson = UserAnswerJson["TextElements"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    if (ElementEvaluationResult !== null) {
                        objTextElementEvaluationResult = ElementEvaluationResult["TextElements"].find(objTempData => objTempData["iElementId"] === objTempElement["iElementId"]);
                    }
                    objTempElement.Ref.current.LoadSolution(objElementJsonWithAnswer, objUserAnswerJson, objTextElementEvaluationResult);
                }
            });
        }
    }

    /**
     * @name ResetAnswerForTextElements
     * @param {object} objContext {state, props, dispatch, CMS<ElementType>_TestApplication_ModuleProcessor}
     * @summary Calls the reset answer of cms text for resetting sub element answers.
     */
    ResetAnswerForTextElements(objContext) {
        if (objContext.state.ElementJson["vElementJson"]["TextElements"] && objContext.state.ElementJson["vElementJson"]["TextElements"].length > 0) {
            objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.ResetAnswer) {
                    objTempElement.Ref.current.ResetAnswer();
                }
            });
        }
    }

    /**
     * @name UpdateTaskEditStatus
     * @param {any} objContext
     * @summary this update the task edit status.
     */
    UpdateTaskEditStatus(objContext) {
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current !== null && objContext.props.ParentRef.current.UpdateTaskEditStatus) {
            objContext.props.ParentRef.current.UpdateTaskEditStatus();
        }
    }

}

export default EditorBase_ModuleProcessor;
