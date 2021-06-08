//React imports
import React from 'react';

//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSGenericDragDrop_TestApplication_ModuleProcessor
 * @summary Contains the MoveableElementHolder's test application version module specific methods.
 * */
class CMSGenericDragDrop_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @param {object} ElementJsonWithAnswer Original Element Json
     * @param {object} UserAnswerJson User answer response
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext = null, objLoadSolutionType = null, ElementJsonWithAnswer = null, UserAnswerJson = null, props = null) {
        if (objContext === null) {
            objContext = {
                "props": props
            };
        }
        let objElementJson;
        if (objLoadSolutionType["ViewSolution"])//Show Original Solution, Load User Response and User response Comparison
        {
            if (UserAnswerJson !== null) {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["DragObjects"]: objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                            return {
                                ...x,
                                "cIsUsed": UserAnswerJson["Answers"].filter(y => y["DraggedObjects"].filter(z => z === x["iElementGenericDragObjectId"]).length > 0) ? "Y" : "N",
                                "DivRef": React.createRef()
                            };
                        }),
                        ["DropObjects"]: UserAnswerJson["Answers"].map(x => {
                            return {
                                ...x,
                                "DivRef": React.createRef()
                            };
                        })
                    }
                };
            }
            else {
                objElementJson = {
                    ...objContext.props.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.props.ElementJson["vElementJson"],
                        ["DragObjects"]: objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                            return {
                                ...x,
                                "DivRef": React.createRef()
                            };
                        }),
                        ["DropObjects"]: objContext.props.ElementJson["vElementJson"]["DropObjects"].map(x => {
                            return {
                                ...x,
                                "DivRef": React.createRef()
                            };
                        })
                    }
                };
            }
        }
        else if (objLoadSolutionType["ViewComparison"] || objLoadSolutionType["LoadUserResponse"]) {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["DragObjects"]: objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                        if (x["cIsDraggable"] === "Y") {
                            return {
                                ...x,
                                "cIsUsed": UserAnswerJson["Answers"].filter(y => y["DraggedObjects"].filter(z => z === x["iElementGenericDragObjectId"]).length > 0).length > 0 ? "Y" : "N",
                                "DivRef": React.createRef()
                            };
                        }
                        else {
                            return {
                                ...x,
                                "DivRef": React.createRef()
                            };
                        }
                    }),
                    ["DropObjects"]: UserAnswerJson["Answers"].map(x => {
                        return {
                            ...x,
                            "DivRef": React.createRef()
                        };
                    })
                }
            };
        }
        else//Normal Execution
        {
            objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["DragObjects"]: objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                        if (x["cIsDraggable"] === "Y") {
                            return {
                                ...x,
                                "cIsUsed": "N",
                                "DivRef": React.createRef()
                            };
                        }
                        else {
                            return {
                                ...x,
                                "DivRef": React.createRef()
                            };
                        }
                    }),
                    ["DropObjects"]: objContext.props.ElementJson["vElementJson"]["DropObjects"].map(x => {
                        return {
                            ...x,
                            "DraggedObjects": [],
                            "DivRef": React.createRef()
                        };
                    })
                }
            };
        }
        return objElementJson;
    }

    RegisterDragObjectInDropObejct(objContext, intDropObjectId, intDragObjectId) {
        let arrDragObjects = objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
            if (x["iElementGenericDragObjectId"] === intDragObjectId) {
                return {
                    ...x,
                    ["cIsUsed"]: "Y"
                };
            }
            return {
                ...x
            };
        });
        let arrDropObjects = objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
            if (x["iElementGenericDropObjectId"] === intDropObjectId) {
                if (!x["DraggedObjects"].includes(y => y === intDragObjectId)) {
                    return {
                        ...x,
                        ["DraggedObjects"]: [...x["DraggedObjects"], intDragObjectId]
                    };
                }
            }
            return {
                ...x
            };
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: arrDragObjects,
                        ["DropObjects"]: arrDropObjects
                    }
                }
            }
        });
    }

    DeRegisterDragObjectFromDropObejct(objContext, intDropObjectId, intDragObjectId) {
        let arrDragObjects = objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
            if (x["iElementGenericDragObjectId"] === intDragObjectId) {
                return {
                    ...x,
                    ["cIsUsed"]: "N"
                };
            }
            return {
                ...x
            };
        });
        let arrDropObjects = objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
            if (x["iElementGenericDropObjectId"] === intDropObjectId) {
                return {
                    ...x,
                    "DraggedObjects": x["DraggedObjects"].filter(y => y !== intDragObjectId)
                };
            }
            return {
                ...x
            };
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: arrDragObjects,
                        ["DropObjects"]: arrDropObjects
                    }
                }
            }
        });
    }

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_TestApplication_ModuleProcessor}
     * @param {object} objElementJson Element json of mapped element.
     * @summary Returns props for mapped element.
     */
    GetMappedElementProps(objContext, objElementJson) {
        let objElementProps = {
            ...(objContext.props.IsForServerRenderHtml ? objContext.props : {}),
            "Mode": objContext.props.Mode,
            "ContainerId": objContext.props.ContainerId,
            "ParentRef": objContext.props.ElementRef,
            "PageId": objContext.props.PageId,
            "ElementRef": objElementJson.Ref,
            "ComponentController": objContext.props.ComponentController,
            "ElementJson": objElementJson,
            "JConfiguration": objContext.props.JConfiguration,
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                            if (x["cIsDraggable"] === "Y") {
                                return {
                                    ...x,
                                    "cIsUsed": "N",
                                    "DivRef": React.createRef()
                                };
                            }
                            else {
                                return {
                                    ...x,
                                    "DivRef": React.createRef()
                                };
                            }
                        }),
                        ["DropObjects"]: objContext.props.ElementJson["vElementJson"]["DropObjects"].map(x => {
                            return {
                                ...x,
                                "DraggedObjects": [],
                                "DivRef": React.createRef()
                            };
                        })
                    }
                },
                "ViewSolution": false,
                "ViewComparison": false,
                "LoadUserResponse": false,
                "ElementJsonWithAnswer": null,
                "UserAnswerJson": null,
                "ElementStatus": null
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSGenericDragDrop/CMSGenericDragDropStyles.css"
        ];
    }
}

export default CMSGenericDragDrop_TestApplication_ModuleProcessor;
