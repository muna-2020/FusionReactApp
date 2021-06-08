//React Imports
import React, { useEffect, useLayoutEffect } from 'react';

//Sring Formatter imports
import { RestoreStringForXML } from "@shared/Framework/Services/DataFormatter/StringFormatter/StringFormatter";

//Component Animation.
import ComponentAnimation from '@root/Framework/Controls/ComponentAnimation/ComponentAnimation';

//Css loader.
import * as CssLoader from '@shared/Framework/Services/CssLoader/CssLoader';

/**
 * @name CMSAnimationWrapper_Common
 * @param {object} props props from parent.
 * @sumamry Contains the common functionality for CMSAnimationWrapper.
 * @returns {any} JSX
 */
const CMSAnimationWrapper_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    let blnIsContextMenuOpened = false;

    const GetStringHtml = (blnIsForSolution = false) => {
        let strHtml;
        if (!blnIsForSolution) {
            strHtml = RestoreStringForXML(Context.state.ElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"]);
        }
        else {
            strHtml = RestoreStringForXML(Context.state.ElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDocSolution"]);
        }
        return strHtml;
    };

    useLayoutEffect(() => {
        if (Context.state.cIsIframelessAnimation === "N") {
            if (Context.state.ElementJson !== null && (!Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === null || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === "N")) {
                let objDocument = Context.iFrameRef.current.contentDocument || Context.iFrameRef.current.contentWindow.document;
                objDocument.open();
                objDocument.write(GetStringHtml());
                objDocument.close();
                if (objDocument.readyState === "loading" || objDocument.readyState === "interactive") {
                    objDocument.addEventListener("DOMContentLoaded", OnIFrameLoadComplete);
                }
                else {
                    OnIFrameLoadComplete();
                }
            }
        } else {
            let objBody = Context.iFrameRef.current.children[0];
            let strStyle = objBody.getAttribute("style");
            if (strStyle === null) {
                objBody.setAttribute("style", "overflow: hidden");
            }
            else if (!strStyle.includes("overflow: hidden")) {
                objBody.setAttribute("style", strStyle + "overflow: hidden");
            }
        }
    }, []);

    /**
     * @name useLayoutEffect
     * @summary 
     * */
    useLayoutEffect(() => {
        if (Context.state.cIsIframelessAnimation == "Y") {
            AddAndRunIframelessSolution(Context, "Solution");
        } else {
            if ((Context.state.ViewSolution ||
                (Context.state.ElementStatus !== null && Context.state.ViewComparison && (Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3))) &&
                (!Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === null
                    || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === "N")) {
                if (Context.ComponentAnimationRef_Solution.current && !Context.ComponentAnimationRef_Solution.current.IsComponentAnimationActive()) {
                    Context.ComponentAnimationRef_Solution.current.blnShowComponentAnimation(true);
                }
                let objDocument = Context.iFrameRef_Solution.current.contentDocument || Context.iFrameRef_Solution.current.contentWindow.document;
                objDocument.open();
                objDocument.write(GetStringHtml());
                objDocument.close();
                if (objDocument.readyState === "loading" || objDocument.readyState === "interactive") {
                    objDocument.addEventListener("DOMContentLoaded", OnIFrameLoadComplete_Solution);
                }
                else {
                    OnIFrameLoadComplete_Solution();
                }
            }
        }
        return () => {
            RemoveIframelessAnimationObject(Context, "Solution");
        }
    }, [Context.state.ToggleLoadSolution]);

    /**
     * @name useEffect
     * @summary Calls 'ExecuteLoadInitialize_Editor' when the initial values are set from sidebar and animation is inilne editable.
     */
    useEffect(() => {
        if (AppType.toLowerCase() === "editor") {
            if (Context.state.cIsIframelessAnimation.toLowerCase() === "y") {
                ExecuteLoadInitialize_IFrameless_Editor();
            }
            else if (Context.blnIsInitialValuesSet_Ref && Context.blnIsInitialValuesSet_Ref.current) {
                ExecuteLoadInitialize_Editor();
            }
        }
    }, [Context.state.blnToggleLoadInitialize]);

    /**
     * @name useEffect
     * @summary Calls 'ExecuteLoadInitialize_Editor' when the view type is changed.
     */
    useEffect(() => {
        if (AppType.toLowerCase() === "editor" && Context.blnIsLoadViewClicked.current) {
            if (Context.state.cIsIframelessAnimation.toLowerCase() === "y") {
                if (Context.state.LoadViewType.toLowerCase() === "initial") {
                    ExecuteLoadInitialize_IFrameless_Editor();
                }
                else {
                    ExecuteLoadSolution_IFrameless("Editor");
                }
            }
            else {
                if (Context.state.LoadViewType.toLowerCase() === "initial") {
                    ExecuteLoadInitialize_Editor();
                }
                else {
                    ExecuteLoadSolution(Context.iFrameRef);
                }
            }
        }
    }, [Context.state.LoadViewType]);

    /**
     * @name useEffect
     * @summary This effect closes the context menu when the user clicks anywhere else on the canvas.
     */
    useEffect(() => {
        if (blnIsContextMenuOpened) {
            let objDocument = Context.iFrameRef.current.contentDocument || Context.iFrameRef.current.contentWindow.document;
            objDocument.removeEventListener("click", (event) => {
                DisptachMainDocumentClickEvent(false);
            });
        }
    }, [blnIsContextMenuOpened]);

    /**
     * @name useEffect
     * @summary This effect resets the user answer response.
     */
    useEffect(() => {
        if (Context.ResetAnswer_Ref && Context.ResetAnswer_Ref.current !== null && Context.ResetAnswer_Ref.current) {
            Context.ResetAnswer_Ref.current = false;
            setTimeout(() => { ExecuteLoadInitialize_TestApplication(Context.iFrameRef); }, 100);
        }
    }, [Context.state.blnIsResetAnswer]);

    /**
     * @name LoadScript
     * @param {any} src
     * @summary this dynamically load the script to header.
     */
    async function LoadScript(src) {
        return new Promise(function (resolve, reject) {
            if (!src || src == null || document.getElementById(src) !== null) {
                resolve("script already added");
            } else {
                let s;
                s = document.createElement('script');
                s.src = src;
                s.onload = resolve;
                s.onerror = reject;
                s.id = src;
                document.head.appendChild(s);
            }
        });
    }

    /**
     * @name useLayoutEffect
     * */
    useLayoutEffect(() => {
        if (!Context.state.isScriptLoadComplete && Context.state.cIsIframelessAnimation.toLowerCase() === "y") {
            Context.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["Styles"].forEach(objStyle => {
                CssLoader.LoadDynamicStyles(objStyle.Path);
            });
            let arrScriptLoadPromises = [];
            Context.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["Scripts"].forEach(objScript => {
                arrScriptLoadPromises.push(LoadScript(objScript.Path));
            });

            if (arrScriptLoadPromises.length > 0) {
                Promise.all([...arrScriptLoadPromises]).then(() => {
                    setTimeout(Context.dispatch({ type: "SET_STATE", payload: { ...Context.state, "isScriptLoadComplete": true } }), 200);
                }).catch((objError) => {
                    Context.dispatch({ type: "SET_STATE", payload: { ...Context.state, "isScriptLoadComplete": false } });
                });
            } else {
                Context.dispatch({ type: "SET_STATE", payload: { "isScriptLoadComplete": true } });
            }
        }
    }, []);

    /**
     * @name useLayoutEffect
     * */
    useLayoutEffect(() => {
        AddAndRunIframelessAnimation(Context, AppType);
        return () => {
            RemoveIframelessAnimationObject(Context, AppType);
        }
    }, [Context.state.isScriptLoadComplete]);


    /**
     * @name RemoveIframelessAnimationObject
     * @param {any} Context
     * @param {any} AppType
     */
    const RemoveIframelessAnimationObject = (Context, AppType) => {
        if (window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType]) {
            delete window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType];
        }
    }

    /**
     * @name AddAndRunIframelessAnimation
     * @param {object} Context 
     * @param {string} AppType
     * @summary this method add the Animation object to window and run for iframeless animations.
     */
    const AddAndRunIframelessAnimation = (Context, AppType) => {
        if (Context.state.isScriptLoadComplete && Context.state.cIsIframelessAnimation.toLowerCase() === "y") {
            let fnAnimation = new Function("return " + Context.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["AnimationScript"])();
            window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType] = fnAnimation(Context.state.ElementJson.iElementId + "_" + AppType);
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"].toLowerCase() === "y") {
                window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType].init();
            }
            if (AppType.toLowerCase() === "editor") {
                // setTimeout(ExecuteLoadInitialize_IFrameless_Editor, 100);
                setTimeout(ExecuteLoadInitialize_IFrameless_Editor);
            }
            else {
                // setTimeout(ExecuteLoadInitialize_IFrameless_TestApplication, 100);
                setTimeout(ExecuteLoadInitialize_IFrameless_TestApplication);
            }
        }
    }

    /**
     * @name AddAndRunIframelessLoadSolution
     * @param {object} Context
     * @param {string} AppType
     * @summary this method run the solution for iframeless animations.
     * */
    const AddAndRunIframelessSolution = (Context, AppType) => {
        if ((Context.state.ViewSolution || (Context.state.ElementStatus !== null && Context.state.ViewComparison && (Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3)))) {
            let fnAnimation = new Function("return " + Context.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["AnimationScript"])();
            window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + "Solution"] = fnAnimation(Context.state.ElementJson.iElementId + "_" + "Solution");
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"].toLowerCase() === "y") {
                window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + "Solution"].init();
            }
            setTimeout(() => {
                ExecuteLoadInitialize_IFrameless_TestApplication();
                setTimeout(() => {
                    ExecuteLoadSolution_IFrameless(AppType);
                }, 100);
            }, 50);
        }
    }

    /**
     * @name GetIframelessAnimationObject
     * @summary this returns the iframeless animation object.
     * */
    const GetIframelessAnimationInstance = (Context, AppType) => {
        let objAnimationInstance;
        if (window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType]) {
            objAnimationInstance = window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType];
        }
        return objAnimationInstance;
    }

    /**
     * @name IframelessContextMenu
     * @summary iframeless context menu.
     * */
    const ShowIframelessContextMenu = (objEvent) => {
        if (Events.OpenContextMenu) {
            let strContextMenuOptions = null, objIframeDoc;
            let objAnimationInstance = GetIframelessAnimationInstance(Context, AppType);
            if (objAnimationInstance) {
                if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objIframeDoc = objAnimationInstance.GetStage().children[0];
                }
                else {
                    objIframeDoc = objAnimationInstance;
                }
                if (objIframeDoc.GetContextMenuData) {
                    strContextMenuOptions = objIframeDoc.GetContextMenuData(event.target);
                }
                let ContextEvent = {
                    "preventDefault": () => {
                        objEvent.preventDefault();
                    },
                    "stopPropagation": () => {
                        objEvent.stopPropagation();
                    },
                    "clientX": objEvent.clientX,
                    "clientY": objEvent.clientY,
                    "target": objEvent.target
                };
                let objAnimationSpecificContextMenu = {
                    "ContextMenuOptions": strContextMenuOptions,
                    "Target": objEvent.target
                }
                Events.OpenContextMenu(ContextEvent, objAnimationSpecificContextMenu);
            }
        } else {
            objEvent.preventDefault();
            objEvent.stopPropagation();
        }
    };

    /**
     * @name OnIFrameLoadComplete
     * @summary This is called when iframe is loaded.
     */
    const OnIFrameLoadComplete = () => {
        let objDocument = Context.iFrameRef.current.contentDocument || Context.iFrameRef.current.contentWindow.document;
        if (!Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === null || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === "N") {
            objDocument.removeEventListener("DOMContentLoaded", OnIFrameLoadComplete);
        }
        let objBody = objDocument.body;
        let strStyle = objBody.getAttribute("style");
        if (strStyle === null) {
            objBody.setAttribute("style", "overflow: hidden");
        }
        else if (!strStyle.includes("overflow: hidden")) {
            objBody.setAttribute("style", strStyle + "overflow: hidden");
        }
        objDocument.addEventListener("contextmenu", (event) => {
            objDocument.addEventListener("click", (event) => {
                DisptachMainDocumentClickEvent(true);
            });
            if (Events.OpenContextMenu) {
                var objClientRect = Context.iFrameRef.current.getBoundingClientRect();
                let strContextMenuOptions = null, objIframeDoc;
                if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objIframeDoc = Context.iFrameRef.current.contentWindow.stage.children[0];
                }
                else {
                    objIframeDoc = Context.iFrameRef.current.contentWindow;
                }
                if (objIframeDoc.GetContextMenuData) {
                    strContextMenuOptions = objIframeDoc.GetContextMenuData(event.target);
                }
                let ContextEvent = {
                    "preventDefault": () => {
                        event.preventDefault();
                    },
                    "stopPropagation": () => {
                        event.stopPropagation();
                    },
                    "clientX": event.clientX + objClientRect.left,
                    "clientY": event.clientY + objClientRect.top,
                    "target": event.target
                };
                let objAnimationSpecificContextMenu = {
                    "ContextMenuOptions": strContextMenuOptions,
                    "Target": event.target
                }
                Events.OpenContextMenu(ContextEvent, objAnimationSpecificContextMenu);
            }
            else {
                event.preventDefault();
                event.stopPropagation();
            }
        });
        if (AppType.toLowerCase() === "editor") {
            setTimeout(ExecuteLoadInitialize_Editor, 100);
        }
        else {
            setTimeout(() => { ExecuteLoadInitialize_TestApplication(Context.iFrameRef); }, 100);
        }
    };

    /**
     * @name OnIFrameLoadComplete_Solution
     * @summary This is called when solution iframe is loaded.
     */
    const OnIFrameLoadComplete_Solution = () => {
        let objDocument = Context.iFrameRef_Solution.current.contentDocument || Context.iFrameRef_Solution.current.contentWindow.document;
        if (!Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === null || Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === "N") {
            objDocument.removeEventListener("DOMContentLoaded", OnIFrameLoadComplete_Solution);
        }
        let objBody = objDocument.body;
        let strStyle = objBody.getAttribute("style");
        if (strStyle === null) {
            objBody.setAttribute("style", "overflow: hidden");
        }
        else if (!strStyle.includes("overflow: hidden")) {
            objBody.setAttribute("style", strStyle + "overflow: hidden");
        }
        setTimeout(() => {
            ExecuteLoadInitialize_TestApplication(Context.iFrameRef_Solution);
            setTimeout(() => {
                ExecuteLoadSolution(Context.iFrameRef_Solution);
                if (Context.ComponentAnimationRef_Solution.current) {
                    Context.ComponentAnimationRef_Solution.current.blnShowComponentAnimation(false);
                }
            }, 200);
        }, 100);
    };

    /**
     * @name DisptachMainDocumentClickEvent
     * @param {boolean} blnContextMenuOpenStatus is the context menu currently showig or not.
     * @summary changes the value of "blnIsContextMenuOpened" and dispatched an main document click event.
     */
    const DisptachMainDocumentClickEvent = (blnContextMenuOpenStatus) => {
        blnIsContextMenuOpened = blnContextMenuOpenStatus;
        let testEvent1 = new Event("click");
        document.dispatchEvent(testEvent1);
    };

    /**
     * @name ExecuteLoadInitialize_Editor
     * @summary Executes Load initialize for editor.
     */
    const ExecuteLoadInitialize_Editor = () => {
        let objArcadixData = null;
        if ((Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIs3D"] && Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIs3D"] === "Y") || !Context.state.ElementJson["cIsFirstLoad"] || Context.state.ElementJson["cIsFirstLoad"] === "N") {
            objArcadixData = {};
            Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
                }
            });
            if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
                Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                        let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                        if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                            objArcadixData[strKey] = [];
                            Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                                objArcadixData[strKey][intIndex] = objTempData["vValue"];
                            });
                        }
                        else {
                            objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                        }
                    });
                });
            }
            Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                }
            });
        }
        if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
                if (Context.state.LoadViewType.toLowerCase() === "initial") {
                    setTimeout(() => { Context.iFrameRef.current.contentWindow.stage.children[0].LoadInitialize(objArcadixData, null, "Edit"); }, 200);
                }
                else {
                    setTimeout(() => { Context.iFrameRef.current.contentWindow.stage.children[0].LoadInitialize(objArcadixData, () => { ExecuteLoadSolution(Context.iFrameRef); }, "Edit"); }, 200);
                }
            }
            else {
                if (Context.state.ElementJson["cIsFirstLoad"] && Context.state.ElementJson["cIsFirstLoad"] === "Y") {
                    objArcadixData = {};
                }
                objArcadixData["InitialArcadix_Mode"] = "Edit";
                Context.iFrameRef.current.contentWindow.stage.children[0].Arcadix = objArcadixData;
                if (Context.state.LoadViewType.toLowerCase() === "initial") {
                    setTimeout(() => { Context.iFrameRef.current.contentWindow.stage.children[0].LoadInitialize(objArcadixData, null, "Edit"); }, 200);
                }
                else {
                    setTimeout(() => { Context.iFrameRef.current.contentWindow.stage.children[0].LoadInitialize(objArcadixData, () => { ExecuteLoadSolution(Context.iFrameRef); }, "Edit"); }, 200);
                }
            }
        }
        else {
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
                if (Context.state.ElementJson["cIsFirstLoad"] && Context.state.ElementJson["cIsFirstLoad"] === "Y" && Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIs3D"] === "Y") {
                    if (Context.state.LoadViewType.toLowerCase() === "initial") {
                        setTimeout(() => { Context.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData, null, "Edit", false); }, 200);
                    }
                    else {
                        setTimeout(() => { Context.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData, () => { ExecuteLoadSolution(Context.iFrameRef); }, "Edit", false); }, 200);
                    }
                }
                else {
                    if (Context.state.LoadViewType.toLowerCase() === "initial") {
                        setTimeout(() => { Context.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData, null, "Edit"); }, 200);
                    }
                    else {
                        setTimeout(() => { Context.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData, () => { ExecuteLoadSolution(Context.iFrameRef); }, "Edit"); }, 200);
                    }
                }
            }
            else {
                if (Context.state.ElementJson["cIsFirstLoad"] && Context.state.ElementJson["cIsFirstLoad"] === "Y") {
                    objArcadixData = {};
                }
                objArcadixData["InitialArcadix_Mode"] = "Edit";
                Object.keys(objArcadixData).map(strKey => {
                    Context.iFrameRef.current.contentWindow[strKey] = objArcadixData[strKey];
                });
                Context.iFrameRef.current.contentWindow.Arcadix = objArcadixData;
                setTimeout(() => { Context.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData, null, "Edit"); }, 200);
                if (Context.state.LoadViewType.toLowerCase() === "solution") {
                    if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIs3D"] === "Y") {
                        setTimeout(() => {
                            ExecuteLoadSolution(Context.iFrameRef);
                            setTimeout(() => { Context.iFrameRef.current.contentWindow.pc.Application.getApplication().context.mouse.fire('click'); }, 1000);
                        }, 1000);
                    }
                    else {
                        setTimeout(() => { ExecuteLoadSolution(Context.iFrameRef); }, 1000);
                    }
                }
            }
        }
    };

    /**
     * @name ExecuteLoadInitialize_TestApplication
     * @param {ref} iFrameRef iFrame Ref
     * @summary Executes Load initialize for test application.
     */
    const ExecuteLoadInitialize_TestApplication = (refIframe) => {
        let objArcadixData = {};
        Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
            let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                objArcadixData[strKey] = [];
                Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                    objArcadixData[strKey][intIndex] = objTempData["vValue"];
                });
            }
            else {
                objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
            }
        });
        if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
            Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                }
            });
        }
        Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
            let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                objArcadixData[strKey] = [];
                Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                    if (Context.state.ViewComparison || Context.state.LoadUserResponse) {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    }
                    else {
                        objArcadixData[strKey][intIndex] = null;
                    }
                });
            }
            else {
                if (Context.state.ViewComparison || Context.state.LoadUserResponse) {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                }
                else {
                    objArcadixData[strKey] = null;
                }
            }
        });
        if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] !== "Y") {
                objArcadixData["InitialArcadix_Mode"] = "Display";
                refIframe.current.contentWindow.stage.children[0].Arcadix = objArcadixData;
            }
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y" && Context.state.blnIsDirectLoadSolution && (Context.state.ViewComparison || Context.state.LoadUserResponse)) {
                refIframe.current.contentWindow.stage.children[0].LoadUserRsponse(objArcadixData, null, "Display");
            }
            else {
                refIframe.current.contentWindow.stage.children[0].LoadInitialize(objArcadixData, null, "Display");
            }
        }
        else {
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] !== "Y") {
                objArcadixData["InitialArcadix_Mode"] = "Display";
                refIframe.current.contentWindow.Arcadix = objArcadixData;
                Object.keys(objArcadixData).map(strKey => {
                    refIframe.current.contentWindow[strKey] = objArcadixData[strKey];
                });
            }
            if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y" && Context.state.blnIsDirectLoadSolution && (Context.state.ViewComparison || Context.state.LoadUserResponse)) {
                refIframe.current.contentWindow.LoadUserRsponse(objArcadixData, null, "Display");
            }
            else {
                refIframe.current.contentWindow.LoadInitialize(objArcadixData, null, "Display");
            }
        }
    };

    /**
     * @name ExecuteLoadSolution
     * @param {ref} iFrameRef iFrame Ref
     * @summary Call animation's LoadSolution.
     */
    const ExecuteLoadSolution = (iFrameRef) => {
        if (!Context.state.ElementJson["cIsFirstLoad"] || Context.state.ElementJson["cIsFirstLoad"] === "N") {
            let objArcadixData = {};
            Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
                }
            });
            if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
                Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                    if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                        objArcadixData[strKey] = [];
                        Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                            objArcadixData[strKey][intIndex] = objTempData["vValue"];
                        });
                    }
                    else {
                        objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                    }
                });
            }
            Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    if (Context.state.ViewSolution || Context.state.ViewComparison || Context.state.LoadUserResponse) {
                        Context.state.ElementJsonWithAnswer["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                            objArcadixData[strKey][intIndex] = objTempData["vValue"];
                        });
                    }
                    else {
                        Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                            objArcadixData[strKey][intIndex] = objTempData["vValue"];
                        });
                    }
                }
                else {
                    if (Context.state.ViewSolution || Context.state.ViewComparison || Context.state.LoadUserResponse) {
                        objArcadixData[strKey] = Context.state.ElementJsonWithAnswer["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                    }
                    else {
                        objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                    }
                }
            });
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] !== "Y") {
                    objArcadixData["InitialArcadix_Mode"] = "Solution";
                    iFrameRef.current.contentWindow.stage.children[0].Arcadix = objArcadixData;
                }
                iFrameRef.current.contentWindow.stage.children[0].LoadSolution(objArcadixData, true);
            }
            else {
                if (Context.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] !== "Y") {
                    objArcadixData["InitialArcadix_Mode"] = "Solution";
                    Object.keys(objArcadixData).map(strKey => {
                        iFrameRef.current.contentWindow[strKey] = objArcadixData[strKey];
                    });
                    iFrameRef.current.contentWindow.Arcadix = objArcadixData;
                }
                iFrameRef.current.contentWindow.LoadSolution(objArcadixData, true);
            }
        }
    };

    /**
     * @name ExecuteLoadInitialize_IFrameless_Editor
     * @summary executes Load initialize for iframeless editor.
     * */
    const ExecuteLoadInitialize_IFrameless_Editor = () => {
        let objArcadixData = null;
        let objAnimationMethods;
        if (!Context.state.ElementJson["cIsFirstLoad"] || Context.state.ElementJson["cIsFirstLoad"] === "N") {
            objArcadixData = {};
            Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
                }
            });
            if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
                Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                        let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                        if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                            objArcadixData[strKey] = [];
                            Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                                objArcadixData[strKey][intIndex] = objTempData["vValue"];
                            });
                        }
                        else {
                            objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                        }
                    });
                });
            }
            Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                }
            });
        }

        if (window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType]) {
            objAnimationMethods = window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + AppType];
        }
        if (objAnimationMethods) {
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] && Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"].toLowerCase() === "y") {
                setTimeout(() => { objAnimationMethods.GetStage().children[0].LoadInitialize(objArcadixData, null, "Edit"); }, 50);
                //setTimeout(() => { objAnimationMethods.GetStage().children[0].LoadInitialize(objArcadixData, null, "Edit"); }, 50);
            } else {
                setTimeout(objAnimationMethods.LoadInitialize(objArcadixData, null, "Edit"), 50);
                //setTimeout(objAnimationMethods.LoadInitialize(objArcadixData, null, "Edit"), 50);
            }
        }
    }

    /**
     * @name ExecuteLoadInitialize_TestApplication
     * @param {ref} iFrameRef iFrame Ref
     * @summary Executes Load initialize for iframeless test application.
     */
    const ExecuteLoadInitialize_IFrameless_TestApplication = () => {
        let objArcadixData = {};
        let objAnimationMethods;
        if (window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + "TestApplication"]) {
            objAnimationMethods = window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + "TestApplication"];
        }
        Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
            let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                objArcadixData[strKey] = [];
                Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                    objArcadixData[strKey][intIndex] = objTempData["vValue"];
                });
            }
            else {
                objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
            }
        });
        if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
            Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                    objArcadixData[strKey] = [];
                    Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    });
                }
                else {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                }
            });
        }
        Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
            let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                objArcadixData[strKey] = [];
                Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                    if (Context.state.ViewComparison || Context.state.LoadUserResponse) {
                        objArcadixData[strKey][intIndex] = objTempData["vValue"];
                    }
                    else {
                        objArcadixData[strKey][intIndex] = null;
                    }
                });
            }
            else {
                if (Context.state.ViewComparison || Context.state.LoadUserResponse) {
                    objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                }
                else {
                    objArcadixData[strKey] = null;
                }
            }
        });
        if (Context.state.ViewComparison || Context.state.LoadUserResponse) {
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                objAnimationMethods.GetStage().children[0].LoadUserResponse(objArcadixData, "Display");
            } else {
                objAnimationMethods.LoadUserResponse(objArcadixData, "Display");
            }
        }
        else {
            if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {

                setTimeout(() => { objAnimationMethods.GetStage().children[0].LoadInitialize(objArcadixData, null, "Display"); }, 50);
            } else {

                setTimeout(() => { objAnimationMethods.LoadInitialize(objArcadixData, null, "Display"); }, 50);
            }
        }
    }

    /**
     * @name ExecuteLoadSolution_IFrameless
     * @summary execute the iframeless loadsolution.
     * */
    const ExecuteLoadSolution_IFrameless = (strApplicationType) => {
        let strAppType = strApplicationType ? strApplicationType : "Solution";
        let objAnimationMethods = window["IframelessAnimation_" + Context.state.ElementJson.iElementId + "_" + strAppType]
        if (objAnimationMethods) {
            if (!Context.state.ElementJson["cIsFirstLoad"] || Context.state.ElementJson["cIsFirstLoad"] === "N") {
                let objArcadixData = {};
                Object.keys(Context.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                    let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                    if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                        objArcadixData[strKey] = [];
                        Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                            objArcadixData[strKey][intIndex] = objTempData["vValue"];
                        });
                    }
                    else {
                        objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"];
                    }
                });
                if (Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] && Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"] !== null) {
                    Object.keys(Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                        let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                        if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                            objArcadixData[strKey] = [];
                            Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                                objArcadixData[strKey][intIndex] = objTempData["vValue"];
                            });
                        }
                        else {
                            objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"];
                        }
                    });
                }
                Object.keys(Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                    let objAnimationAttribute = Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                    if (objAnimationAttribute !== undefined && objAnimationAttribute["vType"].toLowerCase() === "array") {
                        objArcadixData[strKey] = [];
                        if (Context.state.ViewSolution || Context.state.ViewComparison || Context.state.LoadUserResponse) {
                            Context.state.ElementJsonWithAnswer["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                                objArcadixData[strKey][intIndex] = objTempData["vValue"];
                            });
                        }
                        else {
                            Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"].map((objTempData, intIndex) => {
                                objArcadixData[strKey][intIndex] = objTempData["vValue"];
                            });
                        }
                    }
                    else {
                        if (Context.state.ViewSolution || Context.state.ViewComparison || Context.state.LoadUserResponse) {
                            objArcadixData[strKey] = Context.state.ElementJsonWithAnswer["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                        }
                        else {
                            objArcadixData[strKey] = Context.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey]["Min"]["vValue"];
                        }
                    }
                });
                if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objArcadixData["InitialArcadix_Mode"] = strAppType;
                    objAnimationMethods.GetStage().children[0].Arcadix = objArcadixData;
                    objAnimationMethods.GetStage().children[0].LoadSolution(objArcadixData, true);
                } else {
                    objAnimationMethods.LoadSolution(objArcadixData, true);
                }
            }
        }
    }

    /**
     * @name GetContainerDiv
     * @param {any} blnLoadAsUrl
     */
    const GetContainerDiv = (blnLoadAsUrl) => {
        return (
            Context.state.cIsIframelessAnimation === "Y" ?
                <div style={{ height: "100%", width: "100%", border: "none" }}
                    onContextMenu={(objEvent) => ShowIframelessContextMenu(objEvent)}
                    dangerouslySetInnerHTML={{ __html: GetStringHtml() }}
                    ref={Context.iFrameRef}>
                </div>
                :
                blnLoadAsUrl ?
                    <iframe
                        style={{ height: "100%", width: "100%", border: "none" }}
                        ref={Context.iFrameRef}
                        src={GetStringHtml()}
                        onLoad={() => { setTimeout(OnIFrameLoadComplete, 100); }}
                    />
                    :
                    <iframe
                        style={{ height: "100%", width: "100%", border: "none" }}
                        ref={Context.iFrameRef}
                    />
        );
    }

    /**
     * @name GetContent
     * @summary Contains the JSX for cms animation wrapper
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        let strOutline;
        if (AppType === "Editor") {
            if (Context.state.ElementJson["vElementJson"]["cIsLogic"] && Context.state.ElementJson["vElementJson"]["cIsLogic"].toLowerCase() === "y") {
                strOutline = "2px solid #ffbf00";
            }
            else {
                strOutline = "2px solid #ffbf00";
            }
        }
        if (Context.state.ElementStatus !== null && Context.state.ViewComparison) {
            strOutline = Context.state.ElementStatus === 1 ? "2px solid green" : "2px solid red";
        }
        let objStyleMainIFrame = {
            padding: "5px",
            height: "100%",
            width: "100%"
        };
        let objStyleContainerParentDiv = {
            "outline": strOutline,
            "position": "relative",
            "marginBottom": "10px",
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] + 4 + "px"
        };
        if (AppType === "Editor") {
            objStyleContainerParentDiv = {
                ...objStyleContainerParentDiv,
                "height": Context.state.ElementJson["vElementJson"]["iHeight"] + 4 + "px",
                "overflow": "hidden",
                "resize": "both"
            };
        }
        else {
            objStyleMainIFrame = {
                ...objStyleMainIFrame,
                "height": Context.state.ElementJson["vElementJson"]["iHeight"] + 4 + "px",
                "width": Context.state.ElementJson["vElementJson"]["iWidth"] + 4 + "px"
            };
        }
        let blnShowSolution = false;
        if (Context.state.ViewSolution || (Context.state.ElementStatus !== null && Context.state.ViewComparison && (Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3))) {
            blnShowSolution = true;
        }
        let objStyleSolutionIFrame = {
            padding: "5px",
            height: Context.state.ElementJson["vElementJson"]["iHeight"] + 4 + "px",
            width: Context.state.ElementJson["vElementJson"]["iWidth"] + 4 + "px",
        };
        let objStyleSolutionOverlayDiv = {
            height: "100%",
            width: "100%",
            position: "absolute",
        };
        let blnLoadAsUrl = false;
        if (Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] && Context.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cLoadAsUrl"] === "Y") {
            blnLoadAsUrl = true;
        }
        return (
            <div ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]} style={{ height: "100%" }}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <TextElement {...objTextElementProps} /> : ""
                }
                <div
                    style={objStyleContainerParentDiv}
                    onClick={Events.Resize ? (event) => { Events.Resize(event); } : Events.Resize}
                >
                    {
                        Context.state.ElementStatus !== null && Context.state.ViewComparison ?
                            Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3 ?
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashWrong.gif"} alt="Worng" />
                                : <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashRight.gif"} alt="Correct" />
                            : ""
                    }
                    <div
                        ref={Context.iFrameContainerDivRef}
                        id="iframe_handler"
                        style={objStyleMainIFrame}
                        onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}
                    >
                        {
                            Context.state.isLoadComplete ?
                                GetContainerDiv(blnLoadAsUrl)
                                :
                                <ComponentAnimation
                                    Meta={{ "ShowLoadImage": true, "ShowAnimation": true, "ComponentAnimationRef": Context.ComponentAnimationRef_Main }}
                                    Resource={{ "ImagePath": Context.props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                                />
                        }
                    </div>
                </div>
                {
                    blnShowSolution ?
                        <div
                            style={{ outline: "2px solid green", width: Context.state.ElementJson["vElementJson"]["iWidth"] + 4 + "px", position: "relative", marginBottom: "10px" }}
                            onClick={(event) => { event.stopPropagation(); event.preventDefault(); }}
                            onContextMenu={(event) => { event.stopPropagation(); event.preventDefault(); }}
                        >
                            <div style={objStyleSolutionOverlayDiv}>
                                <ComponentAnimation
                                    Meta={{ "ShowLoadImage": true, "IsFullyOpaque": true, "ShowAnimation": true, "ComponentAnimationRef": Context.ComponentAnimationRef_Solution }}
                                    Resource={{ "ImagePath": Context.props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                                />
                            </div>
                            <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashRight.gif"} alt="Correct" />
                            <div style={objStyleSolutionIFrame}>
                                {
                                    Context.state.cIsIframelessAnimation === "Y" ?
                                        <div
                                            style={{ height: "100%", width: "100%", border: "none" }}
                                            dangerouslySetInnerHTML={{ __html: GetStringHtml(true) }}
                                            ref={Context.iFrameRef_Solution}>
                                        </div>
                                        :
                                        blnLoadAsUrl ?
                                            <iframe
                                                style={{ height: "100%", width: "100%", border: "none" }}
                                                ref={Context.iFrameRef_Solution}
                                                src={GetStringHtml()}
                                                onLoad={() => { setTimeout(OnIFrameLoadComplete_Solution, 100); }}
                                            />
                                            :
                                            <iframe
                                                style={{ height: "100%", width: "100%", border: "none" }}
                                                ref={Context.iFrameRef_Solution}
                                            />
                                }
                            </div>
                        </div>
                        : ""
                }
            </div >
        );
    };

    return GetContent();
};

export default CMSAnimationWrapper_Common;
