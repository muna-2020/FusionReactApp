//React Imports
import React, { useLayoutEffect, useEffect } from 'react';

//Application state classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Module related imports
import * as CMSWiki_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/CMSWiki_Editor_MetaData.js"
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objWikiJson = {}
    let arrWiki = [];
    let blnIsLoadComplete = false;
    let blnShouldMakeApiCall = true;
    if ((props.ElementJson || props.WikiKeyword) &&
        props.Object_Editor_TaskContent_CMSWiki &&
        props.Object_Editor_TaskContent_CMSWiki["Object_Editor_TaskContent_CMSWiki;iLanguageId;" + props.JConfiguration.InterfaceLanguageId] &&
        Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", props)) {
        let objResult = AttachRef(props);
        objWikiJson = { ...objResult["objWikiJson"] };
        arrWiki = { ...objResult["arrWiki"] };
        blnIsLoadComplete = true;
        blnShouldMakeApiCall = false;
    }
    return {
        "ElementJson": objWikiJson,
        "arrWiki": arrWiki,
        "blnShowWikiTab": true,
        "blnShouldMakeApiCall": blnShouldMakeApiCall,
        "isLoadComplete": blnIsLoadComplete
    };
}

/**
* @name Initialize
* @param {object} objContext {state, dispatch, props, WikiSidebar_ModuleProcessor, strOperationTypeRef}
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!objContext.props.Object_Editor_TaskContent_CMSWiki &&
            !objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props)) {
            objContext.WikiSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            objContext.state.blnShouldMakeApiCall &&
            (objContext.props.ElementJson || objContext.props.WikiKeyword) &&
            objContext.props.Object_Editor_TaskContent_CMSWiki &&
            objContext.props.Object_Editor_TaskContent_CMSWiki["Object_Editor_TaskContent_CMSWiki;iLanguageId;" + objContext.props.JConfiguration.InterfaceLanguageId] &&
            objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props)) {
            let { objWikiJson, arrWiki } = AttachRef(objContext.props);
            if (objWikiJson) {
                objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objWikiJson, "arrWiki": arrWiki, "isLoadComplete": true } });
            }
            else {
                let strWikiKeyword = objContext.props.ElementJson ? objContext.props.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] : objContext.props.WikiKeyword;
                let strDescription = objContext.props.ElementJson ? objContext.props.ElementJson["vElementJson"]["TextElements"][0]["vElementJson"]["vText"] : "";
                objWikiJson = CMSWiki_Editor_MetaData.GetDefaultElementJson(strWikiKeyword);
                objWikiJson = {
                    ...objWikiJson,
                    ["vElementJson"]: {
                        ...objWikiJson["vElementJson"],
                        ["TextElements"]: [
                            {
                                ...objWikiJson["vElementJson"]["TextElements"][0],
                                ["vElementJson"]: {
                                    ...objWikiJson["vElementJson"]["TextElements"][0]["vElementJson"],
                                    ["vText"]: strDescription
                                },
                                ["Ref"]: React.createRef()
                            }
                        ]
                    }
                };
                objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objWikiJson, "arrWiki": arrWiki, "isLoadComplete": true } });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.props.Object_Editor_TaskContent_CMSWiki,
        objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props),
        objContext.props.ElementJson
    ]);

    useEffect(() => {
        if (objContext.state.isLoadComplete &&
            objContext.state.blnShouldMakeApiCall &&
            objContext.props.Object_Editor_TaskContent_CMSWiki["Object_Editor_TaskContent_CMSWiki;iLanguageId;" + objContext.props.JConfiguration.InterfaceLanguageId]) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let { objWikiJson, arrWiki } = AttachRef(objContext.props);
            if (objWikiJson) {
                objWikiJson = {
                    ...objWikiJson,
                    ["vElementJson"]: {
                        ...objWikiJson["vElementJson"],
                        ["TextElements"]: [
                            {
                                ...objWikiJson["vElementJson"]["TextElements"][0],
                                ["Ref"]: React.createRef()
                            }
                        ]
                    }
                };
                if (objContext.strOperationTypeRef.current.toUpperCase() === "DELETE") {
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "arrWiki": arrWiki
                        }
                    });
                }
                else {
                    let { cIsDeleted, ...objElementJson } = objWikiJson;
                    let objTextElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson["vElementJson"]["TextElements"][0]);
                    objElementJson = {
                        ...objElementJson,
                        ["vElementJson"]: {
                            ...objElementJson["vElementJson"],
                            ["TextElements"]: [objTextElementJson]
                        }
                    };
                    objContext.props.PassedEvents.UpdateElementJson(objElementJson);
                }
            }
            else {
                objContext.props.PassedEvents.CloseSidebar();
            }
        }
        else if (objContext.state.isLoadComplete && !objContext.state.blnShouldMakeApiCall) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.Object_Editor_TaskContent_CMSWiki]);
}

/**
 * @name AttachRef Attaches the ref to the text elements in the wiki that we got from the server.
 * @param {object} objContext {state, dispatch, props, WikiSidebar_ModuleProcessor, strOperationTypeRef}
 * @returns {object} arrWiki, objWikiJson
 */
const AttachRef = (props) => {
    let arrWiki = [];
    let objWikiJson;
    let strWikiKeyword = props.ElementJson ? props.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] : props.WikiKeyword;
    props.Object_Editor_TaskContent_CMSWiki["Object_Editor_TaskContent_CMSWiki;iLanguageId;" + props.JConfiguration.InterfaceLanguageId]["Data"].map(objTempData => {
        if (objTempData["cIsDeleted"] === "N") {
            let objTempWiki = {
                ...objTempData,
                ["vElementJson"]: {
                    ...objTempData["vElementJson"],
                    ["TextElements"]: [
                        {
                            ...objTempData["vElementJson"]["TextElements"][0],
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
            arrWiki = [
                ...arrWiki,
                {
                    ...objTempWiki
                }
            ];
            if (!objWikiJson && objTempData["vElementJson"]["Values"][0]["vWikiKeyword"] === strWikiKeyword) {
                objWikiJson = objTempWiki;
            }
        }
    });
    return {
        "arrWiki": arrWiki,
        "objWikiJson": objWikiJson
    };
};
