//React Imports
import { useLayoutEffect, useEffect } from 'react';

//Module Related imports
import * as AnimationWrapperSidebar_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/AnimationWrapperSidebar/AnimationWrapperSidebar_MetaData";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props, objModuleProcessor) {
    let blnHasCustomSidebar = props.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasCustomSidebar"] && props.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasCustomSidebar"] === "Y" ? true : false;
    let strShowTab;
    let blnShowInitialValueTab = false;
    let blnIsLoadComplete = false;
    Object.keys(props.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
        let objAnimationAttribute = props.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
        if (objAnimationAttribute && objAnimationAttribute !== null) {
            if (!objAnimationAttribute["cIsHidden"] || objAnimationAttribute["cIsHidden"].toLowerCase() === "n") {
                blnShowInitialValueTab = true;
            }
        }
    });
    let blnIsInlineEditable = props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y" ? true : false;
    let blnHasResourceValues = props.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasResourceValues"] === "Y" ? true : false;
    if (!blnShowInitialValueTab) {
        if (blnHasResourceValues) {
            strShowTab = "Resource";
        }
        else if (!blnIsInlineEditable) {
            strShowTab = "Answer";
        }
    }
    else {
        strShowTab = "Initial";
    }
    let objTextResource = objModuleProcessor.GetTextResource(props);
    if (objTextResource) {
        blnIsLoadComplete = true;
    }
    let blnIsFusionVersion = false;
    if (props.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
        blnIsFusionVersion = true;
    }
    return {
        "ElementJson": props.ElementJson,
        "InitialAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objModuleProcessor, objTextResource, "initial", blnIsFusionVersion),
        "ResourceAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objModuleProcessor, objTextResource, "resource", blnIsFusionVersion),
        "AnswerAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objModuleProcessor, objTextResource, "answer", blnIsFusionVersion),
        "Errors": null,
        "CurrentFocus": null,
        "blnHasCustomSidebar": blnHasCustomSidebar,
        "ShowTab": strShowTab,
        "isLoadComplete": blnIsLoadComplete
    };
}

/**
 * @name Initialize
 * @param {object} {props, state, dispatch, AnimationWrapperSidebar_ModuleProcessor}
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} {props, state, dispatch, AnimationWrapperSidebar_ModuleProcessor}
 * @summary Data loader for animation wrapper.
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar", objContext.props)) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.AnimationWrapperSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} {props, state, dispatch, AnimationWrapperSidebar_ModuleProcessor}
 * @summary Sets the isLoadComplete when the text resource is loaded.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson && Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar", objContext.props)) {
            let objTextResource = objContext.AnimationWrapperSidebar_ModuleProcessor.GetTextResource(objContext);
            let blnIsFusionVersion = false;
            if (objContext.props.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
                blnIsFusionVersion = true;
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "isLoadComplete": true,
                    "InitialAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objContext.AnimationWrapperSidebar_ModuleProcessor, objTextResource, "initial", blnIsFusionVersion),
                    "ResourceAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objContext.AnimationWrapperSidebar_ModuleProcessor, objTextResource, "resource", blnIsFusionVersion),
                    "AnswerAttributeAvailableFieldType": AnimationWrapperSidebar_MetaData.GetDefaultFieldsForRadio(objContext.AnimationWrapperSidebar_ModuleProcessor, objTextResource, "answer", blnIsFusionVersion),
                    "ElementJson": objContext.props.ElementJson
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.ElementJson, Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar", objContext.props)]);
}
