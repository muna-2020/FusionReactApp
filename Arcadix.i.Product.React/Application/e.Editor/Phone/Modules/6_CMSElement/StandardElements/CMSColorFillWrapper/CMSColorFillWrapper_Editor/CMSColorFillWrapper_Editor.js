// React related import
import React, { useReducer, useEffect, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.          
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Common/CMSColorFillWrapper_Common';
import * as CMSColorFillWrapper_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor_Hook';
import CMSColorFillWrapper_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor_ModuleProcessor";
import CMSColorFillWrapper_Common_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Common/CMSColorFillWrapper_Common_ModuleProcessor";
import * as CMSColorFillWrapper_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor_MetaData";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSColorFillWrapper_Editor
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSColorFillWrapper's editor version.
 * @returns {component} component
 */
const CMSColorFillWrapper_Editor = (props) => {

    /**
    * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSColorFillWrapper_Editor_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        SVGRef: useRef(null),
        arrColorFill: useRef([]),
        objSVGoffset: useRef(null),
        arrCapturedElementIds: useRef([]),
        ColorFillRef: useRef(null),
        ColorFillEditorRef: useRef(null),
        "ModuleName": "CMSColorFillWrapper_Editor_" + props.ElementJson.iElementId,
        ["CMSColorFillWrapper_Common_ModuleProcessor"]: new CMSColorFillWrapper_Common_ModuleProcessor(),
        ["CMSColorFillWrapper_Editor_ModuleProcessor"]: new CMSColorFillWrapper_Editor_ModuleProcessor()
    };

    /**
     * @name CMSColorFillWrapper_Editor_Hook.Initialize
     * @summary Initialize method call in CMSColorFillWrapper_Editor_Hook, that contains all the custom hooks.
     */
    CMSColorFillWrapper_Editor_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSColorFillWrapper_Common_ModuleProcessor.Initialize(objContext, objContext.CMSColorFillWrapper_Common_ModuleProcessor);

    /**
    * @name GetContextMenuOptions
    * @param {object} objContext {props, state, dispatch}
    * @param {object} objParams gets selected shape id
    * @summary gets context menu list based on the slide element type
    * @returns {Array} slide context menu array
    */
    const GetContextMenuOptions = (objContext, objParams) => {
        objContext = objContext.props.ElementRef.current.GetLatestContext();
        const { id, blnAddAnswer } = objParams;
        let arrContextMenuOptions = [
            {
                ResourceKey: "Add_Fill_Color",
                ClickEvent: objContext.CMSColorFillWrapper_Editor_ModuleProcessor.OpenAddPopup,
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: blnAddAnswer || blnAddAnswer === null ? "Set_Answer_Range" : "Remove_Answer_Range",
                Disable: blnAddAnswer === null ? true : false,
                ClickEvent: SetAnswerRemoveRange,
                params: { objContext, "id": id, "blnAddAnswer": blnAddAnswer, "cIsFirstLoad": objContext.state.cIsFirstLoad }
            },
            {
                ResourceKey: "Properties",
                ClickEvent: objContext.CMSColorFillWrapper_Editor_ModuleProcessor.ShowPropertiesSidebar,
                params: objContext
            },
            {
                Type: "Separator"
            },
            {
                ResourceKey: "Delete_Interaction_Type",
                ClickEvent: () => { objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]); },
                params: {}
            },
            {
                ResourceKey: "Show_Header_Text",
                Image: objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? "/Images/editor/Icon_Yes.gif" : "/Images/editor/Icon_No.gif",
                ClickEvent: objContext.CMSColorFillWrapper_Editor_ModuleProcessor.ShowHeaderText,
                params: { objContext }
            },
            {
                ResourceKey: "Container",
                SubMenuModule: "CMSPageContent"
            }
        ];
        let arrParentContextMenuOptions = objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetContextMenuOptions ?
            objContext.props.ParentRef.current.GetContextMenuOptions() : [];
        return [
            {
                Module: "CMSColorFillWrapper",
                MenuList: arrContextMenuOptions,
                Visible: true,
                ResourcePath: "/e.Editor/Modules/6_CMSElement/CMSColorFillWrapper"
            },
            ...arrParentContextMenuOptions
        ];
    }

    /**
     * @name OpenContextMenu
     * @param {object} objContext {state, props, dispatch, CMSColorFillWrapper_Editor_ModuleProcessor}
     * @param {number} intClientX X-Axis coordinates
     * @param {number} intClientY Y-Axis coordinates
     * @summary Opens the context menu.
     */
    const OpenContextMenu = (objContext, event) => {
        var intClientX = objContext.state.cIsFirstLoad === "Y" ? event.clientX + objContext.objSVGoffset.current.left : event.clientX;
        var intClientY = objContext.state.cIsFirstLoad === "Y" ? event.clientY + objContext.objSVGoffset.current.top : event.clientY;
        var blnAddAnswer = true;
        if (objContext.arrCapturedElementIds.current.filter(id => id.actualid === event.target.id).length > 0) {
            blnAddAnswer = false;
        }
        console.log(event.target.getAttribute("cIsColorFillShape"));
        if (event.target.getAttribute("IsColorFill") === null || event.target.tagName.toLowerCase() === "svg") {
            blnAddAnswer = null;
        }
        var objParams = { "id": event.target.id, "blnAddAnswer": blnAddAnswer };
        objContext.CMSColorFillWrapper_Editor_ModuleProcessor.ShowContextMenu({
            objContext,
            objClientXY: { clientX: intClientX, clientY: intClientY },
            arrContextMenuDetail: GetContextMenuOptions(objContext, objParams)
        });
    }

    const addContenuMenuToShapes = (event) => {
        event.preventDefault();
        event.stopPropagation();
        OpenContextMenu(objContext, event);
    }

    const SetAnswerRemoveRange = (objParams) => {
        const { objContext, id, blnAddAnswer, cIsFirstLoad } = objParams;
        var svg; var element;
        if (cIsFirstLoad === "Y") {
            svg = objContext.ColorFillRef.current; //document.getElementById(`alphasvg_${objContext.state.ElementJson.iElementId}`);
            element = svg.contentDocument.getElementById(id);
        }
        else {
            element = document.getElementById(id);
        }
        if (element) {
            if (blnAddAnswer) {
                let iClonedElementId = UniqueId.GetUniqueId();
                let targetClone = element.cloneNode(true);
                targetClone.style.fill = element.style.fill;
                targetClone.style.stroke = "#0000ff";
                targetClone.style.strokeWidth = "8px";
                targetClone.style.strokeOpacity = "0.5";
                targetClone.style.strokeLinejoin = "round";
                targetClone.style.strokeLinecap = "round";
                targetClone.setAttribute("id", iClonedElementId);
                element.parentNode.insertBefore(targetClone, element);
                objContext.arrCapturedElementIds.current = [...objContext.arrCapturedElementIds.current, { "actualid": id, "clonedid": iClonedElementId }];
                var objAnswerRangeParams = { "vColorCode": element.getAttribute("fill"), "vClientElementId": id, "iColorFillInstanceValueId": objContext.state.ElementJson.vElementJson.iColorFillInstanceId };
                var objAnswerRange = CMSColorFillWrapper_Editor_MetaData.GetDefaultAnswerRange(objAnswerRangeParams);
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson.vElementJson,
                                ["Values"]: [...objContext.state.ElementJson.vElementJson.Values, objAnswerRange]
                            }
                        }
                    }
                });
            }
            else {
                var objClonedElementId = objContext.arrCapturedElementIds.current.filter(e => e.actualid === id)[0];
                if (objClonedElementId) {
                    var clonedElement;
                    if (cIsFirstLoad === "Y") {
                        clonedElement = svg.contentDocument.getElementById(objClonedElementId.clonedid);
                    }
                    else {
                        clonedElement = document.getElementById(objClonedElementId.clonedid);
                    }
                    clonedElement.remove();
                    objContext.arrCapturedElementIds.current = objContext.arrCapturedElementIds.current.filter(e => e.actualid !== id);
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "ElementJson": {
                                ...objContext.state.ElementJson,
                                ["vElementJson"]: {
                                    ...objContext.state.ElementJson.vElementJson,
                                    ["Values"]: [...objContext.state.ElementJson.vElementJson.Values.filter(v => v.vClientElementId !== id)]
                                }
                            }
                        }
                    });
                }
            }
            objContext.CMSColorFillWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }

    /**
     *@name useEffect
     *@summary Creates SVG dynamically from color fill array if svg is already saved 
     */
    useEffect(() => {
        if (objContext.state.cIsFirstLoad === "N") {
            GenerateSVGFromColorFillJson(objContext);
        }
    }, [])

    /**
     * @name GenerateSVGFromColorFillJson
     * @param {any} objContext
     */
    const GenerateSVGFromColorFillJson = (objContext) => {
        var vColorFillJson = JSON.parse(objContext.props.ElementJson.vElementJson.vColorFillJson.replace(/{apos}/gi, '"').replace(/{fslash}/, '').replace(/'/gi, '"'));
        objContext.arrColorFill.current = [...vColorFillJson];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        for (var intCount = 0; intCount < vColorFillJson.length; intCount++) {
            if (vColorFillJson[intCount].type === "paper") {
                Object.keys(vColorFillJson[intCount]).map((key) => {
                    svg.setAttribute([key], vColorFillJson[intCount][key]);
                });
                continue;
            }
            var arrStyleAttributes; var objStyleAttributes = {};
            if (vColorFillJson[intCount]["data-style-attributes"]) {
                arrStyleAttributes = vColorFillJson[intCount]["data-style-attributes"].split(";");
                arrStyleAttributes.forEach((e) => {
                    if (e) {
                        objStyleAttributes = { ...objStyleAttributes, [e]: true };
                    }
                });
            }
            var element = document.createElementNS("http://www.w3.org/2000/svg", vColorFillJson[intCount].type);
            Object.keys(vColorFillJson[intCount]).map((key) => {
                if (key === "path") {
                    element.setAttribute("d", vColorFillJson[intCount][key]);
                }
                else if (key === "transform") {
                    element.setAttribute([key], `matrix(${vColorFillJson[intCount][key]})`);
                }
                else {
                    element.setAttribute([key], vColorFillJson[intCount][key]);
                }
            });

            if (vColorFillJson[intCount].IsColorFill === "Y") {
                console.log(vColorFillJson[intCount].id)
                //element.style.fill = "rgba(0, 0, 0, 0)";
                let iClonedElementId = UniqueId.GetUniqueId();
                let targetClone = element.cloneNode(true);
                var strColor = objContext.props.ElementJson.vElementJson.Values.find(v => v.vClientElementId === vColorFillJson[intCount]["id"]);
                if (strColor) {
                    targetClone.style.fill = strColor["vColorCode"];
                }
                targetClone.style.stroke = "#0000ff";
                targetClone.style.strokeWidth = "8px";
                targetClone.style.strokeOpacity = "0.5";
                targetClone.style.strokeLinejoin = "round";
                targetClone.style.strokeLinecap = "round";
                targetClone.setAttribute("id", iClonedElementId);
                svg.appendChild(targetClone);
                objContext.arrCapturedElementIds.current = [...objContext.arrCapturedElementIds.current, { "actualid": vColorFillJson[intCount].id, "clonedid": iClonedElementId }];
            }
            svg.appendChild(element);
        }

        var svgWrapper = objContext.ColorFillEditorRef.current;
        svgWrapper.appendChild(svg);
        svgWrapper.addEventListener("contextmenu", addContenuMenuToShapes);
        var offset = svgWrapper.getBoundingClientRect();
        objContext.objSVGoffset.current = { "top": offset.top, "left": offset.left };
    }

    /**
     * @name HandleOnLoad
     * @param {any} e
     */
    const HandleOnLoad = (e) => {
        var svg = objContext.ColorFillRef.current; //document.getElementById(`alphasvg_${objContext.state.ElementJson.iElementId}`);
        var svgElement = svg.contentDocument.querySelector("svg");
        var objSVGAttributes = {};
        if (svgElement) {
            var svgAttributes = svgElement.attributes;
            for (var p = 0; p < svgAttributes.length; p++) {
                objSVGAttributes = { ...objSVGAttributes, [svgAttributes[p].name]: svgAttributes[p].value };
            }
        }
        objContext.arrColorFill.current = [
            ...objContext.arrColorFill.current,
            {
                ...objSVGAttributes,
                ["type"]: "paper",
                ["IsColorFill"]: "N"
            }
        ];
        var offset = svg.getBoundingClientRect();
        objContext.objSVGoffset.current = { "top": offset.top, "left": offset.left };
        let svgDoc = svg.contentDocument;
        var nodeList = svg.contentDocument.querySelectorAll("*");
        nodeList.forEach((node) => {
            var objNodeAttributes = {};
            if (/text|image|ellipse|path|rect|circle|polygon/i.test(node.nodeName)) {
                node.setAttribute("cIsColorFillShape", true);
                node.setAttribute("id", UniqueId.GetUniqueId());
                node.setAttribute("IsColorFill", "N");
                var arrAttributes = node.attributes;
                for (var i = 0; i < arrAttributes.length; i++) {
                    var blnAttributeStyle = false;
                    if (arrAttributes[i].nodeName === "style") {
                        blnAttributeStyle = true;
                        var arrStyles = arrAttributes[i].nodeValue.split(";");
                        for (var intCount = 0; intCount < arrStyles.length; intCount++) {
                            if (arrStyles[intCount]) {
                                var arrStylePropertyValue = arrStyles[intCount].split(":");
                                objNodeAttributes = { ...objNodeAttributes, [arrStylePropertyValue[0]]: arrStylePropertyValue[1] };
                            }
                        }
                        var arrStyleAttributes = arrAttributes[i].nodeValue.split(";");
                        var strStyleAttributes = "";
                        for (var s = 0; s < arrStyleAttributes.length; s++) {
                            var strProperty = arrStyleAttributes[s].split(":")[0];
                            if (arrStyleAttributes[s].split(":")[0]) {
                                strStyleAttributes = strStyleAttributes + strProperty + ";";
                            }

                        }
                        objNodeAttributes = { ...objNodeAttributes, "data-style-attributes": strStyleAttributes };
                    }
                    if (!blnAttributeStyle) {
                        objNodeAttributes = { ...objNodeAttributes, [arrAttributes[i].name]: arrAttributes[i].value };
                    }
                }
                if (objNodeAttributes["d"]) {
                    objNodeAttributes = { ...objNodeAttributes, ["path"]: objNodeAttributes["d"] };
                    delete objNodeAttributes.d;
                }
                if (objNodeAttributes["transform"] && objNodeAttributes["transform"].indexOf("matrix") !== -1) {
                    objNodeAttributes = { ...objNodeAttributes, ["transform"]: objNodeAttributes["transform"].replace(/matrix|\(|\)/g, "") };
                }
                var nodeName = node.nodeName;
                //if (nodeName.toLowerCase() === "polygon") {
                //    nodeName = "path";
                //    objNodeAttributes = {
                //        ...objNodeAttributes, ["path"]: objNodeAttributes["points"]
                //    }
                //    delete objNodeAttributes.points;
                //}
                objContext.arrColorFill.current = [
                    ...objContext.arrColorFill.current,
                    {
                        ...objNodeAttributes,
                        ["type"]: nodeName,
                        ["IsColorFill"]: "N"
                    }
                ]
            }
        });
        svgDoc.addEventListener("contextmenu", addContenuMenuToShapes);
    }

    /**
     *@name useEffect
     * @summary add's load event 
     */
    useEffect(() => {
        var svg = objContext.ColorFillRef.current; //document.getElementById(`alphasvg_${Context.state.ElementJson.iElementId}`);
        if (svg) {
            svg.addEventListener("load", HandleOnLoad);
        }
        return () => {
            if (svg) {
                console.log("Component unmounted");
                svg.removeEventListener("load", HandleOnLoad);
            }
        };
    }, [objContext.state.cIsFirstLoad])


    /**
     * @name GetSVGElement
     * @summary Creates SVG element for SSR
     * */
    const GetSVGElement = () => {
        if (jsdom) {
            const { JSDOM } = jsdom;
            const { document } = (new JSDOM('')).window;
            var vColorFillJson = JSON.parse(props.ElementJson.vElementJson.vColorFillJson.replace(/{apos}/gi, '"').replace(/{fslash}/, '').replace(/'/gi, '"'));
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            for (var intCount = 0; intCount < vColorFillJson.length; intCount++) {
                if (vColorFillJson[intCount].type === "paper") {
                    Object.keys(vColorFillJson[intCount]).map((key) => {
                        svg.setAttribute([key], vColorFillJson[intCount][key]);
                    });
                    continue;
                }
                var arrStyleAttributes; var objStyleAttributes = {};
                if (vColorFillJson[intCount]["data-style-attributes"]) {
                    arrStyleAttributes = vColorFillJson[intCount]["data-style-attributes"].split(";");
                    arrStyleAttributes.forEach((e) => {
                        if (e) {
                            objStyleAttributes = { ...objStyleAttributes, [e]: true };
                        }
                    });
                }
                var element = document.createElementNS("http://www.w3.org/2000/svg", vColorFillJson[intCount].type);
                Object.keys(vColorFillJson[intCount]).map((key) => {
                    if (key === "path") {
                        element.setAttribute("d", vColorFillJson[intCount][key]);
                    }
                    else if (key === "transform") {
                        element.setAttribute([key], `matrix(${vColorFillJson[intCount][key]})`);
                    }
                    else {
                        element.setAttribute([key], vColorFillJson[intCount][key]);
                    }
                });
                if (vColorFillJson[intCount].IsColorFill === "Y") {
                    console.log(vColorFillJson[intCount].id)
                    let iClonedElementId = UniqueId.GetUniqueId();
                    let targetClone = element.cloneNode(true);

                    var strColor = props.ElementJson.vElementJson.Values.find(v => v.vClientElementId === vColorFillJson[intCount]["id"]);
                    if (strColor) {
                        targetClone.style.fill = strColor["vColorCode"];
                    }
                    targetClone.style.stroke = "#0000ff";
                    targetClone.style.strokeWidth = "8px";
                    targetClone.style.strokeOpacity = "0.5";
                    targetClone.style.strokeLinejoin = "round";
                    targetClone.style.strokeLinecap = "round";
                    targetClone.setAttribute("id", iClonedElementId);
                    svg.appendChild(targetClone);
                }
                svg.appendChild(element);
            }
            return svg.outerHTML;
        }
    }

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSColorFillWrapper_Common_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        return (
            <React.Fragment>
                <div id={`cms-color-fill-wrapper-${objContext.state.ElementJson["iElementId"]}`}
                    ielementid={objContext.state.ElementJson["iElementId"]}
                    ielementtypeid={objContext.state.ElementJson["iElementTypeId"]}
                    style={{ "border": "none", "padding": "4px" }}>
                    {
                        objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_Editor {...objTextElementProps} /> : ""
                    }
                    <div>
                        {
                            objContext.state.cIsFirstLoad === "Y" &&
                            <object ref={objContext.ColorFillRef} id={`alphasvg_${objContext.state.ElementJson.iElementId}`}
                                data={`${objContext.props.JConfiguration.WebDataPath}Repo/ColorFill/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.vColorFillElementJson.iElementId}_ColorFill_${objContext.state.ElementJson.vColorFillElementJson.vElementJson.iColorFillFileVersion}.${objContext.state.ElementJson.vColorFillElementJson.vElementJson.vColorFillType}`} type="image/svg+xml" >
                            </object>
                        }
                        {
                            objContext.state.cIsFirstLoad === "N" && !objContext.props.IsForServerRenderHtml &&
                            <div ref={objContext.ColorFillEditorRef} id={`alphasvg_editor_${objContext.state.ElementJson.iElementId}`}>
                            </div>
                        }
                        {
                            objContext.state.cIsFirstLoad === "N" && objContext.props.IsForServerRenderHtml &&
                            <div ref={objContext.ColorFillEditorRef} id={`alphasvg_editor_${objContext.state.ElementJson.iElementId}`}
                                dangerouslySetInnerHTML={{ __html: GetSVGElement() }}>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
};

export default CMSColorFillWrapper_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSColorFillWrapper_Common_ModuleProcessor; 