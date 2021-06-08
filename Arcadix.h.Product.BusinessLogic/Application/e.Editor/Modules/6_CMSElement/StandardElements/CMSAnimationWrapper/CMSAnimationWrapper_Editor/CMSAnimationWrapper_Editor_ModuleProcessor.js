//Module realted fies.
import CMSAnimationWrapper_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor_ContextMenu";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related imports
import * as CMSAnimationWrapper_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSAnimationWrapper_Editor_ModuleProcessor
 * @summary Contains the AnimationWrapper's editor version module specific methods.
 * */
class CMSAnimationWrapper_Editor_ModuleProcessor extends CMSAnimationWrapper_Editor_ContextMenu {

    /**
     * @name LoadAnimation
     * @param {object} objParams {objContext: {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}, objValue: AnimationWrapper value object}
     * @summary Opens the pop up to select new animation.
     */
    LoadAnimation(objParams) {
        let { objContext } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Animation",
                "FolderID": objContext.props.ElementJson.FolderID,
                "PreSelectNode": objContext.state.ElementJson["vAnimationElementJson"],
                "ShowMultiMediaAddEdit": true,
                "ShowMultiMediaManagement": true
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '573px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objNewElementJson) => {
                    objNewElementJson = {
                        "objElementJson": { ...objNewElementJson }
                    };
                    let objElementJson = CMSAnimationWrapper_Editor_MetaData.GetDefaultElementJson(objContext.state.ElementJson["iOrder"], objNewElementJson);
                    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.props.ParentRef.current.ReplaceElement(objContext.state.ElementJson["iElementId"], objElementJson);
                }
            }
        });
    }

    /**
     * @name GetElementJsonForIFramelessAnimation
     * @summary this method reuturns the elementjson for iframeless animation.
     * */
    async GetElementJsonForIFramelessAnimation(objContext) {
        let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
        let arrNewTextElements = [];
        let objAnimationMethods;

        if (window["IframelessAnimation_" + objContext.state.ElementJson.iElementId + "_" + "Editor"]) {
            objAnimationMethods = window["IframelessAnimation_" + objContext.state.ElementJson.iElementId + "_" + "Editor"];
        }

        for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
            let objTextElementJson = { ...arrTextElements[intCount] };
            if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(blnRemoveRef = true, strDataFor = null);
            }
            arrNewTextElements = [
                ...arrNewTextElements,
                objTextElementJson
            ];
        }

        let objInitialAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"] };
        let objResourceAttributeValue = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"];
        let objAnswerAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"] };
        if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y") {
            let objAnimationData;
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"].toLowerCase() === "y") {
                objAnimationData = objAnimationMethods.GetStage().children[0].GetData(true);
            } else {
                objAnimationData = objAnimationMethods.GetData(true);
            }
            Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                objInitialAttributeValue[strKey] = objAnimationData[strKey];
            });
            if (objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]) {
                Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    objResourceAttributeValue[strKey] = objAnimationData[strKey];
                });
            }
            Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                objAnswerAttributeValue[strKey] = objAnimationData[strKey];
            });
        }
        let { vAnimationElementJson, cIsFirstLoad, ...objElementJson } = objContext.state.ElementJson;
        objElementJson = {
            ...objElementJson,
            "vAnimationElementJson": {
                ...vAnimationElementJson,
                "WrapperContents": {
                    ...vAnimationElementJson.WrapperContents,
                    "HtmlDoc": objContext.props.ElementJson.vAnimationElementJson.WrapperContents.HtmlDoc
                }
            },
            ["vElementJson"]: {
                ...objElementJson["vElementJson"],
                ["InitialAttributeValue"]: objInitialAttributeValue,
                ["ResourceAttributeValue"]: objResourceAttributeValue,
                ["AnswerAttributeValue"]: objAnswerAttributeValue,
                ["TextElements"]: arrTextElements
            },
        };
        objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        return objElementJson;
    }

    /**
     * @name OpenSidebar
     * @param {object} objParams {objContext: {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}, objValue: AnimationWrapper value object}
     * @summary Opens the sidebar to set the characterstics/initial values of the animation.
     */
    OpenSidebar(objParams) {
        let { objContext, objTextResource } = objParams;
        objContext.CMSAnimationWrapper_Editor_ModuleProcessor.OpenAnimationWrapperSidebar(objContext, objTextResource);
    }

    /**
     * @name OpenAnimationWrapperSidebar
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @summary Opens up the side bar.
     */
    OpenAnimationWrapperSidebar(objContext) {
        objContext.CMSAnimationWrapper_Editor_ModuleProcessor.CloseSidebar();
        let objTextResource = EditorState.GetReference("CommonTextResource");
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        let objElementJson;
        let objIframelessInstance = objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetIframelessAnimationInstance(objContext, "Editor");
        if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y") {
            let objAnimationData;
            if (objContext.state.cIsIframelessAnimation === "N") {
                if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objAnimationData = objContext.iFrameRef.current.contentWindow.stage.children[0].GetData(true);
                }
                else {
                    objAnimationData = objContext.iFrameRef.current.contentWindow.GetData(true);
                }
            } else {
                if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objAnimationData = objIframelessInstance.GetStage().children[0].GetData(true);
                }
                else {
                    objAnimationData = objIframelessInstance.GetData(true);
                }
            }
            let objInitialAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"] };
            let objResourceAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"] };
            let objAnswerAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"] };
            let blnHasResourceValues = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasResourceValues"] === "Y" ? true : false;
            Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                if (objAnimationData[strKey] && objAnimationData[strKey]["vValue"]) {
                    objInitialAttributeValue[strKey] = objAnimationData[strKey];
                }
                else {
                    let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"] === strKey);
                    if (objAnimationAttribute["vType"].toLowerCase() === "image" || objAnimationAttribute["vType"].toLowerCase() === "htmlimage") {
                        objInitialAttributeValue[strKey] = {
                            "vType": objAnimationAttribute["vType"],
                            "vValue": null
                        };
                    }
                    else if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                        objInitialAttributeValue[strKey] = [];
                    }
                    else if (objAnimationAttribute["vType"].toLowerCase() === "number") {
                        objInitialAttributeValue[strKey] = {
                            "vType": objAnimationAttribute["vType"],
                            "vValue": null
                        };
                    }
                    else {
                        objInitialAttributeValue[strKey] = {
                            "vType": objAnimationAttribute["vType"],
                            "vValue": null
                        };
                    }
                }
            });
            if (blnHasResourceValues) {
                Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    if (objAnimationData[strKey] && objAnimationData[strKey]["vValue"]) {
                        objResourceAttributeValue[strKey] = objAnimationData[strKey];
                    }
                    else {
                        let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"] === strKey);
                        if (objAnimationAttribute["vType"].toLowerCase() === "image" || objAnimationAttribute["vType"].toLowerCase() === "htmlimage") {
                            objResourceAttributeValue[strKey] = {
                                "vType": objAnimationAttribute["vType"],
                                "vValue": null
                            };
                        }
                        else if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                            objResourceAttributeValue[strKey] = [];
                        }
                        else if (objAnimationAttribute["vType"].toLowerCase() === "number") {
                            objResourceAttributeValue[strKey] = {
                                "vType": objAnimationAttribute["vType"],
                                "vValue": null
                            };
                        }
                        else {
                            objResourceAttributeValue[strKey] = {
                                "vType": objAnimationAttribute["vType"],
                                "vValue": null
                            };
                        }
                    }
                });
            }
            Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                if (objAnimationData[strKey] && objAnimationData[strKey]["Min"] && objAnimationData[strKey]["Min"]["vValue"]) {
                    objAnswerAttributeValue[strKey] = objAnimationData[strKey];
                }
                else {
                    let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"] === strKey);
                    if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                        objAnswerAttributeValue[strKey] = {
                            "Min": [],
                            "Max": [],
                            "Tolerance": []
                        };
                    }
                    else if (objAnimationAttribute["vType"].toLowerCase() === "number") {
                        objAnswerAttributeValue[strKey] = {
                            "Min": {
                                "vType": "Number",
                                "vValue": null
                            },
                            "Max": {
                                "vType": "Number",
                                "vValue": null
                            },
                            "Tolerance": {
                                "vType": "Number",
                                "vValue": 0
                            }
                        };
                    }
                    else {
                        objAnswerAttributeValue[strKey] = {
                            "Min": {
                                "vType": "Text",
                                "vValue": null
                            },
                            "Max": {
                                "vType": "Text",
                                "vValue": null
                            },
                            "Tolerance": {
                                "vType": "Number",
                                "vValue": 0
                            }
                        };
                    }
                }
            });
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["InitialAttributeValue"]: objInitialAttributeValue,
                    ["ResourceAttributeValue"]: objResourceAttributeValue,
                    ["AnswerAttributeValue"]: objAnswerAttributeValue
                }
            };
        }
        else {
            objElementJson = { ...objContext.state.ElementJson };
        }
        fnShowSidebar({
            "ElementJson": { ...objElementJson },
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.CloseSidebar();
                    objContext.blnIsInitialValuesSet_Ref.current = true;
                    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({
                        "type": "SET_STATE",
                        "payload": {
                            "ElementJson": objNewElementJson,
                            "blnToggleLoadInitialize": !objContext.state.blnToggleLoadInitialize
                        }
                    });
                }
            },
            "SidebarProps": {
                "SidebarName": "AnimationWrapperSidebar",
                "Header": objContext.CMSAnimationWrapper_Editor_ModuleProcessor.TextFormatter(objTextResource, "AnimationWrapper_SidebarHeader"),
                "Title": objContext.CMSAnimationWrapper_Editor_ModuleProcessor.TextFormatter(objTextResource, "AnimationWrapper_SidebarTitle"),
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name GetIframelessAnimationObject
     * @summary this returns the iframeless animation object.
     * */
    GetIframelessAnimationInstance(Context, AppType) {
        let objAnimationInstance;
        if (window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType]) {
            objAnimationInstance = window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType];
        }
        return objAnimationInstance;
    }

    /**
     * @name GetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @summary this collect the points from Element json and return.
     * @returns {object} objPoint {Points : [], isNACommon : true/false}.
     */
    GetPointOverride(objContext) {
        let objPoint = {
            "Points": [],
            "NA": objContext.state.ElementJson["vElementJson"]["dNotAnsweredPoint"],
            "WA": objContext.state.ElementJson["vElementJson"]["dWrongPoint"],
            "CA": objContext.state.ElementJson["vElementJson"]["dCorrectPoint"],
            "isSinglePoint": true
        };
        return objPoint;
    }

    /**
     * @name SetPointOverride
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @param {any} objPoints points for the element {Points : [], isNACommon : true/false}.
     * @summary this update the Points from the sidebar.
     */
    SetPointOverride(objContext, objPoints) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "Y",
                "dNotAnsweredPoint": objPoints.NA,
                "dCorrectPoint": objPoints.CA,
                "dWrongPoint": objPoints.WA
            }
        };
        objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name RemovePointOverride
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @summary  removes point override.
     */
    RemovePointOverride(objContext) {
        let objElementJson = {
            ...objContext.state.ElementJson,
            "vElementJson": {
                ...objContext.state.ElementJson["vElementJson"],
                "cIsPointOverride": "N",
                "dNotAnsweredPoint": 0,
                "dCorrectPoint": 0,
                "dWrongPoint": 0
            }
        };
        objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
     * @name SetPoints
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
     * @param {object} objPoints Points to be added to element json
     * @summary Sets the points to animation.
     */
    SetPoints(objContext, objPoints) {
    }

    /**
     * @name LoadView
     * @param {object} objParams {objContext: {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}, View: Initial/Solution}
     * @summary Displays the animation in soution/initial view.
     */
    LoadView(objParams) {
        let { objContext, View } = objParams;
        objContext.blnIsLoadViewClicked.current = true;
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "LoadViewType": View
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAnimationWrapper/CMSAnimationWrapperStyles.css"
        ];
    }
}

export default CMSAnimationWrapper_Editor_ModuleProcessor;
