//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Object
import Object_TaskContent_CMSElement_CMSAnimation from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAnimation";

/**
 * @name CMSAnimationWrapper_TestApplication_ModuleProcessor
 * @summary Contains the AnimationWrapper's test application version module specific methods.
 * */
class CMSAnimationWrapper_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} objAnimationElementJson Animation ElementJson
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext = null, objLoadSolutionType = null, ElementJsonWithAnswer = null, UserAnswerJson = null, props = null) {
        if (objContext === null) {
            objContext = {
                ...objContext,
                "props": props
            };
        }
        let objElementJson;
        let objAnimationElementJson = {
            ...objContext.props.ElementJson["vAnimationElementJson"]
        };
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution, Load User Response and User response Comparison
        {
            objElementJson = {
                ...objContext.props.ElementJson
            };
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
            let objAnswerAttributeValue = {};
            Object.keys(objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                let objAnimationAttribute = objAnimationElementJson["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"] === strKey);
                if (UserAnswerJson["Answers"].filter(objTempData => objTempData["vAttributeName"] === strKey).length > 0) {
                    let objResponse = UserAnswerJson["Answers"].find(objTempData => objTempData["vAttributeName"] === strKey);
                    if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                        let arrData = [];
                        objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                            if (intIndex < objResponse["UserResponse"].length) {
                                arrData = [
                                    ...arrData,
                                    {
                                        ...objTempData,
                                        ["vValue"]: intIndex
                                    }
                                ];
                            }
                            else {
                                arrData = [
                                    ...arrData,
                                    {
                                        ...objTempData,
                                        ["vValue"]: -1
                                    }
                                ];
                            }
                        });
                        objAnswerAttributeValue[strKey] = {
                            ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey],
                            ["Min"]: arrData
                        };
                    }
                    else {
                        objAnswerAttributeValue[strKey] = {
                            ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey],
                            ["Min"]: {
                                ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"],
                                ["vValue"]: objResponse["UserResponse"]
                            }
                        };
                    }
                }
            });
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["AnswerAttributeValue"]: objAnswerAttributeValue
                }
            };
        }
        else//Normal Execution
        {
            let objAnswerAttributeValue = {};
            Object.keys(objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                let objAnimationAttribute = objAnimationElementJson["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"] === strKey);
                if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                    let arrData = [];
                    objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map(objTempData => {
                        arrData = [
                            ...arrData,
                            {
                                ...objTempData,
                                ["vValue"]: -1
                            }
                        ];
                    });
                    objAnswerAttributeValue[strKey] = {
                        ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey],
                        ["Min"]: arrData
                    };
                }
                else {
                    objAnswerAttributeValue[strKey] = {
                        ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey],
                        ["Min"]: {
                            ...objContext.props.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"],
                            ["vValue"]: -1
                        }
                    };
                }
            });
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["AnswerAttributeValue"]: objAnswerAttributeValue
                }
            };
        }
        console.log("Animation ElementJson", objElementJson);
        return objElementJson;
    }

    /**
     * @name FormResponse 
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @param {object} objArcadix Arcadix Object with response data.
     * @returns {array} response. 
     */
    FormResponse(objContext, objArcadix) {
        let arrAnswerAttributeValue = [];
        let cIsAnswered = "N";
        Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
            let objAnimationAttribute = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute["vType"].toLowerCase() === "array") {
                let arrData = [];
                objArcadix[strKey].map(strValue => {
                    if (strValue !== null) {
                        cIsAnswered = "Y";
                    }
                    arrData = [
                        ...arrData,
                        strValue
                    ];
                });
                arrAnswerAttributeValue = [
                    ...arrAnswerAttributeValue,
                    {
                        "vAttributeName": strKey,
                        "UserResponse": arrData
                    }
                ];
            }
            else {
                let strValue = null;
                if (objAnimationAttribute["vType"].toLowerCase() === "number") {
                    if (objArcadix[strKey] !== null) {
                        cIsAnswered = "Y";
                        strValue = Number(objArcadix[strKey]);
                    }
                }
                else {
                    if (objArcadix[strKey] !== null) {
                        cIsAnswered = "Y";
                        strValue = objArcadix[strKey].toString();
                    }
                }
                arrAnswerAttributeValue = [
                    ...arrAnswerAttributeValue,
                    {
                        "vAttributeName": strKey,
                        "UserResponse": strValue
                    }
                ];
            }
        });
        let arrResponse = [
            {
                ["iElementId"]: objContext.state.ElementJson["iElementId"],
                ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                ["Answers"]: arrAnswerAttributeValue,
                ["TextElements"]: arrResponse,
                ["cIsAnswered"]: cIsAnswered
            }
        ];
        return arrResponse;
    }

    /**
     * @name GetIframelessUserResponse
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @summary Gets the user response for iframeless version of animation wrapper.
     */
    GetIframelessUserResponse(objContext) {
        let objAnimationMethods;
        if (window["IframelessAnimation_" + objContext.state.ElementJson.iElementId + "_" + "TestApplication"]) {
            objAnimationMethods = window["IframelessAnimation_" + objContext.state.ElementJson.iElementId + "_" + "TestApplication"];
        }
        if (objAnimationMethods) {
            let arrResponse = [];
            objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
                if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
                    arrResponse = [
                        ...arrResponse,
                        ...objTempElement.Ref.current.GetUserResponse()
                    ];
                }
            });
            let objArcadix;
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                objArcadix = objAnimationMethods.GetStage().children[0].GetData();
            } else {
                if (objAnimationMethods.GetData !== undefined)
                    objArcadix = objAnimationMethods.GetData();
            }
            let arrRes = objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.FormResponse(objContext, objArcadix);
            arrResponse = [...arrRes];
            return arrResponse;
        }
    }

    /**
     * @name GetIFrameUserResponse
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @summary Gets the user response for iframe version of animation wrapper.
     */
    GetIFrameUserResponse(objContext) {
        let arrResponse = [];
        // objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
        //     if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
        //         arrResponse = [
        //             ...arrResponse,
        //             ...objTempElement.Ref.current.GetUserResponse()
        //         ];
        //     }
        // });
        let objArcadix;
        if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
            // objArcadix = objContext.iAnswerJsonRef;
            if (objContext.iFrameRef.current.contentWindow.stage.children[0].GetData !== undefined)
                objArcadix = objContext.iFrameRef.current.contentWindow.stage.children[0].GetData();
            else
                objArcadix = objContext.iFrameRef.current.contentWindow.stage.children[0].Arcadix;
        }
        else {
            if (objContext.iFrameRef.current.contentWindow.GetData !== undefined)
                objArcadix = objContext.iFrameRef.current.contentWindow.GetData();
            else
                objArcadix = objContext.iFrameRef.current.contentWindow.Arcadix;
        }
        let arrRes = objContext.CMSAnimationWrapper_TestApplication_ModuleProcessor.FormResponse(objContext, objArcadix);
        arrResponse = [...arrRes];
        return arrResponse;
    }

    /**
     * @name GetAnimationElementJson
     * @param {any} objContext {state, disptach, props, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @sumamry Makes an Api call to get the Html for Animation Wrapper.
     * @returns {any} Animation Element Json
     */
    async GetAnimationElementJson(objContext) {
        let objParams = {
            "ElementJson": objContext.props.ElementJson["vAnimationElementJson"]
        };
        let objWrapperContents = await Object_TaskContent_CMSElement_CMSAnimation.GetAnimationWrapperContents(objParams);
        if (objWrapperContents && objWrapperContents !== null) {
            return {
                ...objContext.props.ElementJson["vAnimationElementJson"],
                ["WrapperContents"]: {
                    ...objWrapperContents["WrapperContents"]
                },
                ["SidebarContents"]: {
                    ...objWrapperContents["SidebarContents"]
                },
                ["PageIds"]: objWrapperContents["PageIds"]
            };
        }
        return {
            ...objContext.props.ElementJson["vAnimationElementJson"]
        };
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.ResetAnswer_Ref.current = true;
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ViewSolution": false,
                "ViewComparison": false,
                "LoadUserResponse": false,
                "blnIsResetAnswer": !objContext.state.blnIsResetAnswer,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null,
                "blnIsDirectLoadSolution": false
            }
        });
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

export default CMSAnimationWrapper_TestApplication_ModuleProcessor;
