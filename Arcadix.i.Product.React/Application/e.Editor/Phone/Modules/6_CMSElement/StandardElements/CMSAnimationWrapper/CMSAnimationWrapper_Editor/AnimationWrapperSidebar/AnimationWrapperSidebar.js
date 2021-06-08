//React imports 
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as AnimationWrapperSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/AnimationWrapperSidebar/AnimationWrapperSidebar_Hooks';
import AnimationWrapperSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/AnimationWrapperSidebar/AnimationWrapperSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name AnimationWrapperSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary AnimationWrapperSidebar's.
 * @returns {any} AnimationWrapperSidebar
 */
const AnimationWrapperSidebar = (props, ref) => {

    let objModuleProcessor = new AnimationWrapperSidebar_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, AnimationWrapperSidebar_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "iFrameRef": useRef(null),
        "DefaultSidebarDomRef": useRef(null),
        "AnimationWrapperSidebar_ModuleProcessor": objModuleProcessor,
        Object_Framework_Services_TextResource
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AnimationWrapperSidebar_ModuleProcessor.Initialize(objContext, objContext.AnimationWrapperSidebar_ModuleProcessor);

    /**
     * @name AnimationWrapperSidebar_Hooks.Initialize
     * @summary Initialize method call in AnimationWrapperSidebar_Hooks, that contains all the custom hooks.
     */
    AnimationWrapperSidebar_Hooks.Initialize(objContext);

    /**
     * @name OnLoadComplete
     * @summary Triggers when the iframe is loaded.
     */
    const OnLoadComplete = () => {
        objContext.iFrameRef.current.contentWindow.ArcadixUploadImage = OnUploadImageClick;
        objContext.iFrameRef.current.contentWindow.ArcadixImagePreview = OnPreviewImageClick;
        ExecuteLoadInitialize();
    };

    /**
     * @name ExecuteLoadInitialize
     * @summary Set the Arcadix object and 'InitialArcadix_Mode' of the animation according to the application type and then call its LoadInitialize.
     */
    const ExecuteLoadInitialize = () => {
        let objArcadixData = null;
        let blnIsInlineEditable = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y" ? true : false;
        if (blnIsInlineEditable || (!objContext.state.ElementJson["cIsFirstLoad"] || objContext.state.ElementJson["cIsFirstLoad"].toLowerCase() === "n")) {
            objArcadixData = {};
            Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                objArcadixData[strKey] = objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey];
            });
            let blnHasResourceValues = objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasResourceValues"] === "Y" ? true : false;
            if (blnHasResourceValues) {
                Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                    objArcadixData[strKey] = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey];
                });
            }
            Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                objArcadixData[strKey] = objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey];
            });
        }
        objContext.iFrameRef.current.contentWindow.LoadInitialize(objArcadixData);
    };

    /**
     * @name GetCustomSidebar
     * @summary Contains the custom sidebar.
     * @returns {JSX} JSX.
     */
    const GetCustomSidebar = () => {
        let objTextResource = objContext.AnimationWrapperSidebar_ModuleProcessor.GetTextResource(objContext.props);
        return (
            <div className="animation-custom-sidebar-container">
                <iframe
                    id={"SidebarIFrame_" + objContext.props.ElementJson["iElementId"]}
                    className="animation-sidebar-iframe"
                    src={objContext.props.ElementJson["vAnimationElementJson"]["SidebarContents"]["vFilePath"]}
                    onLoad={() => { setTimeout(OnLoadComplete, 100); }}
                    ref={objContext.iFrameRef}
                />
                <div className="animation-wrapper-sidebar-footer">
                    <button
                        className="btn"
                        onClick={(event) => {
                            event.preventDefault();
                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnClickSaveForCustomSidebar(objContext);
                        }}>
                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    /**
     * @name OnUploadImageClick
     * @param {string} strImageComponentType Type of image component to be used.(image/Html image)
     * @param {callback} fnCallback Callback to get the data.
     * @param {object} objAdditionalDetails Additional data to be sent to call back.
     * @summary Function to be called on click of upload image/html image.
     */
    const OnUploadImageClick = (strImageComponentType = "Image", fnCallback = null, objAdditionalDetails = null) => {
        if (strImageComponentType.toLowerCase() === "htmlimage") {
            let objHtmlImageProps = {
                "iElementId": null,
                "PassedEvents": {
                    "OnSaveClick": (objHtmlImageElementJson) => {
                        props.HideHtmlImageComponent();
                        let objReturnData = {
                            "iElementId": objHtmlImageElementJson["iElementId"],
                            "vType": "HtmlImage",
                            "vValue": props.JConfiguration.WebDataPath + "Repo/HtmlImage/" + props.JConfiguration["MainClientId"] + "/" + objHtmlImageElementJson["iElementId"] + "_Image_" + objHtmlImageElementJson["vElementJson"]["iVersion"] + ".png"
                        };
                        console.log("Html Image", objReturnData);
                        if (fnCallback !== null) {
                            fnCallback(objReturnData, objAdditionalDetails);
                        }
                    },
                    "OnCancelClick": () => {
                        props.HideHtmlImageComponent();
                    }
                }
            };
            props.ShowHtmlImageComponent(objHtmlImageProps);
        }
        else {
            editorPopup.ShowPopup({
                "Data": {
                    "MediaType": "Image"
                },
                "Meta": {
                    "PopupName": "MultiMediaPopup",
                    "Height": '602px',
                    "Width": '800px',
                    "ShowHeader": false,
                    "ShowCloseIcon": true,
                    "ShowToggleMaximizeIcon": true
                },
                "Resource": {
                    "Text": {},
                    "SkinPath": props.JConfiguration.IntranetSkinPath
                },
                "Events": {},
                "CallBacks": {
                    "GetElementJson": (objImageElementJson) => {
                        let objReturnData = {
                            "iElementId": objImageElementJson["iElementId"],
                            "vType": "Image",
                            "vValue": props.JConfiguration.WebDataPath + "Repo/Image/" + props.JConfiguration["MainClientId"] + "/" + objImageElementJson["iElementId"] + "_Image_" + objImageElementJson["vElementJson"]["iImageFileVersion"] + "." + objImageElementJson["vElementJson"]["vImageType"]
                        }
                        if (fnCallback !== null) {
                            fnCallback(objReturnData, objAdditionalDetails);
                        }
                    }
                }
            });
        }
    };

    /**
     * @name OnPreviewImageClick
     * @param {object} objImageDetails Image details to preview.
     * @summary Opens a popup to preview the image
     */
    const OnPreviewImageClick = (objImageDetails) => {
        editorPopup.ShowPopup({
            "Data": {
                "ImageDetails": {
                    ...objImageDetails
                }
            },
            "Meta": {
                "PopupName": "AnimationImagePreviewPopup",
                "Height": 'auto',
                "Width": '500px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
                "CssClassName": "animation-image-preview-popup",
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    };

    /**
     * @name SetImageDetails
     * @param {object} objImageDetails Image details.
     * @param {object} objAdditionalDetails Additional data to be sent to call back.
     * @summary Callback to upload image from default sidebar.
     */
    const SetImageDetails = (objImageDetails, objAdditionalDetails) => {
        let strKey = objAdditionalDetails["AnimationAttribute"]["vAttributeName"];
        if (objAdditionalDetails["AnimationAttribute"]["vType"].toLowerCase() !== "array") {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            [objAdditionalDetails["Key"]]: {
                                ...objContext.state.ElementJson["vElementJson"][objAdditionalDetails["Key"]],
                                [strKey]: {
                                    ...objImageDetails
                                }
                            }
                        }
                    },
                    "CurrentFocus": null
                }
            });
        }
        else {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            [objAdditionalDetails["Key"]]: {
                                ...objContext.state.ElementJson["vElementJson"][objAdditionalDetails["Key"]],
                                [strKey]: [
                                    ...objContext.state.ElementJson["vElementJson"][objAdditionalDetails["Key"]][strKey].map((objTempData, intIndex) => {
                                        if (intIndex === objAdditionalDetails["ArrayIndex"]) {
                                            return {
                                                ...objImageDetails
                                            };
                                        }
                                        else {
                                            return objTempData;
                                        }
                                    })
                                ]
                            }
                        }
                    }
                }
            });
        }
    };

    /**
     * @name GetInitialValues
     * @param {object} objTextResource Text resource
     * @summary Builds the JSX from initial values.
     * @returns {JSX} JSX
     */
    const GetInitialValues = (objTextResource) => {
        let blnHasArray = false;
        return (
            <div className="animation-default-sidebar-content">
                <div className="animation-default-sidebar-values">
                    {
                        Object.keys(state.ElementJson["vElementJson"]["InitialAttributeValue"]).map((strKey, intTempIndex) => {
                            let objAnimationAttribute = state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                            if (objAnimationAttribute !== undefined)
                                if (objAnimationAttribute["cIsHidden"] === undefined || objAnimationAttribute["cIsHidden"].toLowerCase() === "n") {
                                    let strDisplayName = strKey.split("_")[1];
                                    let strType = objAnimationAttribute["vType"].toLowerCase();
                                    if (strType === "array") {
                                        blnHasArray = true;
                                    }
                                    return (
                                        <div key={intTempIndex} className="animation-default-sidebar-input-flex">
                                            <div className="animation-wrapper-default-sidebar-row">
                                                <span>
                                                    {strDisplayName}:
                                            </span>
                                                {
                                                    strType === "image" || strType === "htmlimage" ?
                                                        state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"] === null ?
                                                            <button
                                                                className="btn"
                                                                onClick={(event) => {
                                                                    event.preventDefault(); event.stopPropagation();
                                                                    let objAdditionalDetails = {
                                                                        "AnimationAttribute": { ...objAnimationAttribute },
                                                                        "Key": "InitailAttributeValue"
                                                                    };
                                                                    OnUploadImageClick(strType, SetImageDetails, objAdditionalDetails);
                                                                }}>
                                                                {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText") + " " + objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, objAnimationAttribute["vType"])}
                                                            </button>
                                                            :
                                                            <React.Fragment>
                                                                <label>
                                                                    {state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"].split("/")[state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"].split("/").length - 1]}
                                                                </label>
                                                                <span
                                                                    className="animation-wrapper-sidebar-row-delete-btn"
                                                                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForInitialAttribute(objContext, strKey); }}>
                                                                    &#10005;
                                                            </span>
                                                            </React.Fragment>
                                                        :
                                                        strType === "textarea" ?
                                                            <textarea
                                                                value={state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"]}
                                                                onChange={(event) => {
                                                                    objContext.AnimationWrapperSidebar_ModuleProcessor.OnInitialAttributeInputChange(objContext, strKey, strType, event.target.value, state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]);
                                                                }} />
                                                            :
                                                            strType === "array" ?
                                                                state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].length > 0 ?
                                                                    state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey].map((objTempData, intIndex) => {
                                                                        let strSubType = objTempData["vType"].toLowerCase();
                                                                        return (
                                                                            <React.Fragment>
                                                                                {
                                                                                    intIndex > 0 ? <span /> : ""
                                                                                }
                                                                                {
                                                                                    strSubType === "image" || strSubType === "htmlimage" ?
                                                                                        objTempData["vValue"] === null ?
                                                                                            <button
                                                                                                key={intIndex}
                                                                                                className="btn"
                                                                                                onClick={(event) => {
                                                                                                    event.preventDefault(); event.stopPropagation();
                                                                                                    let objAdditionalDetails = {
                                                                                                        "AnimationAttribute": { ...objAnimationAttribute },
                                                                                                        "ElementDetails": objTempData,
                                                                                                        "Key": "InitailAttributeValue",
                                                                                                        "ArrayIndex": intIndex
                                                                                                    };
                                                                                                    OnUploadImageClick(objTempData["vType"], SetImageDetails, objAdditionalDetails);
                                                                                                }}>
                                                                                                {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText") + " " + objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, objTempData["vType"])}
                                                                                            </button>
                                                                                            :
                                                                                            <label>
                                                                                                {objTempData["vValue"].split("/")[objTempData["vValue"].split("/").length - 1]}
                                                                                            </label>
                                                                                        :
                                                                                        strSubType === "textarea" ?
                                                                                            <textarea
                                                                                                key={intIndex}
                                                                                                value={objTempData["vValue"]}
                                                                                                onChange={(event) => {
                                                                                                    objContext.AnimationWrapperSidebar_ModuleProcessor.OnInitialAttributeInputChange(objContext, strKey, strType, event.target.value, objTempData, intIndex);
                                                                                                }} />
                                                                                            :
                                                                                            <input
                                                                                                type="text"
                                                                                                value={objTempData["vValue"]}
                                                                                                onChange={(event) => {
                                                                                                    event.preventDefault();
                                                                                                    event.stopPropagation()
                                                                                                    objContext.AnimationWrapperSidebar_ModuleProcessor.OnInitialAttributeInputChange(objContext, strKey, strType, event.target.value, objTempData, intIndex);
                                                                                                }} />
                                                                                }
                                                                                <span
                                                                                    className="animation-wrapper-sidebar-row-delete-btn"
                                                                                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForInitialAttribute(objContext, strKey, intIndex); }}>
                                                                                    &#10005;
                                                                            </span>
                                                                            </React.Fragment>
                                                                        );
                                                                    })
                                                                    :
                                                                    <label style={{ "font-weight": "bold" }}>
                                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "Add_Values")}
                                                                    </label>
                                                                :
                                                                <input
                                                                    type="text"
                                                                    value={state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]["vValue"]}
                                                                    onChange={(event) => {
                                                                        event.preventDefault();
                                                                        event.stopPropagation()
                                                                        objContext.AnimationWrapperSidebar_ModuleProcessor.OnInitialAttributeInputChange(objContext, strKey, strType, event.target.value, state.ElementJson["vElementJson"]["InitialAttributeValue"][strKey]);
                                                                    }} />
                                                }
                                            </div>
                                            {
                                                strType === "array" ?
                                                    <div className="animation-wrapper-default-sidebar-add-row">
                                                        {
                                                            state.InitialAttributeAvailableFieldType.map(objTempData => {
                                                                return (
                                                                    <label className="animation-wrapper-default-sidebar-grid-item">
                                                                        <input
                                                                            type="radio"
                                                                            className="animation-wrapper-sidebar-radio-btn"
                                                                            onChange={(event) => { objContext.AnimationWrapperSidebar_ModuleProcessor.OnRadioChange(objContext, objTempData["vRadioType"], "initial"); }}
                                                                            checked={objTempData["cIsSelected"] === "Y" ? true : false}
                                                                        />
                                                                        <span className="animation-wrapper-sidebar-radio-display-text">
                                                                            {
                                                                                objTempData["vDisplayName"]
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                );
                                                            })
                                                        }
                                                        <div />
                                                        <div />
                                                        <div className="animation-wrapper-default-sidebar-add-row-btn-container">
                                                            <button className="btn animation-wrapper-sidebar-add-row-btn" onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.OnAddNewRowForInitialAttribute(objContext, strKey); }}>
                                                                {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText")}
                                                            </button>
                                                        </div>
                                                    </div> : ""
                                            }
                                        </div>
                                    );
                                }
                                else {
                                    return "";
                                }
                            else
                                return "";
                        })
                    }
                </div>
            </div>
        );
    };

    /**
     * @name GetResourceValues
     * @param {object} objTextResource Text resource
     * @summary Builds the JSX from resource values.
     * @returns {JSX} JSX
     */
    const GetResourceValues = (objTextResource) => {
        return (
            <div className="animation-default-sidebar-content">
                <div className="animation-default-sidebar-values">
                    {
                        Object.keys(state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map((strKey, intTempIndex) => {
                            let strDisplayName = strKey.split("_")[1];
                            let objAnimationAttribute = state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                            let strType = objAnimationAttribute["vType"].toLowerCase();
                            return (
                                <div key={intTempIndex} className="animation-default-sidebar-input-flex">
                                    <div className="animation-wrapper-default-sidebar-row">
                                        <span>
                                            {strDisplayName}:
                                        </span>
                                        {
                                            strType === "image" || strType === "htmlimage" ?
                                                state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"] === null ?
                                                    <button
                                                        className="btn"
                                                        onClick={(event) => {
                                                            event.preventDefault(); event.stopPropagation();
                                                            let objAdditionalDetails = {
                                                                "AnimationAttribute": { ...objAnimationAttribute },
                                                                "Key": "ResourceAttributeValue"
                                                            };
                                                            OnUploadImageClick(strType, SetImageDetails, objAdditionalDetails);
                                                        }}>
                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText") + " " + objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, objAnimationAttribute["vType"])}
                                                    </button>
                                                    :
                                                    <React.Fragment>
                                                        <label>
                                                            {state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"].split("/")[state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"].split("/").length - 1]}
                                                        </label>
                                                        <span
                                                            className="animation-wrapper-sidebar-row-delete-btn"
                                                            onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForResourceAttribute(objContext, strKey); }}>
                                                            &#10005;
                                                        </span>
                                                    </React.Fragment>
                                                :
                                                strType === "textarea" ?
                                                    <textarea
                                                        value={state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"]}
                                                        onChange={(event) => {
                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnResourceAttributeInputChange(objContext, strKey, strType, event.target.value, state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]);
                                                        }} />
                                                    :
                                                    strType === "array" ?
                                                        state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].length > 0 ?
                                                            state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey].map((objTempData, intIndex) => {
                                                                let strSubType = objTempData["vType"].toLowerCase();
                                                                return (
                                                                    <React.Fragment>
                                                                        {
                                                                            intIndex > 0 ? <span /> : ""
                                                                        }
                                                                        {
                                                                            strSubType === "image" || strSubType === "htmlimage" ?
                                                                                objTempData["vValue"] === null ?
                                                                                    <button
                                                                                        key={intIndex}
                                                                                        className="btn"
                                                                                        onClick={(event) => {
                                                                                            event.preventDefault(); event.stopPropagation();
                                                                                            let objAdditionalDetails = {
                                                                                                "AnimationAttribute": { ...objAnimationAttribute },
                                                                                                "ElementDetails": objTempData,
                                                                                                "Key": "ResourceAttributeValue",
                                                                                                "ArrayIndex": intIndex
                                                                                            };
                                                                                            OnUploadImageClick(objTempData["vType"], SetImageDetails, objAdditionalDetails);
                                                                                        }}>
                                                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText") + " " + objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, objTempData["vType"])}
                                                                                    </button>
                                                                                    :
                                                                                    <label>
                                                                                        {objTempData["vValue"].split("/")[objTempData["vValue"].split("/").length - 1]}
                                                                                    </label>
                                                                                :
                                                                                strSubType === "textarea" ?
                                                                                    <textarea
                                                                                        key={intIndex}
                                                                                        value={objTempData["vValue"]}
                                                                                        onChange={(event) => {
                                                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnResourceAttributeInputChange(objContext, strKey, strType, event.target.value, objTempData, intIndex);
                                                                                        }} />
                                                                                    :
                                                                                    <input
                                                                                        key={intIndex}
                                                                                        type="text"
                                                                                        value={objTempData["vValue"]}
                                                                                        onChange={(event) => {
                                                                                            event.preventDefault();
                                                                                            event.stopPropagation()
                                                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnResourceAttributeInputChange(objContext, strKey, strType, event.target.value, objTempData, intIndex);
                                                                                        }} />
                                                                        }
                                                                        <span
                                                                            className="animation-wrapper-sidebar-row-delete-btn"
                                                                            onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForResourceAttribute(objContext, strKey, intIndex); }}>
                                                                            &#10005;
                                                                        </span>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                            :
                                                            <label style={{ "font-weight": "bold" }}>
                                                                {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "Add_Values")}
                                                            </label>
                                                        :
                                                        <input
                                                            type="text"
                                                            value={state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]["vValue"]}
                                                            onChange={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation()
                                                                objContext.AnimationWrapperSidebar_ModuleProcessor.OnResourceAttributeInputChange(objContext, strKey, strType, event.target.value, state.ElementJson["vElementJson"]["ResourceAttributeValue"][strKey]);
                                                            }} />
                                        }
                                    </div>
                                    {
                                        strType === "array" ?
                                            <div className="animation-wrapper-default-sidebar-add-row">
                                                {
                                                    state.ResourceAttributeAvailableFieldType.map(objTempData => {
                                                        return (
                                                            <label className="animation-wrapper-default-sidebar-grid-item">
                                                                <input
                                                                    type="radio"
                                                                    className="animation-wrapper-sidebar-radio-btn"
                                                                    onChange={(event) => { objContext.AnimationWrapperSidebar_ModuleProcessor.OnRadioChange(objContext, objTempData["vRadioType"], "resource"); }}
                                                                    checked={objTempData["cIsSelected"] === "Y" ? true : false}
                                                                />
                                                                <span className="animation-wrapper-sidebar-radio-display-text">
                                                                    {
                                                                        objTempData["vDisplayName"]
                                                                    }
                                                                </span>
                                                            </label>
                                                        );
                                                    })
                                                }
                                                <div />
                                                <div />
                                                <div className="animation-wrapper-default-sidebar-add-row-btn-container">
                                                    <button className="btn animation-wrapper-sidebar-add-row-btn" onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.OnAddNewRowForResourceAttribute(objContext, strKey); }}>
                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText")}
                                                    </button>
                                                </div>
                                            </div> : ""
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    /**
     * @name GetAnswerValues
     * @param {object} objTextResource Text resource
     * @summary Builds the JSX from answer values.
     * @returns {JSX} JSX
     */
    const GetAnswerValues = (objTextResource) => {
        return (
            <div className="animation-default-sidebar-content">
                <div className="animation-default-sidebar-values">
                    {
                        Object.keys(state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map((strKey, intTempIndex) => {
                            let strDisplayName = strKey.split("_")[1];
                            let objAttributeValue = { ...state.ElementJson["vElementJson"]["AnswerAttributeValue"][strKey] };
                            let objAnimationAttribute = state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(x => x["vAttributeName"].toLowerCase() === strKey.toLowerCase());
                            let strType = objAnimationAttribute["vType"].toLowerCase();
                            let intColSpan = 2;
                            if (objAnimationAttribute["cHasRange"] === "Y") {
                                intColSpan++;
                            }
                            if (objAnimationAttribute["cHasTolerance"] === "Y") {
                                intColSpan++;
                            }
                            let blnShowTable = objAnimationAttribute["cHasRange"] === "N" && objAnimationAttribute["cHasTolerance"] === "N" ? false : true;
                            return (
                                <div key={intTempIndex} className="animation-default-sidebar-input-flex">
                                    <div className={blnShowTable ? "animation-wrapper-default-sidebar-row answer" : "animation-wrapper-default-sidebar-row"}>
                                        <span>
                                            {strDisplayName}:
                                        </span>
                                        {
                                            !blnShowTable ?
                                                strType !== "array" ?
                                                    <input
                                                        type="text"
                                                        value={objAttributeValue["Min"]["vValue"]}
                                                        onChange={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, strType, "Min", event.target.value, objAttributeValue["Min"]);
                                                        }} />
                                                    :
                                                    objAttributeValue["Min"].length > 0 ?
                                                        objAttributeValue["Min"].map((objTempData, intIndex) => {
                                                            return (
                                                                <React.Fragment>
                                                                    {
                                                                        intIndex > 0 ? <span /> : ""
                                                                    }
                                                                    <input
                                                                        key={intIndex}
                                                                        type="text"
                                                                        value={objTempData["vValue"]}
                                                                        onChange={(event) => {
                                                                            event.preventDefault();
                                                                            event.stopPropagation();
                                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, strType, "Min", event.target.value, objTempData, intIndex);
                                                                        }} />
                                                                    <span
                                                                        className="animation-wrapper-sidebar-row-delete-btn"
                                                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForAnswerAttribute(objContext, strKey, intIndex); }}>
                                                                        &#10005;
                                                                        </span>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                        :
                                                        <label style={{ "font-weight": "bold" }}>
                                                            {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "Add_Values")}
                                                        </label>

                                                :
                                                <table className="animation-wrapper-default-sidebar-table">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "MinLabel")}
                                                            </th>
                                                            {
                                                                objAnimationAttribute["cHasRange"] === "Y" ?
                                                                    <th>
                                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "MaxLabel")}
                                                                    </th> : ""
                                                            }
                                                            {
                                                                objAnimationAttribute["cHasTolerance"] === "Y" ?
                                                                    <th>
                                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "ToleranceLabel")}
                                                                    </th> : ""
                                                            }
                                                            {
                                                                strType === "array" ?
                                                                    <th>
                                                                        objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "Actionlabel") : ""
                                                                    </th> : ""
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            strType === "array" ?
                                                                objAttributeValue["Min"].length > 0 ?
                                                                    objAttributeValue["Min"].map((objTempData, intIndex) => {
                                                                        return (
                                                                            <tr key={intIndex}>
                                                                                <td>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={objTempData["vValue"]}
                                                                                        onChange={(event) => {
                                                                                            event.preventDefault();
                                                                                            event.stopPropagation();
                                                                                            objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, strType, "Min", event.target.value, objTempData, intIndex);
                                                                                        }} />
                                                                                </td>
                                                                                {
                                                                                    objAnimationAttribute["cHasRange"] === "Y" ?
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={objAttributeValue["Max"][intIndex]["vValue"]}
                                                                                                onChange={(event) => {
                                                                                                    event.preventDefault();
                                                                                                    event.stopPropagation();
                                                                                                    objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, strType, "Max", event.target.value, objAttributeValue["Max"][intIndex], intIndex);
                                                                                                }} />
                                                                                        </td>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    objAnimationAttribute["cHasTolerance"] === "Y" ?
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={objAttributeValue["Tolerance"][intIndex]["vValue"]}
                                                                                                onChange={(event) => {
                                                                                                    event.preventDefault();
                                                                                                    event.stopPropagation();
                                                                                                    objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, strType, "Tolerance", event.target.value, objAttributeValue["Tolerance"][intIndex], intIndex);
                                                                                                }} />
                                                                                        </td>
                                                                                        : ""
                                                                                }
                                                                                <td>
                                                                                    <span
                                                                                        className="animation-wrapper-sidebar-row-delete-btn"
                                                                                        style={{ "textAlign": "center" }}
                                                                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.RemoveRowForAnswerAttribute(objContext, strKey, intIndex); }}>
                                                                                        &#10005;
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td colSpan={intColSpan} className="animation-wrapper-default-sidebar-no-data">
                                                                            {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "Add_Values")}
                                                                        </td>
                                                                    </tr>
                                                                :
                                                                <tr>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={objAttributeValue["Min"]["vValue"]}
                                                                            onChange={(event) => {
                                                                                event.preventDefault();
                                                                                event.stopPropagation();
                                                                                objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, objAttributeValue["Min"]["vType"], "Min", event.target.value, objAttributeValue["Min"]);
                                                                            }} />
                                                                    </td>
                                                                    {
                                                                        objAnimationAttribute["cHasRange"] === "Y" ?
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    value={objAttributeValue["Max"]["vValue"]}
                                                                                    onChange={(event) => {
                                                                                        event.preventDefault();
                                                                                        event.stopPropagation();
                                                                                        objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, objAttributeValue["Max"]["vType"], "Max", event.target.value, objAttributeValue["Max"]);
                                                                                    }} />
                                                                            </td> : ""
                                                                    }
                                                                    {
                                                                        objAnimationAttribute["cHasTolerance"] === "Y" ?
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    value={objAttributeValue["Tolerance"]["vValue"]}
                                                                                    onChange={(event) => {
                                                                                        event.preventDefault();
                                                                                        event.stopPropagation();
                                                                                        objContext.AnimationWrapperSidebar_ModuleProcessor.OnAnswerAttributeInputChange(objContext, strKey, "Number", "Tolerance", event.target.value, objAttributeValue["Tolerance"]);
                                                                                    }} />
                                                                            </td> : ""
                                                                    }
                                                                </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                        }
                                    </div>
                                    {
                                        strType === "array" ?
                                            <div className="animation-wrapper-default-sidebar-add-row">
                                                {
                                                    state.AnswerAttributeAvailableFieldType.map(objTempData => {
                                                        return (
                                                            <label className="animation-wrapper-default-sidebar-grid-item">
                                                                <input
                                                                    type="radio"
                                                                    className="animation-wrapper-sidebar-radio-btn"
                                                                    onChange={(event) => { objContext.AnimationWrapperSidebar_ModuleProcessor.OnRadioChange(objContext, objTempData["vRadioType"], "answer"); }}
                                                                    checked={objTempData["cIsSelected"] === "Y" ? true : false}
                                                                />
                                                                <span className="animation-wrapper-sidebar-radio-display-text">
                                                                    {
                                                                        objTempData["vDisplayName"]
                                                                    }
                                                                </span>
                                                            </label>
                                                        );
                                                    })
                                                }
                                                <div className="animation-wrapper-default-sidebar-add-row-btn-container">
                                                    <button
                                                        className="btn animation-wrapper-sidebar-add-row-btn"
                                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.AnimationWrapperSidebar_ModuleProcessor.OnAddNewRowForAnswerAttribute(objContext, strKey); }}>
                                                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AddButtonText")}
                                                    </button>
                                                </div>
                                            </div> : ""
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    /**
     * @name GetDefaultSidebar
     * @summary Contains the default sidebar.
     * @returns {JSX} JSX.
     */
    const GetDefaultSidebar = () => {
        let blnShowInitialValueTab = false;
        Object.keys(state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
            let objAnimationAttribute = state.ElementJson["vAnimationElementJson"]["vElementJson"]["AnimationAttributes"].find(objTempData => objTempData["vAttributeName"].toLowerCase() === strKey.toLowerCase());
            if (objAnimationAttribute !== undefined)
                if (objAnimationAttribute["cIsHidden"] === undefined || objAnimationAttribute["cIsHidden"].toLowerCase() === "n")
                    blnShowInitialValueTab = true;
        });
        let blnIsInlineEditable = state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y" ? true : false;
        let blnHasResourceValues = state.ElementJson["vAnimationElementJson"]["vElementJson"]["cHasResourceValues"] === "Y" ? true : false;
        let objTextResource = objContext.AnimationWrapperSidebar_ModuleProcessor.GetTextResource(objContext.props);
        return (
            <div ref={objContext.DefaultSidebarDomRef} className="animation-wrapper-default-sidebar-container">
                <div className="animation-wrapper-default-sidebar-tab-container">
                    {
                        blnShowInitialValueTab ?
                            <div className={"animation-wrapper-default-sidebar-tab"}>
                                <span className={state.ShowTab.toLowerCase() === "initial" ? "active" : undefined} onClick={() => { objContext.AnimationWrapperSidebar_ModuleProcessor.HandleChangeTab(objContext, "Initial"); }}>
                                    {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "InitialValues")}
                                </span>
                            </div> : ""
                    }
                    {
                        blnHasResourceValues ?
                            <div className={"animation-wrapper-default-sidebar-tab"}>
                                <span className={state.ShowTab.toLowerCase() === "resource" ? "active" : undefined} onClick={() => { objContext.AnimationWrapperSidebar_ModuleProcessor.HandleChangeTab(objContext, "Resource"); }}>
                                    {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "ResourceValues")}
                                </span>
                            </div> : ""
                    }
                    {
                        !blnIsInlineEditable && Object.keys(state.ElementJson["vElementJson"]["AnswerAttributeValue"]).length > 0 ?
                            <div className={"animation-wrapper-default-sidebar-tab"}>
                                <span className={state.ShowTab.toLowerCase() === "answer" ? "active" : undefined} onClick={() => { objContext.AnimationWrapperSidebar_ModuleProcessor.HandleChangeTab(objContext, "Answer"); }}>
                                    {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "AnswerValues")}
                                </span>
                            </div>
                            : ""
                    }
                </div>
                <div className="animation-wrapper-default-sidebar-content-container">
                    {
                        state.ShowTab.toLowerCase() === "initial" ? GetInitialValues(objTextResource) : ""
                    }
                    {
                        state.ShowTab.toLowerCase() === "resource" && blnHasResourceValues ? GetResourceValues(objTextResource) : ""
                    }
                    {
                        state.ShowTab.toLowerCase() === "answer" && !blnIsInlineEditable ? GetAnswerValues(objTextResource) : ""
                    }
                </div>
                <div className="animation-wrapper-sidebar-footer">
                    <button
                        className="btn"
                        onClick={(event) => { event.preventDefault(); objContext.AnimationWrapperSidebar_ModuleProcessor.OnClickSaveForDefaultSidebar(objContext); }}>
                        {objContext.AnimationWrapperSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component.
     */
    const GetContent = () => {
        if (objContext.state.blnHasCustomSidebar) {
            return GetCustomSidebar();
        }
        else {
            return GetDefaultSidebar();
        }
    };

    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(AnimationWrapperSidebar_ModuleProcessor.StoreMapList()))(AnimationWrapperSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AnimationWrapperSidebar_ModuleProcessor; 